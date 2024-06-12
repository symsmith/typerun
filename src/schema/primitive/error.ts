import { instance } from "./instance";

/**
 * The `error` schema validates that the input is a JavaScript Error object. It is an alias for
 * {@link instance | `instance(Error)`}.
 *
 * ## Example
 *
 *     import { error } from "typerun/schema";
 *     import { is } from "typerun";
 *
 *     const isError = is(error)(new Error());
 *     console.log(isError); // true
 *
 *     const isNotError = is(error)(3);
 *     console.log(isNotError); // false
 */
export const error = instance(Error);
