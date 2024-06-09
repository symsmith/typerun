import {
  addPathToParseErrors,
  getValidationError,
  getValidationErrorMessage,
} from "../../parse/errors";
import type { ParseError } from "../../parse/types";
import { err, isErr, ok } from "../../result/index";
import type { Schema, SchemaReturn } from "../types";

export function object<R extends Record<PropertyKey, Schema<unknown>>>(
  schemaRecord: R
): Schema<{
  [k in keyof R]: SchemaReturn<R[k]>;
}> {
  return {
    validate(v) {
      if (typeof v !== "object" || v === null) {
        return err([getValidationError(getValidationErrorMessage(v, "an object"))]);
      }

      const value = v as Record<PropertyKey, unknown>;
      const errors: ParseError[] = [];

      let key: keyof R;
      for (key in schemaRecord) {
        const schema = schemaRecord[key]!;
        const result = schema.validate(value[key]);
        if (isErr(result)) {
          errors.push(...addPathToParseErrors(result.errors, key));
        }
      }

      if (errors.length > 0) {
        return err(errors);
      }

      return ok(
        v as {
          [k in keyof R]: SchemaReturn<R[k]>;
        }
      );
    },
  };
}
