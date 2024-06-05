import { validate } from "../index";
import { err } from "../result/index";
import type { Result } from "../result/types";
import type { Schema, SchemaReturn } from "../schema/types";
import { getStack, jsonError, unknownError } from "./errors";
import type { ParseError } from "./types";

export function json<S extends Schema<any>>(schema: S) {
	return function (toParse: string): Result<SchemaReturn<S>, ParseError> {
		try {
			const parsed = JSON.parse(toParse);
			return validate(schema)(parsed);
		} catch (e) {
			if (e instanceof SyntaxError) {
				return err(getStack(e, jsonError));
			} else {
				return err(getStack(e, unknownError));
			}
		}
	};
}
