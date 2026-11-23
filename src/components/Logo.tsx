import { useId } from 'react'
import { brand } from '../config/brand'
import { cn } from '../lib/utils'

/**
 * Símbolo da Wolf Solutions: cabeça de lobo geométrica em forma de escudo (estratégia + segurança),
 * com os olhos formando um "W" vazado (visão + inicial da marca). As cores seguem o tema do site.
 */
export function LogoMark({ className }: { className?: string }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn('size-8 shrink-0', className)}>
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--accent)' }} />
          <stop offset="1" style={{ stopColor: 'var(--accent-2)' }} />
        </linearGradient>
        <mask id={`m${id}`}>
          <rect width="64" height="64" fill="#fff" />
          <polyline
            points="20,28.5 26,34.5 32,29.5 38,34.5 44,28.5"
            fill="none"
            stroke="#000"
            strokeWidth="3.6"
            strokeLinejoin="miter"
            strokeLinecap="square"
          />
        </mask>
      </defs>
      <polygon points="16,4 32,17 48,4 54,26 32,60 10,26" fill={`url(#g${id})`} mask={`url(#m${id})`} />
      {/* faceta de luz: dá profundidade geométrica */}
      <polygon points="32,17 48,4 54,26 32,60" fill="#fff" fillOpacity={0.16} mask={`url(#m${id})`} />
    </svg>
  )
}

/** Símbolo + nome, para a barra de navegação e o rodapé. */
export function Logo({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark />
      {!compact && (
        <span className="text-[15px] leading-none tracking-tight">
          <span className="font-bold">{brand.first}</span>{' '}
          <span className="font-medium text-muted">{brand.second}</span>
        </span>
      )}
    </span>
  )
}
