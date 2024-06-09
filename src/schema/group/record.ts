import {
  addPathToParseErrors,
  getValidationError,
  getValidationErrorMessage,
} from "../../parse/errors";
import type { ParseError } from "../../parse/types";
import { err, isErr, ok } from "../../result/index";
import { string } from "../primitive/string";
import type { Schema } from "../types";

export function record<V>(valuesSchema: Schema<V>): Schema<Record<string, V>>;
export function record<V, K extends string>(schemas: {
  k: Schema<K>;
  v: Schema<V>;
}): Schema<Record<K, V>>;
export function record<V, K extends string>(
  schema:
    | Schema<V>
    | {
        k: Schema<K>;
        v: Schema<V>;
      }
): Schema<Record<K, V>> {
  return {
    validate(v) {
      if (typeof v !== "object" || v === null) {
        return err([getValidationError(getValidationErrorMessage(v, "an object"))]);
      }

      const resolvedKeysSchema = "k" in schema ? schema.k : string;
      const resolvedValuesSchema = "v" in schema ? schema.v : schema;

      const value = v as Record<PropertyKey, unknown>;
      const errors: ParseError[] = [];

      for (const key in value) {
        const keyResult = resolvedKeysSchema.validate(key);
        if (isErr(keyResult)) {
          errors.push(...addPathToParseErrors(keyResult.errors, key));
          continue;
        }
        const valueResult = resolvedValuesSchema.validate(value[key]);
        if (isErr(valueResult)) {
          errors.push(...addPathToParseErrors(valueResult.errors, key));
        }
      }

      if (errors.length) {
        return err(errors);
      }

      return ok(v as Record<K, V>);
    },
  };
}
