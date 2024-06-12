import type { ParseError } from "../parse/types";
import type { Result } from "../result/types";

/**
 * The `Schema` type is the basic building block of TypeRun. It represents the runtime validation of
 * a data unit.
 *
 * @typeParam R The TypeScript type matching the type that is validated at runtime by the schema.
 */
export type Schema<R> = {
  /** The `validate` function takes an unknown input and validates it against its reference type `R`. */
  validate: (v: unknown) => Result<R, ParseError>;
};

/**
 * The `Infer` type is a utility type to extract the return type of a `Schema`. Use it to get the
 * TypeScript type of any defined schema.
 *
 * ## Example
 *
 *     import { Infer, object, string } from "typerun/schema";
 *
 *     const schema = object({ name: string });
 *     type SchemaType = Infer<typeof schema>; // { name: string }
 */
export type SchemaReturn<S> = S extends Schema<infer R> ? R : never;
