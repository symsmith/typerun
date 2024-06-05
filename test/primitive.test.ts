import { expect, test } from "bun:test";
import { boolean, nullValue, number, string } from "validator/schema";
import { isOk } from "validator/result";
import { validate } from "validator";

test("should validate null value", () => {
	const res = validate(nullValue)(null);
	expect(isOk(res)).toBe(true);
	if (!isOk(res)) return;
	expect(res.data).toBe(null);
});

test("should validate string value", () => {
	const res = validate(string)("a string");
	expect(isOk(res)).toBe(true);
	if (!isOk(res)) return;
	expect(res.data).toBe("a string");
});

test("should validate number value", () => {
	const res = validate(number)(3);
	expect(isOk(res)).toBe(true);
	if (!isOk(res)) return;
	expect(res.data).toBe(3);
});

test("should validate boolean value", () => {
	const res = validate(boolean)(true);
	expect(isOk(res)).toBe(true);
	if (!isOk(res)) return;
	expect(res.data).toBe(true);
});

test("should fail for invalid null value", () => {
	const res = validate(nullValue)("not null");
	expect(isOk(res)).toBe(false);
});

test("should fail for invalid string value", () => {
	const res = validate(string)(true);
	expect(isOk(res)).toBe(false);
});

test("should fail for invalid number value", () => {
	const res = validate(number)("not a number");
	expect(isOk(res)).toBe(false);
});

test("should fail for invalid boolean value", () => {
	const res = validate(boolean)("not a boolean");
	expect(isOk(res)).toBe(false);
});
