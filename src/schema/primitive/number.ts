import { getValidationErrorMessage } from "../../parse/errors";
import { custom } from "./custom";

/**
 * The `number` schema validates that the input is a number, and not `NaN`.
 *
 * ## Example
 *
 *     import { number } from "typerun/schema";
 *     import { is } from "typerun";
 *
 *     if (is(number)(42)) {
 *       console.log("42 is a number");
 *     }
 *
 *     if (!is(number)(true)) {
 *       console.log("true is not a number");
 *     }
 *
 *     if (!is(number)(NaN)) {
 *       console.log("NaN is not a number");
 *     }
 */
export const number = custom(
  (v): v is number => typeof v === "number" && !isNaN(v),
  (v) => getValidationErrorMessage(v, "a number")
);
