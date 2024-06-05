import { describe, expect, test } from "bun:test";
import {
	boolean,
	nullValue,
	number,
	string,
	undefinedValue,
} from "validator/schema";
import { isOk } from "validator/result";
import { validate } from "validator";

describe("nullValue", () => {
	test("should validate null value", () => {
		const res = validate(nullValue)(null);
		expect(isOk(res)).toBe(true);
		if (!isOk(res)) return;
		expect(res.data).toBe(null);
	});

	test("should fail for invalid null value", () => {
		const res = validate(nullValue)("not null");
		expect(isOk(res)).toBe(false);
	});
});

describe("undefinedValue", () => {
	test("should validate undefined value", () => {
		const res = validate(undefinedValue)(undefined);
		expect(isOk(res)).toBe(true);
		if (!isOk(res)) return;
		expect(res.data).toBe(undefined);
	});

	test("should fail for invalid undefined value", () => {
		const res = validate(undefinedValue)("not undefined");
		expect(isOk(res)).toBe(false);
	});
});

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
