import { getValidationErrorMessage } from "../../parse/errors";
import { custom } from "./custom";

export function value<R extends boolean | string | number | undefined | null>(value: R) {
  return custom(
    (v): v is R => v === value,
    (v) => getValidationErrorMessage(v, `equal to \`${JSON.stringify(value)}\``)
  );
}
