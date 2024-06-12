import { custom } from "typerun/schema";
import { getValidationErrorMessage } from "../../parse/errors";

/**
 * The `boolean` schema validates that the input is either `true` or `false`.
 *
 * ## Example
 *
 *     import { boolean } from "typerun/schema";
 *     import { is } from "typerun";
 *
 *     if (is(boolean)(true)) {
 *       console.log("true is a boolean");
 *     }
 *
 *     if (!is(boolean)(undefined)) {
 *       console.log("undefined is not a boolean");
 *     }
 */
export const boolean = custom(
  (v): v is boolean => typeof v === "boolean",
  (v) => getValidationErrorMessage(v, "a boolean")
);
