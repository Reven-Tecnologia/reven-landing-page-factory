import { defineConfig, devices } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
const directory = path.resolve("public/client-assets/_test");
mkdirSync(directory, { recursive: true });
const svg =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080"><rect width="1080" height="1080" fill="#efe5d8"/><text x="540" y="540" text-anchor="middle" font-size="50" fill="#4c2d40">Imagem de teste</text></svg>';
writeFileSync(path.join(directory, "fixture.svg"), svg);
const media = {
  src: "/client-assets/_test/fixture.svg",
  alt: "Imagem sintética de teste",
  width: 1080,
  height: 1080,
};
const content = {
  name: "Profissional de teste",
  initials: "T",
  profession: "Biomédica",
  registration: "Registro de teste",
  city: "Cidade de teste",
  addressName: "Consultório de teste",
  address: "Endereço de teste",
  whatsapp: "https://wa.me/00000000000",
  email: "contato@example.invalid",
  instagram: "https://www.instagram.com/",
  mapsEmbed: "https://www.google.com/maps/embed",
  mapsRoute: "https://www.google.com/maps/dir/",
  methodology: "Informação de teste",
  portrait: media,
  indexingApproved: false,
  views: ["Frontal", "Sorriso", "Perfil", "Contorno", "Lábios", "Detalhe"].map(
    (title) => ({
      ...media,
      src: `${media.src}?view=${title}`,
      title,
      short: title,
    }),
  ),
};
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 2,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3012",
    trace: "off",
    channel:
      process.env.PLAYWRIGHT_BROWSER_CHANNEL === "msedge"
        ? "msedge"
        : undefined,
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    {
      name: "mobile",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" },
    },
  ],
  webServer: {
    command: "npx next dev --port 3012 --hostname 127.0.0.1",
    url: "http://127.0.0.1:3012",
    reuseExistingServer: false,
    env: { CLIENT_CONTENT_JSON: JSON.stringify(content) },
    timeout: 90000,
  },
});
