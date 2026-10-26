import { expect, test } from "@playwright/test";

test.describe("home receipt", () => {
  test("is printed for this visit, in IST", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".receipt-kv dd").first()).toHaveText(/^#\d{6}-\d{4}$/);
    await expect(page.locator(".receipt-kv")).toContainText("IST");
  });

  test("each project stub opens its case study", async ({ page }) => {
    await page.goto("/");
    const stubs = page.locator("a.receipt-stub");
    await expect(stubs).toHaveCount(3);
    await stubs.first().click();
    await expect(page).toHaveURL(/\/projects\/opspilot$/);
    await expect(page.locator("h1")).toContainText("OpsPilot");
  });

  test("ends with the stamp, a scannable barcode and the printer done", async ({ page }) => {
    await page.goto("/");
    const stamp = page.getByRole("img", { name: "Approved: open to remote roles" });
    await stamp.scrollIntoViewIfNeeded();
    await expect(stamp).toBeVisible();
    await expect(page.getByRole("img", { name: /^Barcode: / })).toBeVisible();
    await page.locator(".receipt-foot").scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect(page.locator(".printer-display")).toHaveText(/Done/i);
  });
});

test("case studies link to the next one and carry their item code as a barcode", async ({ page }) => {
  await page.goto("/projects/koin");
  await expect(page.getByRole("img", { name: "Barcode: KOIN" })).toBeAttached();
  const next = page.locator("footer a.receipt-stub");
  await next.click();
  await expect(page).toHaveURL(/\/projects\/nexus-saas$/);
});

test("links to a section land on that section", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Proof" }).first().click();
  await expect(page).toHaveURL(/\/projects\/opspilot#decisions$/);
  await expect(page.locator("#decisions")).toBeInViewport();
});
