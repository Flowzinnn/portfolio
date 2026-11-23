import { GlassCard } from '../components/GlassCard'
import { Reveal } from '../components/Reveal'
import { Section, SectionHeading } from '../components/Section'
import { useI18n } from '../lib/i18n'
import { icons } from '../lib/icons'

export function Method() {
  const { ui } = useI18n()
  const m = ui.method

  return (
    <Section id="metodo">
      <SectionHeading eyebrow={m.eyebrow} title={m.title} subtitle={m.subtitle} />

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {m.pillars.map((p, i) => {
          const Icon = icons[p.icon]
          return (
            <GlassCard key={p.title} delay={i * 0.08} className="p-7">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-accent-soft text-accent">
                  <Icon className="size-5" />
                </span>
                <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">{p.text}</p>
            </GlassCard>
          )
        })}
      </div>

      <div className="relative mt-20">
        <div
          aria-hidden="true"
          className="absolute top-6 right-[12%] left-[12%] hidden h-px bg-linear-to-r from-transparent via-accent/40 to-transparent md:block"
        />
        <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
          {m.steps.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 0.1} className="flex gap-5 md:block md:text-center">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-line bg-bg text-sm font-bold text-accent shadow-[var(--glass-shadow)] md:mx-auto">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-semibold tracking-tight md:mt-5">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
