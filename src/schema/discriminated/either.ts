import { getValidationError, serialize } from "../../parse/errors";
import type { ParseError } from "../../parse/types";
import { err, isOk } from "../../result/index";
import type { Result } from "../../result/types";
import type { Schema, SchemaReturn } from "../types";

/**
 * The `either` schema is the equivalent of the TypeScript union (`|`). It allows you to validate
 * that a value is of any type between a set of options.
 *
 * ## Example
 *
 *     import { either, value, boolean } from "typerun/schema";
 *     import { is } from "typerun";
 *
 *     const schema = either(value("hello"), value(42), boolean);
 *     if (is(schema)("hello")) {
 *       console.log("value matches one of the types");
 *     }
 *     if (is(schema)(42)) {
 *       console.log("value matches one of the types");
 *     }
 *     if (is(schema)(true)) {
 *       console.log("value matches one of the types");
 *     }
 *     if (!is(schema)(undefined)) {
 *       console.log("value does not match any of the types");
 *     }
 *
 * If you use the `validate` function, the errors contain all of the different type validation fails
 * from the union.
 *
 * @param schemas All the schemas that the value can match.
 */
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
              `Value \`${serialize(v)}\` does not correspond to any of the union validators`,
              errors
            ),
          ]);
    },
  };
}
