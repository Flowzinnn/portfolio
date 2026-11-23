import { Link, useParams } from 'react-router'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Lightbulb } from 'lucide-react'
import { CaseCover } from '../components/CaseCover'
import { CtaBox } from '../components/CtaBox'
import { GlassCard } from '../components/GlassCard'
import { Reveal } from '../components/Reveal'
import { DraftBadge } from '../components/Section'
import { cases } from '../data/cases'
import { useDocumentTitle } from '../lib/hooks'
import { useI18n } from '../lib/i18n'
import NotFound from './NotFound'

export default function CasePage() {
  const { slug } = useParams()
  const { ui, t } = useI18n()
  const index = cases.findIndex((c) => c.slug === slug)
  const item = cases[index]
  useDocumentTitle(item ? `${t(item.title)} — Nicolas Wolf` : ui.meta.notFound)

  if (!item) return <NotFound />

  const c = ui.cases
  const next = cases.length > 1 ? cases[(index + 1) % cases.length] : null

  return (
    <article className="px-4 pt-32 pb-24 sm:px-6 md:pt-40">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <Link
            to={{ pathname: '/', hash: '#cases' }}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft className="size-4" />
            {c.back}
          </Link>
        </Reveal>

        <Reveal delay={0.06} className="mt-8">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-semibold tracking-wider text-muted uppercase">
              {t(item.org)}
              {item.year && ` · ${item.year}`}
            </p>
            {item.draft && <DraftBadge label={ui.common.draft} />}
          </div>
          <h1 className="mt-3 text-4xl leading-[1.08] font-semibold tracking-[-0.03em] text-balance md:text-6xl">
            {t(item.title)}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-muted">{t(item.summary)}</p>
          <div className="mt-6 flex flex-wrap items-center gap-1.5">
            {item.tags.map((tag) => (
              <span key={t(tag)} className="chip">
                {t(tag)}
              </span>
            ))}
            {item.repo && (
              <a
                href={item.repo}
                target="_blank"
                rel="noreferrer"
                className="ml-1 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
              >
                {c.repo}
                <ArrowUpRight className="size-4" />
              </a>
            )}
          </div>
        </Reveal>

        <GlassCard interactive={false} delay={0.12} className="mt-10 overflow-hidden rounded-[2rem]">
          <CaseCover item={item} large className="aspect-[16/8] w-full" />
        </GlassCard>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <GlassCard interactive={false} className="p-7">
            <h2 className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">{c.context}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-fg-soft">{t(item.context)}</p>
          </GlassCard>
          <GlassCard interactive={false} delay={0.06} className="p-7">
            <h2 className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">{c.challenge}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-fg-soft">{t(item.challenge)}</p>
          </GlassCard>
        </div>

        <GlassCard interactive={false} className="mt-4 p-7 sm:p-9">
          <h2 className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">{c.solution}</h2>
          <ol className="mt-5 grid gap-4">
            {item.solution.map((s, i) => (
              <li key={s.pt} className="flex gap-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-accent-soft text-xs font-bold text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="pt-1 text-[15px] leading-relaxed text-fg-soft">{t(s)}</p>
              </li>
            ))}
          </ol>
        </GlassCard>

        <GlassCard interactive={false} className="mt-4 p-7 sm:p-9">
          <h2 className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">{c.results}</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {item.results.map((r) => (
              <li key={r.pt} className="rounded-2xl border border-line bg-[var(--field-bg)] p-4">
                <Check className="size-5 text-accent" />
                <p className="mt-3 text-sm leading-relaxed font-medium">{t(r)}</p>
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard strong interactive={false} className="relative mt-4 overflow-hidden p-7 sm:p-9">
          <div
            aria-hidden="true"
            className="absolute -top-20 -right-20 -z-10 size-64 rounded-full bg-linear-to-br from-accent/25 to-accent-2/20 blur-3xl"
          />
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-linear-to-br from-accent to-accent-2 text-accent-fg">
              <Lightbulb className="size-5" />
            </span>
            <h2 className="text-lg font-semibold tracking-tight">{c.business}</h2>
          </div>
          <p className="mt-4 text-[17px] leading-relaxed text-pretty text-fg-soft">{t(item.business)}</p>
        </GlassCard>

        <Reveal className="mt-10">
          <h2 className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">{c.stack}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {item.stack.map((s) => (
              <span key={t(s)} className="chip-lg">
                {t(s)}
              </span>
            ))}
          </div>
        </Reveal>

        <CtaBox
          title={c.ctaTitle}
          text={c.ctaText}
          action={
            <Link to={{ pathname: '/', hash: '#contato' }} className="btn btn-primary h-12 px-6">
              {c.ctaButton}
              <ArrowRight className="size-4" />
            </Link>
          }
        />

        {next && (
          <Reveal className="mt-10 flex justify-end">
            <Link
              to={`/cases/${next.slug}`}
              className="group inline-flex items-center gap-3 text-right text-sm text-muted transition-colors hover:text-fg"
            >
              <span>
                <span className="block text-xs tracking-wider uppercase">{c.next}</span>
                <span className="mt-1 block text-base font-semibold text-fg">{t(next.title)}</span>
              </span>
              <ArrowRight className="size-5 text-accent transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        )}
      </div>
    </article>
  )
}
