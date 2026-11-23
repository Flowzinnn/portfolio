import type { Lang } from './types'

/** Junta classes CSS ignorando valores vazios. */
export const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ')

/** Curva de animação padrão do site (entra rápido, assenta suave). */
export const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

/** Caminho de um arquivo da pasta public/ respeitando o endereço do site. */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

/** "2026-11-18" → "18 de nov. de 2026" (sem erro de fuso horário). */
export function formatDate(iso: string, lang: Lang) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Intl.DateTimeFormat(lang === 'pt' ? 'pt-BR' : 'en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(y, (m ?? 1) - 1, d ?? 1))
}
