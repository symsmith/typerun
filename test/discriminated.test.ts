import { describe, expect, test } from "bun:test";
import { is, validate } from "validator";
import { isOk } from "validator/result";
import {
	boolean,
	either,
	number,
	optional,
	string,
	value,
} from "validator/schema";

describe("either", () => {
	test("should only validate its arguments", () => {
		const schema = either(string, number);
		expect(is(schema)("hello")).toBe(true);
		expect(is(schema)(2)).toBe(true);
		expect(is(schema)(null)).toBe(false);
	});

	test("should validate literal unions", () => {
		const schema = either(
			value("hello"),
			value(false),
			value(42),
			value(undefined)
		);
		expect(is(schema)("hello")).toBe(true);
		expect(is(schema)(false)).toBe(true);
		expect(is(schema)(42)).toBe(true);
		expect(is(schema)(undefined)).toBe(true);
		expect(is(schema)(43)).toBe(false);
		expect(is(schema)(null)).toBe(false);
	});

	test("should fail for no arguments", () => {
		const res = validate(either())("hello");
		expect(isOk(res)).toBe(false);
		if (isOk(res)) return;
		expect(res.errors).toHaveLength(1);
		expect(res.errors[0]!.name).toBe("ValidationError");
	});

	test("should validate nested `either` calls", () => {
		const schema = either(
			string,
			either(number, boolean, either(boolean, value(undefined)))
		);
		expect(is(schema)("hello")).toBe(true);
		expect(is(schema)(undefined)).toBe(true);
		expect(is(schema)(null)).toBe(false);
	});
});

describe("optional", () => {
	test("should validate its argument or undefined", () => {
		const schema = optional(string);

		expect(is(schema)("hello")).toBe(true);
		expect(is(schema)(undefined)).toBe(true);
		expect(is(schema)(null)).toBe(false);
	});
});
