import { getValidationErrorMessage } from "../../parse/errors";
import { custom } from "./custom";

export const number = custom(
  (v): v is number => typeof v === "number" && !isNaN(v),
  (v) => getValidationErrorMessage(v, "a number")
);
