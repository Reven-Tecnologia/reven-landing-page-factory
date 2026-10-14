import type { Metadata } from "next";
import Image from "next/image";
import { getContent, contactUrl } from "../lib/content";
import { Header } from "../components/header";
import { Contact } from "../components/contact";
import { Gallery } from "../components/gallery";
import { ClinicMap } from "../components/map";
import { Motion } from "../components/motion";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  if (!content)
    return {
      title: "Atendimento estético | Rascunho",
      description: "Página em preparação para revisão de conteúdo.",
      robots: { index: false, follow: false },
    };
  return {
    title: `${content.name} | Harmonização facial e corporal`,
    description: `Avaliação individual em ${content.city}. Conheça ${content.name}, explore os registros de um caso e consulte horários pelo WhatsApp.`,
    robots: {
      index: content.indexingApproved === true,
      follow: content.indexingApproved === true,
    },
    ...(content.siteUrl
      ? {
          metadataBase: new URL(content.siteUrl),
          alternates: { canonical: "/" },
          openGraph: {
            type: "website",
            locale: "pt_BR",
            url: "/",
            title: `${content.name} | Harmonização facial e corporal`,
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

export default async function Page() {
  const content = await getContent();
  if (!content)
    return (
      <main className="draft container">
        <p className="eyebrow">Rascunho de atendimento</p>
        <h1>
          Página em
          <br />
          <em>preparação.</em>
        </h1>
        <p>
          Identificação profissional, imagens e destino de contato serão
          apresentados após a configuração do conteúdo.
        </p>
      </main>
    );
  const contact = contactUrl(content);
  const services = [
    {
      title: "Harmonização facial",
      description:
        "Rinomodelação, toxina botulínica e preenchimentos fazem parte das áreas apresentadas pela profissional. A indicação de cada procedimento é individual.",
      interest: "harmonização facial",
      detail: "Rosto · avaliação de possibilidades",
    },
    {
      title: "Cuidados com a pele",
      description:
        "Converse sobre peelings e os cuidados que procura para a sua pele. Possibilidades, limitações e orientações são discutidas na avaliação.",
      interest: "cuidados com a pele",
      detail: "Pele · avaliação individual",
    },
    {
      title: "Harmonização corporal",
      description:
        "Conte qual região ou cuidado corporal deseja avaliar. Consulte os procedimentos oferecidos e as condições de atendimento pelo WhatsApp.",
      interest: "harmonização corporal",
      detail: "Corpo · consulta sobre atendimento",
    },
  ];
  const questions = [
    {
      title: "Como consultar horários e valores da avaliação?",
      answer:
        "Abra o WhatsApp pelo botão desta página. Na conversa, consulte disponibilidade, valores e orientações para a primeira visita. O contato não confirma um agendamento automaticamente.",
    },
    {
      title: "Preciso escolher um procedimento antes de entrar em contato?",
      answer:
        "Você pode começar contando o que deseja cuidar. A avaliação serve para conversar sobre seus objetivos e discutir indicações, possibilidades e limitações.",
    },
    {
      title: "O meu resultado será igual ao do caso apresentado?",
      answer:
        "As imagens são registros de um único caso. Características individuais, indicação e resposta ao cuidado variam. Há diferenças de luz e enquadramento nas comparações; elas não são garantia de resultado.",
    },
    {
      title: "O que devo confirmar antes da visita?",
      answer:
        "Confirme o horário, as condições da avaliação, a sala do consultório e as orientações para o atendimento diretamente na conversa de agendamento.",
    },
  ];
  return (
    <>
      <a className="skip" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header
        name={content.name}
        profession={content.profession}
        contact={contact}
      />
      <main id="conteudo" tabIndex={-1}>
        <section className="hero container" aria-labelledby="title">
          <div className="hero-copy">
            <p className="eyebrow">
              {content.city} <span aria-hidden="true">/</span> Atendimento com
              avaliação
            </p>
            <h1 id="title">
              <span>Harmonização</span>{" "}
              <span>
                facial <em>e corporal.</em>
              </span>
            </h1>
            <p className="hero-subtitle">
              Avaliação individual
              <br />
              com {content.name}.
            </p>
            <p className="hero-description">
              Conte o que deseja cuidar. A avaliação é o primeiro passo para
              discutir os procedimentos, suas possibilidades e seus limites.
            </p>
            <Contact href={contact} />
            <p className="contact-detail">
              Horários e condições da avaliação na conversa.
            </p>
            <a className="text-link hero-link" href="#caso">
              Examinar o caso apresentado <span aria-hidden="true">↓</span>
            </a>
          </div>
          <figure className="hero-portrait">
            <Image
              src={content.portrait.src}
              alt={content.portrait.alt}
              width={content.portrait.width}
              height={content.portrait.height}
              sizes="(max-width: 720px) calc(100vw - 40px), (max-width: 1100px) 46vw, 560px"
              preload
            />
            <figcaption>
              <span>{content.name}</span>
              <span>{content.registration}</span>
            </figcaption>
          </figure>
        </section>

        <section
          className="services section container"
          id="cuidados"
          aria-labelledby="care-title"
        >
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">Facial · pele · corporal</p>
              <h2 id="care-title">
                Áreas de
                <br />
                <em>atendimento.</em>
              </h2>
            </div>
            <p>
              Você pode entrar em contato mesmo sem saber qual procedimento
              escolher. Comece pela área que deseja avaliar.
            </p>
          </div>
          <div className="service-list">
            {services.map((service, i) => (
              <article className="service-row" key={service.title} data-reveal>
                <div>
                  <span className="index">0{i + 1}</span>
                  <h3>{service.title}</h3>
                </div>
                <div>
                  <p>{service.description}</p>
                  <span className="service-detail">{service.detail}</span>
                </div>
                <a
                  href={contactUrl(content, service.interest)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-describedby="contact-note"
                  className="service-contact"
                  data-contact
                  aria-label={`Consultar horários para ${service.title.toLocaleLowerCase("pt-BR")}`}
                >
                  <span>Consultar horários</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section
          className="case-section section"
          id="caso"
          aria-labelledby="case-title"
        >
          <div className="container">
            <div className="section-heading" data-reveal>
              <div>
                <p className="eyebrow">Registros do trabalho</p>
                <h2 id="case-title">
                  Um caso.
                  <br />
                  <em>Seis registros.</em>
                </h2>
              </div>
              <p>
                Vista frontal, sorriso, perfil, contorno e detalhes. Todas as
                imagens abaixo pertencem ao mesmo caso apresentado.
              </p>
            </div>
            <Gallery views={content.views} />
            <div className="case-footer">
              <p>
                Exemplos visuais para conhecer o trabalho. A indicação de um
                cuidado depende da avaliação individual.
              </p>
              <a
                className="text-link"
                href={content.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver o perfil original <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section
          className="professional section container"
          id="profissional"
          aria-labelledby="professional-title"
        >
          <figure className="professional-portrait" data-reveal>
            <Image
              src={content.portrait.src}
              alt={content.portrait.alt}
              width={content.portrait.width}
              height={content.portrait.height}
              sizes="(max-width: 720px) calc(100vw - 40px), 460px"
            />
            <figcaption>{content.name}</figcaption>
          </figure>
          <div className="professional-copy" data-reveal>
            <p className="eyebrow">A profissional</p>
            <h2 id="professional-title">
              Quem conduz
              <br />
              <em>sua avaliação.</em>
            </h2>
            <p className="professional-name">{content.name}</p>
            <p>
              {content.profession}, com atuação em harmonização facial e
              corporal. Atende em {content.city}, no {content.addressName}.
            </p>
            <dl>
              <div>
                <dt>Identificação profissional</dt>
                <dd>{content.registration}</dd>
              </div>
              <div>
                <dt>Atuação declarada</dt>
                <dd>{content.methodology}</dd>
              </div>
            </dl>
            <p>
              A conversa sobre seus objetivos e a avaliação precedem a decisão
              sobre os procedimentos.
            </p>
            <a
              className="text-link"
              href={content.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Conhecer o perfil da profissional{" "}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section className="faq section" aria-labelledby="faq-title">
          <div className="container faq-grid">
            <div data-reveal>
              <p className="eyebrow">Antes do primeiro contato</p>
              <h2 id="faq-title">
                Antes de
                <br />
                <em>agendar.</em>
              </h2>
              <p>
                O que vale saber para começar a conversa e preparar a visita.
              </p>
              <Contact href={contact} compact />
            </div>
            <div className="faq-list">
              {questions.map((question) => (
                <details key={question.title}>
                  <summary>
                    {question.title}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{question.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section
          className="location section container"
          id="localizacao"
          aria-labelledby="location-title"
        >
          <div className="location-copy" data-reveal>
            <p className="eyebrow">Endereço e agendamento</p>
            <h2 id="location-title">
              Sua avaliação
              <br />
              <em>em {content.city.split(",")[0]}.</em>
            </h2>
            <address>
              <strong>{content.addressName}</strong>
              <span>{content.address}</span>
            </address>
            <p className="location-note">
              Atendimento com agendamento.
              <br />
              Confirme a sala ao consultar os horários.
            </p>
            <a
              className="text-link"
              href={content.mapsRoute}
              target="_blank"
              rel="noopener noreferrer"
            >
              Traçar rota no Google Maps <span aria-hidden="true">↗</span>
            </a>
            <div className="location-contact">
              <Contact href={contact} />
              <p id="contact-note">
                O botão abre uma conversa no WhatsApp, em outra aba.
              </p>
              <a href={`mailto:${content.email}`}>{content.email}</a>
            </div>
          </div>
          <ClinicMap src={content.mapsEmbed} name={content.addressName} />
        </section>
      </main>
      <footer className="footer">
        <div className="container footer-inner">
          <div className="brand">
            <span>{content.name}</span>
            <small>
              {content.profession} · {content.registration}
            </small>
          </div>
          <div>
            <a
              href={content.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram ↗
            </a>
            <a
              href={contact}
              target="_blank"
              rel="noopener noreferrer"
              data-contact
              aria-describedby="contact-note"
            >
              WhatsApp ↗
            </a>
          </div>
          <span>{content.city}</span>
        </div>
      </footer>
      <Motion />
    </>
  );
}
