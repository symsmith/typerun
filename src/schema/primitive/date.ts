import { instance } from "./instance";

/**
 * The `date` schema validates that the input is a JavaScript Date object. It is an alias for
 * {@link instance | `instance(Date)`}.
 *
 * ## Example
 *
 *     import { date } from "typerun/schema";
 *     import { is } from "typerun";
 *
 *     const isDate = is(date)(new Date());
 *     console.log(isDate); // true
 *
 *     const isNotDate = is(date)(3);
 *     console.log(isNotDate); // false
 */
export const date = instance(Date);
