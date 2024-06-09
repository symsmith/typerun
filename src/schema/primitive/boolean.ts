import { getValidationErrorMessage } from "../../parse/errors";
import { custom } from "./custom";

export const boolean = custom(
  (v): v is boolean => typeof v === "boolean",
  (v) => getValidationErrorMessage(v, "a boolean")
);
