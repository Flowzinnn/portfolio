import type { CaseStudy } from '../data/cases'
import { icons } from '../lib/icons'
import { asset, cn } from '../lib/utils'

/** Capa do case: usa a imagem se existir; senão, uma capa abstrata no estilo do site. */
export function CaseCover({ item, className, large }: { item: CaseStudy; className?: string; large?: boolean }) {
  if (item.cover) {
    return (
      <img
        src={asset(item.cover)}
        alt=""
        loading="lazy"
        decoding="async"
        className={cn('object-cover', className)}
      />
    )
  }

  const Icon = icons[item.icon]
  return (
    <div
      aria-hidden="true"
      className={cn('relative isolate overflow-hidden bg-linear-to-br from-accent/20 via-accent-2/10 to-transparent', className)}
    >
      <div className="bg-grid absolute inset-0" />
      <div className="absolute -top-1/3 -right-1/4 size-2/3 rounded-full bg-accent-2/25 blur-3xl" />
      <div className="absolute -bottom-1/2 -left-1/4 size-2/3 rounded-full bg-accent/25 blur-3xl" />
      <div className="relative grid h-full place-items-center">
        <span
          className={cn(
            'grid place-items-center rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg-strong)] text-accent shadow-[var(--glass-shadow)]',
            large ? 'size-20 rounded-3xl' : 'size-14',
          )}
        >
          <Icon className={large ? 'size-9' : 'size-6'} />
        </span>
      </div>
    </div>
  )
}
