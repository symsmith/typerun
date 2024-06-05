import {
	getValidationError,
	getValidationErrorMessage,
} from "../../parse/errors";
import { err, ok } from "../../result/index";
import type { Schema } from "../types";

export function value<R extends boolean | string | number | undefined | null>(
	value: R
): Schema<R> {
	return {
		validate(v) {
			return v === value
				? ok(v as R)
				: err(
						getValidationError(
							getValidationErrorMessage(
								v,
								`equal to \`${JSON.stringify(value)}\``
							)
						)
				  );
		},
	};
}
