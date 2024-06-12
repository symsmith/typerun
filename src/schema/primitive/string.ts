import { custom } from "typerun/schema";
import { getValidationErrorMessage } from "../../parse/errors";

/**
 * The `string` schema validates that the input is a string value.
 *
 * ## Example
 *
 *     import { string } from "typerun/schema";
 *     import { is } from "typerun";
 *
 *     if (is(string)("hello")) {
 *       console.log(`"hello" is a string`);
 *     }
 *
 *     if (!is(string)(undefined)) {
 *       console.log("undefined is not a string");
 *     }
 */
export const string = custom(
  (v): v is string => typeof v === "string",
  (v) => getValidationErrorMessage(v, "a string")
);
