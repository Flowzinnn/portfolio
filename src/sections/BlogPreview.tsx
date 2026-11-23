import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { PostCard } from '../components/PostCard'
import { Reveal } from '../components/Reveal'
import { Section, SectionHeading } from '../components/Section'
import { getPosts } from '../lib/blog'
import { useI18n } from '../lib/i18n'

export function BlogPreview() {
  const { ui, lang } = useI18n()
  const b = ui.blog
  const posts = getPosts(lang).slice(0, 3)
  if (!posts.length) return null

  return (
    <Section id="blog">
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading align="left" eyebrow={b.eyebrow} title={b.title} subtitle={b.subtitle} />
        <Reveal delay={0.1} className="shrink-0">
          <Link
            to="/blog"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-[var(--field-bg)] px-5 text-sm font-semibold transition-colors duration-300 hover:border-accent/50 hover:text-accent"
          >
            {b.all}
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <PostCard key={post.slug} post={post} delay={i * 0.08} />
        ))}
      </div>
    </Section>
  )
}
