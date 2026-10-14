# Plano da página — HOF-01

Versão 3, 13/10/2026. Implementação autorizada; conteúdo clínico e publicação aguardam revisão profissional.

Frase estratégica: para quem considera cuidado estético facial ou corporal na região, apresentar uma avaliação individual com uma profissional identificada e registros reais do trabalho, permitindo consultar horários e condições pelo WhatsApp.

Objeção principal: “quem vai me atender e como decidir se o cuidado faz sentido para mim?”. Responder com retrato, identificação, áreas de atendimento, caso real contextualizado e expectativas para a avaliação. Resultados observados não são promessa.

CTA único: “Consultar horários pelo WhatsApp”. Links de rota, Instagram e exploração de casos servem a intenções secundárias específicas. Microconversão futura: clique; conversão final: agendamento confirmado. Não conectar analytics nesta rodada.

## Alternativas de direção de arte avaliadas antes do código

Materiais de partida: retrato em preto, acessórios dourados, seis imagens clínicas, paleta aprovada e composição anterior. Estudos visuais renderizados localmente em `.local-client/hof-01/ART_DIRECTIONS.html`. Não foi necessário copiar ou pesquisar outra clínica.

| Direção                  | Tipografia / imagem / ritmo                                                                                                      | Relação com a oferta                                                         | Risco                                                                                                                            |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| A. Editorial de consulta | Serifa expressiva e sans de leitura, retrato retangular dominante, marfim aberto, seções por pergunta de decisão; galeria ameixa | Equilibra identificação da profissional, convite à avaliação e exame do caso | Títulos abstratos poderiam enfraquecer a oferta; corrigir com mensagem concreta                                                  |
| B. Galeria de resultados | Primeira dobra centrada no caso, tipografia menor, mosaico denso de vistas, retrato depois                                       | Demonstra rapidamente o trabalho visual                                      | Supervaloriza um caso e enfraquece a individualização; fotos de comparação com luz diferente não sustentam promessa de resultado |
| C. Dossiê clínico        | Sans predominante, linhas, índices e metadados, retrato menor, casos em prancha                                                  | Facilita verificar atendimento e credenciais                                 | Aparência técnica e fria pode perder o acolhimento já aprovado; documentação real insuficiente para um dossiê detalhado          |

Escolha: **A, editorial de consulta**, incorporando apenas a precisão de legenda de C. Vence porque preserva o equilíbrio entre retrato, elegância e caso que o usuário aprovou, enquanto comunica o serviço e a ação de forma específica. Refutável se a oferta e o CTA não forem compreendidos na primeira dobra mobile, ou se a página parecer uma campanha de resultado garantido.

## Mapa de conteúdo e rascunho

| Seção                 | Decisão que facilita                        | Copy / conteúdo                                                                                                             | Prova                                          | Ação                                         |
| --------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | -------------------------------------------- |
| Abertura              | Entender atendimento, local e próximo passo | “Harmonização facial e corporal.” + “Avaliação individual em [cidade].”                                                     | Retrato, nome e registro da configuração local | Consultar horários                           |
| Áreas                 | Encontrar a conversa adequada               | Facial; pele; corporal. Procedimentos apenas do briefing; indicação e condições na avaliação                                | Serviços fornecidos pelo usuário               | WhatsApp contextual                          |
| Caso                  | Inspecionar a evidência disponível          | “Um caso. Seis registros.” Fotos completas, diferentes luzes e enquadramentos explicitados                                  | Seis arquivos fornecidos                       | Miniaturas, ampliar, setas, teclado, deslize |
| Profissional          | Identificar quem atende                     | “Quem conduz sua avaliação.” Formação declarada, conselho, vínculo metodológico sem extrapolar benefícios                   | Bio Site e materiais                           | Explorar perfil original                     |
| Antes de agendar      | Reduzir dúvidas e ajustar expectativa       | Como consultar horários; não precisar escolher procedimento; resultados variam; detalhes da avaliação discutidos no contato | Jornada definida no briefing                   | FAQ nativo                                   |
| Localização e contato | Viabilizar a visita e a conversa            | Endereço, mapa, rota, sala a confirmar, WhatsApp                                                                            | Links oficiais fornecidos                      | Consultar horários e traçar rota             |

## Critérios visuais e técnicos

- Manter marfim #faf7f3, champagne #efe5d8 e ameixa #4c2d40; dourado #886c46 apenas em índices e tipografia de contraste.
- Manter o retrato e a galeria como evidência. Remover contornos decorativos, estrelas, monograma grande, slogans genéricos, seção de passos redundante e encerramento “próximo capítulo”. Sem depoimentos ou selos fabricados.
- Playfair Display / DM Sans com Next Font, carregadas no próprio domínio; tipografia, recortes e responsividade revisados em 320/390/768/1440px.
- Mobile: serviço, localização e CTA primeiro; caso com imagem completa, miniaturas acessíveis e controles sem sobreposição. Desktop: retrato ao lado da oferta, vistas selecionáveis junto da imagem.
- Next.js App Router; página e metadados no servidor; galeria, menu e movimento em componentes cliente pequenos. Imagens responsivas com dimensões conhecidas. Animações opcionais, respeitando movimento reduzido; nenhum autoplay.
- Sem formulário, envio, pixels, cookies de marketing ou analytics. Clique abre WhatsApp; não simula agendamento confirmado.
- Nome/contatos/mídia configurados localmente ou via `CLIENT_CONTENT_JSON` no ambiente do deploy. Ausência de configuração produz rascunho neutro; nunca telefone fictício.
- `noindex` por padrão. Domínio canônico e indexação dependem de configuração e aprovação posterior.
- Aplicação independente em `apps/hof-01`, raiz de deploy própria. Branch `codex/hof-cro-next` para revisão; clientes não devem ficar em branches permanentes distintas.

## Pendências

Confirmar identificação completa do conselho, autorização de fotos, sala e condições da avaliação; revisar copy com a profissional; aprovar domínio e configuração de conteúdo antes de deploy. Isso não impede a transformação local autorizada.
