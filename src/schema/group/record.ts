import {
  addPathToParseErrors,
  getValidationError,
  getValidationErrorMessage,
} from "../../parse/errors";
import type { ParseError } from "../../parse/types";
import { err, isErr, ok } from "../../result/index";
import { string } from "../primitive/string";
import type { Schema } from "../types";

/**
 * The `record` schema checks that the type of the value is an object, and that all of its
 * properties match the given schema(s). This schema exists in two flavors: one where the keys are
 * strings, and one where the keys are of a specific type.
 *
 * ## Defining a record by its values
 *
 * In this version of `record`, the schema of the values is given as parameter to the function.
 *
 * ### Example
 *
 *     import { record, number } from "typerun/schema";
 *     import { is } from "typerun";
 *
 *     const schema = record(number);
 *     if (is(schema)({ a: 42, b: 31 })) {
 *       console.log("value is an object with numbers");
 *     }
 *     if (!is(schema)({ a: 42, b: "hello" })) {
 *       console.log("value is not an object with numbers");
 *     }
 *
 * The schema of the keys cannot be validated using this version, they must simply be valid
 * JavaScript object keys. If you need specific values for the keys, use the second version of the
 * `schema` record.
 *
 * @param valuesSchema The schema to validate the values of the record.
 */
export function record<V>(valuesSchema: Schema<V>): Schema<Record<string, V>>;
/**
 * ## Defining a record by its keys and values
 *
 * The `record` schema checks that the type of the value is an object, and that all of its keys
 * match the given schema, as well as all of its values.
 *
 * ### Example
 *
 *     import { record, value, number, either } from "typerun/schema";
 *     import { is } from "typerun";
 *
 *     const schema = record({ k: either(value("a"), value("b")), v: number });
 *     if (is(schema)({ a: 42, b: 31 })) {
 *       console.log("value is an object with numbers");
 *     }
 *     if (!is(schema)({ a: 42, b: "hello" })) {
 *       console.log("value is not an object with numbers");
 *     }
 *     if (!is(schema)({ a: 42, c: 93 })) {
 *       console.log("value is not an object with correct keys");
 *     }
 *
 * @param schemas An object with the schema of the keys, and the schema of the values.
 */
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
