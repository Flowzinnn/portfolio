import { PostCard } from '../components/PostCard'
import { Reveal } from '../components/Reveal'
import { Eyebrow } from '../components/Section'
import { getPosts } from '../lib/blog'
import { useDocumentTitle } from '../lib/hooks'
import { useI18n } from '../lib/i18n'

export default function BlogIndex() {
  const { ui, lang } = useI18n()
  const b = ui.blog
  useDocumentTitle(ui.meta.blog)
  const posts = getPosts(lang)

  return (
    <div className="px-4 pt-32 pb-24 sm:px-6 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-3xl">
          <Eyebrow>{b.eyebrow}</Eyebrow>
          <h1 className="mt-5 text-4xl leading-[1.08] font-semibold tracking-[-0.03em] text-balance md:text-6xl">{b.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{b.subtitle}</p>
        </Reveal>

        {posts.length ? (
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <PostCard key={post.slug} post={post} delay={(i % 3) * 0.08} />
            ))}
          </div>
        ) : (
          <p className="mt-14 text-muted">{b.empty}</p>
        )}
      </div>
    </div>
  )
}
