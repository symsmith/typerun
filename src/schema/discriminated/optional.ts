import { value } from "../primitive/value";
import type { Schema } from "../types";
import { either } from "./either";

export function optional<R>(schema: Schema<R>) {
  return either(schema, value(undefined));
}
