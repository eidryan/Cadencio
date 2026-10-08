# CADENCIO-FACTS — Fonte da verdade para conteúdo

> **Última verificação: 2026-07-03**, contra o código do app (`Ln-Carvalho/saas`).
> Este arquivo substitui o `FEATURE-MAPPING.md` (desatualizado) para fins de conteúdo.
> Todo guia publicado em `/guias` só pode afirmar o que está na lista "PODE AFIRMAR".
> Reverifique este arquivo a cada lançamento de feature relevante e atualize a data acima.

## Produto em uma frase

Cadencio é um sistema de gestão para estúdios de dança (e atividades similares): controle de presença, turmas, alunos, financeiro de mensalidades e relatórios — tudo pelo navegador, sem instalação.

- Site: https://www.cadencio.app · App: https://my.cadencio.app
- Público: donos e gestores de estúdio, não técnicos. Persona feminina predominante ("alunas").
- Oferta comercial aprovada em **2026-10-08**: **plano Pro por R$ 149/mês, com 14 dias grátis; cancele quando quiser**. Use essa oferta única nos guias e CTAs.
- Destino de contratação: `https://my.cadencio.app/register?plan=pro&interval=month`. Não anunciar acesso beta, outras faixas de preço ou plano anual para novas contratações. Não prometer teste sem cartão: o checkout exige cartão.

## ✅ PODE AFIRMAR (verificado no código)

### Presença
- Chamada da turma do dia em poucos cliques (presente/falta), pelo celular ou computador, no navegador.
- Registro salvo automaticamente; histórico consultável por aluna, turma e período.
- Marcação de aula experimental (aluna de teste) na chamada.
- **Reposição de aulas**: registrar a reposição de uma aluna em outra aula da grade.

### Turmas e agenda
- Turmas com nome, modalidade e capacidade; várias modalidades no mesmo estúdio.
- Horários recorrentes por dia da semana; as aulas do período são geradas automaticamente.
- Feriados e dias sem aula configuráveis (o sistema ajusta a agenda).
- Professores cadastrados por turma (**um professor responsável por turma** — NÃO afirmar multi-professor).

### Alunos
- Cadastro completo, com canal de origem (indicação, Instagram, etc.).
- **Importação de alunos via planilha (Excel)** para migração.
- Matrículas ligando aluna a turma e dias da semana.
- Conversão de aluna experimental em matrícula.

### Financeiro (mensalidades)
- Planos com valor e dia de vencimento **por aluna**.
- Geração das mensalidades do mês; status: pendente, paga, parcial, em atraso.
- Registro de pagamento em poucos cliques; histórico financeiro por aluna.
- Painel com total recebido, a receber e taxa de inadimplência do mês.
- **Importante**: o Cadencio REGISTRA e ACOMPANHA pagamentos. Ele NÃO cobra as alunas (sem boleto, sem pix automático, sem cobrança recorrente).

### Relatórios e retenção
- Página de Relatórios com abas: Alunos, Turmas, Professores, Financeiro e Riscos.
- **Indicador de risco de evasão por aluna**, calculado automaticamente combinando: faltas seguidas, frequência no período e situação da mensalidade.
- Da lista de risco, um clique abre o cadastro da aluna com o histórico completo.
- Visão de saúde das turmas (frequência e tendência).

### Equipe e conta
- Múltiplos usuários com papéis: dona(o), administração e secretaria; convites por email.
- Onboarding guiado (turma → professor → horário → aluna → matrícula); operação básica pronta em minutos.
- Funciona no navegador (celular, tablet, computador). Sem instalação.

## ❌ NUNCA AFIRMAR (não existe no produto)

| Claim proibido | Realidade |
|---|---|
| App instalável / "baixe o aplicativo" | Funciona no navegador |
| Portal ou app para as alunas | Só a equipe do estúdio acessa |
| Cobrança automática, boleto, pix, débito recorrente | Financeiro é registro/acompanhamento interno |
| Lembretes/notificações automáticas para alunas (WhatsApp, SMS, email) | Não existe |
| Integrações com outros sistemas | Não anunciar |
| Mais de um professor por turma | Ainda não lançado (em backlog) |
| Emissão de nota fiscal | Não existe |
| Site/página de vendas para o estúdio | Não anunciar |

## Vocabulário do produto (usar exatamente estes termos)

- "chamada" (não "check-in"), "turma", "aluna(s)", "mensalidade", "matrícula", "grade" (de horários), "reposição", "aula experimental", "risco de evasão", "Relatórios" (página), "aba Alunos".
- Tom: direto, prático, sem jargão técnico, pt-BR. O leitor administra um estúdio, não entende de tecnologia.
