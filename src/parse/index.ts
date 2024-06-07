import { validate } from "../index";
import { err } from "../result/index";
import type { Result } from "../result/types";
import type { Schema } from "../schema/types";
import type { ValidateOptions } from "../types";
import { jsonError, unknownError } from "./errors";
import type { ParseError } from "./types";

export function json<S>(
	schema: Schema<S>,
	options?: { throwing?: false }
): (toParse: string) => Result<S, ParseError>;
export function json<S>(
	schema: Schema<S>,
	options: { throwing: true }
): (toParse: string) => S;
export function json<S>(schema: Schema<S>, options?: ValidateOptions) {
	const throwing = options?.throwing === true;
	return function (toParse: string) {
		try {
			const parsed = JSON.parse(toParse);
			if (throwing) {
				return validate(schema, { throwing })(parsed);
			} else {
				return validate(schema)(parsed);
			}
		} catch (e) {
			if (e instanceof SyntaxError) {
				if (throwing) {
					throw [jsonError];
				}
				return err([jsonError]);
			} else {
				if (throwing) {
					throw [unknownError];
				}
				return err([unknownError]);
			}
		}
	};
}
/*
export function jsonOrThrow<S>(schema: Schema<S>) {
	return function (toParse: string): S {
		try {
			const parsed = JSON.parse(toParse);
			return validateOrThrow(schema)(parsed);
		} catch (e) {
			if (e instanceof SyntaxError) {
				throw [jsonError];
			} else {
				throw [unknownError];
			}
		}
	};
}
*/
