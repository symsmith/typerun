import { is, validate } from "../index";
import { err } from "../result/index";
import type { Result } from "../result/types";
import { array, object, value } from "../schema/index";
import type { Schema } from "../schema/types";
import type { ValidateOptions } from "../types";
import { jsonError, unknownError } from "./errors";
import type { ParseError } from "./types";

/**
 * The `json` function is a parsing utility to get a typed and runtime-validated object out of a
 * JSON string. It exists in two versions: one that returns a `Result` and one that throws an error
 * if the validation fails.
 *
 * ## Safe version
 *
 * ### Example
 *
 *     import { json } from "typerun";
 *     import { object, string } from "typerun/schema";
 *     import { isOk } from "typerun/result";
 *
 *     const schema = object({ name: string });
 *     const result = json(schema)(`{"name": "Alice"}`);
 *     if (isOk(result)) {
 *       console.log(result.data.name); // "Alice"
 *     }
 *
 * @param   schema  The schema to validate the parsed JSON against.
 * @param   options Options to control the behavior of the validation.
 *
 * @returns         A function that takes a JSON string and returns a `Result` with the parsed
 *   object or a list of errors.
 */
export function json<S>(
  schema: Schema<S>,
  options?: { throwing?: false }
): (toParse: string) => Result<S, ParseError>;
/**
 * ## Throwing version
 *
 * ### Example
 *
 *     import { json } from "typerun";
 *     import { object, string } from "typerun/schema";
 *     import { isOk } from "typerun/result";
 *
 *     const schema = object({ name: string });
 *     try {
 *       const result = json(schema, { throwing: true })(`{"name": "Alice"}`);
 *       console.log(result.name); // "Alice"
 *     } catch (errors) {
 *       console.error(errors);
 *     }
 *
 * @param   schema  The schema to validate the parsed JSON against.
 * @param   options Options to control the behavior of the validation.
 *
 * @returns         A function that takes a JSON string and returns the parsed object or throws an
 *   array of errors if the validation fails.
 */
export function json<S>(schema: Schema<S>, options: { throwing: true }): (toParse: string) => S;
export function json<S>(schema: Schema<S>, options?: ValidateOptions) {
  const throwing = options?.throwing === true;
  return function (toParse: string) {
    try {
      const parsed = JSON.parse(toParse);
      if (throwing) {
        return validate(schema, { throwing })(parsed);
      } else {
        return validate(schema)(parsed);
      }
    } catch (e) {
      if (e instanceof SyntaxError) {
        if (throwing) {
          throw [jsonError];
        }
        return err([jsonError]);
      } else {
        if (throwing) {
          const validationErrorSchema = array(object({ name: value("ValidationError") }));
          if (is(validationErrorSchema)(e)) {
            throw e;
          }
          throw [unknownError];
        }
        return err([unknownError]);
      }
    }
  };
}
