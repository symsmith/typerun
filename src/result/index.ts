import type { Err, Ok, Result } from "./types";

export function ok<R>(data: R): Ok<R> {
	return { ok: true, data };
}

export function err<E>(errors: E[]): Err<E> {
	return { ok: false, errors };
}

export function isOk<R>(result: Result<R, unknown>): result is Ok<R> {
	return result.ok === true;
}

export function isErr<E>(result: Result<unknown, E>): result is Err<E> {
	return result.ok === false;
}
