import type { ParseError } from "../parse/types";
import type { Result } from "../result/types";

export interface Schema<R> {
	validate: (v: unknown) => Result<R, ParseError>;
}

export type SchemaReturn<S extends Schema<any>> = S extends Schema<infer R>
	? R
	: never;
