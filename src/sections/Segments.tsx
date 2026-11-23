import { Link } from 'react-router'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { GlassCard } from '../components/GlassCard'
import { Reveal } from '../components/Reveal'
import { Section, SectionHeading } from '../components/Section'
import { segments } from '../data/segments'
import { useSectionNav } from '../lib/hooks'
import { useI18n } from '../lib/i18n'
import { icons } from '../lib/icons'

export function Segments() {
  const { ui, t } = useI18n()
  const s = ui.segments
  const go = useSectionNav()

  return (
    <Section id="ramos">
      <SectionHeading eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} />

      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {segments.map((segment, i) => {
          const Icon = icons[segment.icon]
          return (
            <GlassCard key={segment.slug} delay={(i % 3) * 0.08} className="group">
              <Link to={`/ia-para/${segment.slug}`} className="flex h-full flex-col p-7">
                <span className="grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-fg">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-6 text-xl font-semibold tracking-tight">{t(segment.name)}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-soft">{t(segment.short)}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{t(segment.audience)}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-accent">
                  {s.cta}
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </GlassCard>
          )
        })}
      </div>

      <Reveal className="mt-8 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-4">
        <p className="text-[15px] text-muted">{s.other}</p>
        <button
          type="button"
          onClick={() => go('diagnostico')}
          className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-accent hover:underline"
        >
          {s.otherCta}
          <ArrowRight className="size-4" />
        </button>
      </Reveal>
    </Section>
  )
}
