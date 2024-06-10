import {
  addPathToParseErrors,
  getValidationError,
  getValidationErrorMessage,
} from "../../parse/errors";
import type { ParseError } from "../../parse/types";
import { err, isErr, ok } from "../../result/index";
import type { Schema } from "../types";

/**
 * The `array` schema checks that the type of the value is an array, and that all of its elements
 * match the given schema.
 *
 * ## Example
 *
 *     import { array, string } from "typerun/schema";
 *     import { is } from "typerun";
 *
 *     const schema = array(string);
 *     if (is(schema)(["hello", "world"])) {
 *       console.log("value is an array of strings");
 *     }
 *     if (!is(schema)(["hello", 42])) {
 *       console.log("value is not an array of strings");
 *     }
 *
 * If you use the `validate` function, the errors contain all of the different type validation fails
 * from the array.
 *
 * Arrays can be combined with any other schemas, to create complex validation patterns.
 *
 *     import { array, string, number } from "typerun/schema";
 *
 *     const schema = array(either(string, array(number)));
 *     if (is(schema)(["hello", [42, 31]])) {
 *       console.log("value is an array of strings and arrays of numbers");
 *     }
 *
 * @param schema The schema of the elements of the array to check.
 */
export function array<S>(schema: Schema<S>): Schema<S[]> {
  return {
    validate(v) {
      if (!Array.isArray(v)) {
        return err([getValidationError(getValidationErrorMessage(v, "an array"))]);
      }

      const errors: ParseError[] = [];
      for (let i = 0; i < v.length; i++) {
        const value = v[i];
        const res = schema.validate(value);
        if (isErr(res)) {
          errors.push(...addPathToParseErrors(res.errors, i));
        }
      }

      if (errors.length > 0) {
        return err(errors);
      }

      return ok(v as S[]);
    },
  };
}
