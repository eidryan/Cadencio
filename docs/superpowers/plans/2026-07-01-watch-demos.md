# Watch Demos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produzir os 4 vídeos de demonstração da página orgânica do Cadencio (gravados do app real via Playwright) e ativar o player já existente em `/guias`, `/demos` e `/demos/[slug]`.

**Architecture:** Um seed dedicado cria o tenant fictício "Estúdio Aurora" no banco de dev; scripts Playwright (em `demo-videos/` no repo `saas`) dirigem o app local e gravam WebM com cursor sintético; ffmpeg converte para MP4 H.264 + thumbnails WebP; os arquivos finais entram em `public/demos/` do repo `Cadencio` e os campos `videoUrl`/`thumbnail` são preenchidos em `lib/organic-content.ts`.

**Tech Stack:** Node 20+, Prisma 6, Playwright (chromium), ffmpeg, Next.js (dois repos), bcryptjs, xlsx.

**Spec:** `docs/superpowers/specs/2026-07-01-watch-demos-design.md` (repo Cadencio)

## Global Constraints

- **Dois repositórios:** app = `/Users/luancarvalho/Documents/github/saas` · site = `/Users/luancarvalho/Documents/github/Cadencio`. Cada task diz em qual repo trabalha e commita.
- **NUNCA rodar o seed contra produção.** O seed exige `DEMO_SEED=1`, imprime o host do banco e só toca dados do tenant `estudio-aurora`. Se o host de `DATABASE_URL` em `.env.local` parecer ser o branch principal/produção do Neon, PARE e pergunte ao usuário.
- **Nenhum dado real de cliente** pode aparecer nos vídeos. Só o tenant fictício `estudio-aurora`.
- **Vídeos finais:** MP4 H.264, 1920×1080, 30fps, sem áudio, `+faststart`, ≤ 8 MB cada.
- **Credenciais do tenant demo:** `demo@cadencio.app` / `DemoAurora123` (criadas na Task 1, usadas por todos os scripts).
- **Checkpoints humanos obrigatórios:** Task 8 (revisão dos vídeos brutos) e Task 11 (antes de deploy). PARE e aguarde o usuário — não prossiga sozinho.
- **App dev server:** os cenários gravam contra `http://localhost:3000` (repo saas, `npm run dev`).
- Datas no banco do saas são `String` no formato `YYYY-MM-DD`; timezone `America/Sao_Paulo`; weekday 0–6 (0 = domingo).

---

### Task 1: Seed do tenant demo "Estúdio Aurora" (repo saas)

**Files:**
- Create: `prisma/seed-demo.js`
- Modify: `.gitignore` (adicionar artefatos de `demo-videos/`)

**Interfaces:**
- Produces: tenant slug `estudio-aurora`; usuário OWNER `demo@cadencio.app` senha `DemoAurora123`; turmas "Ballet Adulto" (com sessão HOJE às 19:00, sem presenças marcadas), "Jazz Iniciante", "Dança Contemporânea"; 14 alunas com ~8 semanas de histórico de presença. Tasks 2–7 dependem de tudo isso.

- [ ] **Step 1: Verificar o banco alvo**

```bash
cd /Users/luancarvalho/Documents/github/saas
grep -o 'DATABASE_URL="[^"]*"' .env.local | sed 's/:[^:@]*@/:****@/'
```

O host deve ser um branch de dev/staging do Neon (ou Postgres local). Se o nome do host/branch sugerir produção (ex.: mesmo endpoint usado em produção no Vercel), PARE e confirme com o usuário antes de continuar. O seed é escopado ao tenant `estudio-aurora`, mas a confirmação é obrigatória.

- [ ] **Step 2: Criar `prisma/seed-demo.js`**

```js
/* eslint-disable @typescript-eslint/no-require-imports */
// Cria (ou recria) o tenant ficticio "Estudio Aurora" para gravacao dos watch demos.
// Uso: DEMO_SEED=1 node --env-file=.env.local prisma/seed-demo.js
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();
const TZ = "America/Sao_Paulo";
const SLUG = "estudio-aurora";

if (process.env.DEMO_SEED !== "1") {
  const host = (process.env.DATABASE_URL || "(vazio)").replace(/^.*@/, "").split("/")[0];
  console.error(`Guard: rode com DEMO_SEED=1. Banco alvo atual: ${host}`);
  process.exit(1);
}

function formatDate(date) {
  return date.toLocaleDateString("en-CA", { timeZone: TZ });
}
function dateFromParts(y, m, d) {
  return new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
}
function addDays(dateStr, days) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = dateFromParts(y, m, d);
  dt.setUTCDate(dt.getUTCDate() + days);
  return formatDate(dt);
}
function weekdayOf(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return dateFromParts(y, m, d).getUTCDay();
}

const ALUNAS = [
  "Ana Beatriz Rocha", "Camila Ferreira", "Carolina Mendes", "Fernanda Alves",
  "Gabriela Martins", "Helena Castro", "Isabela Nunes", "Júlia Cardoso",
  "Larissa Oliveira", "Letícia Barros", "Mariana Costa", "Natália Ribeiro",
  "Sofia Almeida", "Valentina Torres",
];
const CANAIS = ["INDICACAO", "INSTAGRAM", "SITE", "TRAFEGO_PAGO", "OUTRO"];

async function main() {
  const today = formatDate(new Date());
  const todayW = weekdayOf(today);

  // Recria do zero: delete do tenant cascateia para todos os dados demo
  const existing = await prisma.tenant.findUnique({ where: { slug: SLUG } });
  if (existing) {
    await prisma.tenant.delete({ where: { id: existing.id } });
    console.log("Tenant demo anterior removido.");
  }

  const tenant = await prisma.tenant.create({
    data: { slug: SLUG, name: "Estúdio Aurora", plan: "PRO", active: true },
  });
  const tenantId = tenant.id;

  await prisma.user.create({
    data: {
      email: "demo@cadencio.app",
      name: "Equipe Aurora",
      role: "OWNER",
      tenantId,
      emailVerified: new Date(),
      passwordHash: await bcrypt.hash("DemoAurora123", 12),
    },
  });

  const teacher = await prisma.teacher.create({
    data: { tenantId, name: "Marina Duarte", phone: "21 98888-0100", active: true },
  });

  const plan = await prisma.studentPlan.create({
    data: { tenantId, name: "Mensal 2x semana", amount: 180.0, active: true },
  });

  // Turmas — Ballet Adulto sempre tem aula HOJE (weekday de hoje incluso na grade)
  const balletWeekdays = [...new Set([1, 3, 5, todayW])].sort();
  const turmas = [
    { name: "Ballet Adulto", modality: "Ballet", capacity: 20, schedule: balletWeekdays.map((w) => ({ weekday: w, startTime: "19:00", endTime: "20:00" })) },
    { name: "Jazz Iniciante", modality: "Jazz", capacity: 16, schedule: [2, 4].map((w) => ({ weekday: w, startTime: "18:00", endTime: "19:00" })) },
    { name: "Dança Contemporânea", modality: "Contemporâneo", capacity: 14, schedule: [{ weekday: 6, startTime: "10:00", endTime: "11:00" }] },
  ];

  const groups = {};
  for (const t of turmas) {
    const g = await prisma.classGroup.create({
      data: { tenantId, name: t.name, modality: t.modality, capacity: t.capacity },
    });
    groups[t.name] = { ...g, schedule: t.schedule };
    await prisma.classGroupTeacher.create({
      data: { classGroupId: g.id, teacherId: teacher.id, role: "LEAD" },
    });
    await prisma.classSchedule.createMany({
      data: t.schedule.map((s) => ({ classGroupId: g.id, ...s })),
    });
  }

  // Alunas
  const students = [];
  for (let i = 0; i < ALUNAS.length; i++) {
    students.push(
      await prisma.student.create({
        data: {
          tenantId,
          studentCode: `ALU-${String(i + 1).padStart(3, "0")}`,
          name: ALUNAS[i],
          phone: `21 98888-01${String(i + 1).padStart(2, "0")}`,
          category: "ALUNA",
          leadChannel: CANAIS[i % CANAIS.length],
          studentPlanId: plan.id,
          monthlyAmount: 180.0,
          dueDay: 10,
          active: true,
        },
      })
    );
  }

  // Matriculas: alunas 0-9 no Ballet, 8-13 no Jazz
  const ballet = groups["Ballet Adulto"];
  const jazz = groups["Jazz Iniciante"];
  const enrollBallet = students.slice(0, 10);
  const enrollJazz = students.slice(8, 14);
  for (const st of enrollBallet) {
    await prisma.enrollment.create({
      data: { studentId: st.id, classGroupId: ballet.id, status: "ACTIVE", weekdays: balletWeekdays.join(",") },
    });
  }
  for (const st of enrollJazz) {
    await prisma.enrollment.create({
      data: { studentId: st.id, classGroupId: jazz.id, status: "ACTIVE", weekdays: "2,4" },
    });
  }

  // Sessoes: -56 dias ate +7 dias, conforme a grade de cada turma
  let sessionCount = 0;
  let attendanceCount = 0;
  for (let offset = -56; offset <= 7; offset++) {
    const date = addDays(today, offset);
    const w = weekdayOf(date);
    for (const t of turmas) {
      const g = groups[t.name];
      for (const sc of g.schedule) {
        if (sc.weekday !== w) continue;
        const session = await prisma.session.create({
          data: { tenantId, classGroupId: g.id, date, startTime: sc.startTime, endTime: sc.endTime, status: "SCHEDULED" },
        });
        sessionCount++;

        // Historico de presenca apenas no PASSADO (hoje fica sem marcacao — e o que o demo grava)
        if (offset >= 0) continue;
        const enrolled = t.name === "Ballet Adulto" ? enrollBallet : t.name === "Jazz Iniciante" ? enrollJazz : [];
        for (let i = 0; i < enrolled.length; i++) {
          // Deterministico, ~87% de presenca
          const present = (i * 31 + Math.abs(offset)) % 8 !== 0;
          await prisma.attendance.create({
            data: { sessionId: session.id, studentId: enrolled[i].id, status: present ? "PRESENT" : "ABSENT" },
          });
          attendanceCount++;
        }
      }
    }
  }

  console.log("=== Estúdio Aurora criado ===");
  console.log(`Tenant: ${SLUG} (${tenantId})`);
  console.log("Login:  demo@cadencio.app / DemoAurora123");
  console.log(`Turmas: 3 | Alunas: ${students.length} | Sessões: ${sessionCount} | Presenças: ${attendanceCount}`);
  console.log(`Sessão de HOJE (${today}, weekday ${todayW}): Ballet Adulto 19:00 — sem presenças marcadas.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
```

- [ ] **Step 3: Rodar o guard sem a flag (deve recusar)**

Run: `cd /Users/luancarvalho/Documents/github/saas && node --env-file=.env.local prisma/seed-demo.js`
Expected: exit 1 com mensagem "Guard: rode com DEMO_SEED=1. Banco alvo atual: <host>"

- [ ] **Step 4: Rodar o seed de verdade**

Run: `DEMO_SEED=1 node --env-file=.env.local prisma/seed-demo.js`
Expected: resumo "=== Estúdio Aurora criado ===" com 3 turmas, 14 alunas, ~90+ sessões, ~700+ presenças e a linha da sessão de HOJE.

Se `--env-file` falhar (Node < 20.6), rode `DEMO_SEED=1 npx dotenv -e .env.local -- node prisma/seed-demo.js` ou exporte `DATABASE_URL` manualmente.

- [ ] **Step 5: Verificar login no app**

```bash
cd /Users/luancarvalho/Documents/github/saas && npm run dev &
sleep 8 && curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/login
```

Expected: `200`. Deixe o dev server rodando — as próximas tasks precisam dele. O login em si é validado pelo smoke test da Task 3.

- [ ] **Step 6: Preparar `.gitignore` e commitar**

Adicionar ao `.gitignore` do repo saas:

```
# demo-videos (gravação dos watch demos)
demo-videos/node_modules/
demo-videos/raw/
demo-videos/out/
demo-videos/.auth.json
```

```bash
git add prisma/seed-demo.js .gitignore
git commit -m "chore: seed do tenant demo Estúdio Aurora para gravação dos watch demos"
```

---

### Task 2: Fixture Excel para o demo de importação (repo saas)

**Files:**
- Create: `demo-videos/fixtures/make-fixture.js`
- Create (gerado): `demo-videos/fixtures/alunas-exemplo.xlsx`

**Interfaces:**
- Consumes: pacote `xlsx` já presente nas deps do saas; parser `parseStudentExcel` em `src/lib/utils/excelImport.ts`.
- Produces: `demo-videos/fixtures/alunas-exemplo.xlsx` com 6 alunas válidas — usado pelo cenário 03 (Task 6).

- [ ] **Step 1: Confirmar o formato esperado pelo parser**

Leia `src/lib/utils/excelImport.ts` (linhas ~60–135). Colunas esperadas (header linha 1):
`Nome | Telefone | Email | CEP | Data de Nascimento (DD/MM/AAAA) | ID Externo | Canal de Captação | Observações`. Se o arquivo atual divergir dessa ordem, ajuste o script do Step 2 para as colunas reais.

- [ ] **Step 2: Criar `demo-videos/fixtures/make-fixture.js`**

```js
/* eslint-disable @typescript-eslint/no-require-imports */
// Gera alunas-exemplo.xlsx para o demo de importacao. Uso: node demo-videos/fixtures/make-fixture.js
const path = require("path");
const XLSX = require("xlsx"); // resolve do node_modules raiz do repo saas

const rows = [
  ["Nome", "Telefone", "Email", "CEP", "Data de Nascimento", "ID Externo", "Canal de Captação", "Observações"],
  ["Alice Monteiro", "21 97777-0201", "alice.monteiro@email.com", "22071-060", "14/03/1996", "", "INDICACAO", ""],
  ["Bruna Teixeira", "21 97777-0202", "bruna.teixeira@email.com", "22041-080", "02/09/1993", "", "INSTAGRAM", "Veio pelo stories"],
  ["Clara Diniz", "21 97777-0203", "", "22031-071", "27/11/1999", "", "SITE", ""],
  ["Elisa Prado", "21 97777-0204", "elisa.prado@email.com", "", "08/05/1991", "", "INDICACAO", ""],
  ["Manuela Farias", "21 97777-0205", "", "22050-002", "19/07/1997", "", "TRAFEGO_PAGO", ""],
  ["Renata Campos", "21 97777-0206", "renata.campos@email.com", "22011-010", "30/01/1994", "", "INSTAGRAM", ""],
];

const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(rows), "Alunas");
const out = path.join(__dirname, "alunas-exemplo.xlsx");
XLSX.writeFile(wb, out);
console.log("Fixture gerada:", out);
```

- [ ] **Step 3: Gerar e validar contra o parser real**

```bash
cd /Users/luancarvalho/Documents/github/saas
node demo-videos/fixtures/make-fixture.js
npx tsx -e '
import fs from "fs";
import { parseStudentExcel } from "./src/lib/utils/excelImport";
const r = parseStudentExcel(fs.readFileSync("demo-videos/fixtures/alunas-exemplo.xlsx"));
console.log("valid:", r.valid.length, "| skipped:", r.skipped.length, r.skipped);
'
```

Expected: `valid: 6 | skipped: 0 []`. Se a assinatura de `parseStudentExcel` for diferente (ex.: async ou recebe ArrayBuffer), adapte a chamada de validação conforme o código real — o fixture só está pronto quando reportar 6 válidas.

- [ ] **Step 4: Commit**

```bash
git add demo-videos/fixtures/
git commit -m "chore: fixture Excel de alunas para o demo de importação"
```

---

### Task 3: Rig de gravação Playwright + smoke test (repo saas)

**Files:**
- Create: `demo-videos/package.json`
- Create: `demo-videos/lib/helpers.js`
- Create: `demo-videos/scenarios/00-auth-setup.js`
- Create: `demo-videos/scenarios/smoke.js`

**Interfaces:**
- Consumes: credenciais da Task 1 (`demo@cadencio.app` / `DemoAurora123`), dev server em `http://localhost:3000`.
- Produces: `helpers.js` exporta `{ BASE_URL, startScenario, humanClick, humanType, finishScenario }`; `.auth.json` com sessão logada. Todos os cenários (Tasks 4–7) importam esses helpers e começam já autenticados.

- [ ] **Step 1: Criar `demo-videos/package.json` e instalar Playwright**

```json
{
  "name": "cadencio-demo-videos",
  "private": true,
  "description": "Gravação automatizada dos watch demos (Playwright + ffmpeg)",
  "dependencies": {
    "playwright": "^1.49.0"
  }
}
```

```bash
cd /Users/luancarvalho/Documents/github/saas/demo-videos
npm install && npx playwright install chromium
mkdir -p raw out scenarios lib fixtures
```

- [ ] **Step 2: Criar `demo-videos/lib/helpers.js`**

```js
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const HEADLESS = process.env.HEADED !== "1";
const ROOT = path.join(__dirname, "..");
const RAW_DIR = path.join(ROOT, "raw");
const AUTH_FILE = path.join(ROOT, ".auth.json");

// Cursor sintetico: gravacoes Playwright NAO capturam o cursor do SO.
const CURSOR_SCRIPT = `(() => {
  const attach = () => {
    const style = document.createElement("style");
    style.textContent = "#demo-cursor{position:fixed;top:0;left:0;width:26px;height:26px;border-radius:50%;background:rgba(13,115,119,0.22);border:2.5px solid #0D7377;box-shadow:0 2px 8px rgba(0,0,0,0.25);pointer-events:none;z-index:999999;transform:translate(-50%,-50%)}#demo-cursor.down{background:rgba(13,115,119,0.55);transform:translate(-50%,-50%) scale(0.82)}";
    document.head.appendChild(style);
    const dot = document.createElement("div");
    dot.id = "demo-cursor";
    document.body.appendChild(dot);
    window.addEventListener("mousemove", (e) => { dot.style.left = e.clientX + "px"; dot.style.top = e.clientY + "px"; }, true);
    window.addEventListener("mousedown", () => dot.classList.add("down"), true);
    window.addEventListener("mouseup", () => dot.classList.remove("down"), true);
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", attach);
  else attach();
})();`;

async function startScenario({ authenticated = true, record = true } = {}) {
  const browser = await chromium.launch({ headless: HEADLESS });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    locale: "pt-BR",
    timezoneId: "America/Sao_Paulo",
    ...(authenticated && fs.existsSync(AUTH_FILE) ? { storageState: AUTH_FILE } : {}),
    ...(record ? { recordVideo: { dir: RAW_DIR, size: { width: 1920, height: 1080 } } } : {}),
  });
  const page = await context.newPage();
  await page.addInitScript(CURSOR_SCRIPT);
  return { browser, context, page };
}

async function humanClick(page, locator) {
  await locator.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const box = await locator.boundingBox();
  if (!box) throw new Error("humanClick: elemento sem bounding box");
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 28 });
  await page.waitForTimeout(400);
  await page.mouse.down();
  await page.waitForTimeout(90);
  await page.mouse.up();
  await page.waitForTimeout(800);
}

async function humanType(page, locator, text) {
  await humanClick(page, locator);
  await locator.pressSequentially(text, { delay: 55 });
  await page.waitForTimeout(400);
}

async function finishScenario({ browser, context, page }, slug) {
  await page.waitForTimeout(1800); // respiro final antes do corte
  const video = page.video();
  await context.close(); // flush do video
  if (video) {
    const tmp = await video.path();
    const dest = path.join(RAW_DIR, `${slug}.webm`);
    fs.renameSync(tmp, dest);
    console.log("Gravado:", dest);
  }
  await browser.close();
}

module.exports = { BASE_URL, AUTH_FILE, startScenario, humanClick, humanType, finishScenario };
```

- [ ] **Step 3: Criar `demo-videos/scenarios/00-auth-setup.js`** (login sem gravação, salva sessão)

```js
/* eslint-disable @typescript-eslint/no-require-imports */
const { BASE_URL, AUTH_FILE, startScenario } = require("../lib/helpers");

(async () => {
  const s = await startScenario({ authenticated: false, record: false });
  const { page, context, browser } = s;
  await page.goto(`${BASE_URL}/login`);
  await page.locator('input[name="email"]').fill("demo@cadencio.app");
  await page.locator('input[name="password"]').fill("DemoAurora123");
  await page.locator('button[type="submit"]').click();
  await page.waitForURL(`${BASE_URL}/`, { timeout: 20000 });
  await context.storageState({ path: AUTH_FILE });
  console.log("Sessão salva em", AUTH_FILE);
  await browser.close();
})();
```

- [ ] **Step 4: Criar `demo-videos/scenarios/smoke.js`** (valida rig completo: auth + gravação + cursor)

```js
/* eslint-disable @typescript-eslint/no-require-imports */
const { BASE_URL, startScenario, humanClick, finishScenario } = require("../lib/helpers");

(async () => {
  const s = await startScenario();
  const { page } = s;
  await page.goto(`${BASE_URL}/`);
  await page.waitForTimeout(2500);
  await humanClick(page, page.getByRole("link", { name: /alunas|alunos/i }).first());
  await page.waitForTimeout(2000);
  await finishScenario(s, "smoke");
})();
```

- [ ] **Step 5: Rodar auth + smoke e verificar o vídeo**

```bash
cd /Users/luancarvalho/Documents/github/saas/demo-videos
node scenarios/00-auth-setup.js
node scenarios/smoke.js
ffprobe -v error -show_entries format=duration -of csv=p=0 raw/smoke.webm
```

Expected: "Sessão salva em …/.auth.json", "Gravado: …/raw/smoke.webm", duração > 4 (segundos). Se `ffprobe` não existir: `brew install ffmpeg`. Abra `raw/smoke.webm` e confirme que o cursor teal aparece e se move suavemente. Se o link de alunas tiver outro nome, ajuste o smoke — o objetivo é só validar o rig.

- [ ] **Step 6: Commit**

```bash
cd /Users/luancarvalho/Documents/github/saas
git add demo-videos/package.json demo-videos/package-lock.json demo-videos/lib demo-videos/scenarios
git commit -m "chore: rig Playwright de gravação dos watch demos (cursor sintético + auth reutilizável)"
```

---

### Task 4: Cenário 01 — Chamada de turma (repo saas)

**Files:**
- Create: `demo-videos/scenarios/01-chamada.js`
- Referência de UI: `src/components/SessionAttendance.tsx`, `src/app/(app)/_components/WeeklyAgendaSection.tsx`

**Interfaces:**
- Consumes: helpers da Task 3; sessão de HOJE do "Ballet Adulto" sem presenças (Task 1).
- Produces: `raw/chamada-de-turma-em-1-minuto.webm` (~45–70s brutos).

**Roteiro (espelha o transcript publicado):** dashboard → abrir a turma do dia → ver lista de alunas → marcar presenças/faltas → salvar.

- [ ] **Step 1: Mapear a UI real da sessão**

```bash
cd /Users/luancarvalho/Documents/github/saas
grep -n "Presente\|Falta\|Salvar\|button" src/components/SessionAttendance.tsx | head -30
grep -n "Ballet\|session\|href" "src/app/(app)/_components/WeeklyAgendaSection.tsx" | head -20
```

Anote: (a) como o dashboard linka a sessão de hoje (texto/href), (b) como cada aluna é marcada presente/falta (toggle por linha? botão com que nome/aria-label?), (c) o texto do botão de salvar. Ajuste os seletores do Step 2 conforme o que encontrar.

- [ ] **Step 2: Criar `demo-videos/scenarios/01-chamada.js`**

```js
/* eslint-disable @typescript-eslint/no-require-imports */
const { BASE_URL, startScenario, humanClick, finishScenario } = require("../lib/helpers");

const SLUG = "chamada-de-turma-em-1-minuto";
// Alunas matriculadas no Ballet Adulto (seed Task 1, indices 0-9)
const PRESENTES = ["Ana Beatriz Rocha", "Camila Ferreira", "Carolina Mendes", "Fernanda Alves", "Gabriela Martins", "Helena Castro", "Isabela Nunes", "Júlia Cardoso"];
const FALTAS = ["Larissa Oliveira", "Letícia Barros"];

(async () => {
  const s = await startScenario();
  const { page } = s;

  // Abertura: dashboard com a agenda do dia
  await page.goto(`${BASE_URL}/`);
  await page.waitForTimeout(3000);

  // Abrir a sessao de hoje do Ballet Adulto (ajustar seletor conforme Step 1)
  await humanClick(page, page.getByText("Ballet Adulto").first());
  await page.waitForURL(/\/sessions\//, { timeout: 15000 });
  await page.waitForTimeout(2500);

  // Marcar presencas — clique na linha/toggle de cada aluna (ajustar conforme Step 1)
  for (const nome of PRESENTES) {
    const row = page.locator("li, tr, div", { hasText: nome }).last();
    await humanClick(page, row.getByRole("button").first());
  }
  // Faltas: segundo estado do toggle ou botao proprio (ajustar conforme Step 1)
  for (const nome of FALTAS) {
    const row = page.locator("li, tr, div", { hasText: nome }).last();
    await humanClick(page, row.getByRole("button").first());
    await humanClick(page, row.getByRole("button").first());
  }
  await page.waitForTimeout(800);

  // Salvar e mostrar confirmacao
  await humanClick(page, page.getByRole("button", { name: /salvar/i }));
  await page.waitForTimeout(2500);

  await finishScenario(s, SLUG);
})();
```

- [ ] **Step 3: Dry-run com janela visível e corrigir seletores**

Run: `cd demo-videos && HEADED=1 node scenarios/01-chamada.js`
Expected: o fluxo completa sem erro e você vê cada clique acontecer. Se um seletor falhar, volte ao Step 1, encontre o texto/estrutura real e corrija o script. Repita até o fluxo rodar limpo do início ao fim.

- [ ] **Step 4: Gravação final (headless) e conferência**

```bash
node scenarios/01-chamada.js
ffprobe -v error -show_entries format=duration -of csv=p=0 raw/chamada-de-turma-em-1-minuto.webm
```

Expected: duração entre 40 e 75 segundos. Assista o WebM: ritmo natural, sem telas de erro, sem pausas mortas > 3s.

- [ ] **Step 5: Commit**

```bash
cd /Users/luancarvalho/Documents/github/saas
git add demo-videos/scenarios/01-chamada.js
git commit -m "feat: cenário de gravação — chamada de turma"
```

---

### Task 5: Cenário 02 — Cadastrar turma e horários (repo saas)

**Files:**
- Create: `demo-videos/scenarios/02-turma-horarios.js`
- Referência de UI: `src/app/(app)/admin/class-groups/ClassGroupsForm.tsx`, `src/app/(app)/admin/schedules/` (page + client)

**Interfaces:**
- Consumes: helpers da Task 3.
- Produces: `raw/cadastrar-turma-e-horarios.webm` (~50–80s brutos). Cria a turma "Contemporâneo Teens" no tenant demo (efeito colateral aceitável; o seed recria tudo ao rodar de novo).

**Roteiro:** turmas → criar "Contemporâneo Teens" (modalidade, capacidade) → grade de horários → adicionar ter/qui 17:00–18:00 → ver a turma na rotina.

- [ ] **Step 1: Mapear a UI real**

```bash
grep -n "label\|placeholder\|name=\|select\|option\|Adicionar\|Salvar" "src/app/(app)/admin/class-groups/ClassGroupsForm.tsx" | head -30
ls "src/app/(app)/admin/schedules/" && grep -n "label\|placeholder\|weekday\|startTime\|Adicionar\|Salvar\|select" src/app/\(app\)/admin/schedules/*.tsx | head -30
```

Anote os campos reais do form de turma (nome, modalidade — input ou select —, capacidade) e do form de horário (turma, dia da semana, hora início/fim). Ajuste o Step 2.

- [ ] **Step 2: Criar `demo-videos/scenarios/02-turma-horarios.js`**

```js
/* eslint-disable @typescript-eslint/no-require-imports */
const { BASE_URL, startScenario, humanClick, humanType, finishScenario } = require("../lib/helpers");

const SLUG = "cadastrar-turma-e-horarios";

(async () => {
  const s = await startScenario();
  const { page } = s;

  // Abertura: pagina de turmas
  await page.goto(`${BASE_URL}/admin/class-groups`);
  await page.waitForTimeout(3000);

  // Preencher o form de nova turma (ajustar seletores conforme Step 1)
  await humanType(page, page.getByLabel(/nome da turma/i), "Contemporâneo Teens");
  await humanType(page, page.getByLabel(/modalidade/i), "Contemporâneo");
  await humanType(page, page.getByLabel(/capacidade/i), "15");
  await humanClick(page, page.getByRole("button", { name: /adicionar/i }));
  await page.waitForTimeout(2500); // turma aparece na lista

  // Grade de horarios
  await page.goto(`${BASE_URL}/admin/schedules`);
  await page.waitForTimeout(2500);

  // Adicionar ter 17:00-18:00 (ajustar conforme Step 1: selects de turma/dia/horario)
  await humanClick(page, page.getByLabel(/turma/i));
  await page.getByLabel(/turma/i).selectOption({ label: "Contemporâneo Teens" });
  await page.waitForTimeout(600);
  await page.getByLabel(/dia/i).selectOption({ label: "Terça-feira" });
  await humanType(page, page.getByLabel(/in[íi]cio/i), "17:00");
  await humanType(page, page.getByLabel(/fim|t[ée]rmino/i), "18:00");
  await humanClick(page, page.getByRole("button", { name: /adicionar|salvar/i }));
  await page.waitForTimeout(2000);

  // Adicionar qui 17:00-18:00
  await page.getByLabel(/turma/i).selectOption({ label: "Contemporâneo Teens" });
  await page.getByLabel(/dia/i).selectOption({ label: "Quinta-feira" });
  await humanType(page, page.getByLabel(/in[íi]cio/i), "17:00");
  await humanType(page, page.getByLabel(/fim|t[ée]rmino/i), "18:00");
  await humanClick(page, page.getByRole("button", { name: /adicionar|salvar/i }));
  await page.waitForTimeout(2500); // grade final visivel

  await finishScenario(s, SLUG);
})();
```

- [ ] **Step 3: Dry-run com janela visível e corrigir seletores**

Run: `HEADED=1 node scenarios/02-turma-horarios.js`
Expected: turma criada e dois horários adicionados sem erro. Corrija seletores contra a UI real (inputs de hora podem ser `type="time"` — use `.fill("17:00")` direto em vez de `humanType` se `pressSequentially` falhar).

Antes de re-rodar após uma falha parcial, re-rode o seed (Task 1 Step 4) para limpar a turma criada pela metade.

- [ ] **Step 4: Gravação final e conferência**

```bash
node scenarios/02-turma-horarios.js
ffprobe -v error -show_entries format=duration -of csv=p=0 raw/cadastrar-turma-e-horarios.webm
```

Expected: duração entre 45 e 85 segundos, fluxo limpo.

- [ ] **Step 5: Commit**

```bash
git add demo-videos/scenarios/02-turma-horarios.js
git commit -m "feat: cenário de gravação — cadastrar turma e horários"
```

---

### Task 6: Cenário 03 — Importar alunas de planilha (repo saas)

**Files:**
- Create: `demo-videos/scenarios/03-importar-planilha.js`
- Referência de UI: `src/app/(app)/admin/students/StudentsClient.tsx` (botão "Importar Planilha" na linha ~115, botão "Importar" na ~266)

**Interfaces:**
- Consumes: helpers (Task 3), fixture `fixtures/alunas-exemplo.xlsx` (Task 2).
- Produces: `raw/importar-alunos-planilha.webm` (~50–80s brutos). Importa 6 alunas no tenant demo (re-rode o seed para limpar).

**Roteiro:** alunas → "Importar Planilha" → escolher arquivo → revisar → "Importar" → resultado com as novas alunas na lista.

- [ ] **Step 1: Mapear o modal de importação**

```bash
grep -n "Importar\|input\|file\|accept\|template" "src/app/(app)/admin/students/StudentsClient.tsx" | sed -n '1,40p'
```

Anote: como abre o modal, onde está o `input[type=file]`, se há tela de revisão antes do confirm, e o texto do botão final. Ajuste o Step 2.

- [ ] **Step 2: Criar `demo-videos/scenarios/03-importar-planilha.js`**

```js
/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("path");
const { BASE_URL, startScenario, humanClick, finishScenario } = require("../lib/helpers");

const SLUG = "importar-alunos-planilha";
const FIXTURE = path.join(__dirname, "..", "fixtures", "alunas-exemplo.xlsx");

(async () => {
  const s = await startScenario();
  const { page } = s;

  // Abertura: lista de alunas
  await page.goto(`${BASE_URL}/admin/students`);
  await page.waitForTimeout(3000);

  // Abrir o modal de importacao
  await humanClick(page, page.getByRole("button", { name: /importar planilha/i }));
  await page.waitForTimeout(1500);

  // Selecionar o arquivo (input pode estar oculto — setInputFiles funciona mesmo assim)
  await page.locator('input[type="file"]').setInputFiles(FIXTURE);
  await page.waitForTimeout(2500); // tela de revisao com as 6 alunas

  // Confirmar importacao
  await humanClick(page, page.getByRole("button", { name: /^importar$/i }));
  await page.waitForTimeout(3000); // resultado da importacao

  // Fechar modal e mostrar a lista atualizada (ajustar: botao Fechar/Concluir/X)
  const fechar = page.getByRole("button", { name: /fechar|concluir|ok/i });
  if (await fechar.count()) await humanClick(page, fechar.first());
  await page.waitForTimeout(2500);

  await finishScenario(s, SLUG);
})();
```

- [ ] **Step 3: Dry-run com janela visível e corrigir seletores**

Run: `HEADED=1 node scenarios/03-importar-planilha.js`
Expected: modal abre, 6 alunas aparecem na revisão, importação conclui, lista mostra Alice Monteiro etc. Antes de re-rodar, re-rode o seed para não duplicar alunas.

- [ ] **Step 4: Re-seed + gravação final limpa**

```bash
cd /Users/luancarvalho/Documents/github/saas
DEMO_SEED=1 node --env-file=.env.local prisma/seed-demo.js
cd demo-videos && node scenarios/00-auth-setup.js && node scenarios/03-importar-planilha.js
ffprobe -v error -show_entries format=duration -of csv=p=0 raw/importar-alunos-planilha.webm
```

Expected: duração entre 45 e 85 segundos. (Re-rodar o auth-setup é necessário porque o seed recriou o usuário.)

- [ ] **Step 5: Commit**

```bash
git add demo-videos/scenarios/03-importar-planilha.js
git commit -m "feat: cenário de gravação — importar alunas de planilha"
```

---

### Task 7: Cenário 04 — Histórico de presença de uma aluna (repo saas)

**Files:**
- Create: `demo-videos/scenarios/04-historico-presenca.js`
- Referência de UI: `src/app/(app)/reports/tabs/AlunosTab.tsx`, `src/app/(app)/admin/students/[id]/StudentProfileClient.tsx`

**Interfaces:**
- Consumes: helpers (Task 3), histórico de 8 semanas de presenças (Task 1).
- Produces: `raw/historico-de-presenca-aluna.webm` (~40–65s brutos).

**IMPORTANTE — divergência com o transcript publicado:** o app mostra frequência/faltas por aluna em **Relatórios → aba Alunos** (score de risco e frequência individual), não numa aba "histórico de presença" do cadastro. O vídeo grava o fluxo REAL (relatórios → aba Alunos → localizar aluna → abrir o cadastro dela) e a Task 10 atualiza o transcript em `organic-content.ts` para bater com o vídeo.

- [ ] **Step 1: Mapear a UI real**

```bash
grep -n "Alunos\|tab\|frequ\|presen\|href\|Link" "src/app/(app)/reports/tabs/AlunosTab.tsx" | head -25
grep -n "tab\|Tab\b" src/app/\(app\)/reports/*.tsx | head -15
```

Anote: como trocar para a aba Alunos, se a tabela tem link para o perfil da aluna, e o que o perfil exibe. Ajuste o Step 2.

- [ ] **Step 2: Criar `demo-videos/scenarios/04-historico-presenca.js`**

```js
/* eslint-disable @typescript-eslint/no-require-imports */
const { BASE_URL, startScenario, humanClick, finishScenario } = require("../lib/helpers");

const SLUG = "historico-de-presenca-aluna";
const ALUNA = "Larissa Oliveira"; // tem faltas deterministicas no seed

(async () => {
  const s = await startScenario();
  const { page } = s;

  // Abertura: relatorios
  await page.goto(`${BASE_URL}/reports`);
  await page.waitForTimeout(3000);

  // Aba Alunos (ajustar: pode ser button, link ou tab)
  await humanClick(page, page.getByRole("button", { name: /alunos/i }).or(page.getByRole("tab", { name: /alunos/i })).first());
  await page.waitForTimeout(2500);

  // Scroll ate a tabela de presencas por aluna e destacar a linha
  const row = page.locator("tr, li, div", { hasText: ALUNA }).last();
  await row.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);
  const box = await row.boundingBox();
  if (box) await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 30 });
  await page.waitForTimeout(2000);

  // Abrir o cadastro da aluna (se a tabela linkar; senao, ir via lista de alunas)
  const link = row.getByRole("link").first();
  if (await link.count()) {
    await humanClick(page, link);
  } else {
    await page.goto(`${BASE_URL}/admin/students`);
    await page.waitForTimeout(2000);
    await humanClick(page, page.getByText(ALUNA).first());
  }
  await page.waitForTimeout(3000); // perfil da aluna visivel

  await finishScenario(s, SLUG);
})();
```

- [ ] **Step 3: Dry-run com janela visível e corrigir seletores**

Run: `HEADED=1 node scenarios/04-historico-presenca.js`
Expected: aba Alunos mostra a tabela de frequência com dados das 8 semanas, e o vídeo termina no perfil da Larissa. Corrija seletores conforme a UI real.

- [ ] **Step 4: Gravação final e conferência**

```bash
node scenarios/04-historico-presenca.js
ffprobe -v error -show_entries format=duration -of csv=p=0 raw/historico-de-presenca-aluna.webm
```

Expected: duração entre 35 e 70 segundos.

- [ ] **Step 5: Anotar o fluxo real gravado** (insumo para o novo transcript na Task 10)

Escreva em `demo-videos/out/notes.md` os passos exatos que o vídeo mostra, em 3-4 frases curtas no estilo dos transcripts existentes (ex.: "Abra os relatórios e acesse a aba Alunos." / "Veja presenças, faltas e frequência de cada aluna no período." / "Abra o cadastro da aluna para ver os detalhes.").

- [ ] **Step 6: Commit**

```bash
git add demo-videos/scenarios/04-historico-presenca.js
git commit -m "feat: cenário de gravação — histórico de presença por aluna"
```

---

### Task 8: CHECKPOINT HUMANO — revisão dos vídeos brutos

**Files:** nenhum (gate de aprovação).

- [ ] **Step 1: Listar os 4 vídeos com durações**

```bash
cd /Users/luancarvalho/Documents/github/saas/demo-videos
for f in raw/chamada-de-turma-em-1-minuto.webm raw/cadastrar-turma-e-horarios.webm raw/importar-alunos-planilha.webm raw/historico-de-presenca-aluna.webm; do
  printf "%s — %ss\n" "$f" "$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$f" | cut -d. -f1)"
done
open raw/
```

- [ ] **Step 2: PARAR e pedir revisão ao usuário**

Apresente a lista e peça que Luan assista os 4 WebMs. Perguntas a responder: ritmo ok? algum trecho para cortar/acelerar? alguma re-gravação necessária? **NÃO prossiga para a Task 9 sem aprovação explícita.** Se houver re-gravação: re-rode o seed (Task 1 Step 4) + `00-auth-setup.js` + o cenário afetado, e volte a este checkpoint.

- [ ] **Step 3: Registrar decisões de corte**

Para cada vídeo aprovado, anote em `demo-videos/out/notes.md`: trim inicial (s), trim final (s), fator de aceleração se pedido (ex.: 1.15), e o timestamp do frame para a thumbnail (um momento visualmente representativo — ex.: lista de presença preenchida).

---

### Task 9: Pós-processamento — MP4 + thumbnails (repo saas)

**Files:**
- Create: `demo-videos/postprocess.sh`
- Create (gerados): `demo-videos/out/{slug}.mp4` e `demo-videos/out/{slug}-thumb.webp` (4 de cada)

**Interfaces:**
- Consumes: WebMs aprovados (Task 8) + decisões de corte em `out/notes.md`.
- Produces: MP4s ≤ 8 MB e thumbs WebP com os nomes exatos dos slugs — a Task 10 copia esses arquivos. Também produz a duração final real de cada vídeo (para atualizar `durationLabel`/`durationIso`).

- [ ] **Step 1: Criar `demo-videos/postprocess.sh`**

```bash
#!/usr/bin/env bash
# Converte raw/{slug}.webm -> out/{slug}.mp4 (+thumb). Parametros por video vindos de out/notes.md.
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p out

process() {
  local slug=$1 trim_start=$2 duration=$3 speed=$4 thumb_at=$5
  ffmpeg -y -ss "$trim_start" -t "$duration" -i "raw/${slug}.webm" \
    -filter:v "setpts=PTS/${speed},fps=30,scale=1920:-2" \
    -an -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -movflags +faststart \
    "out/${slug}.mp4"
  ffmpeg -y -ss "$thumb_at" -i "out/${slug}.mp4" -frames:v 1 \
    -vf "scale=1280:-2" -c:v libwebp -quality 82 "out/${slug}-thumb.webp"
  local size dur
  size=$(du -h "out/${slug}.mp4" | cut -f1)
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "out/${slug}.mp4" | cut -d. -f1)
  echo "${slug}: ${dur}s, ${size}"
}

#        slug                              trim_start  duration  speed  thumb_at
# Substituir os valores pelos decididos na Task 8 (out/notes.md):
process "chamada-de-turma-em-1-minuto"     "2"         "58"      "1.0"  "12"
process "cadastrar-turma-e-horarios"       "2"         "68"      "1.0"  "15"
process "importar-alunos-planilha"         "2"         "75"      "1.0"  "20"
process "historico-de-presenca-aluna"      "2"         "52"      "1.0"  "10"
```

Os cinco valores por vídeo vêm de `out/notes.md` (Task 8 Step 3): `trim_start`/`duration` cortam o bruto, `speed` > 1.0 acelera se o vídeo passou da duração-alvo em mais de ~15%, `thumb_at` é o timestamp (no MP4 final) do frame da thumbnail.

- [ ] **Step 2: Rodar e verificar tamanhos/durações**

```bash
chmod +x postprocess.sh && ./postprocess.sh
ls -lh out/*.mp4 out/*-thumb.webp
```

Expected: 4 MP4s ≤ 8 MB e 4 WebPs. Se algum MP4 passar de 8 MB, suba o CRF para 26 nesse vídeo e re-rode. Abra cada MP4 e cada thumb — texto legível, frame da thumb representativo.

- [ ] **Step 3: Registrar durações finais**

Anexe em `out/notes.md` a duração final de cada MP4 no formato usado pelo site — ex.: `58s → durationLabel: "58 s", durationIso: "PT58S"`; `72s → durationLabel: "1 min 12 s", durationIso: "PT1M12S"`. A Task 10 usa exatamente esses valores.

- [ ] **Step 4: Commit**

```bash
cd /Users/luancarvalho/Documents/github/saas
git add demo-videos/postprocess.sh
git commit -m "chore: pipeline ffmpeg dos watch demos (MP4 + thumbnails)"
```

---

### Task 10: Integração no site (repo Cadencio)

**Files:**
- Create: `public/demos/{slug}.mp4` e `public/demos/{slug}-thumb.webp` (copiados da Task 9)
- Modify: `lib/organic-content.ts` (4 objetos em `demos`: `videoUrl`, `thumbnail`, durações, e o `transcript` do demo 4)
- Modify: `components/guides/VideoDemoPanel.tsx` (preload + type)
- Modify: `components/guides/DemoCard.tsx` (thumbnail no card quando há vídeo)
- Modify: `lib/structured-data.ts` (uploadDate real)

**Interfaces:**
- Consumes: `out/*.mp4`, `out/*-thumb.webp`, durações finais e novo transcript de `out/notes.md` (Tasks 7–9).
- Produces: página orgânica completa; success criteria do spec atendidos.

- [ ] **Step 1: Copiar os assets**

```bash
mkdir -p /Users/luancarvalho/Documents/github/Cadencio/public/demos
cp /Users/luancarvalho/Documents/github/saas/demo-videos/out/*.mp4 \
   /Users/luancarvalho/Documents/github/saas/demo-videos/out/*-thumb.webp \
   /Users/luancarvalho/Documents/github/Cadencio/public/demos/
ls -lh /Users/luancarvalho/Documents/github/Cadencio/public/demos/
```

Expected: 8 arquivos (4 MP4 + 4 WebP).

- [ ] **Step 2: Preencher os campos em `lib/organic-content.ts`**

Para cada um dos 4 objetos do array `demos`, trocar:

```ts
videoUrl: null,
thumbnail: null,
```

por (exemplo do primeiro; repetir o padrão com o slug de cada um):

```ts
videoUrl: "/demos/chamada-de-turma-em-1-minuto.mp4",
thumbnail: "/demos/chamada-de-turma-em-1-minuto-thumb.webp",
```

E atualizar `durationLabel`/`durationIso` de cada demo com os valores REAIS medidos na Task 9 Step 3 (ex.: se o vídeo final tem 58s, `durationLabel: "58 s"`, `durationIso: "PT58S"`).

No demo `historico-de-presenca-aluna`, substituir também o `transcript` pelas frases anotadas em `out/notes.md` (Task 7 Step 5), que descrevem o fluxo real via Relatórios → aba Alunos. Exemplo do formato final:

```ts
transcript: [
  "Abra os relatórios e acesse a aba Alunos.",
  "Veja presenças, faltas e a frequência de cada aluna no período.",
  "Identifique quem precisa de atenção pelo indicador de frequência.",
  "Abra o cadastro da aluna para ver os detalhes.",
],
```

- [ ] **Step 3: `VideoDemoPanel.tsx` — preload e type**

Trocar:

```tsx
<video controls poster={demo.thumbnail ?? undefined} className="aspect-video w-full bg-surface-dark">
  <source src={demo.videoUrl} />
</video>
```

por:

```tsx
<video controls preload="metadata" poster={demo.thumbnail ?? undefined} className="aspect-video w-full bg-surface-dark">
  <source src={demo.videoUrl} type="video/mp4" />
</video>
```

- [ ] **Step 4: `DemoCard.tsx` — thumbnail no card**

Trocar o bloco `hasVideo` (hoje só um play em fundo escuro):

```tsx
{hasVideo ? (
  <div className="flex aspect-video items-center justify-center bg-surface-dark text-brand-50">
    <div className="flex h-14 w-14 items-center justify-center rounded-sm border border-brand-400/30 bg-brand-500/15 transition-transform group-hover:scale-105">
      <Play className="ml-0.5 text-accent-mint" size={24} />
    </div>
  </div>
) : (
```

por:

```tsx
{hasVideo ? (
  <div className="relative aspect-video bg-surface-dark">
    {demo.thumbnail ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={demo.thumbnail} alt={demo.title} className="h-full w-full object-cover" />
    ) : null}
    <div className="absolute inset-0 flex items-center justify-center bg-black/25">
      <div className="flex h-14 w-14 items-center justify-center rounded-sm border border-brand-400/30 bg-brand-500/60 backdrop-blur-sm transition-transform group-hover:scale-105">
        <Play className="ml-0.5 text-white" size={24} />
      </div>
    </div>
  </div>
) : (
```

(Se o projeto usa `next/image` para assets locais em outros componentes, siga o padrão do projeto; `img` simples é aceitável para thumbnail estática.)

- [ ] **Step 5: `lib/structured-data.ts` — uploadDate real**

Em `buildDemoJsonLd`, trocar `uploadDate: "2026-06-24"` pela data de hoje no formato ISO (`date +%F`).

- [ ] **Step 6: Verificar em dev**

```bash
cd /Users/luancarvalho/Documents/github/Cadencio && npm run dev &
sleep 8
curl -s http://localhost:3000/demos/chamada-de-turma-em-1-minuto | grep -c "VideoObject"
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/demos/chamada-de-turma-em-1-minuto.mp4
```

Expected: `1` (ou mais) para VideoObject e `200` para o MP4. Se a porta 3000 estiver ocupada pelo dev server do saas, pare-o antes ou use `PORT=3001` (e ajuste os curls).

- [ ] **Step 7: Build limpo e commit**

```bash
npm run build
git add public/demos lib/organic-content.ts lib/structured-data.ts components/guides/VideoDemoPanel.tsx components/guides/DemoCard.tsx
git commit -m "feat: watch demos ao vivo — 4 vídeos, thumbnails e VideoObject completo"
```

Expected: build sem erros antes do commit.

---

### Task 11: Verificação final + CHECKPOINT de deploy

**Files:** nenhum (verificação e gate).

- [ ] **Step 1: Conferir as 3 superfícies no navegador**

Com o dev server do Cadencio rodando, verificar (visualmente ou via Playwright/Chrome):
1. `/guias` — os 4 cards da seção "Veja demos" mostram thumbnail + play (nenhum "Vídeo em breve").
2. `/demos` — idem.
3. `/demos/chamada-de-turma-em-1-minuto` — o player carrega com poster, o vídeo reproduz do início ao fim.
4. Uma página de guia (ex.: `/guias/controle-de-presenca-estudio-danca`) — o `VideoDemoPanel` embutido mostra o player.

- [ ] **Step 2: Validar o JSON-LD**

```bash
curl -s http://localhost:3000/demos/chamada-de-turma-em-1-minuto | python3 -c "
import sys, re, json
html = sys.stdin.read()
for m in re.findall(r'<script type=\"application/ld\+json\">(.*?)</script>', html, re.S):
    for item in json.loads(m):
        if item.get('@type') == 'VideoObject':
            assert item['contentUrl'].endswith('.mp4'), item
            assert item['thumbnailUrl'][0].endswith('.webp'), item
            print('VideoObject OK:', item['name'], item['duration'])
"
```

Expected: `VideoObject OK: Como fazer chamada de uma turma em menos de 1 minuto PT...S`. Repetir para os outros 3 slugs (ou validar todos num loop).

- [ ] **Step 3: Checar critérios de sucesso do spec**

- [ ] 4 cards com player/poster (sem "Vídeo em breve")
- [ ] Vídeos reproduzem e batem com os transcripts
- [ ] Cada MP4 ≤ 8 MB (`ls -lh public/demos/*.mp4`)
- [ ] VideoObject com contentUrl + thumbnailUrl nos 4 slugs
- [ ] Nenhum dado real de cliente nos vídeos (tenant fictício apenas)

- [ ] **Step 4: PARAR — checkpoint de deploy**

Apresentar ao usuário o resumo da verificação e perguntar se quer deployar (push para o branch de produção do Cadencio / `vercel deploy`). **Não fazer push nem deploy sem aprovação.** Sugerir também, pós-deploy: reindexação no Google Search Console e teste no Rich Results Test.
