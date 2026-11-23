// Lê os artigos de src/content/blog/<pt|en>/<slug>.md
// Para publicar um artigo novo, basta criar um arquivo .md nessas pastas (veja o README).
import { marked } from 'marked'
import type { Lang } from './types'

export type Post = {
  slug: string
  lang: Lang
  title: string
  description: string
  date: string
  tags: string[]
  readingTime: number
  html: string
}

const files = import.meta.glob('../content/blog/*/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {} as Record<string, string>, body: raw }
  const data: Record<string, string> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(':')
    if (i > 0) data[line.slice(0, i).trim()] = line.slice(i + 1).trim()
  }
  return { data, body: match[2] }
}

/** Links internos como "/#diagnostico" passam a respeitar o endereço do site (/portfolio/). */
const withBase = (html: string) => html.replace(/href="\/(?!\/)/g, `href="${import.meta.env.BASE_URL}`)

const posts: Post[] = Object.entries(files)
  .map(([path, raw]) => {
    const m = path.match(/blog\/(pt|en)\/(.+)\.md$/)
    if (!m) return null
    const { data, body } = parseFrontmatter(raw)
    const words = body.trim().split(/\s+/).length
    return {
      slug: m[2],
      lang: m[1] as Lang,
      title: data.title ?? m[2],
      description: data.description ?? '',
      date: data.date ?? '1970-01-01',
      tags: (data.tags ?? '')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      readingTime: Math.max(1, Math.round(words / 200)),
      html: withBase(marked.parse(body, { async: false }) as string),
    }
  })
  .filter((p): p is Post => p !== null)
  .sort((a, b) => b.date.localeCompare(a.date))

export const getPosts = (lang: Lang) => posts.filter((p) => p.lang === lang)

/** Busca o artigo no idioma pedido; se não existir, devolve a versão do outro idioma. */
export function getPost(lang: Lang, slug: string) {
  const exact = posts.find((p) => p.lang === lang && p.slug === slug)
  if (exact) return { post: exact, fallback: false }
  const other = posts.find((p) => p.slug === slug)
  return other ? { post: other, fallback: true } : null
}
