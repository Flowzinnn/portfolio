import type { MouseEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { CtaBox } from '../components/CtaBox'
import { GlassCard } from '../components/GlassCard'
import { Reveal } from '../components/Reveal'
import { getPost } from '../lib/blog'
import { useDocumentTitle } from '../lib/hooks'
import { useI18n } from '../lib/i18n'
import { formatDate } from '../lib/utils'
import NotFound from './NotFound'

export default function BlogPost() {
  const { slug = '' } = useParams()
  const { ui, lang } = useI18n()
  const navigate = useNavigate()
  const found = getPost(lang, slug)
  useDocumentTitle(found ? `${found.post.title} — Nicolas Wolf` : ui.meta.notFound)

  if (!found) return <NotFound />
  const { post, fallback } = found
  const b = ui.blog

  // Links internos do artigo navegam sem recarregar a página.
  function onContentClick(e: MouseEvent<HTMLDivElement>) {
    const anchor = (e.target as HTMLElement).closest('a')
    const base = import.meta.env.BASE_URL
    const href = anchor?.getAttribute('href') ?? ''
    if (!anchor || !href.startsWith(base) || anchor.target || e.metaKey || e.ctrlKey) return
    e.preventDefault()
    const [pathname, hash] = `/${href.slice(base.length)}`.split('#')
    navigate({ pathname: pathname || '/', hash: hash ? `#${hash}` : '' })
  }

  return (
    <article className="px-4 pt-32 pb-24 sm:px-6 md:pt-40">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-fg">
            <ArrowLeft className="size-4" />
            {b.back}
          </Link>
        </Reveal>

        <Reveal delay={0.06} className="mt-8">
          <div className="flex items-center gap-2.5 text-sm text-muted">
            <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
            <span className="size-1 rounded-full bg-muted/50" />
            <span>
              {post.readingTime} {ui.common.minRead}
            </span>
          </div>
          <h1 className="mt-4 text-4xl leading-[1.1] font-semibold tracking-[-0.03em] text-balance md:text-5xl">{post.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-pretty text-muted">{post.description}</p>
          {fallback && <p className="mt-4 rounded-xl bg-accent-soft px-4 py-2.5 text-sm text-fg-soft">{b.fallback}</p>}
        </Reveal>

        <GlassCard strong interactive={false} delay={0.12} className="mt-10 rounded-[2rem] p-6 sm:p-12">
          <div
            onClick={onContentClick}
            className="prose prose-glass sm:prose-lg max-w-none prose-headings:tracking-tight prose-a:font-semibold prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </GlassCard>

        <CtaBox
          title={b.ctaTitle}
          text={b.ctaText}
          action={
            <Link to={{ pathname: '/', hash: '#diagnostico' }} className="btn btn-primary h-12 px-6">
              {b.ctaButton}
              <ArrowRight className="size-4" />
            </Link>
          }
        />
      </div>
    </article>
  )
}
