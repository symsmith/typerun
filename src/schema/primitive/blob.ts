import { instance } from "typerun/schema";

/**
 * The `blob` schema validates that the input is a JavaScript Blob object. It is an alias for
 * {@link instance | `instance(Blob)`}.
 *
 * ## Example
 *
 *     import { blob } from "typerun/schema";
 *     import { is } from "typerun";
 *
 *     const isBlob = is(blob)(new Blob());
 *     console.log(isBlob); // true
 *
 *     const isNotBlob = is(blob)(3);
 *     console.log(isNotBlob); // false
 */
export const blob = instance(Blob);
