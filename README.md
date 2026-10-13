# Reven Landing Page Factory

Base **manual** para pesquisar, planejar, criar e revisar landing pages de oportunidades qualificadas pela Reven. Este repositório não automatiza prospecção, contato, publicação ou coleta de leads. O [projeto de planejamento geral](https://github.com/Reven-Tecnologia/reven-lp-template-pv1) continua separado.

## O que há aqui

- Uma página demonstrativa da própria Reven, feita em Next.js (App Router). Ela comprova o fluxo de construção e QA; **não é uma página de cliente nem uma identidade visual oficial**.
- A demonstração traz `noindex` de propósito; páginas reais só recebem metadados definitivos após aprovação de domínio e conteúdo.
- [Briefing](docs/BRIEF_TEMPLATE.md), [registro de referências](docs/REFERENCE_LOG_TEMPLATE.md), [plano da página](docs/PAGE_PLAN_TEMPLATE.md) e [checklist de QA](docs/QA_CHECKLIST.md) reutilizáveis. O [catálogo de fontes](docs/REFERENCE_SOURCES.md) é opcional.
- Testes locais de fluxo, responsividade e acessibilidade. Nenhum teste envia formulário ou publica conteúdo.
- Uma [skill do projeto](.agents/skills/landing-page-cro/SKILL.md) para orientar estratégia de conversão sem inventar provas ou promessas.

## Fluxo manual por lead

1. Copie os modelos pertinentes de `docs/` para uma pasta de trabalho do lead (fora do repositório se houver dados pessoais). Identifique fonte, data, evidências e lacunas.
2. Confirme produto, público, oferta, CTA e destino dos dados com o responsável. Sem isso, trabalhe em rascunho; não conecte um formulário real.
3. Se ajudar a definir a direção visual, consulte algumas fontes do [catálogo opcional](docs/REFERENCE_SOURCES.md) e registre **padrões** e URLs no [modelo de referências](docs/REFERENCE_LOG_TEMPLATE.md). Não é necessário visitar todos os sites; não copie layouts ou ativos protegidos.
4. Defina mensagem, ordem das seções, direção visual, prova disponível e eventos de conversão em `PAGE_PLAN_TEMPLATE.md`.
5. Implemente a página. Use a demonstração como referência técnica, não como molde visual obrigatório.
6. Rode os comandos abaixo e complete `QA_CHECKLIST.md` com evidências de desktop e mobile. Revise a página no navegador.
7. Peça aprovação humana de texto, fatos, dados, domínio, analytics e destino do formulário antes de publicar.

## Rodar localmente

Requer Node.js 20.9+ e npm.

```bash
npm install
npm run dev
```

Abra o endereço exibido pelo Next.js. Para validação:

```bash
npm run build
npm run lint
npx playwright install chromium
npm test
```

Os testes iniciam o servidor local. Uma captura desktop e mobile fica em `test-results/` quando os testes rodam. A pasta não é versionada.

## Regras de produção

- Fatos, depoimentos, números, logos e resultados só entram com fonte e autorização registrados.
- O CTA deve ter um destino funcional e explicitamente aprovado. O botão da demonstração leva apenas à seção de processo.
- Não use dados pessoais ou de leads no código, nos testes, no Git ou em capturas públicas.
- A entrega exige revisão visual, responsividade, acessibilidade, performance, SEO e o fluxo completo da conversão — não apenas build verde.
- Automação será tratada em etapa futura, após o processo manual estar validado.
