import {
	getValidationError,
	getValidationErrorMessage,
} from "../../parse/errors";
import { err, ok } from "../../result/index";
import type { Schema } from "../types";

export const number: Schema<number> = {
	validate(v) {
		return typeof v === "number" && !isNaN(v)
			? ok(v)
			: err(getValidationError(getValidationErrorMessage(v, "a number")));
	},
};
