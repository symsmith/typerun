import { getValidationErrorMessage } from "parse/errors";
import { custom } from "./custom";

/**
 * The `bigint` schema validates that the input is a JavaScript BigInt value. It fails for anything
 * that is not a BigInt value.
 *
 * ## Example
 *
 *     import { bigint } from "typerun/schema";
 *     import { is } from "typerun";
 *
 *     const isBigInt = is(bigint)(3n);
 *     console.log(isBigInt); // true
 *
 *     const isNotBigInt = is(bigint)(3);
 *     console.log(isNotBigInt); // false
 */
export const bigint = custom(
  (v): v is bigint => typeof v === "bigint",
  (v) => getValidationErrorMessage(v, "a bigint")
);
