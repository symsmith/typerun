import { isOk } from "validator/result";
import type { ParseError } from "./parse/types";
import type { Result } from "./result/types";
import type { Schema } from "./schema/types";

export function validate<S>(schema: Schema<S>) {
	return function (data: unknown): Result<S, ParseError> {
		return schema.validate(data);
	};
}

export function is<S>(schema: Schema<S>) {
	return function (data: unknown): data is S {
		return isOk(validate(schema)(data));
	};
}
