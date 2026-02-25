import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollAnimate } from "@/components/scroll-animate"

const faqs = [
  {
    question: "O que é o beta?",
    answer:
      "Estamos nas primeiras versões do Cadencio. Você usa gratuitamente, nos conta o que funciona e o que pode melhorar, e quando lançarmos oficialmente, recebe condições especiais como agradecimento.",
  },
  {
    question: "Quanto tempo dura o beta?",
    answer:
      "Não temos data fixa. Avisaremos com antecedência antes de qualquer mudança.",
  },
  {
    question: "Funciona para pilates / yoga / artes marciais?",
    answer:
      "Sim. O Cadencio funciona para qualquer espaço com turmas, horários e alunos — dança, pilates, yoga, luta, ginástica.",
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
    <section className="px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-2xl">
        <ScrollAnimate className="text-center">
          <p className="eyebrow mb-3">FAQ</p>
          <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Perguntas frequentes
          </h2>
        </ScrollAnimate>

        <ScrollAnimate delay={200}>
          <Accordion type="single" collapsible className="mt-10">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border-b border-border"
              >
                <AccordionTrigger className="text-left text-sm font-semibold text-foreground hover:text-primary transition-colors py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollAnimate>
      </div>
    </section>
  )
}
