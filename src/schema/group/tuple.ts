import {
	getValidationError,
	getValidationErrorMessage,
} from "../../parse/errors";
import { err, isErr, ok } from "../../result/index";
import type { Schema, SchemaReturn } from "../types";

type ReturnValue<S extends unknown[]> = S extends [infer H, ...infer T]
	? [SchemaReturn<H>, ...ReturnValue<T>]
	: [];

export function tuple<S extends Schema<unknown>[]>(
	...schemas: S
): Schema<ReturnValue<S>> {
	return {
		validate(v) {
			if (!Array.isArray(v)) {
				return err(
					getValidationError(getValidationErrorMessage(v, "an array"))
				);
			}

			if (v.length !== schemas.length) {
				return err(
					getValidationError(
						`Array \`${JSON.stringify(
							v
						)}\` does not have the correct number of elements (Expected: ${
							schemas.length
						} - Actual: ${v.length})`
					)
				);
			}

			for (let i = 0; i < schemas.length; i++) {
				const schema = schemas[i]!;
				const result = schema.validate(v[i]);
				if (isErr(result)) {
					return result;
				}
			}

			return ok(v as ReturnValue<S>);
		},
	};
}
