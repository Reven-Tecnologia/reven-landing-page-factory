import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("restaura a composição completa e abre o contato correto", async ({
  page,
  context,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await context.route("https://wa.me/**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<title>Contato interceptado</title>",
    }),
  );
  await page.goto("/");
  await page.locator('html[data-site-ready="true"]').waitFor();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    /Sua beleza,\s*com a sua\s*essência\./,
  );
  await expect(page.locator(".hero-description")).toContainText(
    "Harmonização facial e corporal",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, nofollow",
  );
  await expect(page.locator("main section")).toHaveCount(8);
  await expect(
    page.getByRole("heading", { name: /Cada ângulo conta/ }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /Vamos conversar/ }),
  ).toBeVisible();
  await expect(page.locator(".portrait")).toBeVisible();
  const popupPromise = page.waitForEvent("popup");
  await page.locator(".hero [data-whatsapp]").click();
  const popup = await popupPromise;
  await expect(popup).toHaveTitle("Contato interceptado");
  const url = new URL(popup.url());
  expect(url.hostname).toBe("wa.me");
  expect(url.searchParams.get("text")).toContain("agendar uma avaliação");
  await popup.close();
  await page.locator(".faq-list summary").first().click();
  await expect(page.locator(".faq-list details").first()).toHaveAttribute(
    "open",
    "",
  );
  expect(errors).toEqual([]);
});

test("galeria mantém seletores, modal e gestos", async ({ page }) => {
  await page.goto("/");
  await page.locator('html[data-site-ready="true"]').waitFor();
  await page
    .getByRole("button", { name: "Mostrar detalhes dos lábios" })
    .click();
  await expect(page.locator(".featured-case figcaption")).toContainText(
    "Detalhes dos lábios",
  );
  await expect(
    page.getByRole("button", { name: "Mostrar detalhes dos lábios" }),
  ).toHaveAttribute("aria-pressed", "true");
  const open = page.getByRole("button", {
    name: "Ampliar registro: detalhes dos lábios",
  });
  await open.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator("#dialog-title")).toContainText("Detalhe lateral");
  await page
    .getByRole("button", { name: "Próximo ângulo", exact: true })
    .click();
  await expect(page.locator("#dialog-title")).toContainText("Vista frontal");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page.locator("#open-case")).toBeFocused();
  await page.getByRole("button", { name: "Mostrar vista de perfil" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("button", { name: "Mostrar contorno e proporções" }),
  ).toBeFocused();
  await page.locator("#open-case").dispatchEvent("pointerdown", {
    pointerType: "touch",
    clientX: 300,
    clientY: 200,
  });
  await page.locator("#open-case").dispatchEvent("pointerup", {
    pointerType: "touch",
    clientX: 200,
    clientY: 200,
  });
  await page.locator("#open-case").dispatchEvent("click", { detail: 1 });
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

test("mapa carrega automaticamente e navegação chega ao endereço", async ({
  page,
}, testInfo) => {
  let requested = false;
  await page.route("https://www.google.com/maps/embed**", (route) => {
    requested = true;
    return route.fulfill({
      contentType: "text/html",
      body: "<p>Mapa de teste carregado</p>",
    });
  });
  await page.goto("/");
  await page.locator('html[data-site-ready="true"]').waitFor();
  await expect(page.locator("iframe")).toHaveCount(1);
  await expect(page.getByRole("button", { name: "Carregar mapa" })).toHaveCount(
    0,
  );
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Abrir menu" }).click();
    await expect(
      page.getByRole("button", { name: "Fechar menu" }),
    ).toHaveAttribute("aria-expanded", "true");
  }
  await page
    .locator("#navigation")
    .getByRole("link", { name: "Localização" })
    .click();
  await expect(page).toHaveURL(/#localizacao$/);
  await expect(page.locator("iframe")).toBeVisible();
  await expect(
    page.frameLocator("iframe").getByText("Mapa de teste carregado"),
  ).toBeVisible();
  expect(requested).toBe(true);
});

test("teclado, reflow, contraste e movimento reduzido", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator('html[data-site-ready="true"]').waitFor();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Ir para o conteúdo" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#principal$/);
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
  }
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    results.violations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      nodes: violation.nodes.map((node) => node.target),
    })),
  ).toEqual([]);
  await page
    .getByRole("button", { name: "Mostrar expressão e sorriso" })
    .click();
  expect(
    await page.evaluate(
      () =>
        document
          .getAnimations()
          .filter((animation) => animation.playState === "running").length,
    ),
  ).toBe(0);
});
