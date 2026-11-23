import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, Check, RotateCcw } from 'lucide-react'
import { GlassCard } from '../components/GlassCard'
import { Reveal } from '../components/Reveal'
import { Eyebrow, Section, SectionHeading } from '../components/Section'
import { buildResult, quizQuestions, type Answers, type Potential } from '../data/quiz'
import { contactDraft } from '../lib/contactDraft'
import { useSectionNav } from '../lib/hooks'
import { useI18n } from '../lib/i18n'
import { icons } from '../lib/icons'
import { cn, ease } from '../lib/utils'

const slide = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 28, filter: 'blur(4px)' }),
  center: { opacity: 1, x: 0, filter: 'blur(0px)' },
  exit: (dir: number) => ({ opacity: 0, x: dir * -28, filter: 'blur(4px)' }),
}

const LEVEL_BARS: Record<Potential, number> = { starter: 1, medium: 2, high: 3 }

export function Quiz() {
  const { ui, lang, t } = useI18n()
  const q = ui.quiz
  const go = useSectionNav()

  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [answers, setAnswers] = useState<Answers>({})
  const busy = useRef(false)

  const total = quizQuestions.length
  const done = step >= total
  const question = quizQuestions[Math.min(step, total - 1)]
  const result = useMemo(() => (done ? buildResult(answers, lang) : null), [done, answers, lang])

  function choose(optionId: string) {
    if (busy.current) return
    busy.current = true
    setAnswers((prev) => ({ ...prev, [question.id]: optionId }))
    setDir(1)
    window.setTimeout(() => {
      setStep((s) => s + 1)
      busy.current = false
    }, 260)
  }

  function back() {
    if (step === 0) return
    setDir(-1)
    setStep((s) => s - 1)
  }

  function restart() {
    setDir(-1)
    setAnswers({})
    setStep(0)
  }

  function talk() {
    if (!result) return
    contactDraft.set(result.summary)
    go('contato')
  }

  const SolutionIcon = result ? icons[result.solution.icon] : null

  return (
    <Section id="diagnostico">
      <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-32">
          <SectionHeading align="left" eyebrow={q.eyebrow} title={q.title} subtitle={q.subtitle} />
          <Reveal delay={0.1}>
            <ul className="mt-8 space-y-3">
              {q.bullets.map((b) => (
                <li key={b} className="flex items-center gap-3 text-[15px] text-fg-soft">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                    <Check className="size-3.5" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <GlassCard strong interactive={false} className="rounded-[2rem] p-6 sm:p-8">
          {!done && (
            <div className="mb-7">
              <div className="flex items-center justify-between text-xs font-medium text-muted">
                <span aria-live="polite">{q.progress(step + 1, total)}</span>
                <button
                  type="button"
                  onClick={back}
                  disabled={step === 0}
                  className="inline-flex items-center gap-1 transition-[color,opacity] hover:text-fg disabled:pointer-events-none disabled:opacity-0"
                >
                  <ArrowLeft className="size-3.5" />
                  {q.back}
                </button>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line">
                <motion.div
                  className="h-full rounded-full bg-linear-to-r from-accent to-accent-2"
                  initial={false}
                  animate={{ width: `${Math.max(step / total, 0.04) * 100}%` }}
                  transition={{ duration: 0.5, ease }}
                />
              </div>
            </div>
          )}

          <div className={cn(!done && 'min-h-[23rem]')}>
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              {!done ? (
                <motion.fieldset
                  key={question.id}
                  custom={dir}
                  variants={slide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease }}
                >
                  <legend className="text-2xl font-semibold tracking-tight text-balance">{t(question.title)}</legend>
                  <div className="mt-6 grid gap-2.5">
                    {question.options.map((o) => {
                      const selected = answers[question.id] === o.id
                      return (
                        <button
                          key={o.id}
                          type="button"
                          onClick={() => choose(o.id)}
                          aria-pressed={selected}
                          className={cn(
                            'group flex w-full items-center justify-between gap-4 rounded-2xl border px-4 py-3.5 text-left text-[15px] font-medium transition-[border-color,background-color,color] duration-300',
                            selected
                              ? 'border-accent bg-accent-soft text-fg'
                              : 'border-line bg-[var(--field-bg)] text-fg-soft hover:border-accent/50 hover:bg-accent-soft hover:text-fg',
                          )}
                        >
                          <span>{t(o.label)}</span>
                          <span
                            className={cn(
                              'grid size-6 shrink-0 place-items-center rounded-full border transition-[border-color,background-color,color] duration-300',
                              selected
                                ? 'border-accent bg-accent text-accent-fg'
                                : 'border-line text-transparent group-hover:border-accent/60',
                            )}
                          >
                            <Check className="size-3.5" />
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </motion.fieldset>
              ) : (
                result &&
                SolutionIcon && (
                  <motion.div
                    key="result"
                    custom={dir}
                    variants={slide}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease }}
                    aria-live="polite"
                  >
                    <Eyebrow>{q.resultEyebrow}</Eyebrow>

                    <div className="mt-5 flex items-start gap-4">
                      <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-accent to-accent-2 text-accent-fg shadow-[0_12px_30px_-12px_var(--accent-glow)]">
                        <SolutionIcon className="size-6" />
                      </span>
                      <div>
                        <h3 className="text-2xl font-semibold tracking-tight">{t(result.solution.title)}</h3>
                        <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{t(result.solution.text)}</p>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-line bg-[var(--field-bg)] px-4 py-3">
                      <span className="text-sm font-medium text-fg-soft">{q.potential}</span>
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          {[1, 2, 3].map((n) => (
                            <motion.span
                              key={n}
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ delay: 0.3 + n * 0.12, duration: 0.5, ease }}
                              className={cn(
                                'h-2 w-7 origin-left rounded-full',
                                n <= LEVEL_BARS[result.potential] ? 'bg-linear-to-r from-accent to-accent-2' : 'bg-line',
                              )}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-accent">{q.levels[result.potential]}</span>
                      </div>
                    </div>

                    <h4 className="mt-7 text-sm font-semibold">{q.whyTitle}</h4>
                    <ul className="mt-3 space-y-2.5">
                      {result.why.map((w) => (
                        <li key={w} className="flex gap-2.5 text-[15px] leading-relaxed text-fg-soft">
                          <Check className="mt-1 size-4 shrink-0 text-accent" />
                          {w}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-line bg-[var(--field-bg)] p-4">
                        <p className="text-xs font-semibold tracking-wider text-accent uppercase">{q.firstStepTitle}</p>
                        <p className="mt-2 text-sm leading-relaxed text-fg-soft">{result.firstStep}</p>
                      </div>
                      <div className="rounded-2xl border border-line bg-[var(--field-bg)] p-4">
                        <p className="text-xs font-semibold tracking-wider text-accent uppercase">
                          {q.careTitle(result.care.title)}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-fg-soft">{result.care.text}</p>
                      </div>
                    </div>

                    <p className="mt-6 text-[15px] font-medium">{result.closing}</p>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <button type="button" onClick={talk} className="btn btn-primary h-12 px-6">
                        {q.cta}
                        <ArrowRight className="size-4" />
                      </button>
                      <button type="button" onClick={restart} className="btn h-12 px-4 text-muted hover:text-fg">
                        <RotateCcw className="size-4" />
                        {q.restart}
                      </button>
                    </div>
                    <p className="mt-4 text-xs text-muted">{q.privacy}</p>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>
        </GlassCard>
      </div>
    </Section>
  )
}
