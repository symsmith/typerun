import { describe, expect, test } from "bun:test";
import { validate } from "validator";
import { isOk } from "validator/result";
import { number, object, optional, string } from "validator/schema";

describe("record", () => {
	test("validates an object of the correct shape", () => {
		const schema = object({
			name: string,
			age: number,
			ssn: optional(string),
		});
		expect(isOk(validate(schema)({ name: "Joe", age: 14, ssn: "01234" }))).toBe(
			true
		);
		expect(isOk(validate(schema)({ name: "Joe", age: 14 }))).toBe(true);
	});

	test("validates an object with an additional property", () => {
		const schema = object({
			name: string,
		});
		expect(isOk(validate(schema)({ name: "Joe", age: 14 }))).toBe(true);
	});

	test("fails an object missing a property", () => {
		const schema = object({
			name: string,
			age: number,
		});
		expect(isOk(validate(schema)({ name: "Joe" }))).toBe(false);
	});

	test("fails for something other than an object", () => {
		const schema = object({});
		expect(isOk(validate(schema)(true))).toBe(false);
	});
});
