import { AnimatePresence, motion } from 'motion/react'
import { Moon, Sun } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { useTheme } from '../lib/theme'
import { cn } from '../lib/utils'
import type { Lang } from '../lib/types'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const { ui } = useI18n()
  const isDark = theme === 'dark'
  const label = isDark ? ui.theme.toLight : ui.theme.toDark

  return (
    <button type="button" onClick={toggle} aria-label={label} title={label} className="icon-btn overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: -14, opacity: 0, rotate: -40 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 14, opacity: 0, rotate: 40 }}
          transition={{ duration: 0.25 }}
          className="grid place-items-center"
        >
          {isDark ? <Moon className="size-[18px]" /> : <Sun className="size-[18px]" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

const LANGS: Lang[] = ['pt', 'en']

export function LangToggle() {
  const { lang, setLang, ui } = useI18n()
  return (
    <div role="group" aria-label={ui.lang.label} className="flex items-center rounded-full bg-black/[0.04] p-0.5 dark:bg-white/[0.06]">
      {LANGS.map((l) => {
        const active = lang === l
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={active}
            className={cn(
              'relative isolate rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase transition-colors duration-300',
              active ? 'text-accent-fg' : 'text-muted hover:text-fg',
            )}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 -z-10 rounded-full bg-accent"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            {l}
          </button>
        )
      })}
    </div>
  )
}
