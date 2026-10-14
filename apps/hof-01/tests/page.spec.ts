import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("serviço, CTA e destinos são claros, sem enviar contato", async ({
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
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Harmonização facial e corporal.",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, nofollow",
  );
  const contact = page.locator(".hero [data-contact]");
  await expect(contact).toBeVisible();
  const popupPromise = page.waitForEvent("popup");
  await contact.click();
  const popup = await popupPromise;
  await expect(popup).toHaveTitle("Contato interceptado");
  const url = new URL(popup.url());
  expect(url.hostname).toBe("wa.me");
  expect(url.searchParams.get("text")).toContain("horários e condições");
  await popup.close();
  await page.locator(".faq-list summary").first().click();
  await expect(page.locator(".faq-list details").first()).toHaveAttribute(
    "open",
    "",
  );
  await expect(page.locator(".faq-list details").first()).toContainText(
    "não confirma um agendamento",
  );
  expect(errors).toEqual([]);
});

test("galeria identifica um caso, troca vistas e mantém foco no modal", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Um caso/ })).toBeVisible();
  await page
    .getByRole("button", { name: "Mostrar lábios", exact: true })
    .click();
  await expect(page.locator(".case-featured figcaption")).toContainText(
    "Lábios",
  );
  await expect(
    page.getByRole("button", { name: "Mostrar lábios", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  const open = page.getByRole("button", { name: "Ampliar registro: Lábios" });
  await open.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator("#dialog-title")).toHaveText("Detalhe");
  await page
    .getByRole("button", { name: "Próximo registro", exact: true })
    .click();
  await expect(page.locator("#dialog-title")).toHaveText("Frontal");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page.locator(".case-open")).toBeFocused();
  await page
    .getByRole("button", { name: "Mostrar perfil", exact: true })
    .focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("button", { name: "Mostrar contorno", exact: true }),
  ).toBeFocused();
  await expect(page.locator(".case-featured figcaption")).toContainText(
    "Contorno",
  );
  await page.locator(".case-open").dispatchEvent("pointerdown", {
    pointerType: "touch",
    clientX: 300,
    clientY: 200,
  });
  await page.locator(".case-open").dispatchEvent("pointerup", {
    pointerType: "touch",
    clientX: 200,
    clientY: 200,
  });
  await page.locator(".case-open").dispatchEvent("click", { detail: 1 });
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page.locator(".case-featured figcaption")).toContainText(
    "Lábios",
  );
});

test("mapa carrega somente quando solicitado e menu permite navegar", async ({
  page,
}, testInfo) => {
  let requested = false;
  await page.route("https://www.google.com/maps/embed", (route) => {
    requested = true;
    return route.fulfill({
      contentType: "text/html",
      body: "<p>Mapa de teste carregado</p>",
    });
  });
  await page.goto("/");
  expect(requested).toBe(false);
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Menu" }).click();
    await expect(
      page.getByRole("button", { name: "Fechar", exact: true }),
    ).toHaveAttribute("aria-expanded", "true");
  }
  await page
    .locator("#main-navigation")
    .getByRole("link", { name: "Como chegar" })
    .click();
  await expect(page).toHaveURL(/#localizacao$/);
  await page.getByRole("button", { name: "Carregar mapa" }).click();
  await expect(page.locator("iframe")).toBeVisible();
  await expect(
    page.frameLocator("iframe").getByText("Mapa de teste carregado"),
  ).toBeVisible();
  expect(requested).toBe(true);
});

test("reflow, teclado, contraste e movimento reduzido", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Pular para o conteúdo" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#conteudo")).toBeFocused();
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
    .getByRole("button", { name: "Mostrar sorriso", exact: true })
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
