export type GuideCategory = "presenca" | "turmas" | "planilhas" | "historico"

export type GuideSection = {
  heading: string
  body: string[]
}

export type GuideFaq = {
  question: string
  answer: string
}

export type Guide = {
  title: string
  slug: string
  description: string
  category: GuideCategory
  intent: string
  primaryKeyword: string
  secondaryKeywords: string[]
  publishedAt: string
  updatedAt: string
  readingTime: string
  heroSummary: string
  demoSlug: string
  sections: GuideSection[]
  faq: GuideFaq[]
  relatedGuides: string[]
}

export type Demo = {
  title: string
  slug: string
  description: string
  durationLabel: string
  durationIso: string
  videoUrl: string | null
  thumbnail: string | null
  transcript: string[]
  relatedFeature: string
  relatedGuides: string[]
}

export const demos = [
  {
    title: "Como fazer chamada de uma turma em menos de 1 minuto",
    slug: "chamada-de-turma-em-1-minuto",
    description: "Veja como marcar presença e falta sem caderno, pelo navegador.",
    durationLabel: "20 s",
    durationIso: "PT20S",
    videoUrl: "/demos/chamada-de-turma-em-1-minuto.mp4",
    thumbnail: "/demos/chamada-de-turma-em-1-minuto-thumb.webp",
    transcript: [
      "Abra a turma do dia no Cadencio.",
      "Confira a lista de alunas esperadas para a aula.",
      "Marque presente ou falta com um clique.",
      "O histórico fica salvo automaticamente para consulta depois.",
    ],
    relatedFeature: "Controle de presença",
    relatedGuides: ["controle-de-presenca-estudio-danca"],
  },
  {
    title: "Como cadastrar uma turma e definir horários",
    slug: "cadastrar-turma-e-horarios",
    description: "Monte a grade recorrente do estúdio sem depender de planilhas soltas.",
    durationLabel: "23 s",
    durationIso: "PT23S",
    videoUrl: "/demos/cadastrar-turma-e-horarios.mp4",
    thumbnail: "/demos/cadastrar-turma-e-horarios-thumb.webp",
    transcript: [
      "Crie uma turma com nome, modalidade e capacidade.",
      "Defina os dias da semana e horários de aula.",
      "Salve a turma para que as aulas apareçam na rotina do estúdio.",
    ],
    relatedFeature: "Gestão de turmas",
    relatedGuides: ["organizar-turmas-horarios-escola-danca"],
  },
  {
    title: "Como importar alunos de uma planilha para o Cadencio",
    slug: "importar-alunos-planilha",
    description: "Entenda o fluxo para trazer os cadastros existentes para o sistema.",
    durationLabel: "24 s",
    durationIso: "PT24S",
    videoUrl: "/demos/importar-alunos-planilha.mp4",
    thumbnail: "/demos/importar-alunos-planilha-thumb.webp",
    transcript: [
      "Separe a planilha com os dados das alunas.",
      "Use a importação para criar os cadastros no Cadencio.",
      "Revise os dados importados antes de começar a chamada.",
    ],
    relatedFeature: "Importação via planilha",
    relatedGuides: ["planilha-presenca-danca-quando-deixa-de-funcionar"],
  },
  {
    title: "Como consultar o histórico de presença de uma aluna",
    slug: "historico-de-presenca-aluna",
    description: "Veja como acompanhar faltas e presença sem refazer contas no fim do mês.",
    durationLabel: "17 s",
    durationIso: "PT17S",
    videoUrl: "/demos/historico-de-presenca-aluna.mp4",
    thumbnail: "/demos/historico-de-presenca-aluna-thumb.webp",
    transcript: [
      "Abra os relatórios e acesse a aba Alunos.",
      "Veja o risco de evasão calculado para cada aluna, combinando faltas seguidas, frequência e inadimplência no período.",
      "Identifique a aluna sinalizada com risco de evasão.",
      "Clique nela para abrir o cadastro completo e ver os detalhes.",
    ],
    relatedFeature: "Histórico de presença",
    relatedGuides: ["acompanhar-faltas-historico-presenca-alunas"],
  },
] satisfies Demo[]

export const guides = [
  {
    title: "Como controlar presença em estúdio de dança sem caderno ou planilha",
    slug: "controle-de-presenca-estudio-danca",
    description: "Um guia prático para substituir listas de presença em papel por um fluxo simples, rastreável e pronto para a rotina do estúdio.",
    category: "presenca",
    intent: "Dono de estúdio que ainda usa caderno, lista impressa ou planilha para chamada.",
    primaryKeyword: "controle de presença para estúdio de dança",
    secondaryKeywords: ["lista de presença dança", "chamada de turma de dança", "presença de alunas"],
    publishedAt: "2026-06-24",
    updatedAt: "2026-06-24",
    readingTime: "6 min",
    heroSummary: "A presença precisa ser rápida na porta da sala e confiável no fim do mês. O Cadencio resolve esse intervalo.",
    demoSlug: "chamada-de-turma-em-1-minuto",
    sections: [
      {
        heading: "Por que o caderno começa a atrapalhar",
        body: [
          "No começo, a lista em papel parece suficiente. O problema aparece quando o estúdio cresce, troca professores, mistura reposições e precisa consultar o histórico de uma aluna.",
          "Quando a informação fica em folhas soltas, o fim do mês vira conferência manual. O dono perde tempo tentando descobrir quem veio, quem faltou e qual dado está correto.",
        ],
      },
      {
        heading: "O fluxo ideal para uma chamada de turma",
        body: [
          "A turma do dia deve abrir com a lista de alunas esperadas. A marcação precisa acontecer em poucos cliques, pelo celular ou computador, sem depender de instalação.",
          "Depois da aula, o registro precisa ficar salvo automaticamente. Assim, o histórico deixa de depender da memória de quem fez a chamada.",
        ],
      },
      {
        heading: "Como o Cadencio muda essa rotina",
        body: [
          "No Cadencio, a chamada fica ligada à turma, ao horário e à aluna. Isso transforma a presença em dado de gestão, não só em uma anotação.",
          "A equipe consegue consultar registros anteriores e manter a rotina organizada mesmo quando mais de uma pessoa ajuda na operação.",
        ],
      },
    ],
    faq: [
      {
        question: "Preciso instalar aplicativo para fazer chamada?",
        answer: "Não. O Cadencio funciona no navegador, pelo celular ou computador.",
      },
      {
        question: "Dá para testar antes de decidir?",
        answer: "Sim. O Cadencio tem teste grátis por 14 dias e pode ser cancelado quando quiser.",
      },
    ],
    relatedGuides: ["organizar-turmas-horarios-escola-danca", "acompanhar-faltas-historico-presenca-alunas"],
  },
  {
    title: "Como organizar turmas e horários em uma escola de dança",
    slug: "organizar-turmas-horarios-escola-danca",
    description: "Veja como sair da grade improvisada e montar uma rotina de turmas mais clara para gestão, professores e recepção.",
    category: "turmas",
    intent: "Dono de escola de dança organizando horários, modalidades e turmas recorrentes.",
    primaryKeyword: "organizar turmas de dança",
    secondaryKeywords: ["horários escola de dança", "gestão de turmas", "grade de aulas dança"],
    publishedAt: "2026-06-24",
    updatedAt: "2026-06-24",
    readingTime: "5 min",
    heroSummary: "Uma grade clara reduz desencontro, facilita chamada e evita depender de uma planilha que só uma pessoa entende.",
    demoSlug: "cadastrar-turma-e-horarios",
    sections: [
      {
        heading: "A grade é o centro da operação",
        body: [
          "Toda rotina do estúdio passa pelas turmas: horários, modalidades, professor responsável, presença e comunicação com alunas.",
          "Quando essa estrutura fica espalhada em agenda, planilha e conversa de WhatsApp, a operação depende de conferência constante.",
        ],
      },
      {
        heading: "O que uma turma precisa ter",
        body: [
          "Uma turma precisa de nome, modalidade, capacidade e horários recorrentes. Essas informações devem ser fáceis de revisar conforme a agenda muda.",
          "Com esse cadastro organizado, a chamada deixa de ser uma tarefa isolada e passa a fazer parte do fluxo normal de gestão.",
        ],
      },
      {
        heading: "Como o Cadencio ajuda",
        body: [
          "O Cadencio centraliza turmas, horários e alunas. Isso ajuda a recepção, os professores e a gestão a trabalharem com a mesma informação.",
          "O resultado é menos retrabalho e mais clareza sobre o que acontece em cada aula.",
        ],
      },
    ],
    faq: [
      {
        question: "Posso ter modalidades diferentes no mesmo estúdio?",
        answer: "Sim. As turmas podem representar diferentes modalidades e horários dentro do mesmo estúdio.",
      },
      {
        question: "Consigo usar no começo mesmo com poucas turmas?",
        answer: "Sim. A proposta é funcionar tanto para estúdios pequenos quanto para operações em crescimento.",
      },
    ],
    relatedGuides: ["controle-de-presenca-estudio-danca", "planilha-presenca-danca-quando-deixa-de-funcionar"],
  },
  {
    title: "Planilha de presença para dança: quando ela deixa de funcionar",
    slug: "planilha-presenca-danca-quando-deixa-de-funcionar",
    description: "Entenda os sinais de que a planilha deixou de ajudar e começou a criar retrabalho na gestão do estúdio.",
    category: "planilhas",
    intent: "Dono de estúdio comparando planilha com sistema de gestão.",
    primaryKeyword: "planilha de presença para dança",
    secondaryKeywords: ["controle de presença excel", "substituir planilha estúdio", "gestão sem planilha"],
    publishedAt: "2026-06-24",
    updatedAt: "2026-06-24",
    readingTime: "7 min",
    heroSummary: "Planilha resolve o começo. Depois, ela pode virar o gargalo que esconde dados importantes da operação.",
    demoSlug: "importar-alunos-planilha",
    sections: [
      {
        heading: "A planilha é útil até certo ponto",
        body: [
          "Excel e Google Sheets ajudam quando a operação ainda é pequena. O problema surge quando a planilha vira cadastro, chamada, financeiro manual e histórico ao mesmo tempo.",
          "Nesse momento, qualquer ajuste exige cuidado para não quebrar fórmulas, perder filtros ou duplicar informações.",
        ],
      },
      {
        heading: "Sinais de que a planilha virou gargalo",
        body: [
          "Se só uma pessoa entende o arquivo, se os professores não atualizam a informação na hora, ou se o fim do mês exige conferência manual, a planilha já está custando tempo.",
          "Outro sinal é quando existem versões diferentes do mesmo controle circulando entre computador, celular e mensagens.",
        ],
      },
      {
        heading: "Como migrar sem recomeçar do zero",
        body: [
          "A migração deve aproveitar o que já existe: nomes, contatos e vínculo com turmas. O Cadencio deve receber essa base e transformar a rotina em fluxo de sistema.",
          "Depois da importação, o cadastro deixa de ser um arquivo isolado e passa a sustentar chamada, histórico e organização de turmas.",
        ],
      },
    ],
    faq: [
      {
        question: "Preciso apagar minha planilha atual?",
        answer: "Não. A planilha pode servir como base de migração e continuar guardada como referência.",
      },
      {
        question: "O Cadencio substitui Excel para presença?",
        answer: "Sim para o fluxo de presença, turmas e histórico. A ideia é tirar a operação diária da planilha.",
      },
    ],
    relatedGuides: ["controle-de-presenca-estudio-danca", "organizar-turmas-horarios-escola-danca"],
  },
  {
    title: "Como acompanhar faltas e histórico de presença das alunas",
    slug: "acompanhar-faltas-historico-presenca-alunas",
    description: "Aprenda a transformar presença em histórico consultável para entender frequência, faltas e reposições.",
    category: "historico",
    intent: "Gestor que precisa consultar presença acumulada sem refazer contas.",
    primaryKeyword: "histórico de presença de alunas",
    secondaryKeywords: ["faltas em escola de dança", "frequência de alunos dança", "controle de reposição aula"],
    publishedAt: "2026-06-24",
    updatedAt: "2026-06-24",
    readingTime: "6 min",
    heroSummary: "A chamada só vira gestão quando o histórico fica fácil de consultar.",
    demoSlug: "historico-de-presenca-aluna",
    sections: [
      {
        heading: "Presença não deveria morrer no dia da aula",
        body: [
          "Marcar quem veio é só o primeiro passo. O valor aparece quando o estúdio consegue consultar esse histórico depois.",
          "Sem histórico organizado, faltas recorrentes, dúvidas de reposição e acompanhamento de frequência ficam espalhados em mensagens e lembranças.",
        ],
      },
      {
        heading: "O que observar no histórico",
        body: [
          "Um bom histórico deve mostrar registros por aluna, por turma e por período. Isso ajuda a responder perguntas simples sem abrir várias planilhas.",
          "Também ajuda a equipe a conversar com mais contexto quando uma aluna falta muito ou quando há dúvida sobre aulas realizadas.",
        ],
      },
      {
        heading: "Como o Cadencio deixa isso rastreável",
        body: [
          "Cada chamada registrada no Cadencio alimenta o histórico. Assim, o estúdio não depende de refazer conta no fim do mês.",
          "Esse histórico cria uma base mais confiável para acompanhar presença e tomar decisões operacionais.",
        ],
      },
    ],
    faq: [
      {
        question: "Consigo consultar presença depois da aula?",
        answer: "Sim. A proposta é manter o registro salvo para consulta posterior.",
      },
      {
        question: "Isso ajuda em reposição de aula?",
        answer: "Ajuda porque o estúdio passa a ter um histórico mais confiável para analisar faltas e presença.",
      },
    ],
    relatedGuides: ["controle-de-presenca-estudio-danca", "planilha-presenca-danca-quando-deixa-de-funcionar"],
  },
] satisfies Guide[]

export const guideRoutes = guides.map((guide) => `/guias/${guide.slug}`)
export const demoRoutes = demos.map((demo) => `/demos/${demo.slug}`)

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug)
}

export function getDemoBySlug(slug: string) {
  return demos.find((demo) => demo.slug === slug)
}
