import { getValidationError } from "../../parse/errors";
import { err, ok } from "../../result/index";
import type { Schema } from "../types";

export const string: Schema<string> = {
	validate(v) {
		return typeof v === "string"
			? ok(v)
			: err(
					getValidationError(`Value \`${JSON.stringify(v)}\` is not a string`)
			  );
	},
};
