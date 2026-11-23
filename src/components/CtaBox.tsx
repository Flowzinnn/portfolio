import type { ReactNode } from 'react'
import { GlassCard } from './GlassCard'

/** Caixa de chamada para ação no fim das páginas internas. */
export function CtaBox({ title, text, action }: { title: string; text: string; action: ReactNode }) {
  return (
    <GlassCard strong interactive={false} className="relative mt-16 overflow-hidden rounded-[2rem] px-6 py-12 text-center sm:px-12">
      <div
        aria-hidden="true"
        className="absolute -top-24 left-1/2 -z-10 h-48 w-2/3 -translate-x-1/2 rounded-full bg-linear-to-r from-accent/25 to-accent-2/25 blur-3xl"
      />
      <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-muted">{text}</p>
      <div className="mt-8 flex justify-center">{action}</div>
    </GlassCard>
  )
}
