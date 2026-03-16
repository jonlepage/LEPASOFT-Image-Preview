# LEPASOFT Image Preview

Shows image preview in the gutter, on hover, and from doc comments. Fork of [Image Preview](https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-gutter-preview) by Tamas Kiss.

## Features

### Gutter preview

Image thumbnails displayed directly in the editor gutter for any recognized image URI.

![Gutter preview](https://raw.githubusercontent.com/jonlepage/LEPASOFT-Image-Preview/master/images/screenshot-gutter.jpg)

### Hover preview

Hover over an image reference to see a full preview with dimensions and file size.

![Hover preview](https://raw.githubusercontent.com/jonlepage/LEPASOFT-Image-Preview/master/images/screenshot-hover.jpg)

### Doc comment image preview (new)

Hover over a symbol reference to see images embedded in its documentation comments (`/// <image url="...">`, `@image`, data URIs, etc.). Works with C#, TypeScript, and any language supported by VS Code's definition provider.

![Doc comment preview](https://raw.githubusercontent.com/jonlepage/LEPASOFT-Image-Preview/master/images/screenshot-doccomment.jpg)

## Install

Search for **LEPASOFT Image Preview** in the VS Code Extensions panel, or install from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=lepasoft-dev.lepasoft-image-preview).

## Configuration

| Setting                                  | Default | Description                                                    |
| ---------------------------------------- | ------- | -------------------------------------------------------------- |
| `gutterpreview.showImagePreviewOnGutter` | `true`  | Show image preview in the gutter                               |
| `gutterpreview.imagePreviewMaxHeight`    | `100`   | Max height of the image preview on hover (px)                  |
| `gutterpreview.imagePreviewMaxWidth`     | `-1`    | Max width of the image preview on hover (px)                   |
| `gutterpreview.enableReferenceLookup`    | `true`  | Resolve image previews from symbol references and doc comments |
| `gutterpreview.sourceFolder`             | `""`    | Additional source folder for relative path resolution          |
| `gutterpreview.currentColorForSVG`       | `""`    | currentColor replacement for SVG previews                      |
| `gutterpreview.showUnderline`            | `true`  | Show underline on detected image links                         |

## Credits

Based on [Image Preview](https://github.com/kisstkondoros/gutter-preview) by Tamas Kiss (kisstkondoros). Licensed under MIT.

## License

Licensed under MIT
