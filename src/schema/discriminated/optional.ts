import { value } from "../primitive/value";
import type { Schema } from "../types";
import { either } from "./either";

/**
 * The `optional` schema checks that the type of the value is either the given type, or `undefined`.
 * It is the equivalent of the TypeScript question mark (`?`).
 *
 * ## Example
 *
 *     import { optional, string } from "typerun/schema";
 *     import { is } from "typerun";
 *
 *     const maybeString = optional(string);
 *     if (is(maybeString)(undefined)) {
 *       console.log("maybe a string");
 *     }
 *     if (is(maybeString)("hello")) {
 *       console.log("maybe a string");
 *     }
 *     if (!is(maybeString)(null)) {
 *       console.log("not maybe a string");
 *     }
 *
 * @param schema The optional schema.
 */
export function optional<R>(schema: Schema<R>) {
  return either(schema, value(undefined));
}
