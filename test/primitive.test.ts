import { describe, expect, test } from "bun:test";
import { is, validate } from "validator";
import { isOk } from "validator/result";
import { boolean, number, string, value } from "validator/schema";

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

describe("literal", () => {
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
	});

	test("should validate null", () => {
		expect(is(value(null))(null)).toBe(true);
	});
});
