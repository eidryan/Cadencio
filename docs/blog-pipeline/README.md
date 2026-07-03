# Blog Pipeline — produção de guias SEO com IA barata

Mecanismo para produzir guias de `/guias` usando modelos mais baratos (Haiku, GPT-4o-mini, Gemini Flash…), com validação automática para nada factualmente errado ir ao ar. **Publicar um guia não exige código nem watch demo** — é só adicionar um arquivo JSON.

## Workflow (5 passos)

1. **Escolha o tema** — veja `BACKLOG.md` ou crie um novo (palavra-chave que dono de estúdio buscaria).
2. **Gere com a IA barata** — cole no chat, nesta ordem: `PROMPT.md` inteiro → `CADENCIO-FACTS.md` inteiro → a linha do tema:
   ```
   TEMA: <assunto> | PALAVRA-CHAVE: <palavra-chave principal>
   ```
3. **Salve o JSON** retornado em `content/guias/<slug>.json` (nome do arquivo = slug).
4. **Valide**: `npm run validate:guias`. Erros bloqueiam (estrutura, categoria, demo inexistente, claims proibidos); avisos são recomendações de SEO. Revise o texto por 2 minutos — a validação pega estrutura e claims, não qualidade de escrita.
5. **Preview e publique**: `npm run dev` → confira `/guias/<slug>` → commit e push na `main` (deploy automático via Vercel). O guia entra sozinho na listagem `/guias` e no `sitemap.xml`.

O `npm run build` roda a validação automaticamente, então um JSON inválido nunca chega à produção.

## Arquivos do mecanismo

| Arquivo | Papel |
|---|---|
| `content/guias/*.json` | Um guia por arquivo — é isto que a IA produz |
| `docs/blog-pipeline/PROMPT.md` | Prompt pronto para colar em qualquer IA |
| `docs/blog-pipeline/CADENCIO-FACTS.md` | Fonte da verdade do produto (o que pode/não pode afirmar) |
| `docs/blog-pipeline/BACKLOG.md` | Temas e palavras-chave planejados |
| `scripts/validate-guides.mjs` | Portão de qualidade (roda no build) |
| `lib/organic-content.ts` | Carrega os JSONs e define os tipos/categorias |

## Manutenção

- **Nova feature no produto?** Atualize `CADENCIO-FACTS.md` (e a data de verificação). Se algo proibido passou a existir, remova também de `BANNED_CLAIMS` no validador.
- **Nova categoria de guia?** Adicione em `GuideCategory` (`lib/organic-content.ts`) E em `ALLOWED_CATEGORIES` (`scripts/validate-guides.mjs`).
- **Novo guia publicado?** Adicione o slug à lista de `relatedGuides` disponíveis no `PROMPT.md`.
- **Demo novo gravado?** Ele já fica disponível automaticamente; inclua o slug na lista de demos do `PROMPT.md`.

## Por que JSON e não markdown/MDX

As páginas de guia renderizam estrutura fixa (hero, seções, FAQ com schema.org FAQPage, JSON-LD de Article). JSON mantém a IA dentro dessa estrutura e permite validação campo a campo — um modelo barato produz JSON consistente com mais facilidade do que prosa livre bem estruturada.
