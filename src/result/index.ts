import type { Err, Ok, Result } from "typerun/result";

/**
 * Create a successful {@link Result | result} with some data.
 *
 * ## Example
 *
 *     import { ok, isOk, isErr } from "typerun/result";
 *
 *     const result = ok(42);
 *     console.log(isOk(result)); // true
 *     console.log(isErr(result)); // false
 *     console.log(result.data); // 42
 *
 * @param data The data to wrap in a successful {@link Result | result}.
 */
export function ok<R>(data: R): Ok<R> {
  return { ok: true, data };
}

/**
 * Create a failed {@link Result | result} with some errors.
 *
 * ## Example
 *
 *     import { err, isOk, isErr } from "typerun/result";
 *
 *     const result = err(["error 1", "error 2"]);
 *     console.log(isOk(result)); // false
 *     console.log(isErr(result)); // true
 *     console.log(result.errors); // ["error 1", "error 2"]
 *
 * @param errors The errors to wrap in a failed {@link Result | result}.
 */
export function err<E>(errors: E[]): Err<E> {
  return { ok: false, errors };
}

/**
 * Check if a {@link Result | result} is successful.
 *
 * ## Example
 *
 *     import { isOk } from "typerun/result";
 *     import { string } from "typerun/schema";
 *     import { validate } from "typerun";
 *
 *     const result = validate(string)("hello");
 *
 *     if (isOk(result)) {
 *       console.log(result.data); // "hello"
 *     } else {
 *       console.log(result.errors);
 *     }
 *
 * @param result The {@link Result | result} to check.
 */
export function isOk<R>(result: Result<R, unknown>): result is Ok<R> {
  return result.ok === true;
}

/**
 * Check if a {@link Result | result} is failed.
 *
 * ## Example
 *
 *     import { isErr } from "typerun/result";
 *     import { string } from "typerun/schema";
 *     import { validate } from "typerun";
 *
 *     const result = validate(string)(42);
 *
 *     if (isErr(result)) {
 *       console.log(result.errors); // [{ name: "ValidationError", message: "Value `42` is not a string" }]
 *     } else {
 *       console.log(result.data);
 *     }
 *
 * @param result The {@link Result | result} to check.
 */
export function isErr<E>(result: Result<unknown, E>): result is Err<E> {
  return result.ok === false;
}

export * from "./types";
