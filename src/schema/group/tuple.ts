import type { ParseError } from "typerun/parse";
import { err, isErr, ok } from "typerun/result";
import type { Infer, Schema } from "typerun/schema";
import {
  addPathToParseErrors,
  getValidationError,
  getValidationErrorMessage,
  serialize,
} from "../../parse/errors";

/** @ignore */
type ReturnValue<S extends unknown[]> = S extends [infer H, ...infer T]
  ? [Infer<H>, ...ReturnValue<T>]
  : [];

/**
 * The `tuple` schema checks that the type of the value is an array, and that all of its elements
 * match the given schemas. The schemas are defined in a tuple. The order of the schemas in the
 * tuple must match the order of the elements in the array. The schemas can be of any type.
 *
 * ## Example
 *
 *     import { tuple, string, number } from "typerun/schema";
 *     import { is } from "typerun";
 *
 *     const schema = tuple(string, number);
 *     if (is(schema)(["hello", 42])) {
 *       console.log("value is a tuple of a string and a number");
 *     }
 *     if (!is(schema)(["hello", "world"])) {
 *       console.log("value is not a tuple of a string and a number");
 *     }
 *
 * If you use the `validate` function, the errors contain all of the different type validation fails
 * from the tuple.
 *
 * Tuples can be combined with any other schemas, to create complex validation patterns.
 *
 *     import { tuple, string, number, array } from "typerun/schema";
 *     import { is } from "typerun";
 *
 *     const schema = tuple(string, array(number));
 *     if (is(schema)(["hello", [42, 31]])) {
 *       console.log("value is a tuple of a string and an array of numbers");
 *     }
 *
 * @param schemas The schemas to validate the elements of the tuple.
 */
export function tuple<S extends Schema<unknown>[]>(...schemas: S): Schema<ReturnValue<S>> {
  return {
    validate(v) {
      if (!Array.isArray(v)) {
        return err([getValidationError(getValidationErrorMessage(v, "an array"))]);
      }

      if (v.length !== schemas.length) {
        return err([
          getValidationError(
            `Array \`${serialize(v)}\` does not have the correct number of elements (Expected: ${
              schemas.length
            } - Actual: ${v.length})`
          ),
        ]);
      }

      const errors: ParseError[] = [];

      for (let i = 0; i < schemas.length; i++) {
        const schema = schemas[i]!;
        const result = schema.validate(v[i]);
        if (isErr(result)) {
          errors.push(...addPathToParseErrors(result.errors, i));
        }
      }

      if (errors.length > 0) {
        return err(errors);
      }

      return ok(v as ReturnValue<S>);
    },
  };
}
