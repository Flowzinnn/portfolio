import { cn } from '../lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid size-8 shrink-0 place-items-center rounded-xl bg-linear-to-br from-accent to-accent-2 text-[11px] font-bold tracking-tight text-accent-fg shadow-[0_6px_16px_-6px_var(--accent-glow)]',
        className,
      )}
    >
      NW
    </span>
  )
}
