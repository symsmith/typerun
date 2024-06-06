import { custom } from "validator/schema";
import { getValidationErrorMessage } from "../../parse/errors";

export const string = custom(
	(v): v is string => typeof v === "string",
	(v) => getValidationErrorMessage(v, "a string")
);
