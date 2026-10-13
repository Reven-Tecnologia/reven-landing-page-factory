# Instruções para agentes

Este repositório é a base **manual** de produção de landing pages da Reven. O projeto `reven-lp-template-pv1` mantém o planejamento da operação mais ampla. Não acople os dois nem implemente prospecção, orquestração, envio de mensagens, CRM ou publicação automática sem pedido explícito.

Antes de criar uma página de cliente:

1. Leia o briefing, o plano e as evidências do lead. Se produto, público, oferta, CTA ou destino do formulário estiverem indefinidos, registre a lacuna e mantenha a página como rascunho.
2. Separe fatos verificados, hipóteses e placeholders. Nunca invente prova social, resultados, certificações, preços, escassez ou claims de saúde/finanças.
3. Depois do briefing e antes do código, explore direções visuais distintas que façam sentido para o produto, público, posicionamento e ativos disponíveis. Registre as alternativas consideradas, seus motivos e riscos, a direção escolhida e por que ela venceu. Não adote o primeiro estilo encontrado por padrão.
4. Use referências do cliente como ponto de partida. Quando pesquisa externa ajudar a decidir, consulte seletivamente `docs/REFERENCE_SOURCES.md` (ou outras fontes pertinentes) e registre páginas específicas, padrões úteis, URL e data em `docs/REFERENCE_LOG_TEMPLATE.md`. Não replique uma página existente.
5. Conecte tipografia, composição, imagens e ritmo à mensagem e ao negócio. Não use arte abstrata ou padrões decorativos apenas por serem fáceis de implementar. A página demo deste repositório não é uma identidade fixa para clientes.
6. Faça QA em desktop e mobile, incluindo crítica visual da página renderizada contra a direção escolhida, fluxo de CTA, teclado, contraste, imagens, metadados, velocidade e eventual formulário. Documente limites do teste.
7. Não publique, conecte analytics, envie dados reais ou faça contato externo sem autorização específica.

Use `.agents/skills/landing-page-cro/SKILL.md` para planejar a comunicação. Antes de concluir alterações de interface, execute `npm run build`, `npm run lint` e `npm test`, e inspecione o resultado no navegador. Atualize documentação e testes quando mudar o fluxo.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
