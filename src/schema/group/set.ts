import { validate } from "typerun";
import type { ParseError } from "typerun/parse";
import { err, isErr, ok } from "typerun/result";
import { instance, type Schema } from "typerun/schema";
import { addPathToParseErrors } from "../../parse/errors";

/**
 * The `set` schema validates that the input is a set of elements that match the schema. It fails
 * for anything that is not a set, or for any element of the set that does not match the schema.
 *
 * ## Example
 *
 *     import { set, number } from "typerun/schema";
 *     import { is } from "typerun";
 *
 *     const isSet = is(set(number))(new Set([1, 2, 3]));
 *     console.log(isSet); // true
 *
 *     const isNotSet = is(set(number))([1, 2, 3]);
 *     console.log(isNotSet); // false
 *
 *     const isNotCorrectSet = is(set(number))(new Set([1, 2, "3"]));
 *     console.log(isNotCorrectSet); // false
 *
 * @param schema The schema to validate the elements of the set.
 */
export function set<S>(schema: Schema<S>): Schema<Set<S>> {
  return {
    validate(v) {
      const setResult = validate(instance(Set))(v);
      if (isErr(setResult)) {
        return setResult;
      }

      const errors: ParseError[] = [];

      setResult.data.forEach((v) => {
        const result = schema.validate(v);
        if (isErr(result)) {
          errors.push(...addPathToParseErrors(result.errors, "element of Set"));
        }
      });

      if (errors.length) {
        return err(errors);
      }

      return ok(v as Set<S>);
    },
  };
}
