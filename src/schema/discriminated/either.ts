import { getValidationError } from "../../parse/errors";
import type { ParseError } from "../../parse/types";
import { err, isOk } from "../../result/index";
import type { Result } from "../../result/types";
import type { Schema, SchemaReturn } from "../types";

export function either<R extends Schema<any>[]>(...schemas: R): Schema<SchemaReturn<R[number]>> {
  return {
    validate(v) {
      let result: Result<SchemaReturn<R[number]>, ParseError> = err([
        getValidationError("`either` requires at least one argument"),
      ]);
      const errors: ParseError[] = [];
      for (const schema of schemas) {
        result = schema.validate(v);
        if (isOk(result)) {
          break;
        } else {
          errors.push(...result.errors);
        }
      }
      return isOk(result)
        ? result
        : err([
            getValidationError(
              `Value \`${JSON.stringify(v)}\` does not correspond to any of the union validators`,
              errors
            ),
          ]);
    },
  };
}
