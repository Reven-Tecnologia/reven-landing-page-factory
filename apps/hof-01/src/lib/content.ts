import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

export interface Media {
  src: string;
  alt: string;
  width: number;
  height: number;
}
export interface CaseView extends Media {
  title: string;
  short: string;
}
export interface ClinicContent {
  name: string;
  initials: string;
  profession: string;
  registration: string;
  city: string;
  addressName: string;
  address: string;
  whatsapp: string;
  email: string;
  instagram: string;
  mapsEmbed: string;
  mapsRoute: string;
  methodology: string;
  portrait: Media;
  views: CaseView[];
  indexingApproved: boolean;
  siteUrl?: string;
}

function secureUrl(value: unknown, host?: RegExp): value is string {
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      (!host || host.test(url.hostname))
    );
  } catch {
    return false;
  }
}
function validMedia(value: unknown): value is Media {
  if (!value || typeof value !== "object") return false;
  const media = value as Media;
  return (
    typeof media.src === "string" &&
    (media.src.startsWith("/client-assets/") || secureUrl(media.src)) &&
    typeof media.alt === "string" &&
    media.width > 0 &&
    media.height > 0
  );
}

export const getContent = cache(async (): Promise<ClinicContent | null> => {
  let raw: string;
  if (process.env.CLIENT_CONTENT_JSON) raw = process.env.CLIENT_CONTENT_JSON;
  else {
    try {
      raw = await readFile(
        path.join(process.cwd(), ".local-client/content.json"),
        "utf8",
      );
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
      throw new Error("Não foi possível ler a configuração local.");
    }
  }
  let content: ClinicContent;
  try {
    content = JSON.parse(raw);
  } catch {
    throw new Error("A configuração do cliente precisa ser JSON válido.");
  }
  for (const field of [
    "name",
    "initials",
    "profession",
    "registration",
    "city",
    "addressName",
    "address",
    "email",
    "methodology",
  ] as const) {
    if (typeof content[field] !== "string" || !content[field].trim())
      throw new Error(`Campo de configuração ausente: ${field}.`);
  }
  if (
    !secureUrl(content.whatsapp, /^wa\.me$/) ||
    !/^\/\d{10,15}$/.test(new URL(content.whatsapp).pathname)
  )
    throw new Error("Configure um destino WhatsApp válido.");
  if (
    !secureUrl(content.instagram, /^(www\.)?instagram\.com$/) ||
    !secureUrl(content.mapsEmbed, /^(maps\.|www\.)?google\.com$/) ||
    !secureUrl(content.mapsRoute, /^www\.google\.com$/)
  )
    throw new Error("Revise os destinos de perfil e localização.");
  if (
    !validMedia(content.portrait) ||
    !Array.isArray(content.views) ||
    content.views.length !== 6 ||
    content.views.some(
      (view) => !validMedia(view) || !view.title || !view.short,
    )
  )
    throw new Error("Configure o retrato e os seis registros completos.");
  if (content.siteUrl && !secureUrl(content.siteUrl))
    throw new Error("A URL canônica precisa usar HTTPS.");
  return content;
});

export function contactUrl(
  content: Pick<ClinicContent, "whatsapp" | "name">,
  interest?: string,
) {
  const url = new URL(content.whatsapp);
  const shortName = content.name.split(/\s+/).slice(0, 2).join(" ");
  url.searchParams.set(
    "text",
    interest
      ? `Olá, ${shortName}! Vim pelo site e gostaria de conversar sobre ${interest}.`
      : `Olá, ${shortName}! Vim pelo site e gostaria de agendar uma avaliação.`,
  );
  return url.toString();
}
