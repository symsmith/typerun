import { describe, expect, test } from "bun:test";
import { validate } from "validator";
import { isOk } from "validator/result";
import {
	boolean,
	either,
	literal,
	number,
	optional,
	string,
} from "validator/schema";

describe("either", () => {
	test("should only validate its arguments", () => {
		const schema = either(string, number);
		const res = validate(schema)("hello");
		expect(isOk(res)).toBe(true);

		const res2 = validate(schema)(2);
		expect(isOk(res2)).toBe(true);

		const res3 = validate(schema)(null);
		expect(isOk(res3)).toBe(false);
	});

	test("should validate literal unions", () => {
		const schema = either(
			literal("hello"),
			literal(false),
			literal(42),
			literal(undefined)
		);
		expect(isOk(validate(schema)("hello"))).toBe(true);
		expect(isOk(validate(schema)(false))).toBe(true);
		expect(isOk(validate(schema)(42))).toBe(true);
		expect(isOk(validate(schema)(undefined))).toBe(true);
		expect(isOk(validate(schema)(43))).toBe(false);
		expect(isOk(validate(schema)(null))).toBe(false);
	});

	test("should fail for no arguments", () => {
		const res = validate(either())("hello");
		expect(isOk(res)).toBe(false);
		if (isOk(res)) return;
		expect(res.error.name).toBe("ValidationError");
	});

	test("should validate nested `either` calls", () => {
		const schema = either(
			string,
			either(number, boolean, either(boolean, literal(undefined)))
		);
		const res = validate(schema)("hello");
		expect(isOk(res)).toBe(true);

		const res2 = validate(schema)(undefined);
		expect(isOk(res2)).toBe(true);

		const res3 = validate(schema)(null);
		expect(isOk(res3)).toBe(false);
	});
});

describe("optional", () => {
	test("should validate its argument or undefined", () => {
		const schema = optional(string);

		const res = validate(schema)("hello");
		expect(isOk(res)).toBe(true);

		const res2 = validate(schema)(undefined);
		expect(isOk(res2)).toBe(true);

		const res3 = validate(schema)(null);
		expect(isOk(res3)).toBe(false);
	});
});
