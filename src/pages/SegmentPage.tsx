import { Link, useNavigate, useParams } from 'react-router'
import { ArrowLeft, ArrowRight, Check, CircleAlert } from 'lucide-react'
import { CtaBox } from '../components/CtaBox'
import { GlassCard } from '../components/GlassCard'
import { Reveal } from '../components/Reveal'
import { Eyebrow } from '../components/Section'
import { segments } from '../data/segments'
import { services } from '../data/services'
import { useDocumentTitle } from '../lib/hooks'
import { useI18n } from '../lib/i18n'
import { icons } from '../lib/icons'
import { quizPrefill } from '../lib/stores'
import NotFound from './NotFound'

export default function SegmentPage() {
  const { slug } = useParams()
  const { ui, t } = useI18n()
  const navigate = useNavigate()
  const segment = segments.find((s) => s.slug === slug)
  useDocumentTitle(segment ? ui.meta.segment(t(segment.name)) : ui.meta.notFound)

  if (!segment) return <NotFound />

  const p = ui.segmentPage
  const Icon = icons[segment.icon]
  const startQuiz = () => {
    quizPrefill.set(segment.quizId)
    navigate({ pathname: '/', hash: '#diagnostico' })
  }

  return (
    <article className="px-4 pt-32 pb-24 sm:px-6 md:pt-40">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <Link
            to={{ pathname: '/', hash: '#ramos' }}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft className="size-4" />
            {p.back}
          </Link>
        </Reveal>

        <Reveal delay={0.06} className="mt-8 grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <Eyebrow>{p.eyebrow}</Eyebrow>
            <h1 className="mt-5 text-4xl leading-[1.06] font-semibold tracking-[-0.03em] text-balance md:text-6xl">
              {t(segment.name)}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-fg-soft">{t(segment.short)}</p>
            <p className="mt-2 text-[15px] text-muted">{t(segment.audience)}</p>
          </div>
          <span className="hidden size-28 place-items-center rounded-[2rem] bg-linear-to-br from-accent to-accent-2 text-accent-fg shadow-[0_24px_60px_-20px_var(--accent-glow)] md:grid">
            <Icon className="size-12" />
          </span>
        </Reveal>

        <GlassCard interactive={false} className="mt-12 p-7 sm:p-9">
          <h2 className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">{p.pains}</h2>
          <ul className="mt-5 grid gap-3 md:grid-cols-3">
            {segment.pains.map((pain) => (
              <li key={pain.pt} className="flex gap-3 rounded-2xl border border-line bg-[var(--field-bg)] p-4">
                <CircleAlert className="mt-0.5 size-5 shrink-0 text-accent-2" />
                <span className="text-[15px] leading-relaxed text-fg-soft">{t(pain)}</span>
              </li>
            ))}
          </ul>
        </GlassCard>

        <h2 className="mt-14 text-2xl font-semibold tracking-tight sm:text-3xl">{p.useCases}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {segment.useCases.map((useCase, i) => {
            const service = services.find((s) => s.id === useCase.solution)
            const UseIcon = icons[service?.icon ?? 'sparkles']
            return (
              <GlassCard key={useCase.title.pt} delay={(i % 2) * 0.08} className="p-7">
                <div className="flex items-center justify-between gap-3">
                  <span className="grid size-11 place-items-center rounded-2xl bg-accent-soft text-accent">
                    <UseIcon className="size-5" />
                  </span>
                  {service && <span className="chip">{t(service.title)}</span>}
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{t(useCase.title)}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{t(useCase.text)}</p>
              </GlassCard>
            )
          })}
        </div>

        <GlassCard strong interactive={false} className="mt-4 p-7 sm:p-9">
          <h2 className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">{p.gains}</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {segment.gains.map((gain) => (
              <li key={gain.pt} className="rounded-2xl border border-line bg-[var(--field-bg)] p-4">
                <Check className="size-5 text-accent" />
                <p className="mt-3 text-[15px] leading-relaxed font-medium">{t(gain)}</p>
              </li>
            ))}
          </ul>
        </GlassCard>

        <CtaBox
          title={p.ctaTitle}
          text={p.ctaText}
          action={
            <button type="button" onClick={startQuiz} className="btn btn-primary h-12 px-6">
              {p.ctaButton}
              <ArrowRight className="size-4" />
            </button>
          }
        />

        <Reveal className="mt-14">
          <h2 className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">{p.others}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {segments
              .filter((s) => s.slug !== segment.slug)
              .map((s) => {
                const OtherIcon = icons[s.icon]
                return (
                  <Link key={s.slug} to={`/ia-para/${s.slug}`} className="chip-lg gap-2">
                    <OtherIcon className="size-4 text-accent" />
                    {t(s.name)}
                  </Link>
                )
              })}
          </div>
        </Reveal>
      </div>
    </article>
  )
}
