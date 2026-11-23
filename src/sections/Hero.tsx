import { Fragment, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, Bot, ChevronRight, ShieldCheck, Users, Workflow } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { useI18n } from '../lib/i18n'
import { useSectionNav } from '../lib/hooks'
import { icons } from '../lib/icons'
import { cn, ease } from '../lib/utils'

export function Hero() {
  const { ui } = useI18n()
  const go = useSectionNav()
  const h = ui.hero

  return (
    <section id="inicio" className="relative px-4 pt-32 pb-24 sm:px-6 md:pt-40 lg:pb-32">
      <div className="mx-auto grid max-w-6xl items-center gap-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-fg-soft"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            {h.badge}
          </motion.span>

          <Reveal delay={0.08}>
            <h1 className="mt-7 text-[2.6rem] leading-[1.04] font-semibold tracking-[-0.035em] text-balance sm:text-6xl lg:text-[4.4rem]">
              {h.titleA}
              <br />
              <span className="text-gradient">{h.titleB}</span> {h.titleC}
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted">{h.subtitle}</p>
          </Reveal>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#diagnostico"
              onClick={(e) => {
                e.preventDefault()
                go('diagnostico')
              }}
              className="btn btn-primary h-12 px-6"
            >
              {h.ctaPrimary}
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold">{h.ctaHint}</span>
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#cases"
              onClick={(e) => {
                e.preventDefault()
                go('cases')
              }}
              className="btn btn-glass h-12 px-6"
            >
              {h.ctaSecondary}
            </a>
          </motion.div>

          <Reveal delay={0.4}>
            <ul className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6">
              {h.pillars.map((p) => {
                const Icon = icons[p.icon]
                return (
                  <li key={p.title}>
                    <Icon className="size-5 text-accent" />
                    <p className="mt-2 text-sm font-semibold">{p.title}</p>
                    <p className="mt-0.5 text-xs leading-snug text-muted">{p.text}</p>
                  </li>
                )
              })}
            </ul>
          </Reveal>
        </div>

        <HeroVisual />
      </div>
    </section>
  )
}

/** Composição de vidro: um assistente de IA atendendo + cartões flutuantes. */
function HeroVisual() {
  const { ui } = useI18n()
  const v = ui.hero.visual

  return (
    <div className="relative isolate mx-auto w-full max-w-[26rem] lg:mr-0">
      <div
        aria-hidden="true"
        className="absolute -inset-10 -z-10 rounded-[3rem] bg-linear-to-br from-accent/30 via-accent-2/15 to-transparent blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease, delay: 0.2 }}
        className="glass-strong relative rounded-[2rem] p-5 sm:p-6"
      >
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-2xl bg-linear-to-br from-accent to-accent-2 text-accent-fg">
              <Bot className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">{v.assistant}</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                {v.online}
              </p>
            </div>
          </div>
          <span className="chip">{v.tag}</span>
        </div>

        <motion.ul
          className="mt-5 space-y-3"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.55, delayChildren: 0.8 } } }}
        >
          {v.messages.map((m, i) => (
            <motion.li
              key={i}
              variants={{
                hidden: { opacity: 0, y: 10, scale: 0.97 },
                show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease } },
              }}
              className={cn(
                'w-fit max-w-[86%] rounded-2xl px-4 py-2.5 text-sm leading-snug',
                m.from === 'client'
                  ? 'rounded-bl-md border border-line bg-[var(--field-bg)] text-fg-soft'
                  : 'ml-auto rounded-br-md bg-accent text-accent-fg',
              )}
            >
              {m.text}
            </motion.li>
          ))}
        </motion.ul>

        <p className="mt-5 flex items-center gap-2 rounded-xl bg-accent-soft px-3 py-2 text-xs font-medium text-fg-soft">
          <Users className="size-3.5 text-accent" />
          {v.human}
        </p>
      </motion.div>

      <Float className="absolute -top-8 -right-1 sm:-right-10" delay={1} bobDelay={0}>
        <div className="flex items-center gap-3 p-3 pr-4">
          <span className="grid size-9 place-items-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="size-5" />
          </span>
          <div>
            <p className="text-sm font-semibold">{v.secureTitle}</p>
            <p className="text-xs text-muted">{v.secureText}</p>
          </div>
        </div>
      </Float>

      <Float className="absolute -bottom-[4.75rem] -left-1 sm:-left-12" delay={1.3} bobDelay={1.8}>
        <div className="p-3.5">
          <p className="flex items-center gap-2 text-xs font-semibold">
            <Workflow className="size-4 text-accent" />
            {v.flowTitle}
          </p>
          <div className="mt-2.5 flex items-center gap-1">
            {v.flow.map((step, i) => (
              <Fragment key={step}>
                <span className="rounded-lg bg-accent-soft px-2 py-1 text-[11px] font-semibold text-accent">{step}</span>
                {i < v.flow.length - 1 && <ChevronRight className="size-3 text-muted" />}
              </Fragment>
            ))}
          </div>
        </div>
      </Float>
    </div>
  )
}

/** Cartão de vidro que entra com fade e depois flutua levemente. */
function Float({
  children,
  className,
  delay,
  bobDelay,
}: {
  children: ReactNode
  className?: string
  delay: number
  bobDelay: number
}) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: bobDelay }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay }}
        className="glass-strong rounded-2xl"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
