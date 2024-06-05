import {
	getValidationError,
	getValidationErrorMessage,
} from "../../parse/errors";
import { err, ok, isOk } from "../../result/index";
import type { Schema, SchemaReturn } from "../types";

type ReturnValue<R extends Record<PropertyKey, Schema<any>>> = {
	[k in keyof R]: SchemaReturn<R[k]>;
};

export function object<R extends Record<PropertyKey, Schema<any>>>(
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
			const result: Partial<ReturnValue<R>> = {};

			let key: keyof R;
			for (key in schemaRecord) {
				const schema = schemaRecord[key]!;
				const keyResult = schema.validate(value[key]);
				if (isOk(keyResult)) {
					result[key] = keyResult.data;
				} else {
					return keyResult;
				}
			}

			return ok(result as ReturnValue<R>);
		},
	};
}
