# LEPASOFT Image Preview

Display image previews from documentation comments directly in symbol hover panels. Supports multiple images, base64-encoded images, and multiple languages (C#, TypeScript, GDScript, and more).

Ideal for game developers and software engineers maintaining i18n key dictionaries or any reference system where previewing the visual context of defined keys improves workflow.

Fork of [Image Preview](https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-gutter-preview) by Tamas Kiss.

## Features

### Gutter preview

Image thumbnails displayed directly in the editor gutter for any recognized image URI.

![Gutter preview](https://raw.githubusercontent.com/jonlepage/LEPASOFT-Image-Preview/master/images/screenshot-gutter.jpg)

### Hover preview

Hover over an image reference to see a full preview with dimensions and file size.

![Hover preview](https://raw.githubusercontent.com/jonlepage/LEPASOFT-Image-Preview/master/images/screenshot-hover.jpg)

### Doc comment image preview for all languages

References containing images are identified with a gutter icon. Hover to view the visual reference directly in the editor. Supports C#, TypeScript, GDScript, and any language supported by VS Code's definition provider.

Multiple images can be referenced in doc comments to guide developers through dictionary keys. Image preview reduces ambiguity when working with large, complex dictionaries used in game engines or software localization.

![Doc comment preview](https://raw.githubusercontent.com/jonlepage/LEPASOFT-Image-Preview/master/images/screenshot-doccomment.jpg)

## Install

Search for **LEPASOFT Image Preview** in the VS Code Extensions panel, or install from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=lepasoft-dev.lepasoft-image-preview).

## Configuration

| Setting | Default | Description |
| --- | --- | --- |
| `gutterpreview.showImagePreviewOnGutter` | `true` | Show image preview in the gutter |
| `gutterpreview.imagePreviewMaxHeight` | `100` | Max height of the image preview on hover (px) |
| `gutterpreview.imagePreviewMaxWidth` | `-1` | Max width of the image preview on hover (px), overrides max height if > 0 |
| `gutterpreview.enableReferenceLookup` | `true` | Resolve image previews from symbol references and doc comments |
| `gutterpreview.sourceFolder` | `"src"` | Additional folder for relative URL resolution |
| `gutterpreview.sourceFolders` | `["static", "public"]` | Additional folders for relative URL resolution |
| `gutterpreview.paths` | `{}` | Path mappings computed relative to project root |
| `gutterpreview.currentColorForSVG` | `"white"` | Default color used in SVG previews |
| `gutterpreview.showUnderline` | `true` | Show underline on detected image links |
| `gutterpreview.urlDetectionPatterns` | `[]` | Custom regex patterns to detect image URLs without standard extensions |

## Credits

Based on [Image Preview](https://github.com/kisstkondoros/gutter-preview) by Tamas Kiss (kisstkondoros). Licensed under MIT.

## License

Licensed under MIT
