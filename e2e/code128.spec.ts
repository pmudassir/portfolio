import { expect, test } from "@playwright/test";
import { code128B } from "../src/components/receipt/code128";

// Reference output from python-barcode 0.15.1: barcode.get("code128", "Hi").build()[0]
const HI = "110100100001100010100010000110100100111101001100011101011";

const modules = (widths: number[]) => widths.map((w, i) => (i % 2 === 0 ? "1" : "0").repeat(w)).join("");

test("Code 128 matches an independent encoder", () => {
  expect(modules(code128B("Hi"))).toBe(HI);
});

test("Code 128 symbols are 11 modules each, plus a 13-module stop", () => {
  const total = code128B("mudassir.in").reduce((a, b) => a + b, 0);
  // start + 11 characters + checksum = 13 symbols of 11 modules, then the stop.
  expect(total).toBe(13 * 11 + 13);
});

test("Code 128 refuses characters it can't encode", () => {
  expect(() => code128B("₹450")).toThrow(/not printable ASCII/);
});
