import type { ParseError } from "../parse/types";
import type { Result } from "../result/types";

export interface Schema<R> {
	validate: (v: unknown) => Result<R, ParseError>;
}
