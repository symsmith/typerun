import {
	getValidationError,
	getValidationErrorMessage,
} from "../../parse/errors";
import { err, ok } from "../../result/index";
import type { Schema } from "../types";

export const undefinedValue: Schema<undefined> = {
	validate(v) {
		return v === undefined
			? ok(v)
			: err(getValidationError(getValidationErrorMessage(v, "undefined")));
	},
};
