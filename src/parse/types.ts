/**
 * The different names of errors returned by the `json` function. The `validate` function only
 * returns `ValidationError` errors.
 */
type ParseErrorName = "UnknownError" | "JSONError" | "ValidationError";

/**
 * The path to the failure case in the parsed object. Recursively follow the `path` property to find
 * the failed value after a validation.
 */
type ErrorPath = {
  /** The key of the failed value, if the current parsed data is an object. */
  key?: string;
  /** The index of the failed value, if the current parsed data is an array. */
  index?: number;
  /**
   * If the value is a construct, like an array or an object, this value contains the next step to
   * retrieve the failed value.
   */
  path?: ErrorPath;
};

/**
 * The `ParseError` type is the error object returned by the validation functions. It contains the
 * name of the error, a message, and optionally the path to the error in the parsed object.
 * Additionally, it can contain a sub-`errors` array that lists the different failure cases of the
 * `either` schema.
 */
export interface ParseError {
  /** The name of the error. */
  name: ParseErrorName;
  /** A human-readable message for the error. */
  message: string;
  /**
   * If the validated value is a construct, like an array or an object, this property contains the
   * path to follow to find the incriminated value that is causing the validation to fail.
   */
  path?: ErrorPath;
  /**
   * If the validated value is an union (`either`), this property contains errors for each of the
   * union members.
   */
  errors?: ParseError[];
}
