export default function Home() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="site-header">
        <div className="shell header-inner">
          <a className="wordmark" href="#inicio">
            <span className="wordmark-symbol" aria-hidden="true">
              R<span>.</span>
            </span>
            <span>REVEN</span>
          </a>
          <nav aria-label="Navegação principal">
            <a href="#metodo">Método</a>
            <a href="#entrega">Entrega</a>
            <a className="nav-cta" href="#processo">
              Ver processo <span aria-hidden="true">↗</span>
            </a>
          </nav>
        </div>
      </header>

      <main id="conteudo">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="eyebrow-line"></span> Laboratório de landing
                pages
              </p>
              <h1 id="hero-title">
                Uma boa página não começa pelo <em>layout.</em>
              </h1>
              <p className="hero-lede">
                Começa por entender o negócio, a pessoa do outro lado e a
                decisão que precisa acontecer. Depois, cada palavra e cada pixel
                ganham uma função.
              </p>
              <a className="button button-primary" href="#processo">
                Conheça nosso processo <span aria-hidden="true">↗</span>
              </a>
              <p className="hero-note">
                Uma demonstração do método manual da Reven — não uma promessa de
                resultados.
              </p>
            </div>
            <div className="hero-art" aria-hidden="true">
              <div className="art-frame">
                <div className="art-top">
                  <span>01 / INTENÇÃO</span>
                  <span>REVEN®</span>
                </div>
                <div className="art-orbit orbit-one"></div>
                <div className="art-orbit orbit-two"></div>
                <div className="art-orbit orbit-three"></div>
                <div className="art-center">
                  <span className="art-cross">✳</span>
                  <span>
                    IDEIA
                    <br />→<br />
                    AÇÃO
                  </span>
                </div>
                <div className="art-bottom">
                  <span>ESTRATÉGIA</span>
                  <span>DESIGN</span>
                  <span>VALIDAÇÃO</span>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-rail" aria-hidden="true">
            <div className="shell">
              <span>ESTRATÉGIA ANTES DA ESTÉTICA</span>
              <span>✳</span>
              <span>CLAREZA ANTES DO CLIQUE</span>
              <span>✳</span>
              <span>QUALIDADE ATÉ O ÚLTIMO PIXEL</span>
            </div>
          </div>
        </section>

        <section
          className="section intro"
          id="metodo"
          aria-labelledby="metodo-title"
        >
          <div className="shell intro-grid">
            <div>
              <p className="section-number">01 / O PRINCÍPIO</p>
              <h2 id="metodo-title">
                Menos fórmula.
                <br />
                <em>Mais contexto.</em>
              </h2>
            </div>
            <div className="intro-copy">
              <p>
                Uma landing page não é uma coleção de blocos bonitos. É uma
                conversa desenhada para ajudar alguém a entender uma oferta e
                decidir o próximo passo.
              </p>
              <p>
                Por isso, investigamos antes de escrever, estruturamos antes de
                desenhar e testamos antes de considerar a página pronta.
              </p>
            </div>
          </div>
        </section>

        <section
          className="section method"
          id="processo"
          aria-labelledby="processo-title"
        >
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="section-number">02 / COMO TRABALHAMOS</p>
                <h2 id="processo-title">Do insight à página.</h2>
              </div>
              <p>
                Um processo simples o bastante para começar manualmente.
                Rigoroso o bastante para não pular o que importa.
              </p>
            </div>
            <div className="steps">
              <article className="step">
                <span className="step-index">01</span>
                <div>
                  <h3>Entender</h3>
                  <p>
                    Produto, público, oferta, objeções e evidências reais. O
                    briefing define o que podemos afirmar e o que ainda precisa
                    ser validado.
                  </p>
                </div>
                <span className="step-icon" aria-hidden="true">
                  ↗
                </span>
              </article>
              <article className="step">
                <span className="step-index">02</span>
                <div>
                  <h3>Dar forma</h3>
                  <p>
                    Mensagem, direção visual e fluxo de conversão. O design
                    nasce do contexto — não de um template que apenas troca
                    cores.
                  </p>
                </div>
                <span className="step-icon" aria-hidden="true">
                  ↗
                </span>
              </article>
              <article className="step">
                <span className="step-index">03</span>
                <div>
                  <h3>Verificar</h3>
                  <p>
                    Testes reais em desktop e mobile, revisão de acessibilidade,
                    performance, SEO e funcionamento do caminho até a ação.
                  </p>
                </div>
                <span className="step-icon" aria-hidden="true">
                  ↗
                </span>
              </article>
            </div>
          </div>
        </section>

        <section
          className="section delivery"
          id="entrega"
          aria-labelledby="entrega-title"
        >
          <div className="shell delivery-grid">
            <div>
              <p className="section-number">03 / O PADRÃO</p>
              <h2 id="entrega-title">
                Bonita no primeiro olhar.
                <br />
                <em>Boa até o último clique.</em>
              </h2>
            </div>
            <div className="delivery-list">
              <p>
                <span aria-hidden="true">✳</span> Texto que esclarece, sem
                promessas inventadas.
              </p>
              <p>
                <span aria-hidden="true">✳</span> Experiência confortável em
                qualquer tela.
              </p>
              <p>
                <span aria-hidden="true">✳</span> Acessibilidade e velocidade
                como parte do design.
              </p>
              <p>
                <span aria-hidden="true">✳</span> Uma ação principal clara — e
                verificável.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <div>
            <span className="footer-mark">
              R<span>.</span>
            </span>
            <p>Landing pages com intenção.</p>
          </div>
          <span>REVEN / DEMONSTRAÇÃO INTERNA</span>
        </div>
      </footer>
    </>
  );
}
