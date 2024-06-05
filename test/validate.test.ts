import { expect, test } from "bun:test";
import { validate } from "validator";
import { isOk } from "validator/result";
import { string } from "validator/schema";

test("can validate a parsed value", () => {
	const res = validate(string)("null");
	expect(isOk(res)).toBe(true);
	if (!isOk(res)) return;
	expect(res.data).toBe("null");
	expect(res.data).not.toBe(null);
});
