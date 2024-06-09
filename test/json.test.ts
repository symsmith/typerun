import { describe, expect, test } from "bun:test";
import { json } from "typerun/parse";
import { isOk } from "typerun/result";
import { custom, string } from "typerun/schema";

describe("json", () => {
  test("should parse and validate a string value", () => {
    const res = json(string)('"null"');
    expect(isOk(res)).toBe(true);
    if (!isOk(res)) return;
    expect(res.data).toBe("null");
    expect(res.data).not.toBe(null);
  });

  test("should fail for a non-JSON value", () => {
    const res = json(string)("{");
    expect(isOk(res)).toBe(false);
    if (isOk(res)) return;
    expect(res.errors).toHaveLength(1);
    expect(res.errors[0]!.name).toBe("JSONError");
  });

  test("should fail with UnknownError for any other error", () => {
    const res = json(
      custom((data): data is string => {
        if (1 === 1) {
          throw data;
        }
        return typeof data === "string";
      })
    )("{}");
    if (isOk(res)) return;
    expect(res.errors).toHaveLength(1);

    expect(res.errors[0]!.name).toBe("UnknownError");
  });
});

describe("json with option throwing", () => {
  test("should parse and validate a string value", () => {
    const res = json(string, { throwing: true })('"null"');
    expect(res).toBe("null");
    expect(res).not.toBe(null);
  });

  test("should fail for an incorrect value", () => {
    expect(() => json(string, { throwing: true })("null")).toThrow();
  });

  test("should fail for a non-JSON value", () => {
    expect(() => json(string, { throwing: true })("{")).toThrow();
  });

  test("should fail with UnknownError for any other error", () => {
    expect(() =>
      json(
        custom((data): data is string => {
          if (1 === 1) {
            throw data;
          }
          return typeof data === "string";
        }),
        { throwing: true }
      )("{}")
    ).toThrow();
  });
});
