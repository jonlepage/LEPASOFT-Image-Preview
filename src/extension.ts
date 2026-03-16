import * as path from 'path';
import { loadConfig } from './util/ts-config-loader';

import {
    ServerOptions,
    TransportKind,
    Message,
    LanguageClientOptions,
    LanguageClient,
    CloseAction,
    ErrorAction,
} from 'vscode-languageclient/node';
import {
    ExtensionContext,
    window,
    workspace,
    TextDocument,
    CancellationToken,
    commands,
    Position,
    Uri,
    Location,
    LocationLink,
    OutputChannel,
    Range,
} from 'vscode';
import { ImageInfoResponse, GutterPreviewImageRequestType, ImageInfo } from './common/protocol';
import { imageDecorator } from './decorator';
import { getConfiguredProperty } from './util/configuration';

const pathCache = {};

// Cache for reference lookup: "word@definitionUri:line" → deep-cloned images
const REFERENCE_CACHE_MAX_SIZE = 500;
const referenceImageCache = new Map<string, ImageInfo[]>();

const loadPathsFromTSConfig = (
    workspaceFolder: string,
    currentFileFolder: string,
): { [name: string]: string | string[] } => {
    if (pathCache[currentFileFolder]) {
        return pathCache[currentFileFolder];
    }
    const paths: { [name: string]: string | string[] } = {};
    const configResult = loadConfig(currentFileFolder);

    if (configResult.resultType == 'success') {
        const tsConfigPaths = configResult.paths || {};
        const baseUrl: string = path.relative(workspaceFolder, configResult.absoluteBaseUrl);
        Object.keys(tsConfigPaths).forEach((alias) => {
            let mapping = tsConfigPaths[alias];
            const lastIndexOfSlash = alias.lastIndexOf('/');
            let aliasWithoutWildcard = alias;
            if (lastIndexOfSlash > 0) {
                aliasWithoutWildcard = alias.substr(0, lastIndexOfSlash);
            }
            if (aliasWithoutWildcard == '*') {
                aliasWithoutWildcard = '';
            }
            if (!paths[aliasWithoutWildcard]) {
                if (!Array.isArray(mapping)) {
                    mapping = [mapping];
                }
                const resolvedMapping = [];
                mapping.forEach((element: string) => {
                    if (element.endsWith('*')) {
                        element = element.substring(0, element.length - 1);
                    }
                    resolvedMapping.push(path.join(baseUrl, element).replace(/\\/g, '/'));
                });
                paths[aliasWithoutWildcard] = resolvedMapping;
            }
        });
    }

    pathCache[currentFileFolder] = paths;
    return paths;
};

export function activate(context: ExtensionContext) {
    const storageUri = context.storageUri || context.globalStorageUri;
    if (!storageUri || !storageUri.fsPath) {
        throw new Error('The extension "LEPASOFT Image Preview" can not work without access to the storage!');
    }

    let serverModule = context.asAbsolutePath(path.join('dist', 'server.js'));

    let debugOptions = { execArgv: ['--nolazy', '--inspect=6099'] };

    let serverOptions: ServerOptions = {
        run: { module: serverModule, transport: TransportKind.ipc },
        debug: { module: serverModule, transport: TransportKind.ipc, options: debugOptions },
    };
    var output: OutputChannel | undefined = undefined;

    let clientOptions: LanguageClientOptions = {
        documentSelector: ['*'],
        initializationOptions: {
            storagePath: storageUri.fsPath,
        },
        errorHandler: {
            error: (error: Error, message: Message | undefined, count: number | undefined) => {
                if (!output) {
                    output = window.createOutputChannel('LEPASOFT Image Preview');
                }
                output.appendLine(message.jsonrpc);
                return {
                    handled: true,
                    action: ErrorAction.Continue,
                    message:
                        'An error occured while processing a request for LEPASOFT Image Preview. Check the output "LEPASOFT Image Preview" for further details.',
                };
            },

            closed: () => {
                return {
                    action: CloseAction.Restart,
                };
            },
        },
        synchronize: {
            configurationSection: 'gutterpreview',
        },
    };

    let client = new LanguageClient('gutterpreview parser', serverOptions, clientOptions);
    const started = client.start();
    started.then((_) => {
        context.subscriptions.push({ dispose: () => client.dispose() });
    });

    let symbolUpdater = (
        document: TextDocument,
        visibleLines: number[],
        token: CancellationToken,
    ): Promise<ImageInfoResponse> => {
        let paths = getConfiguredProperty(document, 'paths', {});

        const folder = workspace.getWorkspaceFolder(document.uri);

        let workspaceFolder;
        if (folder && folder.uri) {
            workspaceFolder = folder.uri.fsPath;
        }

        if (workspaceFolder && document.uri && document.uri.fsPath) {
            paths = Object.assign(loadPathsFromTSConfig(workspaceFolder, path.dirname(document.uri.fsPath)), paths);
        }

        const getImageInfo = (uri: Uri, visibleLines: number[]): Promise<ImageInfoResponse> => {
            return started.then(() => {
                return client.sendRequest(
                    GutterPreviewImageRequestType,
                    {
                        uri: uri.toString(),
                        visibleLines: visibleLines,
                        fileName: document.fileName,
                        workspaceFolder: workspaceFolder,
                        currentColor: getConfiguredProperty(document, 'currentColorForSVG', ''),
                        additionalSourcefolders: [
                            ...getConfiguredProperty<string[]>(document, 'sourceFolder', []),
                            ...getConfiguredProperty<string[]>(document, 'sourceFolders', []),
                        ],
                        paths: paths,
                    },
                    token,
                );
            });
        };

        const emptyResponse: ImageInfoResponse = { images: [] };
        const requests: Array<Thenable<ImageInfoResponse>> = [];
        const isReferenceLookupEnabled = getConfiguredProperty(document, 'enableReferenceLookup', false);
        if (isReferenceLookupEnabled) {
            // Fix #4: Deduplicate — only look up each unique word once
            const seenWords = new Set<string>();
            const wordRanges = new Map<string, Range>();

            const propertyAccessRegex = /(\.[a-zA-Z_$0-9]+)|(\$[a-zA-Z_$0-9]+)|(\b[A-Z][a-zA-Z_$0-9]*\b)/g;
            for (const lineIndex of visibleLines) {
                var line = document.lineAt(lineIndex).text;
                if (!line) continue;
                // Fix #3: return empty instead of Promise.reject()
                if (token.isCancellationRequested) return Promise.resolve(emptyResponse);
                if (line.length > 20000) {
                    continue;
                }

                let matches;
                while ((matches = propertyAccessRegex.exec(line)) != null) {
                    // Group 1 (.foo) and Group 2 ($foo) have a prefix char; Group 3 (PascalCase) does not
                    const offset = matches[3] ? 1 : 2;
                    const position = new Position(
                        lineIndex,
                        matches.index + offset,
                    );
                    const range = document.getWordRangeAtPosition(position);
                    if (!range) continue;

                    const word = document.getText(range);
                    // Skip if we've already queued a lookup for this word
                    if (seenWords.has(word)) continue;
                    seenWords.add(word);
                    wordRanges.set(word, range);

                    const pendingDefinitionRequest = commands
                        .executeCommand('vscode.executeDefinitionProvider', document.uri, position)
                        .then((definitions: (Location | LocationLink)[]) => {
                            if (token.isCancellationRequested || !definitions || !Array.isArray(definitions)) {
                                return emptyResponse;
                            }
                            const pendingRequests = definitions.map((definition) => {
                                if (definition) {
                                    const uri = (definition as Location).uri || (definition as LocationLink).targetUri;
                                    const definitionRange =
                                        (definition as Location).range || (definition as LocationLink).targetRange;
                                    if (definitionRange) {
                                        // Skip if the definition is in the same file
                                        // (the normal scan already handles data URIs in the current document)
                                        if (uri.toString() === document.uri.toString()) return;

                                        const cacheKey = `${word}@${uri.toString()}:${definitionRange.start.line}`;
                                        const cached = referenceImageCache.get(cacheKey);
                                        if (cached) {
                                            // Fix #2: cached images are already cloned, just set new range
                                            return Promise.resolve({
                                                images: cached.map((img) => ({ ...img, range: range })),
                                            } as ImageInfoResponse);
                                        }

                                        return workspace.openTextDocument(uri).then((defDoc) => {
                                            if (token.isCancellationRequested) {
                                                return emptyResponse;
                                            }

                                            // Scan upward from the definition line, collecting comment lines
                                            // Stop when we hit a non-comment, non-blank line
                                            const defLine = definitionRange.start.line;
                                            const linesToScan: number[] = [defLine];
                                            for (let i = defLine - 1; i >= 0 && i >= defLine - 20; i--) {
                                                const lineText = defDoc.lineAt(i).text.trim();
                                                if (
                                                    lineText.startsWith('///') ||
                                                    lineText.startsWith('//') ||
                                                    lineText.startsWith('*') ||
                                                    lineText.startsWith('/**') ||
                                                    lineText.startsWith('*/') ||
                                                    lineText === ''
                                                ) {
                                                    linesToScan.push(i);
                                                } else {
                                                    break;
                                                }
                                            }

                                            return getImageInfo(uri, linesToScan).then((response) => {
                                                // Fix #2: deep clone images before caching (before mutation)
                                                referenceImageCache.set(
                                                    cacheKey,
                                                    response.images.map((img) => ({ ...img })),
                                                );

                                                // Fix #5: evict oldest entries if cache exceeds max size
                                                if (referenceImageCache.size > REFERENCE_CACHE_MAX_SIZE) {
                                                    const firstKey = referenceImageCache.keys().next().value;
                                                    referenceImageCache.delete(firstKey);
                                                }

                                                // Mutate range for current caller
                                                response.images.forEach((p) => (p.range = range));
                                                return response;
                                            });
                                        }).then(undefined, () => emptyResponse);
                                    }
                                }
                            });
                            return Promise
                            .all(pendingRequests.filter((r) => !!r))
                            .then((responses) => {
                                return {
                                    images: responses
                                        .filter((r) => r && r.images)
                                        .map((response) => response.images)
                                        .reduce((prev, curr) => prev.concat(...curr), []),
                                } as ImageInfoResponse;
                            });
                        }).then(undefined, () => emptyResponse);
                    requests.push(pendingDefinitionRequest);
                }
            }

            // Map deduplicated results back to ALL occurrences of each word
            if (requests.length > 0) {
                const deduplicatedRequest = Promise.all(requests).then((responses) => {
                    const imagesByWord = new Map<string, ImageInfoResponse>();
                    const allWords = Array.from(seenWords);

                    // Collect images from each deduplicated lookup
                    responses.forEach((response, index) => {
                        if (response && response.images.length > 0) {
                            imagesByWord.set(allWords[index], response);
                        }
                    });

                    // Now find ALL occurrences of words that have images and create decorations
                    const allImages: ImageInfo[] = [];
                    imagesByWord.forEach((response, word) => {
                        // Find all positions of this word in visible lines
                        for (const lineIndex of visibleLines) {
                            const lineText = document.lineAt(lineIndex).text;
                            let searchIndex = 0;
                            while (true) {
                                const idx = lineText.indexOf(word, searchIndex);
                                if (idx === -1) break;
                                const pos = new Position(lineIndex, idx);
                                const wordRange = document.getWordRangeAtPosition(pos);
                                if (wordRange && document.getText(wordRange) === word) {
                                    response.images.forEach((img) => {
                                        allImages.push({ ...img, range: wordRange });
                                    });
                                }
                                searchIndex = idx + word.length;
                            }
                        }
                    });
                    return { images: allImages } as ImageInfoResponse;
                });
                // Replace individual requests with one combined request
                requests.length = 0;
                requests.push(deduplicatedRequest);
            }
        }

        requests.push(getImageInfo(document.uri, visibleLines));
        return Promise
            .all(requests)
            .then((responses) => {
                return {
                    images: responses
                        .map((response) => response.images)
                        .reduce((prev, curr) => prev.concat(...curr), []),
                };
            })
            .catch((e) => {
                console.warn(
                    'Connection was not yet ready when requesting image previews or an unexpected error occured.',
                );
                console.warn(e);
                return {
                    images: [],
                };
            });
    };

    // Invalidate reference image cache when any document changes
    context.subscriptions.push(
        workspace.onDidChangeTextDocument((e) => {
            if (e && e.document) {
                const changedUri = e.document.uri.toString();
                const keysToDelete: string[] = [];
                referenceImageCache.forEach((_, key) => {
                    if (key.includes(changedUri)) {
                        keysToDelete.push(key);
                    }
                });
                keysToDelete.forEach((key) => referenceImageCache.delete(key));
            }
        }),
    );

    imageDecorator(symbolUpdater, context, client);
}
