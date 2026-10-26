import { expect, test } from "@playwright/test";

// Nothing may be wider than the screen: on phones that makes the browser zoom out to fit.
for (const path of ["/", "/projects", "/projects/opspilot", "/work", "/about", "/contact", "/missing"]) {
  test(`${path} has no horizontal overflow`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
    const viewport = page.viewportSize();
    expect(await page.evaluate(() => window.innerWidth)).toBe(viewport?.width);
  });
}
