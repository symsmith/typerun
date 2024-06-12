import { custom, type Schema } from "typerun/schema";
import { getValidationErrorMessage } from "../../parse/errors";

/**
 * The `instance` schema validates that the input is an instance of a class.
 *
 * ## Example
 *
 *     import { instance } from "typerun/schema";
 *     import { is } from "typerun";
 *
 *     class MyClass {}
 *     const isInstance = is(instance(MyClass))(new MyClass());
 *     console.log(isInstance); // true
 *
 *     const isNotInstance = is(instance(MyClass))({});
 *     console.log(isNotInstance); // false
 *
 * ## Caveats
 *
 * TypeScript will raise a compilation error if you try to use the `instance` schema with a class
 * with a private constructor.
 *
 * @param className The class to validate.
 */
export function instance<Class>(className: new (...args: any) => Class): Schema<Class> {
  return custom(
    (v): v is Class => v instanceof className,
    (v) => getValidationErrorMessage(v, `an instance of ${className.name}`)
  );
}
