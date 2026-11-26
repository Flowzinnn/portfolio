import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { profile } from '../data/profile'
import { useI18n } from '../lib/i18n'
import { icons } from '../lib/icons'
import { techLogos } from '../lib/techLogos'
import { cn } from '../lib/utils'
import { GlassCard } from './GlassCard'

const cloud = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
  exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
}

const bubble = {
  hidden: { opacity: 0, scale: 0.6, y: 16 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 320, damping: 22 } },
  exit: { opacity: 0, scale: 0.8, y: -8, transition: { duration: 0.15 } },
} as const

/** Marcas de cor clara (amarelo, ciano, rosa…) ficam sobre fundo escuro para não sumirem no branco. */
function isLight(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.4
}

/** Bolinha com o logo oficial (cor da marca) ou, sem logo, um ícone genérico na cor do site. */
function TechIcon({ logo, icon }: { logo?: keyof typeof techLogos; icon?: keyof typeof icons }) {
  const brand = logo ? techLogos[logo] : undefined
  const Generic = icon ? icons[icon] : undefined
  return (
    <span
      className={cn(
        'grid size-8 shrink-0 place-items-center rounded-full shadow-sm ring-1',
        brand && isLight(brand.hex) ? 'bg-[#16141f] ring-white/10' : 'bg-white ring-black/5',
      )}
    >
      {brand ? (
        <svg role="img" viewBox="0 0 24 24" aria-hidden className="size-[18px]" fill={`#${brand.hex}`}>
          <path d={brand.path} />
        </svg>
      ) : Generic ? (
        <Generic className="size-[18px] text-accent" aria-hidden />
      ) : null}
    </span>
  )
}

/** Menu de tecnologias: abas por área e uma "nuvem" de bolhas flutuantes com cada tecnologia. */
export function TechStack() {
  const { ui, t } = useI18n()
  const [active, setActive] = useState(profile.stack[0].id)
  const baseId = useId()
  const current = profile.stack.find((c) => c.id === active) ?? profile.stack[0]

  return (
    <div>
      <div
        role="tablist"
        aria-label={ui.about.stackTitle}
        className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:flex-wrap sm:overflow-visible"
      >
        {profile.stack.map((cat) => {
          const Icon = icons[cat.icon]
          const selected = cat.id === active
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              id={`${baseId}-tab-${cat.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              onClick={() => setActive(cat.id)}
              className={cn(
                'relative inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors',
                selected ? 'text-accent-fg' : 'glass text-fg-soft hover:text-fg',
              )}
            >
              {selected && (
                <motion.span
                  layoutId={`${baseId}-pill`}
                  className="absolute inset-0 rounded-full bg-linear-to-br from-accent to-accent-2 shadow-[0_10px_30px_-12px_var(--accent-glow)]"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <Icon className="relative size-4" />
              <span className="relative">{t(cat.label)}</span>
            </button>
          )
        })}
      </div>

      <GlassCard
        interactive={false}
        className="relative mt-4 overflow-hidden rounded-[1.75rem] px-5 py-7 sm:px-8"
      >
        {/* brilho de fundo que acompanha a área escolhida */}
        <div aria-hidden className="pointer-events-none absolute -top-16 left-1/2 size-56 -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />

        <div role="tabpanel" id={`${baseId}-panel`} aria-labelledby={`${baseId}-tab-${current.id}`} className="relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={current.id} initial="hidden" animate="show" exit="exit" variants={cloud}>
              <motion.p variants={bubble} className="text-center text-[15px] text-muted">
                {t(current.blurb)}
              </motion.p>
              <ul className="mt-6 flex min-h-[8.5rem] flex-wrap content-center items-center justify-center gap-x-3 gap-y-4">
                {current.items.map((item, i) => {
                  const name = typeof item.name === 'string' ? item.name : t(item.name)
                  return (
                    <motion.li key={name} variants={bubble}>
                      {/* flutuação contínua, com ritmos diferentes para parecer uma nuvem */}
                      <motion.span
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3.2 + (i % 3) * 0.7, repeat: Infinity, ease: 'easeInOut', delay: (i % 4) * 0.35 }}
                        whileHover={{ scale: 1.08 }}
                        className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-1.5 shadow-[0_12px_30px_-18px_var(--accent-glow)]"
                      >
                        <TechIcon logo={item.logo} icon={item.icon} />
                        <span className="text-sm font-semibold tracking-tight">{name}</span>
                      </motion.span>
                    </motion.li>
                  )
                })}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </GlassCard>
    </div>
  )
}
