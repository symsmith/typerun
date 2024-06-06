import { custom } from "validator/schema";
import { getValidationErrorMessage } from "../../parse/errors";

export const number = custom(
	(v): v is number => typeof v === "number" && !isNaN(v),
	(v) => getValidationErrorMessage(v, "a number")
);
