import {
	addPathToParseErrors,
	getValidationError,
	getValidationErrorMessage,
} from "../../parse/errors";
import type { ParseError } from "../../parse/types";
import { err, isErr, ok } from "../../result/index";
import type { Schema } from "../types";

export function array<S>(schema: Schema<S>): Schema<S[]> {
	return {
		validate(v) {
			if (!Array.isArray(v)) {
				return err([
					getValidationError(getValidationErrorMessage(v, "an array")),
				]);
			}

			const errors: ParseError[] = [];
			for (let i = 0; i < v.length; i++) {
				const value = v[i];
				const res = schema.validate(value);
				if (isErr(res)) {
					errors.push(...addPathToParseErrors(res.errors, i));
				}
			}

			if (errors.length > 0) {
				return err(errors);
			}

			return ok(v as S[]);
		},
	};
}
