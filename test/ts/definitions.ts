// =============================================
// Test 1: data:image base64 (inline SVG)
// =============================================

/// <image url="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzAiIGZpbGw9IiM0Q0FGNTAiLz48dGV4dCB4PSIzMiIgeT0iNDAiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj7inJM8L3RleHQ+PC9zdmc+" />
export const GREEN_CIRCLE = "green.circle";

/// <image url="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzAiIGZpbGw9IiNGNDQzMzYiLz48dGV4dCB4PSIzMiIgeT0iNDAiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj7inJY8L3RleHQ+PC9zdmc+" />
export const RED_CIRCLE = "red.circle";

// =============================================
// Test 2: relative file path reference (SVG file)
// =============================================

/// <image url="../31343C.svg" />
export const SVG_FILE_REF = "svg.file.ref";

// =============================================
// Test 3: image path in various comment styles
// =============================================

// ../31343C.svg
export const COMMENT_PATH = "comment.path";

/** ../31343C.svg */
export const JSDOC_PATH = "jsdoc.path";

// =============================================
// Test 4: multiple images on one symbol
// =============================================

/// <image url="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzAiIGZpbGw9IiM0Q0FGNTAiLz48dGV4dCB4PSIzMiIgeT0iNDAiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj7inJM8L3RleHQ+PC9zdmc+" />
/// <image url="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzAiIGZpbGw9IiNGNDQzMzYiLz48dGV4dCB4PSIzMiIgeT0iNDAiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj7inJY8L3RleHQ+PC9zdmc+" />
export const MULTI_IMAGE = "multi.image";

// =============================================
// Test 5: multiple file path images (SVG + PNG)
// =============================================

// ../31343C.svg
// ../ab45.png
export const MULTI_PATH = "multi.path";

// =============================================
// Test 6: mix base64 + file path
// =============================================

/// <image url="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzAiIGZpbGw9IiM0Q0FGNTAiLz48dGV4dCB4PSIzMiIgeT0iNDAiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIj7inJM8L3RleHQ+PC9zdmc+" />
// ../ab45.png
export const MIX_BASE64_AND_PATH = "mix.base64.path";

// =============================================
// Test 7: no image (should NOT show anything)
// =============================================

/// just a regular comment, no image here
export const NO_IMAGE = "no.image";
