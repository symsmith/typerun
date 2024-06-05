import type { ParseError } from "./parse/types";
import type { Result } from "./result/types";
import type { Schema } from "./schema/types";

export function validate<S>(schema: Schema<S>) {
	return function (parsed: unknown): Result<S, ParseError> {
		return schema.validate(parsed);
	};
}
