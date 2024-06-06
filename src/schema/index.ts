import {
	getValidationError,
	getValidationErrorMessage,
} from "src/parse/errors";
import { err, ok } from "validator/result";
import type { Schema } from "./types";

export { boolean } from "./primitive/boolean";
export { value } from "./primitive/literal";
export { number } from "./primitive/number";
export { string } from "./primitive/string";

export { either } from "./discriminated/either";
export { optional } from "./discriminated/optional";

export { array } from "./group/array";
export { object } from "./group/object";
export { record } from "./group/record";
export { tuple } from "./group/tuple";

export type { SchemaReturn as Infer } from "./types";

export function custom<T>(
	validationFn: (data: unknown) => data is T,
	errorMessage?: string | ((data: unknown) => string)
): Schema<T> {
	return {
		validate(v) {
			if (validationFn(v)) {
				return ok(v);
			} else {
				return err(
					getValidationError(
						typeof errorMessage === "string"
							? errorMessage
							: errorMessage
							? errorMessage(v)
							: getValidationErrorMessage(v, "correct")
					)
				);
			}
		},
	};
}
