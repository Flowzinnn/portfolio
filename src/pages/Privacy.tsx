import { Link } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { GlassCard } from '../components/GlassCard'
import { Reveal } from '../components/Reveal'
import { PRIVACY_UPDATED, privacy } from '../content/privacy'
import { useDocumentTitle } from '../lib/hooks'
import { useI18n } from '../lib/i18n'
import { formatDate } from '../lib/utils'

export default function Privacy() {
  const { ui, lang } = useI18n()
  const p = privacy[lang]
  useDocumentTitle(ui.meta.privacy)

  return (
    <article className="px-4 pt-32 pb-24 sm:px-6 md:pt-40">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-fg">
            <ArrowLeft className="size-4" />
            {ui.notFound.cta}
          </Link>
        </Reveal>

        <Reveal delay={0.06} className="mt-8">
          <h1 className="text-4xl leading-[1.1] font-semibold tracking-[-0.03em] text-balance md:text-5xl">{p.title}</h1>
          <p className="mt-4 text-sm text-muted">
            {p.updated} <time dateTime={PRIVACY_UPDATED}>{formatDate(PRIVACY_UPDATED, lang)}</time>
          </p>
          <p className="mt-5 text-lg leading-relaxed text-pretty text-muted">{p.intro}</p>
        </Reveal>

        <GlassCard strong interactive={false} delay={0.12} className="mt-10 rounded-[2rem] p-6 sm:p-12">
          <div className="prose prose-glass sm:prose-lg max-w-none prose-headings:tracking-tight [&>section:first-child>h2]:mt-0">
            {p.sections.map((s) => (
              <section key={s.title}>
                <h2>{s.title}</h2>
                {s.paragraphs?.map((t) => <p key={t}>{t}</p>)}
                {s.items && (
                  <ul>
                    {s.items.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
                {s.note && <p>{s.note}</p>}
              </section>
            ))}
          </div>
        </GlassCard>
      </div>
    </article>
  )
}
