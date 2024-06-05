export type Ok<R> = { ok: true; data: R };
export type Err<E> = { ok: false; error: E };

export type Result<R = never, E = never> = Ok<R> | Err<E>;
