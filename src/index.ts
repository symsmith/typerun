import type { ParseError } from "./parse/types";
import type { Result } from "./result/types";
import type { Schema, SchemaReturn } from "./schema/types";

export function validate<S extends Schema<any>>(schema: S) {
	return function (parsed: unknown): Result<SchemaReturn<S>, ParseError> {
		return schema.validate(parsed);
	};
}
