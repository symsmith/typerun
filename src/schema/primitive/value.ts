import { custom } from "typerun/schema";
import { getValidationErrorMessage, serialize } from "../../parse/errors";

/**
 * The `value` schema validates that the input is exactly any given literal value. This schema
 * allows you to verify the values `undefined` and `null`, as well as any other literal primitive
 * value.
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
export function value<R extends string | number | bigint | boolean | undefined | symbol | null>(
  value: R
) {
  return custom(
    (v): v is R => v === value,
    (v) => getValidationErrorMessage(v, `equal to \`${serialize(value)}\``)
  );
}
