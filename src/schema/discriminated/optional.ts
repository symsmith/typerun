import { literal } from "../primitive/literal";
import type { Schema } from "../types";
import { either } from "./either";

export function optional<R extends Schema<any>>(schema: R) {
	return either(schema, literal(undefined));
}
