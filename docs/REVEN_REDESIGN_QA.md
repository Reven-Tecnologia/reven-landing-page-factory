# QA do experimento Reven

- Data: 13/10/2026
- Estado: rascunho para avaliação; sem publicação
- Ambiente: Next.js 16.4.0 em servidor local de produção; Microsoft Edge com Playwright
- Capturas: `test-results/home-a-nova-página-comunica-a-oferta-e-o-CTA-abre-o-contato-desktop/pagina.png` e equivalente `mobile/pagina.png` (arquivos locais ignorados pelo repositório)

## Resultado

- Build de produção, lint e quatro testes Playwright aprovados. Como `npm` não estava no PATH, os binários locais foram executados com `node`.
- Desktop e mobile inspecionados visualmente. A peça principal mostra a estrutura de uma página comentada, em lugar de ilustração abstrata. A hierarquia e os recortes se mantêm nas duas larguras.
- CTA principal e CTA final apontam para `mailto` configurado em `.env.local`; não foi enviado email. Navegação interna, link de pular conteúdo e foco pelo teclado foram testados.
- Sem overflow horizontal nem violações sérias ou críticas identificadas pelo axe. Contrastes insuficientes encontrados na primeira execução foram corrigidos.
- Inspeção de uma navegação local em Edge: DOMContentLoaded 163 ms, load 249 ms, oito recursos e 178.059 bytes transferidos para recursos; nenhum erro de página ou resposta HTTP >= 400. São medidas locais de uma execução, não dados de usuários.

## Limites e pendências

- Não houve medição Lighthouse nem dados de campo de LCP, CLS ou INP.
- Não foi enviado email nem testada a abertura do aplicativo externo de email; foi validado o destino `mailto`.
- Público prioritário, escopo comercial definitivo, marca e ativos reais ainda precisam de confirmação. O exemplo de página é conceitual e está identificado como tal.
- Sem portfólio, depoimentos, resultados, preços, formulário, analytics, domínio ou aprovação de publicação.
- A página permanece com `noindex`.
