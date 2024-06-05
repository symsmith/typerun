import { describe, expect, test } from "bun:test";
import { validate } from "validator";
import { isOk } from "validator/result";
import {
	boolean,
	either,
	number,
	optional,
	string,
	undefinedValue,
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

	test("should fail for no arguments", () => {
		const res = validate(either())("hello");
		expect(isOk(res)).toBe(false);
		if (isOk(res)) return;
		expect(res.error.name).toBe("ValidationError");
	});

	test("should validate nested `either` calls", () => {
		const schema = either(
			string,
			either(number, boolean, either(boolean, undefinedValue))
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
