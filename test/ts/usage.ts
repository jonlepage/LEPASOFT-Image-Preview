import {
    GREEN_CIRCLE,
    RED_CIRCLE,
    SVG_FILE_REF,
    COMMENT_PATH,
    JSDOC_PATH,
    NO_IMAGE,
} from "./definitions";

// Test 1: base64 data URI - should show GREEN circle
console.log(GREEN_CIRCLE);

// Test 1b: base64 data URI - should show RED circle
console.log(RED_CIRCLE);

// Test 2: relative SVG file ref - should show 31343C.svg
console.log(SVG_FILE_REF);

// Test 3a: image path in // comment - should show 31343C.svg
console.log(COMMENT_PATH);

// Test 3b: image path in /** */ comment - should show 31343C.svg
console.log(JSDOC_PATH);

// Test 4: no image - should NOT show any preview
console.log(NO_IMAGE);
