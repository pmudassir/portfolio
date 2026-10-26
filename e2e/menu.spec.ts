import { expect, test } from "@playwright/test";

test("the menu opens, traps the page behind it, and closes", async ({ page }) => {
  await page.goto("/work");
  // The menu is a client component; wait for it to hydrate before pressing it.
  await page.waitForLoadState("networkidle");
  const toggle = page.locator("button[aria-controls]");
  await toggle.click();
  const panel = page.locator(`[id="${await toggle.getAttribute("aria-controls")}"]`);
  await expect(panel).toBeVisible();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  expect(await page.evaluate(() => document.getElementById("main")?.inert)).toBe(true);

  // A link to the page you're already on still closes it.
  await panel.getByRole("link", { name: "Work" }).click();
  await expect(panel).toBeHidden();
  expect(await page.evaluate(() => document.getElementById("main")?.inert)).toBe(false);
  expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe("");

  await toggle.click();
  await expect(panel).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden();
  await expect(toggle).toBeFocused();
});

test("menu links navigate", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.locator("button[aria-controls]").click();
  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Contact" }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.locator("h1")).toContainText(/Email me/i);
});

test("following a menu link leaves focus on the new page, not the menu button", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  const toggle = page.locator("button[aria-controls]");
  await toggle.click();
  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Projects" }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(toggle).not.toBeFocused();
});
