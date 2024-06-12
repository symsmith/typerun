import { err, ok } from "typerun/result";
import type { Schema } from "typerun/schema";
import { getValidationError, getValidationErrorMessage } from "../../parse/errors";

/**
 * The `custom` schema allows the user to define its own schema, if it is not present in the
 * library. This schema can then be used like all other primitive schemas ({@link string | `string`},
 * {@link number | `number`}, …).
 *
 * ## Example
 *
 *     import { custom } from "typerun/schema";
 *     import { is } from "typerun";
 *
 *     const correctLength = custom((data): data is string => {
 *       return typeof data === "string" && data.length > 3 && data.length < 8;
 *     });
 *
 *     if (is(correctLength)("hello!")) {
 *       console.log("correct length");
 *     }
 *
 * @param validationFn A function, taking unknown data as the input and returning a boolean if the
 *   data matches the wanted type. This function must be a type predicate (declaring its return type
 *   as `: is T`, where `T` is the validated type).
 * @param errorMessage An optional error message to report if the validation fails. If not provided,
 *   the default error message "Value `{input}` is not correct" will be used in error reports.
 */
export function custom<T>(
  validationFn: (data: unknown) => data is T,
  errorMessage?: string | ((data: unknown) => string)
): Schema<T> {
  return {
    validate(v) {
      if (validationFn(v)) {
        return ok(v);
      } else {
        return err([
          getValidationError(
            typeof errorMessage === "string"
              ? errorMessage
              : errorMessage
                ? errorMessage(v)
                : getValidationErrorMessage(v, "correct")
          ),
        ]);
      }
    },
  };
}
