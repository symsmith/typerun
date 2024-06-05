import { describe, expect, test } from "bun:test";
import { validate } from "validator";
import { isOk } from "validator/result";
import {
	either,
	literal,
	number,
	object,
	optional,
	record,
	string,
	tuple,
} from "validator/schema";

describe("object", () => {
	test("should validate an object of the correct shape", () => {
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

	test("should validate an object with an additional property", () => {
		const schema = object({
			name: string,
		});
		expect(isOk(validate(schema)({ name: "Joe", age: 14 }))).toBe(true);
	});

	test("should fail an object missing a property", () => {
		const schema = object({
			name: string,
			age: number,
		});
		expect(isOk(validate(schema)({ name: "Joe" }))).toBe(false);
	});

	test("should fail for something other than an object", () => {
		const schema = object({});
		expect(isOk(validate(schema)(true))).toBe(false);
	});
});

describe("record", () => {
	test("should validate an object with only value types set", () => {
		const schema = record(number);
		expect(isOk(validate(schema)({ a: 1, b: 2, c: 3 }))).toBe(true);
	});

	test("should validate an object with all types set", () => {
		const schema = record({ k: either(literal("a"), literal("b")), v: number });
		expect(isOk(validate(schema)({ a: 1, b: 2 }))).toBe(true);
	});

	test("should fail an object with a bad value", () => {
		const schema = record(number);
		expect(isOk(validate(schema)({ a: 1, b: 2, c: "hello" }))).toBe(false);
	});

	test("should fail an object with a bad key", () => {
		const schema = record({ k: either(literal("a"), literal("b")), v: number });
		expect(isOk(validate(schema)({ a: 1, b: 2, c: 3 }))).toBe(false);
	});
});

describe("tuple", () => {
	test("should validate an array with the correct elements", () => {
		const schema = tuple(number, number, string);
		expect(isOk(validate(schema)([1, 2, "hello"]))).toBe(true);
	});

	test("should fail an array with the wrong number of elements", () => {
		const schema = tuple(number, number, string);
		expect(isOk(validate(schema)([1, 2]))).toBe(false);
	});

	test("should fail an array with a bad element", () => {
		const schema = tuple(number, number, string);
		expect(isOk(validate(schema)([1, 2, 3]))).toBe(false);
	});

	test("should fail for something other than an array", () => {
		const schema = tuple(number, number, string);
		expect(isOk(validate(schema)(true))).toBe(false);
	});
});
