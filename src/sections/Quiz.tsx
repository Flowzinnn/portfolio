import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, Check, CircleCheck, Download, LoaderCircle, MessageSquareText, RotateCcw } from 'lucide-react'
import { GlassCard } from '../components/GlassCard'
import { Logo } from '../components/Logo'
import { Reveal } from '../components/Reveal'
import { Eyebrow, Section, SectionHeading } from '../components/Section'
import { buildResult, quizQuestions, type Answers, type Potential } from '../data/quiz'
import { api } from '../lib/api'
import { useSectionNav } from '../lib/hooks'
import { useI18n } from '../lib/i18n'
import { icons } from '../lib/icons'
import { contactDraft, quizPrefill } from '../lib/stores'
import { cn, ease } from '../lib/utils'

const slide = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 28, filter: 'blur(4px)' }),
  center: { opacity: 1, x: 0, filter: 'blur(0px)' },
  exit: (dir: number) => ({ opacity: 0, x: dir * -28, filter: 'blur(4px)' }),
}

const LEVEL_BARS: Record<Potential, number> = { starter: 1, medium: 2, high: 3 }
const asList = (value: unknown) => (Array.isArray(value) ? (value as string[]) : [])

export function Quiz() {
  const { ui, lang, t } = useI18n()
  const q = ui.quiz
  const go = useSectionNav()

  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [answers, setAnswers] = useState<Answers>({})
  const [quizId, setQuizId] = useState<number>()
  const [attempt, setAttempt] = useState(0)
  const busy = useRef(false)
  const savedFor = useRef<Answers | null>(null)

  const total = quizQuestions.length
  const done = step >= total
  const question = quizQuestions[Math.min(step, total - 1)]
  const result = useMemo(() => (done ? buildResult(answers, lang) : null), [done, answers, lang])

  // Vindo de uma página "IA para…": o ramo já chega respondido.
  const prefill = useSyncExternalStore(quizPrefill.subscribe, quizPrefill.get, quizPrefill.get)
  useEffect(() => {
    if (!prefill) return
    savedFor.current = null
    setQuizId(undefined)
    setAnswers({ sector: prefill })
    setDir(1)
    setStep(1)
    quizPrefill.set(null)
  }, [prefill])

  // Guarda o diagnóstico (sem identificar a pessoa) assim que termina.
  useEffect(() => {
    if (!done || !result || savedFor.current === answers) return
    savedFor.current = answers
    api
      .saveQuiz({ lang, answers, solution: result.solution.id, potential: result.potential })
      .then((res) => setQuizId(res.id))
      .catch(() => {
        /* sem servidor o site continua funcionando; só não grava */
      })
  }, [done, result, answers, lang])

  function advance(delay = 0) {
    setDir(1)
    window.setTimeout(() => {
      setStep((s) => s + 1)
      busy.current = false
    }, delay)
  }

  function choose(optionId: string) {
    if (busy.current) return
    busy.current = true
    setAnswers((prev) => ({ ...prev, [question.id]: optionId }))
    advance(260)
  }

  function toggle(optionId: string) {
    setAnswers((prev) => {
      const current = asList(prev[question.id])
      const next = current.includes(optionId) ? current.filter((id) => id !== optionId) : [...current, optionId]
      return { ...prev, [question.id]: next }
    })
  }

  function back() {
    if (step === 0) return
    setDir(-1)
    setStep((s) => s - 1)
  }

  function restart() {
    savedFor.current = null
    setQuizId(undefined)
    setAttempt((n) => n + 1)
    setDir(-1)
    setAnswers({})
    setStep(0)
  }

  function writeMessage() {
    if (!result) return
    contactDraft.set({ message: result.summary, quizId })
    go('contato')
  }

  const SolutionIcon = result ? icons[result.solution.icon] : null
  const selectedMulti = asList(answers[question.id])

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

          <div className={cn(!done && 'min-h-[25rem]')}>
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
                  {question.multi && <p className="mt-2 text-sm text-muted">{q.multiHint}</p>}
                  <div className="mt-6 grid gap-2.5">
                    {question.options.map((o) => {
                      const selected = question.multi ? selectedMulti.includes(o.id) : answers[question.id] === o.id
                      return (
                        <button
                          key={o.id}
                          type="button"
                          onClick={() => (question.multi ? toggle(o.id) : choose(o.id))}
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
                              'grid size-6 shrink-0 place-items-center border transition-[border-color,background-color,color] duration-300',
                              question.multi ? 'rounded-md' : 'rounded-full',
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
                  {question.multi && (
                    <button
                      type="button"
                      onClick={() => advance()}
                      disabled={selectedMulti.length === 0}
                      className="btn btn-primary mt-5 h-11 px-6 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {q.next}
                      <ArrowRight className="size-4" />
                    </button>
                  )}
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
                    <div id="relatorio">
                      {/* Cabeçalho que só aparece no PDF/impressão */}
                      <div className="mb-6 hidden items-center justify-between border-b border-line pb-4 print:flex">
                        <Logo />
                        <p className="text-sm text-muted">
                          {q.reportTitle} · {q.reportDate}{' '}
                          {new Intl.DateTimeFormat(lang === 'pt' ? 'pt-BR' : 'en-US', { dateStyle: 'long' }).format(new Date())}
                        </p>
                      </div>

                      <Eyebrow>{q.resultEyebrow}</Eyebrow>

                      <div className="mt-5 flex items-start gap-4">
                        <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-accent to-accent-2 text-accent-fg shadow-[0_12px_30px_-12px_var(--accent-glow)] print:shadow-none">
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

                      {result.segment && (
                        <div className="mt-6 rounded-2xl border border-accent/30 bg-accent-soft p-4">
                          <p className="text-xs font-semibold tracking-wider text-accent uppercase">
                            {q.segmentTitle(result.segment.name)}
                          </p>
                          <p className="mt-2 font-semibold">{result.segment.useCase.title}</p>
                          <p className="mt-1 text-sm leading-relaxed text-fg-soft">{result.segment.useCase.text}</p>
                        </div>
                      )}

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
                          <p className="text-xs font-semibold tracking-wider text-accent uppercase">{q.careTitle(result.care.title)}</p>
                          <p className="mt-2 text-sm leading-relaxed text-fg-soft">{result.care.text}</p>
                        </div>
                      </div>

                      <p className="mt-6 text-[15px] font-medium">{result.closing}</p>
                    </div>

                    <LeadForm key={attempt} summary={result.summary} quizId={quizId} />

                    <div className="no-print mt-5 flex flex-wrap items-center gap-2">
                      <button type="button" onClick={() => window.print()} className="btn btn-glass h-11 px-4 text-sm">
                        <Download className="size-4" />
                        {q.save}
                      </button>
                      <button type="button" onClick={writeMessage} className="btn h-11 px-4 text-sm text-fg-soft hover:text-accent">
                        <MessageSquareText className="size-4" />
                        {q.write}
                      </button>
                      <button type="button" onClick={restart} className="btn h-11 px-4 text-sm text-muted hover:text-fg">
                        <RotateCcw className="size-4" />
                        {q.restart}
                      </button>
                    </div>
                    <p className="no-print mt-4 text-xs leading-relaxed text-muted">{q.privacy}</p>
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

/** Captura o contato direto no resultado do diagnóstico. */
function LeadForm({ summary, quizId }: { summary: string; quizId?: number }) {
  const { ui } = useI18n()
  const l = ui.quiz.lead
  const [form, setForm] = useState({ name: '', whatsapp: '', email: '', consent: false, website: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error' | 'invalid'>('idle')

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!form.whatsapp.trim() && !form.email.trim()) return setStatus('invalid')
    setStatus('sending')
    try {
      await api.sendContact({
        name: form.name,
        whatsapp: form.whatsapp || undefined,
        email: form.email || undefined,
        consent: form.consent,
        source: 'quiz',
        quiz_id: quizId,
        message: summary,
        website: form.website,
      })
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div role="status" className="no-print mt-7 flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
        <CircleCheck className="size-6 shrink-0 text-emerald-600 dark:text-emerald-400" />
        <p className="font-medium">{l.done}</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="no-print mt-7 rounded-2xl border border-accent/30 bg-accent-soft p-5">
      <p className="font-semibold tracking-tight">{l.title}</p>
      <p className="mt-1 text-sm text-muted">{l.text}</p>
      <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
        <input
          required
          minLength={2}
          autoComplete="name"
          placeholder={l.name}
          aria-label={l.name}
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="field"
        />
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder={l.whatsapp}
          aria-label={l.whatsapp}
          value={form.whatsapp}
          onChange={(e) => setForm((f) => ({ ...f, whatsapp: e.target.value }))}
          className="field"
        />
        <input
          type="email"
          autoComplete="email"
          placeholder={l.email}
          aria-label={l.email}
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="field"
        />
      </div>
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={form.website}
        onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
        className="hidden"
      />
      <label className="mt-3 flex items-start gap-2.5 text-sm leading-snug text-fg-soft">
        <input
          type="checkbox"
          required
          checked={form.consent}
          onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
          className="mt-0.5 size-4 shrink-0 accent-accent"
        />
        {l.consent}
      </label>
      <button type="submit" disabled={status === 'sending'} className="btn btn-primary mt-4 h-11 px-5 text-sm disabled:opacity-60">
        {status === 'sending' ? (
          <>
            <LoaderCircle className="size-4 animate-spin" />
            {l.sending}
          </>
        ) : (
          <>
            {l.submit}
            <ArrowRight className="size-4" />
          </>
        )}
      </button>
      {status === 'invalid' && (
        <p role="alert" className="mt-3 text-sm text-rose-600 dark:text-rose-400">
          {l.needContact}
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="mt-3 text-sm text-rose-600 dark:text-rose-400">
          {l.error}
        </p>
      )}
    </form>
  )
}
