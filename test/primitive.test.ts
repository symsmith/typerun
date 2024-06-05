import { expect, test } from "bun:test";
import { boolean, nullValue, number, string } from "validator/schema";
import { json } from "validator/parse";
import { isOk } from "validator/result";

test("can validate null value", () => {
	const res = json(nullValue)("null");
	expect(isOk(res)).toBe(true);
	if (!isOk(res)) return;
	expect(res.data).toBe(null);
});

test("should validate string value", () => {
	const res = json(string)('"a string"');
	expect(isOk(res)).toBe(true);
	if (!isOk(res)) return;
	expect(res.data).toBe("a string");
});

test("should validate number value", () => {
	const res = json(number)("3");
	expect(isOk(res)).toBe(true);
	if (!isOk(res)) return;
	expect(res.data).toBe(3);
});

test("should validate boolean value", () => {
	const res = json(boolean)("true");
	expect(isOk(res)).toBe(true);
	if (!isOk(res)) return;
	expect(res.data).toBe(true);
});

test("should fail for invalid JSON", () => {
	const res = json(boolean)("not a JSON");
	expect(isOk(res)).toBe(false);
});

test("should fail for invalid null value", () => {
	const res = json(nullValue)('"not null"');
	expect(isOk(res)).toBe(false);
});

test("should fail for invalid string value", () => {
	const res = json(string)("true");
	expect(isOk(res)).toBe(false);
});

test("should fail for invalid number value", () => {
	const res = json(number)('"not a number"');
	expect(isOk(res)).toBe(false);
});

test("should fail for invalid boolean value", () => {
	const res = json(boolean)('"not a boolean"');
	expect(isOk(res)).toBe(false);
});
