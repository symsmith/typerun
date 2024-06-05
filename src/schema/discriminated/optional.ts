import type { Schema } from "../types";
import { either } from "./either";
import { undefinedValue } from "../primitive/undefined";

export function optional<R extends Schema<any>>(schema: R) {
	return either(schema, undefinedValue);
}
