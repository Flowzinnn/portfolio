import { Check } from 'lucide-react'
import { GlassCard } from '../components/GlassCard'
import { Section, SectionHeading } from '../components/Section'
import { services } from '../data/services'
import { useI18n } from '../lib/i18n'
import { icons } from '../lib/icons'

export function Solutions() {
  const { ui, t } = useI18n()
  const s = ui.solutions

  return (
    <Section id="solucoes">
      <SectionHeading eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} />

      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => {
          const Icon = icons[service.icon]
          return (
            <GlassCard key={service.id} delay={(i % 3) * 0.08} className="flex flex-col p-7">
              <span className="grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-6 text-xl font-semibold tracking-tight">{t(service.title)}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{t(service.text)}</p>
              <ul className="mt-auto space-y-2.5 border-t border-line pt-5">
                {service.bullets.map((b) => (
                  <li key={b.pt} className="flex gap-2.5 text-sm text-fg-soft">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                    {t(b)}
                  </li>
                ))}
              </ul>
            </GlassCard>
          )
        })}
      </div>
    </Section>
  )
}
