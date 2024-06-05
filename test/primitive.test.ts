import { describe, expect, test } from "bun:test";
import { boolean, literal, number, string } from "validator/schema";
import { isOk } from "validator/result";
import { validate } from "validator";

describe("string", () => {
	test("should validate string value", () => {
		const res = validate(string)("a string");
		expect(isOk(res)).toBe(true);
		if (!isOk(res)) return;
		expect(res.data).toBe("a string");
	});

	test("should fail for invalid string value", () => {
		const res = validate(string)(true);
		expect(isOk(res)).toBe(false);
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
		const res = validate(number)("not a number");
		expect(isOk(res)).toBe(false);
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
		const res = validate(boolean)("not a boolean");
		expect(isOk(res)).toBe(false);
	});
});

describe("literal", () => {
	test("should validate itself", () => {
		const res = validate(literal("hello"))("hello");
		expect(isOk(res)).toBe(true);
	});

	test("should fail for anything else", () => {
		const schema = literal("hello");
		expect(isOk(validate(schema)(3))).toBe(false);
		expect(isOk(validate(schema)(undefined))).toBe(false);
		expect(isOk(validate(schema)("hello!"))).toBe(false);
		expect(isOk(validate(schema)(null))).toBe(false);
		expect(isOk(validate(schema)(true))).toBe(false);
	});

	test("should validate undefined", () => {
		const res = validate(literal(undefined))(undefined);
		expect(isOk(res)).toBe(true);
	});

	test("should validate null", () => {
		const res = validate(literal(null))(null);
		expect(isOk(res)).toBe(true);
	});
});
