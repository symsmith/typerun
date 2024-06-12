import { getValidationErrorMessage } from "../../parse/errors";
import { custom } from "./custom";

/**
 * The `nan` schema validates that the input is the JavaScript value `NaN`. It fails for anything
 * that is not the value `NaN`, and does not check whether a value is something other than a number
 * (for example, is will fail for any string value).
 *
 * ## Example
 *
 *     import { nan } from "typerun/schema";
 *     import { is } from "typerun";
 *
 *     const isNan = is(nan)(NaN);
 *     console.log(isNan); // true
 *
 *     const isNotNan = is(nan)(3);
 *     console.log(isNotNan); // false
 */
export const nan = custom(
  (v): v is number => typeof v === "number" && isNaN(v),
  (v) => getValidationErrorMessage(v, "NaN")
);
