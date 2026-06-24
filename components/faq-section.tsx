import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Como funciona o teste grátis?",
    answer:
      "Você pode testar o Cadencio por 14 dias para organizar presença, turmas e alunos antes de escolher um plano.",
  },
  {
    question: "Posso cancelar quando quiser?",
    answer:
      "Sim. O teste pode ser cancelado a qualquer momento, sem compromisso de permanência.",
  },
  {
    question: "Funciona para pilates / yoga / artes marciais?",
    answer:
      "Sim. O Cadencio funciona para qualquer espaço com turmas, horários e alunos: dança, pilates, yoga, luta, ginástica.",
  },
  {
    question: "Preciso instalar alguma coisa?",
    answer:
      "Não. O Cadencio funciona no navegador, em qualquer dispositivo.",
  },
  {
    question: "Posso importar meus alunos?",
    answer:
      "Sim. Nosso time te ajuda a migrar seus dados durante o onboarding, sem custo extra.",
  },
]

export function FaqSection() {
  return (
    <section className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-center text-2xl font-bold text-foreground md:text-3xl">
          Perguntas frequentes
        </h2>
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-base font-semibold text-foreground">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
