import { describe, expect, test } from "bun:test";
import { is } from "validator";
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
});
