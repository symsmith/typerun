import {
	getValidationError,
	getValidationErrorMessage,
} from "../../parse/errors";
import { err, ok } from "../../result/index";
import type { Schema } from "../types";

export const nullValue: Schema<null> = {
	validate(v) {
		return v === null
			? ok(v)
			: err(getValidationError(getValidationErrorMessage(v, "null")));
	},
};
