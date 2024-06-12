import type { ParseError } from "typerun/parse";
import { err, isErr, ok } from "typerun/result";
import type { Infer, Schema } from "typerun/schema";
import {
  addPathToParseErrors,
  getValidationError,
  getValidationErrorMessage,
} from "../../parse/errors";

/**
 * The `object` schema checks that the type of the value is an object, and that all of its
 * properties match the given schemas. The properties are defined in a record. The keys of the
 * record are the property names, and the values are the schemas to validate the properties.
 *
 * ## Example
 *
 *     import { object, string, number } from "typerun/schema";
 *     import { is } from "typerun";
 *
 *     const schema = object({
 *       name: string,
 *       age: number,
 *     });
 *
 *     if (is(schema)({ name: "John", age: 42 })) {
 *       console.log("value is an object with a name and an age");
 *     }
 *     if (!is(schema)({ name: "John", age: "42" })) {
 *       console.log("value is not an object with a name and an age");
 *     }
 *
 * If you use the `validate` function, the errors contain all of the different type validation fails
 * from the object.
 *
 * Objects can be combined with any other schemas, to create complex validation patterns.
 *
 *     import { object, optional, either, string, number, array } from "typerun/schema";
 *     import { is } from "typerun";
 *
 *     const schema = object({
 *       name: optional(string),
 *       property: array(either(object({ name: string, age: number }), string)),
 *     });
 *
 *     if (is(schema)({ name: "John", property: [{ name: "John", age: 42 }, "hello"] })) {
 *       console.log("value matches the schema");
 *     }
 *     if (is(schema)({ property: ["a", "b", "c"] })) {
 *       console.log("value matches the schema");
 *     }
 *
 * @param schemaRecord A record of schemas to validate the properties of an object.
 */
export function object<R extends Record<PropertyKey, Schema<unknown>>>(
  schemaRecord: R
): Schema<{
  [k in keyof R]: Infer<R[k]>;
}> {
  return {
    validate(v) {
      if (typeof v !== "object" || v === null) {
        return err([getValidationError(getValidationErrorMessage(v, "an object"))]);
      }

      const value = v as Record<PropertyKey, unknown>;
      const errors: ParseError[] = [];

      let key: keyof R;
      for (key in schemaRecord) {
        const schema = schemaRecord[key]!;
        const result = schema.validate(value[key]);
        if (isErr(result)) {
          errors.push(...addPathToParseErrors(result.errors, key));
        }
      }

      if (errors.length > 0) {
        return err(errors);
      }

      return ok(
        v as {
          [k in keyof R]: Infer<R[k]>;
        }
      );
    },
  };
}
