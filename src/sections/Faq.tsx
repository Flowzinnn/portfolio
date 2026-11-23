import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Plus } from 'lucide-react'
import { GlassCard } from '../components/GlassCard'
import { Reveal } from '../components/Reveal'
import { Section, SectionHeading } from '../components/Section'
import { faq } from '../data/faq'
import { useSectionNav } from '../lib/hooks'
import { useI18n } from '../lib/i18n'
import { cn, ease } from '../lib/utils'

export function Faq() {
  const { ui, t } = useI18n()
  const f = ui.faq
  const go = useSectionNav()
  const [open, setOpen] = useState<number | null>(0)

  // Dados estruturados: o Google pode mostrar estas perguntas direto na busca.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: t(item.q),
      acceptedAnswer: { '@type': 'Answer', text: t(item.a) },
    })),
  }

  return (
    <Section id="faq">
      <SectionHeading eyebrow={f.eyebrow} title={f.title} subtitle={f.subtitle} />

      <GlassCard strong interactive={false} className="mx-auto mt-14 max-w-3xl rounded-[2rem] px-6 sm:px-9">
        <ul className="divide-y divide-line">
          {faq.map((item, i) => {
            const isOpen = open === i
            return (
              <li key={item.q.pt}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left text-[17px] font-semibold tracking-tight transition-colors hover:text-accent"
                  >
                    {t(item.q)}
                    <span
                      className={cn(
                        'grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft text-accent transition-transform duration-300',
                        isOpen && 'rotate-45',
                      )}
                    >
                      <Plus className="size-4" />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease }}
                      className="overflow-hidden"
                    >
                      <p className="pr-12 pb-6 text-[15px] leading-relaxed text-muted">{t(item.a)}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </GlassCard>

      <Reveal className="mt-8 flex justify-center">
        <button type="button" onClick={() => go('contato')} className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-accent hover:underline">
          {f.more}
          <ArrowRight className="size-4" />
        </button>
      </Reveal>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </Section>
  )
}
