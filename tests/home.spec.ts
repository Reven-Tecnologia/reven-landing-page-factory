import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("a demonstração comunica o processo e o CTA funciona", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Landing pages com intenção/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await page.getByRole("link", { name: /Conheça nosso processo/ }).click();
  await expect(page).toHaveURL(/#processo$/);
  await expect(
    page.getByRole("heading", { name: "Do insight à página." }),
  ).toBeVisible();
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1,
  );
  expect(overflow, "a página não deve ter overflow horizontal").toBe(false);
  await page.screenshot({
    path: testInfo.outputPath("pagina.png"),
    fullPage: true,
    animations: "disabled",
  });
});

test("não há violações críticas ou sérias de acessibilidade detectáveis", async ({
  page,
}) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  const severe = results.violations.filter((violation) =>
    ["critical", "serious"].includes(violation.impact ?? ""),
  );
  expect(severe).toEqual([]);
});
