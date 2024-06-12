import { ok } from "../../result/index";
import type { Schema } from "../types";

/**
 * The `any` schema validates that the input is of any type.
 *
 * ## Example
 *
 *     import { any } from "typerun/schema";
 *     import { is } from "typerun";
 *
 *     const isAny = is(any)(true) && is(any)("hello") && is(any)([{ id: 4 }]);
 *
 *     console.log(isAny); // true
 */
export const any: Schema<any> = { validate: ok };
