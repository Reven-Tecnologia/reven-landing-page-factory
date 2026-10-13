const email = process.env.CONTACT_EMAIL;
const contactHref = email
  ? `mailto:${email}?subject=Projeto%20de%20landing%20page`
  : "#contato";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="site-header" id="inicio">
        <div className="wrap header-row">
          <a
            className="brand"
            href="#inicio"
            aria-label="Reven, voltar ao início"
          >
            <span className="brand-mark" aria-hidden="true">
              R<span>.</span>
            </span>
            <span className="brand-name">REVEN</span>
          </a>
          <nav aria-label="Navegação principal">
            <a href="#exemplo">A página</a>
            <a href="#decisoes">Como pensamos</a>
            <a className="header-contact" href="#contato">
              Contato <Arrow />
            </a>
          </nav>
        </div>
      </header>

      <main id="conteudo">
        <section className="hero" aria-labelledby="hero-title">
          <div className="wrap hero-inner">
            <div className="hero-kicker">
              <span className="red-dot" /> LANDING PAGES / ESTRATÉGIA + DESIGN +
              CÓDIGO
            </div>
            <h1 id="hero-title">
              Sua oferta precisa
              <br />
              ser <em>entendida.</em>
            </h1>
            <div className="hero-bottom">
              <p>
                Planejamos, desenhamos e desenvolvemos landing pages a partir do
                que seu público precisa saber para dar o próximo passo.
              </p>
              <a className="text-link hero-link" href={contactHref}>
                Conversar sobre uma página <Arrow />
              </a>
            </div>
            <div className="hero-index" aria-hidden="true">
              <span>REVEN — ESTÚDIO DIGITAL</span>
              <span>DESÇA PARA VER COMO PENSAMOS ↓</span>
            </div>
          </div>
        </section>

        <section
          className="showcase"
          id="exemplo"
          aria-labelledby="example-title"
        >
          <div className="wrap showcase-top">
            <p className="section-label">01 / PÁGINA EM ABERTO</p>
            <div>
              <h2 id="example-title">
                Uma página começa com perguntas melhores.
              </h2>
              <p className="section-intro">
                Antes de escolher cores e componentes, precisamos decidir o que
                merece aparecer, o que comprova a mensagem e qual ação faz
                sentido pedir.
              </p>
            </div>
          </div>

          <div
            className="wrap page-study"
            aria-label="Demonstração conceitual da estrutura de uma landing page"
          >
            <div className="study-topline">
              <span>ESTUDO DE ESTRUTURA / NÃO É UM PROJETO DE CLIENTE</span>
              <span>REVEN — 01</span>
            </div>
            <div className="study-layout">
              <div className="study-rail">
                <span className="rail-title">ANOTAÇÕES</span>
                <span className="rail-note rail-note-one">
                  <b>01</b> Dizer para quem é e o que está sendo oferecido.
                </span>
                <span className="rail-note rail-note-two">
                  <b>02</b> Colocar a evidência perto da afirmação.
                </span>
                <span className="rail-note rail-note-three">
                  <b>03</b> Pedir uma ação concreta e possível.
                </span>
              </div>
              <div className="page-sample">
                <div className="sample-nav">
                  <span>MARCA / EXEMPLO</span>
                  <span>MENU&nbsp; &nbsp; CONTATO ↗</span>
                </div>
                <div className="sample-hero">
                  <p>OFERTA / VISÃO GERAL</p>
                  <h3>Uma proposta clara muda toda a página.</h3>
                  <div className="sample-line" />
                  <div className="sample-line short" />
                  <span className="sample-button">
                    AÇÃO PRINCIPAL <Arrow />
                  </span>
                </div>
                <div className="sample-proof">
                  <span>O QUE É</span>
                  <span>POR QUE CONFIAR</span>
                  <span>PRÓXIMO PASSO</span>
                </div>
                <div className="sample-body">
                  <div>
                    <span className="sample-number">01</span>
                    <strong>Contexto antes da promessa.</strong>
                    <p>Conteúdo que responde à dúvida real de quem chegou.</p>
                  </div>
                  <div>
                    <span className="sample-number">02</span>
                    <strong>Prova perto da decisão.</strong>
                    <p>Afirmações apoiadas no que pode ser demonstrado.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="study-caption">
              <span>ESTRUTURA ILUSTRATIVA</span>
              <p>
                O projeto real parte de uma oferta, de pessoas e de evidências
                reais. Este desenho mostra o tipo de decisão que molda a página.
              </p>
            </div>
          </div>
        </section>

        <section
          className="decisions"
          id="decisoes"
          aria-labelledby="decisions-title"
        >
          <div className="wrap decisions-grid">
            <div className="decisions-heading">
              <p className="section-label">02 / O QUE DEFINIMOS</p>
              <h2 id="decisions-title">O desenho vem depois da decisão.</h2>
            </div>
            <div className="decision-list">
              <article>
                <span>01</span>
                <div>
                  <h3>O que dizer</h3>
                  <p>
                    Do briefing saem a proposta de valor, a objeção principal e
                    uma ordem de conteúdo que acompanha a decisão do visitante.
                  </p>
                </div>
              </article>
              <article>
                <span>02</span>
                <div>
                  <h3>O que mostrar</h3>
                  <p>
                    Exploramos composições, tipografia e imagens adequadas ao
                    público. A direção escolhida precisa ajudar a mostrar a
                    oferta.
                  </p>
                </div>
              </article>
              <article>
                <span>03</span>
                <div>
                  <h3>Como funcionar</h3>
                  <p>
                    Implementamos a página e conferimos desktop, mobile,
                    teclado, velocidade e o caminho até o contato.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section
          className="contact"
          id="contato"
          aria-labelledby="contact-title"
        >
          <div className="wrap contact-inner">
            <p className="section-label">03 / PRÓXIMO PASSO</p>
            <h2 id="contact-title">
              Sua oferta tem uma história.
              <br />
              <em>Vamos desenhar a página?</em>
            </h2>
            <div className="contact-bottom">
              <p>
                Conte o que você vende, para quem e qual ação espera da página.
                A conversa começa por aí.
              </p>
              {email ? (
                <a className="contact-button" href={contactHref}>
                  Escrever para a Reven <Arrow />
                </a>
              ) : (
                <p className="contact-pending">
                  Canal de contato em definição. Esta página permanece em
                  rascunho.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <a className="footer-brand" href="#inicio">
            REVEN<span>.</span>
          </a>
          <span>DEMONSTRAÇÃO / NÃO PUBLICADA</span>
          <a href="#inicio">Voltar ao início ↑</a>
        </div>
      </footer>
    </>
  );
}
