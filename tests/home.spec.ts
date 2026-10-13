import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("a nova página comunica a oferta e o CTA abre o contato", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Landing pages para ofertas/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(
    page.getByRole("heading", {
      name: /Uma página começa com perguntas melhores/,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Conversar sobre uma página/ }),
  ).toHaveAttribute("href", /^mailto:.*subject=Projeto%20de%20landing%20page$/);
  await page.getByRole("link", { name: /Contato/ }).click();
  await expect(page).toHaveURL(/#contato$/);
  await expect(
    page.getByRole("link", { name: /Escrever para a Reven/ }),
  ).toHaveAttribute("href", /^mailto:/);
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
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Pular para o conteúdo" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#conteudo$/);
  const results = await new AxeBuilder({ page }).analyze();
  const severe = results.violations.filter((violation) =>
    ["critical", "serious"].includes(violation.impact ?? ""),
  );
  expect(severe).toEqual([]);
});
