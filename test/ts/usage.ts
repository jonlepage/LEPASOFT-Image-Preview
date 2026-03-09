import {
    GREEN_CIRCLE,
    RED_CIRCLE,
    SVG_FILE_REF,
    COMMENT_PATH,
    JSDOC_PATH,
    MULTI_IMAGE,
    MULTI_PATH,
    MIX_BASE64_AND_PATH,
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

// Test 4: multiple base64 images - should show green AND red circles
console.log(MULTI_IMAGE);

// Test 5: multiple file paths - should show 31343C.svg AND ab45.png
console.log(MULTI_PATH);

// Test 6: mix base64 + file path - should show green circle AND ab45.png
console.log(MIX_BASE64_AND_PATH);

// Test 7: no image - should NOT show any preview
console.log(NO_IMAGE);
