import type { ParseError } from "./parse/types";
import { isOk } from "./result/index";
import type { Result } from "./result/types";
import type { Schema } from "./schema/types";
import type { ValidateOptions } from "./types";

export function validate<S>(schema: Schema<S>, options: { throwing: true }): (data: unknown) => S;
export function validate<S>(
  schema: Schema<S>,
  options?: { throwing: false }
): (data: unknown) => Result<S, ParseError>;
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
