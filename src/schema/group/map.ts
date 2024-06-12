import { addPathToParseErrors } from "parse/errors";
import { validate } from "typerun";
import type { ParseError } from "typerun/parse";
import { err, isErr, ok } from "typerun/result";
import { instance, type Schema } from "typerun/schema";

/**
 * The `map` schema validates that the input is a map of keys and values that match the schemas. It
 * fails for anything that is not a map, or for any key or value of the map that does not match the
 * schemas.
 *
 * ## Example
 *
 *     import { map, string, number } from "typerun/schema";
 *     import { is } from "typerun";
 *
 *     const mapEx = new Map([
 *       ["a", 1],
 *       ["b", 2],
 *     ]);
 *
 *     const isMap = is(map(string, number))(mapEx);
 *     console.log(isMap); // true
 *
 *     const isNotMap = is(map(string, number))({ a: 1, b: 2 });
 *     console.log(isNotMap); // false
 *
 *     const isNotCorrectMapKeys = is(map(number, number))(mapEx);
 *     console.log(isNotCorrectMapKeys); // false
 *
 *     const isNotCorrectMapValues = is(map(string, string))(mapEx);
 *     console.log(isNotCorrectMapValues); // false
 *
 * @param keysSchema   The schema to validate the keys of the map.
 * @param valuesSchema The schema to validate the values of the map.
 */
export function map<K, V>(keysSchema: Schema<K>, valuesSchema: Schema<V>): Schema<Map<K, V>> {
  return {
    validate(v) {
      const mapResult = validate(instance(Map))(v);
      if (isErr(mapResult)) {
        return mapResult;
      }

      const errors: ParseError[] = [];

      mapResult.data.forEach((v, k) => {
        const keyResult = keysSchema.validate(k);
        if (isErr(keyResult)) {
          errors.push(...addPathToParseErrors(keyResult.errors, "key of Map"));
        }

        const valueResult = valuesSchema.validate(v);
        if (isErr(valueResult)) {
          errors.push(...addPathToParseErrors(valueResult.errors, "value of Map"));
        }
      });

      if (errors.length) {
        return err(errors);
      }

      return ok(v as Map<K, V>);
    },
  };
}
