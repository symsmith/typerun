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

export function getValidationErrorMessage(
	value: unknown,
	expectedType: string
) {
	return `Value \`${JSON.stringify(value)}\` is not ${expectedType}`;
}

export function getValidationError(message: string): ParseError {
	return { ...validationError, message };
}

export function getStack(from: unknown, to: ParseError): ParseError {
	if (from instanceof Error && from.stack) {
		return { ...to, stack: from.stack };
	}
	return to;
}

export function addPathToParseErrors(
	errors: ParseError[],
	index: number
): ParseError[];
export function addPathToParseErrors(
	errors: ParseError[],
	key: string
): ParseError[];
export function addPathToParseErrors(
	errors: ParseError[],
	path: number | string
) {
	return errors.map((error) => ({
		...error,
		path: {
			[typeof path === "string" ? "key" : "index"]: path,
			...(error.path && { path: error.path }),
		},
	}));
}
