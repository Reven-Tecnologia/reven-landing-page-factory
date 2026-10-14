# QA — HOF-01, versão Next/CRO

13/10/2026. Estado: **implementação verificada, conteúdo e publicação pendentes de revisão profissional**. Navegador: Microsoft Edge via Playwright. URL local: http://127.0.0.1:3011. Revisão visual com configuração real local; testes automatizados com configuração sintética separada.

## Mensagem e conversão

- [x] Serviço, cidade, profissional e consulta de horários visíveis na primeira dobra mobile.
- [x] CTA único específico: consultar horários; não afirma que clique confirma agendamento.
- [x] Destino WhatsApp, mensagem contextual, abertura em outra aba e resposta da navegação verificados com interceptação no BrowserContext. Nenhuma mensagem enviada.
- [x] Casos descritos como seis vistas de uma mesma pessoa; diferenças de luz e enquadramento e variação individual explicitadas.
- [x] Não há depoimentos, contadores, urgência, eficácia, preço ou duração inventados.
- [x] Sem formulário, analytics ou eventos externos instalados.

## Direção de arte e crítica visual

- [x] Três estudos de composição avaliados antes do código: editorial de consulta, galeria de resultados, dossiê clínico. Escolha e riscos em PAGE_PLAN.md; estudo com fotos em arquivo local ignorado.
- [x] Preservados marfim/champagne/ameixa, serifa de contraste, retrato dominante e galeria selecionável.
- [x] Removidos contornos e estrelas decorativas, monograma grande, slogans abstratos, passos redundantes e CTA de encerramento sem informação nova.
- [x] Seções cumprem decisões distintas: serviço, área de atendimento, evidência, profissional, dúvidas e visita. Listas abertas para serviços; prova visual para o caso; definição factual para credenciais.
- [x] Capturas inspecionadas em 1440×1000, 768×1024, 390×844 e 320×900. Hero, página completa, galeria e modal registrados em `artifacts/qa/`, ignorado.
- [x] Nenhum overflow nas quatro larguras. Retrato com recorte responsivo; comparações clínicas integrais e proporcionais no visualizador.
- [x] Corrigidos: fontes carregadas porém não aplicadas (variáveis agora no elemento html); contraste do texto champagne (muted #6f626a); espera de imagens antes das capturas; separação textual do heading para leitura assistiva.

## Fluxo e acessibilidade

- [x] Menu mobile, âncoras, FAQ, miniaturas, setas, seleção por teclado, deslize e modal funcionando.
- [x] Escape fecha o modal e retorna foco ao acionador; setas trocam o registro; clique por deslize não abre modal acidentalmente.
- [x] Sem botão flutuante sobrepondo controles ou fotografias. Foco visível e rótulos acessíveis.
- [x] Teste axe de WCAG 2 A/AA e 2.1 AA sem violações detectadas nas configurações testadas. Não equivale a auditoria completa de leitor de tela.
- [x] Movimento reduzido desliga as animações; conteúdo sempre disponível se o efeito não executar.
- [x] Mapa automático por lazy loading, sem botão: iframe presente no HTML e carregamento verificado ao navegar até a seção. Rota continua disponível.

## Gates

- [x] `npm run build` da aplicação: aprovado; página estática, ícone por rota de servidor.
- [x] `npm run lint` da aplicação: aprovado, sem avisos finais.
- [x] `npm test` da aplicação: oito testes aprovados (quatro fluxos em desktop/mobile).
- [x] Factory: build e lint aprovados; 14 testes existentes aprovados. Alterações locais preexistentes não incluídas no commit desta entrega.
- [x] Fotos, JSON de cliente e capturas reais ignorados pelo Git; testes usam somente dados sintéticos. Nome, telefone e e-mail reais não entram nos arquivos versionados.
- [x] Metadados por configuração; idioma pt-BR, um h1 e `noindex` por padrão. URL canônica/social definitiva depende de domínio aprovado.

## Desempenho histórico — antes da prioridade por arquivos originais

Servidor `next start`, browser context novo por viewport. CDP mobile: latência 150 ms, download 200 KB/s e CPU 4×. Fonte e imagens servidas pela aplicação. Cache de otimização do servidor compartilhado entre as execuções; não comparar os tempos como amostras equivalentes de rede real.

| Viewport              | LCP local | CLS observado | Maior duração EventTiming | Recursos transferidos na jornada |
| --------------------- | --------- | ------------- | ------------------------- | -------------------------------- |
| Desktop 1440          | 2676 ms   | 0             | 32 ms                     | 408436 bytes                     |
| Mobile 390, throttled | 1920 ms   | 0,00057       | 152 ms                    | 334190 bytes                     |
| Tablet 768            | 360 ms    | 0             | 24 ms                     | 415900 bytes                     |
| Estreito 320          | 1952 ms   | 0             | 16 ms                     | 334190 bytes                     |

Fontes verificadas: Playfair Display e DM Sans, auto-hospedadas por Next Font. Zero imagens quebradas, zero erros de página, mapa não requisitado na abertura. Após o ajuste de qualidade descrito abaixo, estes números e pesos não caracterizam a versão atual. Esses números são medições locais; EventTiming não é INP de campo e não há aprovação de Core Web Vitals em produção. Capturas e JSON completos em `artifacts/qa/`.

`npm audit --omit=dev`: zero vulnerabilidades reportadas. Audit completo: cinco apontamentos altos na cadeia de ferramentas ESLint → fast-glob → micromatch → braces, incluindo GHSA-vfj7-8cjw-p6xm; não estão nas dependências de produção. A correção automática sugerida faria downgrade incompatível do eslint-config-next, portanto não foi aplicada. Não é justificativa para alterar o framework aprovado nesta transformação.

## Pendências

| Item                                            | Impacto                              | Estado                             |
| ----------------------------------------------- | ------------------------------------ | ---------------------------------- |
| Conselho completo, sala, condições da avaliação | Precisão do conteúdo para publicação | Confirmar com a profissional       |
| Permissão documental das imagens                | Autorização de divulgação            | Confirmar com a profissional       |
| Domínio e indexação                             | Metadados definitivos                | Não configurados                   |
| Dados/fotos no ambiente de deploy               | Git não envia os arquivos ignorados  | Fluxos descritos no README         |
| Vercel e medições de campo                      | Validação em hospedagem final        | Deploy não solicitado nesta rodada |

Aceite visual anterior do usuário orientou a composição. Esta transformação segue disponível para sua revisão local antes de qualquer publicação.

## Ajuste de qualidade e mapa — 13/10/2026

Pedido explícito do usuário: máxima qualidade disponível e mapa sem clique. Seis JPEGs copiados byte a byte das fontes de 1080×1080. Retrato: WebP lossless de 1263084 bytes com comparação de pixels RGBA sem diferenças em relação ao PNG de 1086×1448, preservando perfil ICC quando presente. `images.unoptimized: true` desliga a redução e a recompressão pelo Next.js. As seis imagens antigas em WebP já não são referenciadas pelo conteúdo local.

Build, lint e oito testes aprovados após o ajuste; teste do mapa atualizado para exigir iframe já presente, ausência de botão e carregamento após navegar. Verificação de navegador em 1440px confirma arquivos diretos, sem `/_next/image`, sem srcset reduzido, dimensões nativas 1080px para o caso e 1086px para o retrato. Respostas HTTP dos arquivos comparadas byte a byte com os arquivos locais; nenhuma diferença. Capturas: `original-quality.png` e `automatic-map.png` em `artifacts/qa/`. A qualidade prioriza maior volume de download; as métricas históricas acima precisam de nova medição no deploy final.

## Recuperação da identidade aprovada — 13/10/2026

Após feedback do usuário, restaurados hero com retrato em arco, monograma tipográfico, assinatura no retrato e os títulos da versão anterior, incluindo “Cada ângulo conta parte da história”. Também recuperado o encerramento editorial. A identificação do serviço e da região permanece no texto inicial; CTA continua específico e não confirma agendamento. Fotos originais, mapa automático, descrição de um único caso e respostas factuais preservados. Build, lint e oito testes aprovados, incluindo axe e reflow. Capturas desktop/mobile inspecionadas em `artifacts/qa/restored-*-hero.png` e `restored-*-full.png`. Preferência explícita do usuário documentada no plano.
