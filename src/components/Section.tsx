import type { ReactNode } from 'react'
import { cn } from '../lib/utils'
import { Reveal } from './Reveal'

export function Section({ id, className, children }: { id: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={cn('relative px-4 py-24 sm:px-6 md:py-32', className)}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">
      <span className="size-1.5 rounded-full bg-accent" />
      {children}
    </span>
  )
}

type HeadingProps = { eyebrow: string; title: string; subtitle?: string; align?: 'center' | 'left' }

export function SectionHeading({ eyebrow, title, subtitle, align = 'center' }: HeadingProps) {
  const center = align === 'center'
  return (
    <Reveal className={cn('max-w-3xl', center && 'mx-auto text-center')}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-5 text-[2rem] leading-[1.1] font-semibold tracking-[-0.03em] text-balance sm:text-5xl">{title}</h2>
      {subtitle && (
        <p className={cn('mt-5 text-lg leading-relaxed text-pretty text-muted', center && 'mx-auto max-w-2xl')}>{subtitle}</p>
      )}
    </Reveal>
  )
}

/** Etiqueta "rascunho" — só aparece rodando localmente (npm run dev), nunca no site publicado. */
export function DraftBadge({ label, className }: { label: string; className?: string }) {
  if (!import.meta.env.DEV) return null
  return (
    <span
      className={cn(
        'inline-flex rounded-full bg-amber-300 px-2 py-0.5 text-[10px] font-bold tracking-wider text-amber-950 uppercase',
        className,
      )}
    >
      {label}
    </span>
  )
}
