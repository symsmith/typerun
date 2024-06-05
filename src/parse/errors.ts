import type { ParseError } from "./types";

export const unknownError: ParseError = {
	name: "UnknownError",
	message: "An unknown error has occured",
};
export const jsonError: ParseError = {
	name: "JSONError",
	message: "Error during JSON parsing",
};
const validationError: Omit<ParseError, "message"> = {
	name: "ValidationError",
};

export function getValidationError(message: string): ParseError {
	return { ...validationError, message };
}

export function getStack(from: unknown, to: ParseError): ParseError {
	if (from instanceof Error && from.stack) {
		return { ...to, stack: from.stack };
	}
	return to;
}
