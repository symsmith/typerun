import type { Result } from "../result/types";
import { err } from "../result/index";
import type { Schema } from "../schema/types";
import { getStack, jsonError, unknownError } from "./errors";
import type { ParseError } from "./types";

export function json<S extends Schema<any>>(schema: S) {
	type Return = S extends Schema<infer R> ? R : never;

	return function (toParse: string): Result<Return, ParseError> {
		try {
			const parsed = JSON.parse(toParse);
			return schema.validate(parsed);
		} catch (e) {
			if (e instanceof SyntaxError) {
				return err(getStack(e, jsonError));
			} else {
				return err(getStack(e, unknownError));
			}
		}
	};
}
