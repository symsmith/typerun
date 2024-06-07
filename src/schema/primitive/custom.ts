import {
	getValidationError,
	getValidationErrorMessage,
} from "src/parse/errors";
import { err, ok } from "validator/result";
import type { Schema } from "../types";

export function custom<T>(
	validationFn: (data: unknown) => data is T,
	errorMessage?: string | ((data: unknown) => string)
): Schema<T> {
	return {
		validate(v) {
			if (validationFn(v)) {
				return ok(v);
			} else {
				return err([
					getValidationError(
						typeof errorMessage === "string"
							? errorMessage
							: errorMessage
							? errorMessage(v)
							: getValidationErrorMessage(v, "correct")
					),
				]);
			}
		},
	};
}
