// Approved editorial site markup, with client details supplied at render time.
export const siteTemplate = String.raw`<div class="reading-progress" aria-hidden="true"></div>
  <svg class="svg-library" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs>
    <symbol id="arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>
    <symbol id="diagonal" viewBox="0 0 24 24"><path d="M6 18 18 6M6 6h12v12"/></symbol>
    <symbol id="pin" viewBox="0 0 24 24"><path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></symbol>
    <symbol id="wa" viewBox="0 0 24 24"><path d="M20.5 11.6a8.5 8.5 0 0 1-12.7 7.3L3 20.3l1.4-4.6A8.5 8.5 0 1 1 20.5 11.6Z"/><path d="M8.1 7.7c-.8 1-.3 3 1.4 4.9s3.8 2.8 4.9 2.4l1.1-1.3-2.1-1.2-.8.7c-1.2-.5-2.3-1.6-2.8-2.8l.6-.9-1.1-2.1Z"/></symbol>
    <symbol id="plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></symbol>
    <symbol id="close" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></symbol>
    <symbol id="star" viewBox="0 0 24 24"><path d="M12 2c0 6-4 10-10 10 6 0 10 4 10 10 0-6 4-10 10-10-6 0-10-4-10-10Z"/></symbol>
  </defs></svg>
  <a class="skip-link" href="#principal">Ir para o conteúdo</a>
  <header class="header">
    <div class="container header-inner">
      <a class="brand" href="#inicio" aria-label="{{NAME}}, início"><span class="monogram">{{INITIALS}}<span>✧</span></span><span class="brand-name">{{NAME}}<small>HARMONIZAÇÃO FACIAL E CORPORAL</small></span></a>
      <button class="menu-toggle" aria-expanded="false" aria-controls="navigation" aria-label="Abrir menu"><span></span><span></span></button>
      <nav id="navigation" aria-label="Navegação principal">
        <a href="#cuidado">Tratamentos</a><a href="#resultados">Resultados</a><a href="#sobre">A {{SHORT_NAME}}</a><a href="#localizacao">Localização</a>
        <a class="button button-small" data-whatsapp href="{{WHATSAPP}}" target="_blank" rel="noopener noreferrer">Agendar avaliação <svg><use href="#diagonal"/></svg></a>
      </nav>
    </div>
  </header>
  <main id="principal">
    <section class="hero" id="inicio" aria-labelledby="hero-title">
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="eyebrow"><span></span> BIOMÉDICA · {{CITY_UPPER}}, {{STATE_CODE}}</p>
          <h1 id="hero-title">Sua beleza,<br>com a sua<br><em>essência.</em></h1>
          <p class="hero-description">Harmonização facial e corporal com um olhar atento ao que faz você ser única.</p>
          <a class="button" data-whatsapp href="{{WHATSAPP}}" target="_blank" rel="noopener noreferrer">Agende sua avaliação <svg><use href="#arrow"/></svg></a>
          <a class="hero-secondary" href="#resultados">Conheça os resultados <span>↓</span></a>
          <div class="hero-location"><svg><use href="#pin"/></svg><span>{{ADDRESS_NAME}}<br><strong>{{CITY_NAME}}, {{STATE_NAME}}</strong></span></div>
        </div>
        <div class="hero-visual">
          <svg class="face-contour" viewBox="0 0 280 520" aria-hidden="true"><path d="M90 20c85 0 111 60 108 115-3 31-11 45-4 67l24 40c5 10-6 16-27 16l-5 24 11 12-15 12c15 16 13 30-3 42l-46 26c-15 8-19 24-17 48l4 67"/><path d="M39 28c-21 33-28 78-20 117 5 21 15 40 16 67 0 46-22 76-19 105 4 33 38 54 80 76"/><path d="M171 160c-20-7-37-5-50 6m68 122c-16-5-30-3-43 3"/></svg>
          <div class="portrait-frame"><img class="portrait" src="{{PORTRAIT_SRC}}" alt="{{NAME}}, biomédica especializada em harmonização facial e corporal" width="1086" height="1448" fetchpriority="high"></div>
          <div class="portrait-label"><span class="label-star">✧</span><div><small>UM OLHAR QUE VALORIZA VOCÊ</small><span>Ciência, anatomia <i>&</i> arte.</span></div></div>
          <span class="portrait-side">{{NAME_UPPER}}</span>
        </div>
      </div>
      <div class="hero-bottom container"><span>BELEZA COM IDENTIDADE</span><span class="line"></span><span>HARMONIA EM CADA DETALHE</span></div>
    </section>

    <section class="care section" id="cuidado" aria-labelledby="care-title">
      <div class="container">
        <div class="section-heading"><div><p class="eyebrow">CUIDADO QUE COMEÇA POR VOCÊ</p><h2 id="care-title">Cada detalhe.<br><em>Uma intenção.</em></h2></div><p>O primeiro passo é entender seus desejos. A avaliação individual orienta a escolha dos cuidados para o seu rosto e corpo.</p></div>
        <div class="treatments">
          <a class="treatment" data-whatsapp data-interest="harmonização facial" href="{{WHATSAPP}}" target="_blank" rel="noopener noreferrer"><span class="treatment-number">01</span><div><h3>Harmonização facial</h3><p>Um olhar para as proporções, os contornos e a identidade do seu rosto.</p><span class="treatment-tags">RINOMODELAÇÃO · TOXINA BOTULÍNICA · PREENCHIMENTOS</span></div><span class="round-arrow"><svg><use href="#diagonal"/></svg></span></a>
          <a class="treatment" data-whatsapp data-interest="cuidados com a pele" href="{{WHATSAPP}}" target="_blank" rel="noopener noreferrer"><span class="treatment-number">02</span><div><h3>Cuidados com a pele</h3><p>Atenção à sua pele, às suas necessidades e ao seu momento.</p><span class="treatment-tags">PEELINGS · AVALIAÇÃO INDIVIDUAL</span></div><span class="round-arrow"><svg><use href="#diagonal"/></svg></span></a>
          <a class="treatment" data-whatsapp data-interest="harmonização corporal" href="{{WHATSAPP}}" target="_blank" rel="noopener noreferrer"><span class="treatment-number">03</span><div><h3>Harmonização corporal</h3><p>Uma conversa sobre seus objetivos e as possibilidades de cuidado corporal.</p><span class="treatment-tags">PLANEJAMENTO PERSONALIZADO</span></div><span class="round-arrow"><svg><use href="#diagonal"/></svg></span></a>
        </div>
      </div>
    </section>

    <section class="results section" id="resultados" aria-labelledby="results-title">
      <div class="container">
        <div class="section-heading"><div><p class="eyebrow">O TRABALHO, DE PERTO</p><h2 id="results-title">Um caso.<br><em>Muitos detalhes.</em></h2></div><div class="results-intro"><p>A harmonia aparece no conjunto e em cada detalhe. Explore diferentes ângulos de um mesmo caso do trabalho da {{SHORT_NAME}}.</p></div></div>
        <div class="case-layout" id="gallery">
          <figure class="featured-case"><button class="case-image" id="open-case" aria-label="Ampliar registro: vista frontal"><img id="featured-image" src="{{VIEW_0_SRC}}" alt="Registro comparativo de um mesmo caso, em vista frontal" width="1080" height="1080" loading="lazy"><span class="zoom-label">Ampliar imagem <svg><use href="#plus"/></svg></span></button><figcaption><span id="featured-caption">Vista frontal</span><span>REGISTRO DO MESMO CASO</span></figcaption></figure>
          <div class="case-selector"><div class="case-selector-heading"><span class="case-kicker">UM OLHAR COMPLETO</span><svg><use href="#star"/></svg></div><h3>Cada ângulo conta<br> <em>parte da história.</em></h3><p>Selecione uma vista para explorar o registro em detalhe.</p>
            <div class="case-thumbnails" role="group" aria-label="Escolha um ângulo do caso">
              <button class="case-thumb" data-case="0" data-title="Vista frontal" aria-label="Mostrar vista frontal" aria-pressed="true"><img src="{{VIEW_0_SRC}}" alt="Comparação frontal do mesmo caso" width="1080" height="1080" loading="lazy"><span>Frontal</span></button>
              <button class="case-thumb" data-case="1" data-title="Expressão e sorriso" aria-label="Mostrar expressão e sorriso" aria-pressed="false"><img src="{{VIEW_1_SRC}}" alt="Comparação do mesmo caso sorrindo" width="1080" height="1080" loading="lazy"><span>Sorriso</span></button>
              <button class="case-thumb" data-case="2" data-title="Vista de perfil" aria-label="Mostrar vista de perfil" aria-pressed="false"><img src="{{VIEW_2_SRC}}" alt="Comparação do mesmo caso de perfil" width="1080" height="1080" loading="lazy"><span>Perfil</span></button>
              <button class="case-thumb" data-case="3" data-title="Contorno e proporções" aria-label="Mostrar contorno e proporções" aria-pressed="false"><img src="{{VIEW_3_SRC}}" alt="Comparação lateral do contorno do mesmo caso" width="1080" height="1080" loading="lazy"><span>Contorno</span></button>
              <button class="case-thumb" data-case="4" data-title="Detalhes dos lábios" aria-label="Mostrar detalhes dos lábios" aria-pressed="false"><img src="{{VIEW_4_SRC}}" alt="Comparação dos lábios do mesmo caso" width="1080" height="1080" loading="lazy"><span>Lábios</span></button>
              <button class="case-thumb" data-case="5" data-title="Detalhe lateral" aria-label="Mostrar detalhe lateral" aria-pressed="false"><img src="{{VIEW_5_SRC}}" alt="Comparação lateral aproximada dos lábios e nariz do mesmo caso" width="1080" height="1080" loading="lazy"><span>Detalhe</span></button>
            </div>
            <div class="gallery-controls"><button class="icon-button" id="previous-case" aria-label="Ver ângulo anterior"><svg class="reverse"><use href="#arrow"/></svg></button><span id="gallery-count" aria-live="polite">01 / 06 · Vista frontal</span><button class="icon-button" id="next-case" aria-label="Ver próximo ângulo"><svg><use href="#arrow"/></svg></button></div>
            <a class="text-link case-contact" data-whatsapp data-interest="uma avaliação de harmonização facial" href="{{WHATSAPP}}" target="_blank" rel="noopener noreferrer">Quero conversar sobre meu caso <svg><use href="#diagonal"/></svg></a>
          </div>
        </div>
        <div class="results-bottom"><p>Cada pessoa tem características próprias. Os resultados variam e a indicação depende de avaliação individual.</p><a class="text-link" href="{{INSTAGRAM}}" target="_blank" rel="noopener noreferrer">Mais no Instagram <svg><use href="#diagonal"/></svg></a></div>
      </div>
    </section>

    <section class="about section" id="sobre" aria-labelledby="about-title">
      <div class="container about-grid">
        <figure class="about-portrait"><div class="about-photo-frame"><img src="{{PORTRAIT_SRC}}" alt="{{NAME}}" width="1086" height="1448" loading="lazy"><span class="portrait-detail" aria-hidden="true">✧</span></div><figcaption><span>{{NAME}}</span><span>BIOMÉDICA</span></figcaption></figure>
        <div class="about-copy"><p class="eyebrow">CONHEÇA {{SHORT_NAME_UPPER}}</p><h2 id="about-title">Técnica e sensibilidade.<br><em>Um olhar só seu.</em></h2><p>Biomédica especializada em harmonização facial e corporal, a {{NAME}} reúne ciência, anatomia e arte na sua forma de olhar para a beleza.</p><p>Sua abordagem parte da individualidade: ouvir o que você busca e compreender as características que fazem parte da sua identidade.</p><div class="ambassador"><svg><use href="#star"/></svg><div><strong>{{METHODOLOGY}}</strong><span>Um dos destaques de sua trajetória profissional.</span></div></div><a class="text-link" data-whatsapp href="{{WHATSAPP}}" target="_blank" rel="noopener noreferrer">Converse sobre sua avaliação <svg><use href="#diagonal"/></svg></a></div>
      </div>
    </section>

    <section class="journey section" aria-labelledby="journey-title"><div class="container"><div class="section-heading"><div><p class="eyebrow">SEU PRIMEIRO PASSO</p><h2 id="journey-title">Vamos conversar<br><em>sobre você?</em></h2></div><a class="button" data-whatsapp href="{{WHATSAPP}}" target="_blank" rel="noopener noreferrer">Falar pelo WhatsApp <svg><use href="#wa"/></svg></a></div><div class="steps"><div><span>01</span><h3>Entre em contato</h3><p>Envie uma mensagem pelo WhatsApp e conte o que você gostaria de cuidar.</p></div><div><span>02</span><h3>Agende sua avaliação</h3><p>Converse sobre disponibilidade e os detalhes para a sua primeira visita.</p></div><div><span>03</span><h3>Conheça as possibilidades</h3><p>Na avaliação, seus objetivos e suas características orientam o planejamento.</p></div></div></div></section>

    <section class="faq section" aria-labelledby="faq-title"><div class="container faq-grid"><div><p class="eyebrow">ANTES DA SUA VISITA</p><h2 id="faq-title">Um pouco<br><em>mais de clareza.</em></h2><p class="faq-intro">Tem outra dúvida? Você pode conversar diretamente pelo WhatsApp.</p><a class="text-link" data-whatsapp data-interest="tirar uma dúvida antes de agendar" href="{{WHATSAPP}}" target="_blank" rel="noopener noreferrer">Tirar uma dúvida <svg><use href="#diagonal"/></svg></a></div><div class="faq-list"><details><summary>Como agendar uma avaliação?<svg><use href="#plus"/></svg></summary><p>Use um dos botões de WhatsApp desta página. Na conversa, você pode consultar disponibilidade, valores da avaliação e as orientações para o atendimento.</p></details><details><summary>Preciso saber qual procedimento quero?<svg><use href="#plus"/></svg></summary><p>Você pode começar contando o que deseja cuidar. A avaliação é o momento para conversar sobre seus objetivos e entender quais possibilidades podem fazer sentido para você.</p></details><details><summary>Os resultados serão iguais aos das fotos?<svg><use href="#plus"/></svg></summary><p>Os registros mostram casos individuais. Cada pessoa tem características próprias, e os resultados podem variar. As possibilidades e limitações devem ser discutidas na avaliação.</p></details><details><summary>Onde fica o consultório?<svg><use href="#plus"/></svg></summary><p>O endereço indicado pela {{SHORT_NAME}} é o {{ADDRESS_NAME}}, na {{ADDRESS_LINE_1}}, {{NEIGHBORHOOD}}, em {{CITY_NAME}}. Confirme a sala e os detalhes da visita pelo WhatsApp ao agendar.</p></details></div></div></section>

    <section class="location section" id="localizacao" aria-labelledby="location-title"><div class="container location-grid"><div class="location-copy"><p class="eyebrow">UM ENCONTRO COM O SEU CUIDADO</p><h2 id="location-title">Esperamos você<br><em>em {{CITY_NAME}}.</em></h2><address><strong>{{ADDRESS_NAME}}</strong><span>{{ADDRESS_LINE_1}}<br>{{NEIGHBORHOOD}} · {{CITY_NAME}}, {{STATE_CODE}}</span></address><p class="location-note">Atendimento com agendamento.<br>Confirme a sala ao marcar sua avaliação.</p><a class="text-link" href="{{MAPS_ROUTE}}" target="_blank" rel="noopener noreferrer">Traçar rota no Google Maps <svg><use href="#diagonal"/></svg></a><div class="contact-lines"><a href="tel:{{PHONE_DIGITS}}">{{PHONE_DISPLAY}}</a><a href="mailto:{{EMAIL}}">{{EMAIL}}</a></div></div><div class="map-wrap"><iframe title="Mapa do {{ADDRESS_NAME}} em {{CITY_NAME}}" src="{{MAPS_EMBED}}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe><a class="map-caption" href="{{MAPS_ROUTE}}" target="_blank" rel="noopener noreferrer"><svg><use href="#pin"/></svg><span>{{ADDRESS_NAME}}<small>{{CITY_UPPER}} · {{STATE_CODE}}</small></span><svg><use href="#diagonal"/></svg></a></div></div></section>

    <section class="closing"><div class="container closing-inner"><svg class="closing-star"><use href="#star"/></svg><p class="eyebrow">SUA BELEZA TEM UMA HISTÓRIA</p><h2>O próximo capítulo<br><em>começa com você.</em></h2><p>Converse com a {{SHORT_NAME}} e dê o primeiro passo para um cuidado pensado para a sua individualidade.</p><a class="button button-light" data-whatsapp href="{{WHATSAPP}}" target="_blank" rel="noopener noreferrer">Agende sua avaliação <svg><use href="#arrow"/></svg></a></div></section>
  </main>
  <footer><div class="container footer-main"><a class="brand" href="#inicio"><span class="monogram">{{INITIALS}}<span>✧</span></span><span class="brand-name">{{NAME}}<small>HARMONIZAÇÃO FACIAL E CORPORAL</small></span></a><div><a href="{{INSTAGRAM}}" target="_blank" rel="noopener noreferrer">Instagram <svg><use href="#diagonal"/></svg></a><a data-whatsapp href="{{WHATSAPP}}" target="_blank" rel="noopener noreferrer">WhatsApp <svg><use href="#diagonal"/></svg></a></div></div><div class="container footer-bottom"><span>© {{YEAR}} {{NAME}}</span><span>Biomédica · {{REGISTRATION}}</span><span>{{CITY_NAME}}, {{STATE_NAME}}</span></div></footer>
  <a class="floating-wa" data-whatsapp href="{{WHATSAPP}}" target="_blank" rel="noopener noreferrer" aria-label="Agendar avaliação pelo WhatsApp"><svg><use href="#wa"/></svg><span>Vamos conversar?</span></a>
  <dialog id="case-dialog" aria-labelledby="dialog-title"><div class="dialog-top"><p id="dialog-title">Vista frontal</p><button class="dialog-close icon-button" aria-label="Fechar imagem ampliada"><svg><use href="#close"/></svg></button></div><img id="dialog-image" src="{{VIEW_0_SRC}}" alt=""><div class="dialog-bottom"><button id="dialog-previous" class="icon-button" aria-label="Ângulo anterior"><svg class="reverse"><use href="#arrow"/></svg></button><p>Ângulos de um mesmo caso.<br>Resultados individuais; as possibilidades variam.</p><button id="dialog-next" class="icon-button" aria-label="Próximo ângulo"><svg><use href="#arrow"/></svg></button></div></dialog>`;
