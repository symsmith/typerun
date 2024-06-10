/** A successful {@link Result | result}, containing some data. */
export type Ok<R> = { ok: true; data: R };

/** A failed {@link Result | result}, containing an array of errors. */
export type Err<E> = { ok: false; errors: E[] };

/**
 * A result that can be either successful or failed. A {@link Ok | successful result} contains some
 * data, and a {@link Err | failed result} contains an array of errors.
 *
 * @typeParam R The type of the data, if the result is successful.
 * @typeParam E The type of the errors, if the result is failed.
 */
export type Result<R, E> = Ok<R> | Err<E>;
