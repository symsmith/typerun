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

export function serialize(value: unknown): string {
  return typeof value === "bigint" ? `${value}` : JSON.stringify(value);
}

export function getValidationErrorMessage(value: unknown, expectedType: string) {
  return `Value \`${serialize(value)}\` is not ${expectedType}`;
}

export function getValidationError(message: string, errors?: ParseError[]): ParseError {
  return { ...validationError, message, ...(errors && { errors }) };
}

export function addPathToParseErrors(errors: ParseError[], index: number): ParseError[];
export function addPathToParseErrors(errors: ParseError[], key: string): ParseError[];
export function addPathToParseErrors(errors: ParseError[], path: number | string) {
  return errors.map((error) => ({
    ...error,
    path: {
      [typeof path === "string" ? "key" : "index"]: path,
      ...(error.path && { path: error.path }),
    },
  }));
}
