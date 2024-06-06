import { custom } from "validator/schema";
import { getValidationErrorMessage } from "../../parse/errors";

export const boolean = custom(
	(v): v is boolean => typeof v === "boolean",
	(v) => getValidationErrorMessage(v, "a boolean")
);
