type ParseErrorName = "UnknownError" | "JSONError" | "ValidationError";

type ErrorPath = {
  key?: string;
  index?: number;
  path?: ErrorPath;
};

export interface ParseError {
  name: ParseErrorName;
  message: string;
  path?: ErrorPath;
  errors?: ParseError[];
}
