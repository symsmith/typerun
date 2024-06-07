export type Ok<R> = { ok: true; data: R };
export type Err<E> = { ok: false; errors: E[] };

export type Result<R, E> = Ok<R> | Err<E>;
