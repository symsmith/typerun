import { validate } from "../index";
import { err } from "../result/index";
import type { Result } from "../result/types";
import type { Schema } from "../schema/types";
import { getStack, jsonError, unknownError } from "./errors";
import type { ParseError } from "./types";

export function json<S>(schema: Schema<S>) {
	return function (toParse: string): Result<S, ParseError> {
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
