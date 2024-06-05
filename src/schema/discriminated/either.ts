import type { Result } from "../../result/types";
import { getValidationError } from "../../parse/errors";
import { err, isOk } from "../../result/index";
import type { Schema, SchemaReturn } from "../types";
import type { ParseError } from "../../parse/types";

export function either<R extends Schema<any>[]>(
	...schemas: R
): Schema<SchemaReturn<R[number]>> {
	return {
		validate(v) {
			let result: Result<SchemaReturn<R[number]>, ParseError> = err(
				getValidationError("`either` requires at least one argument")
			);
			for (const schema of schemas) {
				result = schema.validate(v);
				if (isOk(result)) {
					break;
				}
			}
			return result;
		},
	};
}