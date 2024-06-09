import { describe, expect, test } from "bun:test";
import { is, validate } from "validator";
import { isOk } from "validator/result";
import {
  array,
  either,
  number,
  object,
  optional,
  record,
  string,
  tuple,
  value,
} from "validator/schema";

describe("object", () => {
  test("should validate an object of the correct shape", () => {
    const schema = object({
      name: string,
      age: number,
      ssn: optional(string),
    });
    expect(is(schema)({ name: "Joe", age: 14, ssn: "01234" })).toBe(true);
    expect(is(schema)({ name: "Joe", age: 14 })).toBe(true);
  });

  test("should validate an object with an additional property", () => {
    const schema = object({
      name: string,
    });
    expect(is(schema)({ name: "Joe", age: 14 })).toBe(true);
  });

  test("should fail an object missing a property", () => {
    const schema = object({
      name: string,
      age: number,
    });
    expect(is(schema)({ name: "Joe" })).toBe(false);
  });

  test("should fail for something other than an object", () => {
    const schema = object({});
    expect(is(schema)(true)).toBe(false);
  });

  test("should fail with the key of the failed value", () => {
    const schema = object({
      name: string,
      age: number,
    });
    const res = validate(schema)({ name: "Joe", age: "14" });
    if (isOk(res)) return;
    expect(res.errors).toHaveLength(1);
    expect(res.errors[0]!.path).toEqual({
      key: "age",
    });
  });
});

describe("record", () => {
  test("should validate an object with only value types set", () => {
    const schema = record(number);
    expect(is(schema)({ a: 1, b: 2, c: 3 })).toBe(true);
  });

  test("should validate an object with all types set", () => {
    const schema = record({ k: either(value("a"), value("b")), v: number });
    expect(is(schema)({ a: 1, b: 2 })).toBe(true);
  });

  test("should fail an object with a bad value", () => {
    const schema = record(number);
    expect(is(schema)({ a: 1, b: 2, c: "hello" })).toBe(false);
  });

  test("should fail an object with a bad key", () => {
    const schema = record({ k: either(value("a"), value("b")), v: number });
    expect(is(schema)({ a: 1, b: 2, c: 3 })).toBe(false);
  });

  test("should fail for something other than an object", () => {
    const schema = record(string);
    expect(is(schema)(true)).toBe(false);
  });

  test("should fail with the key of the failed value", () => {
    const schema = record(number);
    const res = validate(schema)({ name: "Joe", age: 14 });
    if (isOk(res)) return;
    expect(res.errors).toHaveLength(1);
    expect(res.errors[0]!.path).toEqual({
      key: "name",
    });
  });

  test("should fail with the keys of all failed values", () => {
    const schema = record(number);
    const res = validate(schema)({ name: "Joe", age: "14" });
    if (isOk(res)) return;
    expect(res.errors).toHaveLength(2);
    expect(res.errors[0]!.path).toEqual({
      key: "name",
    });
    expect(res.errors[1]!.path).toEqual({
      key: "age",
    });
  });

  test("should fail with the key of the failed value", () => {
    const schema = record({ k: either(value("a"), value("b")), v: number });
    const res = validate(schema)({ name: "Joe", a: 14 });
    if (isOk(res)) return;
    expect(res.errors).toHaveLength(1);
    expect(res.errors[0]!.path).toEqual({
      key: "name",
    });
  });

  test("should fail with all keys of the failed values", () => {
    const schema = record({ k: either(value("a"), value("b")), v: number });
    const res = validate(schema)({ name: "Joe", a: "14" });
    if (isOk(res)) return;
    expect(res.errors).toHaveLength(2);
    expect(res.errors[0]!.path).toEqual({
      key: "name",
    });
    expect(res.errors[1]!.path).toEqual({
      key: "a",
    });
  });
});

describe("tuple", () => {
  test("should validate an array with the correct elements", () => {
    const schema = tuple(number, number, string);
    expect(is(schema)([1, 2, "hello"])).toBe(true);
  });

  test("should fail an array with the wrong number of elements", () => {
    const schema = tuple(number, number, string);
    expect(is(schema)([1, 2])).toBe(false);
  });

  test("should fail an array with a bad element", () => {
    const schema = tuple(number, number, string);
    expect(is(schema)([1, 2, 3])).toBe(false);
  });

  test("should fail for something other than an array", () => {
    const schema = tuple(number, number, string);
    expect(is(schema)(true)).toBe(false);
  });

  test("should fail with the index of the failed value", () => {
    const schema = tuple(number, number, string);
    const res = validate(schema)([1, 2, 3]);
    if (isOk(res)) return;
    expect(res.errors).toHaveLength(1);
    expect(res.errors[0]!.path).toEqual({
      index: 2,
    });
  });

  test("should fail with all indices of the failed values", () => {
    const schema = tuple(number, number, string);
    const res = validate(schema)(["1", "2", 3]);
    if (isOk(res)) return;
    expect(res.errors).toHaveLength(3);
    expect(res.errors[0]!.path).toEqual({
      index: 0,
    });
    expect(res.errors[1]!.path).toEqual({
      index: 1,
    });
    expect(res.errors[2]!.path).toEqual({
      index: 2,
    });
  });
});

describe("array", () => {
  test("should validate an array of the correct elements", () => {
    const schema = array(number);
    expect(is(schema)([1, 2, 3])).toBe(true);
  });

  test("should fail an array with a bad element", () => {
    const schema = array(number);
    expect(is(schema)([1, 2, "hello"])).toBe(false);
  });

  test("should fail for something other than an array", () => {
    const schema = array(number);
    expect(is(schema)(true)).toBe(false);
  });

  test("should validate a complex array definition", () => {
    const schema = array(
      either(
        object({
          name: string,
          age: number,
        }),
        array(array(either(number, value("hello"))))
      )
    );

    expect(
      is(schema)([
        { name: "Joe", age: 14 },
        { name: "Jane", age: 15 },
      ])
    ).toBe(true);
    expect(
      is(schema)([
        { name: "Joe", age: 14 },
        [
          [3, "hello"],
          ["hello", 42],
        ],
      ])
    ).toBe(true);
  });

  test("should fail with the index of the failed value", () => {
    const schema = array(number);
    const res = validate(schema)([1, 2, "a"]);
    if (isOk(res)) return;
    expect(res.errors).toHaveLength(1);
    expect(res.errors[0]!.path).toEqual({
      index: 2,
    });
  });

  test("should fail with all the indices of the failed values", () => {
    const schema = array(number);
    const res = validate(schema)(["b", 2, "a"]);
    if (isOk(res)) return;
    expect(res.errors).toHaveLength(2);
    expect(res.errors[0]!.path).toEqual({
      index: 0,
    });
    expect(res.errors[1]!.path).toEqual({
      index: 2,
    });
  });

  test("should contain the complete path of the failed value", () => {
    const schema = tuple(
      array(array(either(number, value("hello")))),
      object({
        name: string,
        obj: object({
          type: array(number),
        }),
      })
    );

    const res = validate(schema)([[["hello"]], { name: "Jane", obj: { type: [1, 2, "3", 4] } }]);

    if (isOk(res)) return;
    expect(res.errors).toHaveLength(1);
    expect(res.errors[0]!.path).toEqual({
      index: 1,
      path: {
        key: "obj",
        path: {
          key: "type",
          path: {
            index: 2,
          },
        },
      },
    });
  });

  test("should contain the complete path of all failed values", () => {
    const schema = tuple(
      array(array(either(number, value("hello")))),
      object({
        name: string,
        obj: object({
          type: array(number),
        }),
      })
    );

    const res = validate(schema)([[["hell"]], { name: 1, obj: { type: [1, 2, "3", "4"] } }]);

    if (isOk(res)) return;
    expect(res.errors).toHaveLength(4);
    expect(res.errors[0]!.path).toEqual({
      index: 0,
      path: {
        index: 0,
        path: {
          index: 0,
        },
      },
    });
    expect(res.errors[1]!.path).toEqual({
      index: 1,
      path: {
        key: "name",
      },
    });
    expect(res.errors[2]!.path).toEqual({
      index: 1,
      path: {
        key: "obj",
        path: {
          key: "type",
          path: {
            index: 2,
          },
        },
      },
    });
    expect(res.errors[3]!.path).toEqual({
      index: 1,
      path: {
        key: "obj",
        path: {
          key: "type",
          path: {
            index: 3,
          },
        },
      },
    });
  });
});
