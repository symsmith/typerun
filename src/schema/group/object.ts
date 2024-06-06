import {
	addPathToParseError,
	getValidationError,
	getValidationErrorMessage,
} from "../../parse/errors";
import { err, isErr, ok } from "../../result/index";
import type { Schema, SchemaReturn } from "../types";

type ReturnValue<R extends Record<PropertyKey, Schema<unknown>>> = {
	[k in keyof R]: SchemaReturn<R[k]>;
};

export function object<R extends Record<PropertyKey, Schema<unknown>>>(
	schemaRecord: R
): Schema<ReturnValue<R>> {
	return {
		validate(v) {
			if (typeof v !== "object" || v === null) {
				return err(
					getValidationError(getValidationErrorMessage(v, "an object"))
				);
			}

			const value = v as Record<PropertyKey, unknown>;

			let key: keyof R;
			for (key in schemaRecord) {
				const schema = schemaRecord[key]!;
				const result = schema.validate(value[key]);
				if (isErr(result)) {
					return { ...result, error: addPathToParseError(result.error, key) };
				}
			}

			return ok(v as ReturnValue<R>);
		},
	};
}
