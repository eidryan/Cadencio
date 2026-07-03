# Watch Demos — Design

**Data:** 2026-07-01
**Objetivo:** Produzir os 4 vídeos de demonstração da página orgânica (`/guias`, `/demos`, `/demos/[slug]`) e ativar o player já existente, completando a estratégia de SEO.

## Contexto

Os 4 demos já existem como dados em `lib/organic-content.ts` (títulos, durações, transcripts, features relacionadas), mas todos com `videoUrl: null` e `thumbnail: null`. Os componentes `DemoCard` e `VideoDemoPanel` já renderizam `<video>` quando `videoUrl` é preenchido — a infra está pronta; falta produzir os vídeos.

Demos a produzir:

| Slug | Título | Duração alvo |
|------|--------|--------------|
| `chamada-de-turma-em-1-minuto` | Como fazer chamada de uma turma em menos de 1 minuto | 1 min |
| `cadastrar-turma-e-horarios` | Como cadastrar uma turma e definir horários | 1 min 10 s |
| `importar-alunos-planilha` | Como importar alunos de uma planilha para o Cadencio | 1 min 20 s |
| `historico-de-presenca-aluna` | Como consultar o histórico de presença de uma aluna | 55 s |

Todos os 4 fluxos existem no app (`saas` repo), incluindo importação via `/api/students/import`.

## Decisões (aprovadas em 2026-07-01)

- **Produção:** gravação automatizada via Playwright dirigindo o app real.
- **Ambiente:** app `saas` rodando localmente com seed demo dedicado — zero risco de dados reais.
- **Hospedagem:** MP4s otimizados commitados em `public/demos/` do repo Cadencio, servidos pela Vercel CDN.
- **Acabamento:** screencast limpo, sem áudio, sem legendas, sem vinheta. A página já exibe o transcript como texto.

## Arquitetura da solução

### 1. Seed demo (repo `saas`)

Novo script `prisma/seed-demo.js` criando tenant fictício **"Estúdio Aurora"**:

- 3-4 turmas com modalidades reais (Ballet Adulto, Jazz Iniciante, Contemporâneo, etc.)
- ~15 alunas com nomes fictícios plausíveis
- Grade de horários preenchida
- ~2 meses de histórico de presença
- Arquivo `alunas-exemplo.xlsx` compatível com o template de importação (para o demo 3 — o app importa Excel via `/api/students/import`, não CSV)
- Usuário OWNER com credenciais conhecidas para login nos scripts

Rodado apenas no banco de dev local. Nada toca produção.

### 2. Gravação (Playwright)

Um script por demo, executando exatamente os passos do transcript publicado na página (consistência conteúdo ↔ vídeo):

- Viewport 1920×1080, gravação WebM nativa do Playwright
- Ritmo deliberado: pausas entre cliques, scroll suave, sem saltos de mouse
- Login e navegação até o ponto inicial ficam fora do corte final

### 3. Pós-processamento (ffmpeg)

- Trim de início/fim (remover login/carregamentos)
- Ajuste de velocidade para bater com a duração prometida de cada demo
- Conversão WebM → MP4 H.264 (compatibilidade universal), texto nítido, alvo 3–8 MB por vídeo
- Thumbnail: frame representativo de cada vídeo exportado como WebP

### 4. Integração (repo `Cadencio`)

- Arquivos em `public/demos/{slug}.mp4` e `public/demos/{slug}-thumb.webp`
- Preencher `videoUrl` e `thumbnail` nos 4 objetos de `demos` em `lib/organic-content.ts`
- Adicionar `preload="metadata"` ao `<video>` em `VideoDemoPanel` para não pesar o carregamento
- Verificar que o JSON-LD `VideoObject` em `/demos/[slug]` emite `contentUrl` e `thumbnailUrl` (rich results de vídeo no Google)

### 5. Verificação

- Site rodando local: player funcional nas 3 superfícies (`/guias`, `/demos`, `/demos/[slug]`) e no painel dentro de cada guia
- Reprodução completa dos 4 vídeos
- Durações reais coerentes com `durationLabel`/`durationIso` (ajustar os dados se divergirem)
- JSON-LD validado (Rich Results Test ou inspeção do markup)
- `next build` limpo antes de deploy

## Fora de escopo (YAGNI)

- Video sitemap dedicado
- Legendas ou narração
- Upload para YouTube
- Vinhetas de marca

Todos podem ser adicionados depois sem retrabalho.

## Critérios de sucesso

1. Os 4 cards em `/guias` e `/demos` mostram player com poster em vez de "Vídeo em breve"
2. Vídeos reproduzem no navegador, mostram o fluxo real do produto e batem com o transcript
3. Cada MP4 ≤ 8 MB
4. VideoObject completo no JSON-LD das páginas de demo
5. Nenhum dado real de cliente aparece nos vídeos
