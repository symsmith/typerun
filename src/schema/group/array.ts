import {
	getValidationError,
	getValidationErrorMessage,
} from "../../parse/errors";
import { err, isErr, ok } from "../../result/index";
import type { Schema } from "../types";

export function array<S>(schema: Schema<S>): Schema<S[]> {
	return {
		validate(v) {
			if (!Array.isArray(v)) {
				return err(
					getValidationError(getValidationErrorMessage(v, "an array"))
				);
			}

			for (let i = 0; i < v.length; i++) {
				const value = v[i];
				const res = schema.validate(value);
				if (isErr(res)) {
					return res;
				}
			}

			return ok(v as S[]);
		},
	};
}
