import {
	getValidationError,
	getValidationErrorMessage,
} from "../../parse/errors";
import { err, ok } from "../../result/index";
import type { Schema } from "../types";

export const boolean: Schema<boolean> = {
	validate(v) {
		return typeof v === "boolean"
			? ok(v)
			: err(getValidationError(getValidationErrorMessage(v, "a boolean")));
	},
};
