# HOF-01 — aplicação Next.js independente

Landing de atendimento facial e corporal. A composição final recupera integralmente a versão anteriormente aprovada pelo usuário; a mudança é para Next.js App Router. O HTML aprovado fica em `src/app/site-template.ts`, o CSS em `src/app/globals.css` e as interações em `public/site-interactions.js`. O servidor Next preenche os dados da cliente a partir de configuração local ou de ambiente. O histórico do plano CRO está em `docs/PAGE_PLAN.md`.

## Deploy atual na Vercel

- Projeto: `cesar-brazs-projects/dra-luana-macedo-hof`.
- Produção: https://dra-luana-macedo-hof.vercel.app/ (pública). Prévia protegida pela autenticação Vercel.
- Publicação atual feita por CLI a partir deste diretório. O projeto está ligado localmente em `.vercel/`, ignorado pelo Git; `Root Directory` no projeto é `.` para este fluxo.
- `CLIENT_CONTENT_JSON` está configurado no ambiente de prévia e produção da Vercel; os valores não estão neste repositório.
- O projeto ainda não tem integração Git: a tentativa de conectar `Reven-Tecnologia/reven-landing-page-factory` foi recusada por falta de acesso da integração GitHub da Vercel. Para deploy automático por push, conceder acesso desse repositório à integração, conectar o projeto, configurar `Root Directory: apps/hof-01` e revisar a branch de produção. A aplicação ainda não está na `main`.
- O conteúdo está com `noindex` até aprovação de indexação e domínio definitivo. Para publicar manualmente nova versão, executar `npx vercel deploy --prod --scope cesar-brazs-projects` nesta pasta.

## Organização e Git

Use **diretórios por aplicação**, não branches permanentes por cliente. Este diretório tem package.json, lockfile, configuração Next e testes próprios. A branch `codex/hof-cro-next` serve à revisão das alterações; depois do merge, a aplicação continua em `apps/hof-01`.

Quando a integração Git estiver disponível, configure **Root Directory: `apps/hof-01`**, Framework: Next.js, Install Command: `npm ci`, Build Command: `npm run build`. Não há `rootDirectory` em `vercel.json`. Documentação: https://vercel.com/docs/monorepos, consultada em 13/10/2026.

## Conteúdo e fotografias

O usuário autorizou explicitamente o versionamento das imagens públicas usadas nesta página. Os seis registros do caso e o retrato estão no Git. Identidade, contatos e demais dados da configuração continuam fora dele.

- Em desenvolvimento, configure `.local-client/content.json` a partir de `docs/content.example.json`. Os campos vazios são lacunas, não informações de publicação.
- As sete imagens usadas vão em `public/client-assets/` e são versionadas por uma lista explícita no `.gitignore`. As seis comparações são cópias dos JPEGs fornecidos; o retrato é WebP lossless do PNG fornecido. As dimensões e os caminhos devem corresponder ao JSON.
- `CLIENT_CONTENT_JSON` tem prioridade sobre o arquivo local. Configure esse JSON diretamente no ambiente do projeto Vercel; não coloque dados ou credenciais em mensagens, comandos, .env versionado ou vercel.json.
- Com deploy via Git, as sete imagens acompanham o projeto Vercel automaticamente. `CLIENT_ASSET_ORIGIN` só é necessário se o JSON passar a apontar para um armazenamento externo. As imagens são entregues sem otimização ou recompressão para preservar os arquivos originais.
- `.vercelignore` exclui a configuração local e os arquivos sintéticos de teste. O JSON ainda precisa existir no ambiente do deploy.
- Os arquivos `_test/` são sintéticos e servem apenas a testes. Não fazem parte dos assets finais de uma publicação.
- Sem configuração, a aplicação mostra um rascunho neutro sem CTA externo. Configuração incompleta gera erro explícito de validação; nunca inventa telefone, endereço ou credencial.

Um clone novo já recebe as sete imagens. A configuração da cliente deve ser fornecida separadamente. A página permanece `noindex` por padrão; indexação requer `indexingApproved: true` e domínio aprovado em `siteUrl`.

## Rodar e verificar

```powershell
cd apps/hof-01
npm ci
npm run build
npm run lint
$env:PLAYWRIGHT_BROWSER_CHANNEL = 'msedge'
npm test
npm run start -- --hostname 127.0.0.1
```

Prévia de produção: http://127.0.0.1:3011. Com o servidor ativo, `npm run qa` registra capturas e métricas CDP locais em `artifacts/qa/`, ignorado pelo Git. Se usar Chromium instalado pelo Playwright, omita a variável do Edge.

Os testes usam somente uma configuração sintética no servidor de teste (porta 3012), interceptam o WhatsApp e o mapa e não enviam mensagens. A revisão visual da prévia real é feita separadamente na porta 3011. A configuração sintética não altera o JSON local nem entra no build de produção.

Não foram adicionados analytics, cookies de marketing, formulário, integração com CRM ou publicação automática. Contato abre o WhatsApp; clique não equivale a agendamento.

## Qualidade das imagens e mapa

As seis vistas devem usar os JPEGs originais, sem nova compressão. O retrato local foi convertido do PNG para WebP lossless, com igualdade de pixels verificada. O Next entrega o arquivo original: `images.unoptimized: true`. A galeria, suas miniaturas e o modal usam a mesma fonte completa. Nos arquivos locais desta versão, as vistas usam `.jpg`; o retrato usa `.webp`. O mapa carrega automaticamente por lazy loading, sem exigir clique.
