import { isOk } from "validator/result";
import type { ParseError } from "./parse/types";
import type { Result } from "./result/types";
import type { Schema } from "./schema/types";
import type { ValidateOptions } from "./types";

export function validate<S>(
	schema: Schema<S>,
	options: { throwing: true }
): (data: unknown) => S;
export function validate<S>(
	schema: Schema<S>,
	options?: { throwing: false }
): (data: unknown) => Result<S, ParseError>;
export function validate<S>(schema: Schema<S>, options?: ValidateOptions) {
	return function (data: unknown) {
		const res = schema.validate(data);
		if (options?.throwing === true) {
			if (isOk(res)) {
				return res.data;
			} else {
				throw res.errors;
			}
		} else {
			return schema.validate(data);
		}
	};
}
/*
export function validateOrThrow<S>(schema: Schema<S>) {
	return function (data: unknown): S {
		const res = schema.validate(data);
		if (isOk(res)) {
			return res.data;
		} else {
			throw res.errors;
		}
	};
}*/

export function is<S>(schema: Schema<S>) {
	return function (data: unknown): data is S {
		return isOk(validate(schema)(data));
	};
}
