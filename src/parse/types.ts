type ParseErrorName = "UnknownError" | "JSONError" | "ValidationError";

export interface ParseError {
	name: ParseErrorName;
	message: string;
	stack?: string;
}
