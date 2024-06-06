import { custom } from "validator/schema";
import { getValidationErrorMessage } from "../../parse/errors";

export function value<R extends boolean | string | number | undefined | null>(
	value: R
) {
	return custom(
		(v): v is R => v === value,
		(v) => getValidationErrorMessage(v, `equal to \`${JSON.stringify(value)}\``)
	);
}
