import { getValidationErrorMessage } from "../../parse/errors";
import { custom } from "./custom";

export const string = custom(
  (v): v is string => typeof v === "string",
  (v) => getValidationErrorMessage(v, "a string")
);
