import { expect, test, type Page } from "@playwright/test";

const TITLES = {
  ring: "טבעות יהלומים",
  watch: "שעוני יוקרה",
  diamond: "יהלומים ואבני חן",
} as const;
type Kind = keyof typeof TITLES;
const DEFAULT_TITLE = "הסיפור מתחיל בקופסה אחת";

const box = (page: Page, kind: Kind) => page.getByTestId(`box-${kind}`);
const panelTitle = (page: Page) => page.locator("#detail-title");

async function activate(page: Page, kind: Kind) {
  const isMobile = test.info().project.name === "mobile";
  if (isMobile) await box(page, kind).tap();
  else await box(page, kind).click();
}

async function expectOnlyOpen(page: Page, kind: Kind | null) {
  for (const k of Object.keys(TITLES) as Kind[]) {
    await expect(box(page, k)).toHaveAttribute("aria-pressed", String(k === kind));
  }
  await expect(page.locator('.box-slot[data-state="open"]')).toHaveCount(kind ? 1 : 0);
}

let consoleErrors: string[] = [];

test.beforeEach(async ({ page }) => {
  consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push(err.message));
  await page.goto("/");
});

test.afterEach(() => {
  expect(consoleErrors, "no console errors or hydration warnings").toEqual([]);
});

test("loads in Hebrew RTL with three closed boxes and the default invitation", async ({ page }) => {
  await expect(page.locator("html")).toHaveAttribute("lang", "he");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page).toHaveTitle(/MAISON ÉCLAT/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.+/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("יוקרה שמתגלה");
  await expect(page.locator(".box-slot")).toHaveCount(3);
  await expectOnlyOpen(page, null);
  await expect(panelTitle(page)).toHaveText(DEFAULT_TITLE);
});

test("each box opens individually and reveals its own product and copy", async ({ page }) => {
  for (const kind of Object.keys(TITLES) as Kind[]) {
    await activate(page, kind);
    await expectOnlyOpen(page, kind);
    await expect(panelTitle(page)).toHaveText(TITLES[kind]);
    const jewel = box(page, kind).locator(".jewel");
    await expect(jewel).toBeVisible();
    await expect(jewel).toHaveCSS("opacity", "1");
    await expect(box(page, kind)).toHaveAccessibleName(/סגירת קופסת/);
    // close again before testing the next one
    await activate(page, kind);
    await expectOnlyOpen(page, null);
    await expect(panelTitle(page)).toHaveText(DEFAULT_TITLE);
  }
});

test("open → switch → switch → close keeps a single open box", async ({ page }) => {
  await activate(page, "ring");
  await expectOnlyOpen(page, "ring");
  await expect(panelTitle(page)).toHaveText(TITLES.ring);

  await activate(page, "watch");
  await expectOnlyOpen(page, "watch");
  await expect(panelTitle(page)).toHaveText(TITLES.watch);
  // the previous product must be fully hidden — no ghost layer
  await expect(box(page, "ring").locator(".jewel")).toBeHidden();

  await activate(page, "diamond");
  await expectOnlyOpen(page, "diamond");
  await expect(panelTitle(page)).toHaveText(TITLES.diamond);
  await expect(box(page, "watch").locator(".jewel")).toBeHidden();

  await activate(page, "diamond");
  await expectOnlyOpen(page, null);
  await expect(panelTitle(page)).toHaveText(DEFAULT_TITLE);
});

test("rapid clicking settles into one consistent state", async ({ page }) => {
  const order: Kind[] = ["ring", "watch", "diamond", "ring", "ring", "watch", "diamond", "watch"];
  for (const k of order) await box(page, k).click({ delay: 5 });
  await expectOnlyOpen(page, "watch");
  await expect(panelTitle(page)).toHaveText(TITLES.watch);
  await expect(box(page, "ring").locator(".jewel")).toBeHidden();
  await expect(box(page, "diamond").locator(".jewel")).toBeHidden();
});

test("Escape closes the open box and keeps focus on it", async ({ page }) => {
  await box(page, "watch").click();
  await expectOnlyOpen(page, "watch");
  await page.keyboard.press("Escape");
  await expectOnlyOpen(page, null);
  await expect(panelTitle(page)).toHaveText(DEFAULT_TITLE);
  await expect(box(page, "watch")).toBeFocused();
});

test("keyboard: Tab reaches the boxes, Enter and Space toggle them", async ({ page }) => {
  test.skip(test.info().project.name === "mobile", "keyboard flow is a desktop concern");
  await box(page, "ring").focus();
  await page.keyboard.press("Enter");
  await expectOnlyOpen(page, "ring");
  await page.keyboard.press("Tab");
  await expect(box(page, "watch")).toBeFocused();
  await page.keyboard.press("Space");
  await expectOnlyOpen(page, "watch");
  await page.keyboard.press("Space");
  await expectOnlyOpen(page, null);

  // focus ring is visible
  await expect(box(page, "watch")).toHaveCSS("outline-style", "solid");

  // boxes are reachable from the top of the document with Tab only
  await page.goto("/");
  let reached = false;
  for (let i = 0; i < 15 && !reached; i++) {
    await page.keyboard.press("Tab");
    reached = await box(page, "ring").evaluate((el) => el === document.activeElement);
  }
  expect(reached).toBe(true);
});

test("CTA leads to the contact section, carries the chosen collection and is honest about demo status", async ({ page }) => {
  await activate(page, "diamond");
  await expect(panelTitle(page)).toHaveText(TITLES.diamond);
  const cta = page.getByTestId("detail-cta");
  await expect(cta).toHaveText(/גלו את היהלומים/);
  await expect(cta).toHaveAttribute("href", "#contact");
  await cta.click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.locator("#contact")).toBeInViewport();
  await expect(page.getByTestId("contact-interest")).toContainText(TITLES.diamond);
  await expect(page.getByTestId("contact-demo-status")).toContainText("הדגמת חוויית משתמש");
  // no fake form or messaging links while contact is unconfigured
  await expect(page.locator("form")).toHaveCount(0);
  await expect(page.locator('a[href^="https://wa.me"]')).toHaveCount(0);
});

test("touch targets on the boxes are comfortably large", async ({ page }) => {
  for (const kind of Object.keys(TITLES) as Kind[]) {
    const bb = await box(page, kind).boundingBox();
    expect(bb).not.toBeNull();
    expect(bb!.width).toBeGreaterThanOrEqual(44);
    expect(bb!.height).toBeGreaterThanOrEqual(44);
  }
});

test.describe("layout", () => {
  for (const width of [360, 390, 430, 768, 1280, 1440]) {
    test(`no horizontal overflow at ${width}px, closed and open`, async ({ page }) => {
      test.skip(test.info().project.name === "mobile", "widths are set explicitly");
      await page.setViewportSize({ width, height: 860 });
      await page.goto("/");
      const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(await overflow()).toBeLessThanOrEqual(0);
      for (const kind of Object.keys(TITLES) as Kind[]) {
        await box(page, kind).click();
        await expectOnlyOpen(page, kind);
        await page.waitForTimeout(400);
        expect(await overflow()).toBeLessThanOrEqual(0);
        // every box stays within the viewport
        for (const k of Object.keys(TITLES) as Kind[]) {
          const bb = await box(page, k).boundingBox();
          expect(bb!.x).toBeGreaterThanOrEqual(0);
          expect(bb!.x + bb!.width).toBeLessThanOrEqual(width + 0.5);
        }
      }
    });
  }
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });
  test("reveal is instant and fully functional", async ({ page }) => {
    await box(page, "ring").click();
    const jewel = box(page, "ring").locator(".jewel");
    // without motion the product is shown essentially immediately
    await expect(jewel).toHaveCSS("opacity", "1", { timeout: 300 });
    await expect(panelTitle(page)).toHaveText(TITLES.ring);
    await page.keyboard.press("Escape");
    await expectOnlyOpen(page, null);
  });
});
