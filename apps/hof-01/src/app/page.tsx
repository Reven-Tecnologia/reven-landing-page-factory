import type { Metadata } from "next";
import Script from "next/script";
import { contactUrl, getContent, type ClinicContent } from "../lib/content";
import { siteTemplate } from "./site-template";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  if (!content) {
    return {
      title: "Atendimento estético | Rascunho",
      description: "Página em preparação para revisão de conteúdo.",
      robots: { index: false, follow: false },
    };
  }
  return {
    title: `${content.name} | Harmonização Facial e Corporal`,
    description: `Conheça o trabalho de ${content.name} em harmonização facial e corporal em ${content.city}. Explore resultados e agende sua avaliação pelo WhatsApp.`,
    robots: {
      index: content.indexingApproved === true,
      follow: content.indexingApproved === true,
    },
    ...(content.siteUrl
      ? {
          metadataBase: new URL(content.siteUrl),
          alternates: { canonical: "/" },
          openGraph: {
            type: "website" as const,
            locale: "pt_BR",
            url: "/",
            title: `${content.name} | Sua beleza, com a sua essência`,
            images: [
              {
                url: content.portrait.src,
                width: content.portrait.width,
                height: content.portrait.height,
                alt: content.portrait.alt,
              },
            ],
          },
        }
      : {}),
  };
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function renderApprovedSite(content: ClinicContent): string {
  const cityName = content.city.split(",")[0].trim();
  const stateCode = content.city.split(",")[1]?.trim() || "";
  const stateName = stateCode === "PB" ? "Paraíba" : stateCode;
  const shortName = content.name.split(/\s+/).slice(0, 2).join(" ");
  const [addressLine1, addressRest] = content.address.split(/\s+[—–-]\s+/, 2);
  const neighborhood = addressRest?.split(",")[0]?.trim() || addressRest || "";
  const phoneDigits = new URL(content.whatsapp).pathname.slice(1);
  const localPhone = phoneDigits.slice(2);
  const displayPhone =
    localPhone.length === 11
      ? `(${localPhone.slice(0, 2)}) ${localPhone.slice(2, 7)}-${localPhone.slice(7)}`
      : `+${phoneDigits}`;

  const values: Record<string, string> = {
    NAME: content.name,
    NAME_UPPER: content.name.toLocaleUpperCase("pt-BR"),
    SHORT_NAME: shortName,
    SHORT_NAME_UPPER: shortName.toLocaleUpperCase("pt-BR"),
    INITIALS: content.initials,
    CITY_UPPER: cityName.toLocaleUpperCase("pt-BR"),
    CITY_NAME: cityName,
    STATE_CODE: stateCode,
    STATE_NAME: stateName,
    ADDRESS_NAME: content.addressName,
    ADDRESS_LINE_1: addressLine1.trim(),
    NEIGHBORHOOD: neighborhood,
    REGISTRATION: content.registration,
    METHODOLOGY: content.methodology,
    PORTRAIT_SRC: content.portrait.src,
    EMAIL: content.email,
    INSTAGRAM: content.instagram,
    MAPS_ROUTE: content.mapsRoute,
    MAPS_EMBED: content.mapsEmbed,
    PHONE_DIGITS: phoneDigits,
    PHONE_DISPLAY: displayPhone,
    YEAR: String(new Date().getFullYear()),
    WHATSAPP: contactUrl(content),
  };
  content.views.forEach((view, index) => {
    values[`VIEW_${index}_SRC`] = view.src;
  });

  // Preserve the approved markup while supplying every identity and asset
  // from the private content file. Interest links keep their original message.
  const withInterestLinks = siteTemplate.replace(
    /<a\b([^>]*?)\shref="\{\{WHATSAPP\}\}"/g,
    (match, attributes: string) => {
      const interest = attributes.match(/data-interest="([^"]+)"/)?.[1];
      if (!interest) return match;
      return `<a${attributes} href="${escapeHtml(contactUrl(content, interest))}"`;
    },
  );
  return withInterestLinks.replace(
    /\{\{([A-Z_0-9]+)\}\}/g,
    (_, key: string) => {
      if (!(key in values))
        throw new Error(`Campo do template ausente: ${key}`);
      return escapeHtml(values[key]);
    },
  );
}

export default async function Page() {
  const content = await getContent();
  if (!content) {
    return (
      <main className="container section">
        <p className="eyebrow">Rascunho de atendimento</p>
        <h1>
          Página em <em>preparação.</em>
        </h1>
        <p>
          Identificação profissional, imagens e contato aguardam configuração.
        </p>
      </main>
    );
  }
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: renderApprovedSite(content) }} />
      <Script src="/site-interactions.js" strategy="afterInteractive" />
    </>
  );
}
