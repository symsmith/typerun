import { describe, expect, test } from "bun:test";
import { is, validate } from "typerun";
import { isOk } from "typerun/result";
import {
  any,
  bigint,
  blob,
  boolean,
  date,
  error,
  instance,
  nan,
  number,
  string,
  value,
} from "typerun/schema";

describe("string", () => {
  test("should validate string value", () => {
    const res = validate(string)("a string");
    expect(isOk(res)).toBe(true);
    if (!isOk(res)) return;
    expect(res.data).toBe("a string");
  });

  test("should fail for invalid string value", () => {
    expect(is(string)(true)).toBe(false);
  });
});

describe("number", () => {
  test("should validate number value", () => {
    const res = validate(number)(3);
    expect(isOk(res)).toBe(true);
    if (!isOk(res)) return;
    expect(res.data).toBe(3);
  });

  test("should fail for invalid number value", () => {
    expect(is(number)("not a number")).toBe(false);
  });
});

describe("nan", () => {
  test("should validate NaN value", () => {
    const res = validate(nan)(NaN);
    expect(isOk(res)).toBe(true);
    if (!isOk(res)) return;
    expect(res.data).toBe(NaN);
  });

  test("should fail for non-NaN number value", () => {
    expect(is(nan)(3)).toBe(false);
  });

  test("should fail for invalid value", () => {
    expect(is(nan)("not a number")).toBe(false);
  });
});

describe("boolean", () => {
  test("should validate boolean value", () => {
    const res = validate(boolean)(true);
    expect(isOk(res)).toBe(true);
    if (!isOk(res)) return;
    expect(res.data).toBe(true);
  });

  test("should fail for invalid boolean value", () => {
    expect(is(boolean)("not a boolean")).toBe(false);
  });
});

describe("value", () => {
  test("should validate itself", () => {
    expect(is(value("hello"))("hello")).toBe(true);
  });

  test("should fail for anything else", () => {
    const schema = value("hello");
    expect(is(schema)(3)).toBe(false);
    expect(is(schema)(undefined)).toBe(false);
    expect(is(schema)("hello!")).toBe(false);
    expect(is(schema)(null)).toBe(false);
    expect(is(schema)(true)).toBe(false);
  });

  test("should validate undefined", () => {
    expect(is(value(undefined))(undefined)).toBe(true);
    expect(is(value(undefined))(null)).toBe(false);
  });

  test("should validate null", () => {
    expect(is(value(null))(null)).toBe(true);
    expect(is(value(null))(undefined)).toBe(false);
  });

  test("should validate a number", () => {
    expect(is(value(42))(42)).toBe(true);
    expect(is(value(42))(43)).toBe(false);
  });

  test("should validate a boolean", () => {
    expect(is(value(true))(true)).toBe(true);
    expect(is(value(true))(false)).toBe(false);

    expect(is(value(false))(false)).toBe(true);
    expect(is(value(false))(true)).toBe(false);
  });

  test("should validate a symbol", () => {
    const symbol = Symbol();
    expect(is(value(symbol))(symbol)).toBe(true);
    expect(is(value(symbol))(Symbol())).toBe(false);
  });

  test("should validate a bigint", () => {
    expect(is(value(94992499n))(BigInt(94992499))).toBe(true);
    expect(is(value(94992499n))(94992498n)).toBe(false);
  });
});

describe("any", () => {
  test("should validate any value", () => {
    expect(is(any)("hello")).toBe(true);
    expect(is(any)(3)).toBe(true);
    expect(is(any)(undefined)).toBe(true);
    expect(is(any)("hello!")).toBe(true);
    expect(is(any)(null)).toBe(true);
    expect(is(any)(true)).toBe(true);
  });
});

describe("instance", () => {
  test("should validate instance of class", () => {
    class Test {}
    expect(is(instance(Test))(new Test())).toBe(true);
  });

  test("should fail for non-instance of class", () => {
    class Test {}
    const schema = instance(Test);
    expect(is(schema)(3)).toBe(false);
    expect(is(schema)(new Date())).toBe(false);
    expect(is(schema)(Test)).toBe(false);
  });
});

describe("date", () => {
  test("should validate date value", () => {
    expect(is(date)(new Date())).toBe(true);

    const modifiedDate = new Date();
    modifiedDate.setHours(3);
    expect(is(date)(modifiedDate)).toBe(true);
  });

  test("should fail for invalid date value", () => {
    expect(is(date)(3)).toBe(false);
    expect(is(date)(Date)).toBe(false);
    expect(is(date)(new Blob())).toBe(false);
  });
});

describe("blob", () => {
  test("should validate blob value", () => {
    expect(is(blob)(new Blob())).toBe(true);
  });

  test("should fail for invalid blob value", () => {
    expect(is(blob)(3)).toBe(false);
    expect(is(blob)(new Date())).toBe(false);
    expect(is(blob)(Blob)).toBe(false);
  });
});

describe("error", () => {
  test("should validate error value", () => {
    expect(is(error)(new Error())).toBe(true);
  });

  test("should fail for invalid error value", () => {
    expect(is(error)(3)).toBe(false);
    expect(is(error)(new Date())).toBe(false);
    expect(is(error)(Error)).toBe(false);
  });
});

describe("bigint", () => {
  test("should validate bigint value", () => {
    expect(is(bigint)(44444444444444n)).toBe(true);
    expect(is(bigint)(BigInt(30000000000))).toBe(true);
  });

  test("should fail for invalid bigint value", () => {
    expect(is(bigint)(3)).toBe(false);
    expect(is(bigint)(BigInt)).toBe(false);
  });
});
