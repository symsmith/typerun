import { is, validate } from "../index";
import { err } from "../result/index";
import type { Result } from "../result/types";
import { array, object, value } from "../schema/index";
import type { Schema } from "../schema/types";
import type { ValidateOptions } from "../types";
import { jsonError, unknownError } from "./errors";
import type { ParseError } from "./types";

export function json<S>(
  schema: Schema<S>,
  options?: { throwing?: false }
): (toParse: string) => Result<S, ParseError>;
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
