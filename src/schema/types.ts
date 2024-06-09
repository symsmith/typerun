import type { ParseError } from "../parse/types";
import type { Result } from "../result/types";

/**
 * The `Schema` type is the basic building block of TypeRun. It represents the runtime validation of
 * a data unit.
 *
 * @typeParam R The TypeScript type matching the type that is validated at runtime by the schema.
 */
export interface Schema<R> {
  /** The `validate` function takes an unknown input and validates it against its reference type `R`. */
  validate: (v: unknown) => Result<R, ParseError>;
}

export type SchemaReturn<S> = S extends Schema<infer R> ? R : never;
