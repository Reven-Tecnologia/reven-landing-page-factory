# HOF-01 — aplicação Next.js independente

Landing de atendimento facial e corporal. Planejamento CRO e alternativas de arte estão em `docs/BRIEF.md` e `docs/PAGE_PLAN.md`. A composição final deriva da direção editorial de consulta. A raiz da factory e sua rota de cliente existente continuam em projetos separados desta aplicação.

## Organização e Git

Use **diretórios por aplicação**, não branches permanentes por cliente. Este diretório tem package.json, lockfile, configuração Next e testes próprios. A branch `codex/hof-cro-next` serve à revisão das alterações; depois do merge, a aplicação continua em `apps/hof-01`.

Na Vercel, importe o mesmo repositório como um projeto novo e selecione **Root Directory: `apps/hof-01`**, Framework: Next.js, Install Command: `npm ci`, Build Command: `npm run build`. Não há `rootDirectory` em vercel.json. A configuração é feita no painel do projeto. Documentação: https://vercel.com/docs/monorepos, consultada em 13/10/2026.

Nenhum projeto Vercel foi criado ou publicado nesta entrega.

## Conteúdo e fotografias

A skill do repositório proíbe dados pessoais versionados. Por isso, código e esquema entram no Git; identidade, contatos, URLs de evidência e fotos de pacientes ficam fora dele.

- Em desenvolvimento, configure `.local-client/content.json` a partir de `docs/content.example.json`. Os campos vazios são lacunas, não informações de publicação.
- As fotografias autorizadas vão em `public/client-assets/`, ignorado pelo Git. As dimensões e os caminhos devem corresponder ao JSON. Nenhuma fotografia foi retocada ou gerada.
- `CLIENT_CONTENT_JSON` tem prioridade sobre o arquivo local. Configure esse JSON diretamente no ambiente do projeto Vercel; não coloque dados ou credenciais em mensagens, comandos, .env versionado ou vercel.json.
- Com deploy via Git, os arquivos ignorados não chegam à Vercel. Use URLs HTTPS aprovadas de um armazenamento/CDN próprio no JSON e configure `CLIENT_ASSET_ORIGIN` com a origem exata para permitir otimização de imagens. O código não depende da hospedagem anterior.
- Alternativamente, o deploy manual por CLI pode enviar os arquivos locais autorizados de `public/client-assets/`. `.vercelignore` define esse pacote e exclui a configuração local: o JSON ainda precisa existir no ambiente do deploy. A presença dos arquivos nesse pacote é publicação e depende de aprovação, não do fato de estarem ignorados pelo Git.
- Os arquivos `_test/` são sintéticos e servem apenas a testes. Não fazem parte dos assets finais de uma publicação.
- Sem configuração, a aplicação mostra um rascunho neutro sem CTA externo. Configuração incompleta gera erro explícito de validação; nunca inventa telefone, endereço ou credencial.

O checkout desta entrega já contém os arquivos locais da prévia. Em um clone novo, é necessário fornecê-los novamente. A identificação completa do conselho, a sala e a autorização documental das imagens ainda precisam de revisão. A página permanece `noindex` por padrão; indexação requer `indexingApproved: true` e domínio aprovado em `siteUrl`.

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
