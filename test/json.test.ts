import { describe, expect, test } from "bun:test";
import { json } from "validator/parse";
import { isOk } from "validator/result";
import { string } from "validator/schema";

describe("json", () => {
	test("should parse and validate a string value", () => {
		const res = json(string)('"null"');
		expect(isOk(res)).toBe(true);
		if (!isOk(res)) return;
		expect(res.data).toBe("null");
		expect(res.data).not.toBe(null);
	});

	test("should fail for a non-JSON value", () => {
		const res = json(string)("{");
		expect(isOk(res)).toBe(false);
		if (isOk(res)) return;
		expect(res.error.name).toBe("JSONError");
	});
});
