import { expect, test } from "@playwright/test";

// Every page loads, has one h1, and logs no errors.
const pages = [
  { path: "/", h1: /Mudassir/i },
  { path: "/projects", h1: /Projects/i },
  { path: "/projects/opspilot", h1: /OpsPilot/i },
  { path: "/projects/mentrex", h1: /Mentrex/i },
  { path: "/projects/koin", h1: /Koin/i },
  { path: "/projects/nexus-saas", h1: /Nexus/i },
  { path: "/work", h1: /Work/i },
  { path: "/about", h1: /Hi, I'm/i },
  { path: "/contact", h1: /Email me/i },
];

for (const { path, h1 } of pages) {
  test(`${path} renders without errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toContainText(h1);
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });
}

test("unknown pages are a 404 receipt", async ({ page }) => {
  const res = await page.goto("/no-such-page");
  expect(res?.status()).toBe(404);
  await expect(page.locator("h1")).toContainText(/Item not found/i);
});

test("share images are PNGs", async ({ request }) => {
  for (const url of ["/opengraph-image", "/projects/opspilot/opengraph-image"]) {
    const res = await request.get(url);
    expect(res.status(), url).toBe(200);
    expect(res.headers()["content-type"]).toBe("image/png");
  }
});
