import { Link } from 'react-router'
import type { Post } from '../lib/blog'
import { useI18n } from '../lib/i18n'
import { formatDate } from '../lib/utils'
import { GlassCard } from './GlassCard'

export function PostCard({ post, delay = 0 }: { post: Post; delay?: number }) {
  const { ui, lang } = useI18n()
  return (
    <GlassCard delay={delay} className="group">
      <Link to={`/blog/${post.slug}`} className="flex h-full flex-col p-7">
        <div className="flex items-center gap-2.5 text-xs text-muted">
          <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
          <span className="size-1 rounded-full bg-muted/50" />
          <span>
            {post.readingTime} {ui.common.minRead}
          </span>
        </div>
        <h3 className="mt-4 text-xl leading-snug font-semibold tracking-tight text-balance transition-colors duration-300 group-hover:text-accent">
          {post.title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">{post.description}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
          {post.tags.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </GlassCard>
  )
}
