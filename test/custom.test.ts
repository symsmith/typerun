import { describe, expect, test } from "bun:test";
import { is, validate } from "typerun";
import { isOk } from "typerun/result";
import { custom, number } from "typerun/schema";

describe("custom", () => {
  test("should validate data with a custom validation function", () => {
    const moreThan3 = custom((data): data is number => is(number)(data) && data > 3);
    expect(is(moreThan3)(42)).toEqual(true);
    expect(is(moreThan3)(1)).toEqual(false);
    expect(is(moreThan3)("a")).toEqual(false);
  });

  test("should provide a custom error message", () => {
    const moreThan3 = custom(
      (data): data is number => is(number)(data) && data > 3,
      (data) => `Expected ${data} to be more than 3`
    );
    const res = validate(moreThan3)(1);
    if (isOk(res)) return;
    expect(res.errors).toHaveLength(1);
    expect(res.errors[0]!.message).toEqual("Expected 1 to be more than 3");
  });
});
