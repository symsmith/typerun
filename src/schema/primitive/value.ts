import { getValidationErrorMessage } from "../../parse/errors";
import { custom } from "./custom";

/**
 * The `value` schema validates that the input is exactly any given literal value. This schema
 * allows you to verify the values `undefined` and `null`.
 *
 * ## Example
 *
 *     import { value } from "typerun/schema";
 *     import { is } from "typerun";
 *
 *     if (is(value(true))(true)) {
 *       console.log("true is true");
 *     }
 *
 *     if (!is(value(true))(false)) {
 *       console.log("false is not true");
 *     }
 *
 *     if (!is(value(undefined))(null)) {
 *       console.log("null is not undefined");
 *     }
 *
 * @param value The literal value to validate.
 */
export function value<R extends boolean | string | number | undefined | null | Symbol>(value: R) {
  return custom(
    (v): v is R => v === value,
    (v) => getValidationErrorMessage(v, `equal to \`${JSON.stringify(value)}\``)
  );
}
