import { Link } from 'react-router'
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react'
import { CaseCover } from '../components/CaseCover'
import { GlassCard } from '../components/GlassCard'
import { DraftBadge, Section, SectionHeading } from '../components/Section'
import { cases } from '../data/cases'
import { useSectionNav } from '../lib/hooks'
import { useI18n } from '../lib/i18n'

export function Cases() {
  const { ui, t } = useI18n()
  const c = ui.cases
  const go = useSectionNav()

  return (
    <Section id="cases">
      <SectionHeading eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />

      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {cases.map((item, i) => (
          <GlassCard key={item.slug} delay={(i % 2) * 0.08} className="group overflow-hidden">
            <Link to={`/cases/${item.slug}`} className="flex h-full flex-col">
              <div className="relative">
                <CaseCover item={item} className="h-48 w-full" />
                {item.draft && <DraftBadge label={ui.common.draft} className="absolute top-3 right-3" />}
              </div>
              <div className="flex flex-1 flex-col p-7">
                <p className="text-xs font-semibold tracking-wider text-muted uppercase">{t(item.org)}</p>
                <h3 className="mt-2 text-xl leading-snug font-semibold tracking-tight text-balance">{t(item.title)}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{t(item.summary)}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span key={t(tag)} className="chip">
                      {t(tag)}
                    </span>
                  ))}
                </div>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-accent">
                  {ui.common.seeCase}
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </GlassCard>
        ))}

        <GlassCard delay={(cases.length % 2) * 0.08} className="relative flex flex-col justify-between overflow-hidden p-7">
          <div
            aria-hidden="true"
            className="absolute -right-16 -bottom-16 -z-10 size-56 rounded-full bg-linear-to-br from-accent/25 to-accent-2/20 blur-3xl"
          />
          <div>
            <span className="grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent">
              <Sparkles className="size-6" />
            </span>
            <h3 className="mt-6 text-2xl leading-tight font-semibold tracking-tight text-balance">{c.nextTitle}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{c.nextText}</p>
          </div>
          <button type="button" onClick={() => go('diagnostico')} className="btn btn-primary mt-8 h-12 w-full">
            {c.nextCta}
            <ArrowRight className="size-4" />
          </button>
        </GlassCard>
      </div>
    </Section>
  )
}
