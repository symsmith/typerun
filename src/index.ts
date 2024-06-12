import type { ParseError } from "typerun/parse";
import { isOk, type Result } from "typerun/result";
import type { Schema } from "typerun/schema";
import type { ValidateOptions } from "./types";

/**
 * The `validate` function exists in two flavors: a safe, non throwing one, and a throwing one. If
 * the `throwing` member of the `options` parameter is set to `true`, then the `validate` function
 * will throw an error when the validation fails. In any other case, the `validate` function will
 * return a {@link Result | `Result`} object, with either the typed, validated data, or the errors
 * encountered during validation.
 *
 * ## Non-throwing version
 *
 * ### Example
 *
 *     import { validate } from "typerun";
 *     import { string, number } from "typerun/schema";
 *
 *     const fail = validate(string)(31);
 *     console.log(!fail.ok && fail.errors);
 *     // -> [{ name: "ValidationError", message: "Value `31` is not a string" }]
 *
 *     const good = validate(number)(42);
 *     console.log(good.ok && good.data);
 *     // -> 42
 *
 * @param   schema  The schema to validate.
 * @param   options The options of the function.
 *
 * @returns         A function returning a {@link Result | `Result`} object, either containing the
 *   data given as input but correctly typed, or an `errors` array containing the errors encountered
 *   during validation. For example, if you validate an array, all items of the wrong type will give
 *   a different error, with a `path` object giving the location of the incriminated value.
 *
 *   ### Example
 *
 *       import { validate } from "typerun";
 *       import { string, array } from "typerun/schema";
 *
 *       const fail = validate(array(string))([1, "a", 2]);
 *       console.log(!fail.ok && fail.errors);
 *       //-> [
 *       //   {
 *       //     name: "ValidationError",
 *       //     message: "Value `1` is not a string",
 *       //     path: { index: 0 }
 *       //   },
 *       //   {
 *       //     name: "ValidationError",
 *       //     message: "Value `2` is not a string",
 *       //     path: { index: 2 }
 *       //   },
 *       // ]
 */
export function validate<S>(
  schema: Schema<S>,
  options?: {
    throwing: false;
  }
): (data: unknown) => Result<S, ParseError>;
/**
 * ## Throwing version
 *
 * ### Example
 *
 *     import { validate } from "typerun";
 *     import { boolean } from "typerun/schema";
 *
 *     try {
 *       const data = validate(boolean, { throwing: true })("hello");
 *     } catch (errors) {
 *       console.error(errors);
 *       // -> [{ name: "ValidationError", message: "Value `"hello"` is not a boolean" }]
 *     }
 *
 * @param   schema  The schema to validate.
 * @param   options The options of the function.
 *
 * @returns         A function returning the typed data, according to the schema. If the data passed
 *   as input of this function does not match the given schema, the function will throw an array of
 *   {@link ParseError | `ParseError`}, the same as the `errors` field returned in the non-throwing
 *   version.
 */
export function validate<S>(schema: Schema<S>, options: { throwing: true }): (data: unknown) => S;
export function validate<S>(schema: Schema<S>, options?: ValidateOptions) {
  return function (data: unknown) {
    const res = schema.validate(data);
    if (options?.throwing === true) {
      if (isOk(res)) {
        return res.data;
      } else {
        throw res.errors;
      }
    } else {
      return schema.validate(data);
    }
  };
}

/**
 * The `is` function allows you to verify that a given input matches a given schema.
 *
 * ## Example
 *
 *     import { is } from "typerun";
 *     import { number } from "typerun/schema";
 *
 *     const data: unknown = 3;
 *
 *     if (is(number)(data)) {
 *       console.log(data * 3);
 *     }
 *
 * @param   schema The schema to test.
 *
 * @returns        A function returning a boolean that indicates whether the input matches the
 *   schema. The function is a type predicate, meaning that after testing the return value,
 *   TypeScript will now that the unknown input is of the tested type.
 */
export function is<S>(schema: Schema<S>) {
  return function (data: unknown): data is S {
    return isOk(validate(schema)(data));
  };
}
