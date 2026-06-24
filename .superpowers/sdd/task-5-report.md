# Task 5 Report: Demo Library and Demo Detail Routes

## Scope
- `app/demos/page.tsx`
- `app/demos/[slug]/page.tsx`
- `tasks/todo.md`

## What Changed
- Added the `/demos` library route as a server page with:
  - `Navbar` and `Footer`
  - page metadata with canonical and Open Graph `type: "website"`
  - organization and software JSON-LD
  - PT-BR hero copy and a two-column grid of `DemoCard`
  - closing `TrialCtaBand`
- Added the `/demos/[slug]` detail route as a server page with:
  - Next.js 16 async `params` shape (`Promise<{ slug: string }>` plus `await`)
  - `generateStaticParams()` for all current demos
  - per-demo metadata with canonical and Open Graph `type: "website"`
  - `Breadcrumbs`, `VideoDemoPanel`, transcript steps, related guides, and final CTA
  - `buildDemoJsonLd(demo)` injection
- Updated `tasks/todo.md` with Task 5 checklist, constraints, and verification notes.

## Requirement Notes
- All visitor-facing copy added in these routes is Brazilian Portuguese.
- Both pages include `Navbar` and `Footer` to match `/guias`.
- The detail page keeps the honest video fallback; `VideoDemoPanel` still handles `videoUrl: null`.
- No client component conversion and no new dependencies.

## Verification
### `npm run lint`
- Result: blocked.
- Observed behavior: `npm run lint` stayed pending without useful output until manual interruption.
- Additional direct check: running `eslint .` directly returned `zsh:1: command not found: eslint`.
- Conclusion: lint remains unavailable in this checkout because ESLint tooling is not operational here.

### `npm run build`
- Result: passed.
- Next.js 16 build completed successfully and generated:
  - `/demos`
  - `/demos/chamada-de-turma-em-1-minuto`
  - `/demos/cadastrar-turma-e-horarios`
  - `/demos/importar-alunos-planilha`
  - `/demos/historico-de-presenca-aluna`

## Commit
- `4375fbd feat: add product demo pages`

## Concerns
- `npm run lint` is still not usable in the current environment.
- Full repo `tsc` remains out of scope and still has the known pre-existing issue in `components/scroll-birds.tsx`.

## Fix note
- Corrected the Task 5 commit SHA to match the actual git commit: `4375fbd`.
