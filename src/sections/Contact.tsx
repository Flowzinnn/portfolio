import { Link } from 'react-router'
import { useEffect, useState, useSyncExternalStore, type FormEvent, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, CircleCheck, LoaderCircle, Send } from 'lucide-react'
import { GlassCard } from '../components/GlassCard'
import { Reveal } from '../components/Reveal'
import { Section, SectionHeading } from '../components/Section'
import { SocialLinks, useChannels } from '../components/SocialLinks'
import { api } from '../lib/api'
import { useI18n } from '../lib/i18n'
import { contactDraft } from '../lib/stores'
import { ease } from '../lib/utils'

type Status = 'idle' | 'sending' | 'success' | 'error' | 'invalid'
type TextField = 'name' | 'email' | 'whatsapp' | 'company' | 'message' | 'website'
const EMPTY = { name: '', email: '', whatsapp: '', company: '', message: '', website: '', consent: false }

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-fg-soft">{label}</span>
      {children}
    </label>
  )
}

export function Contact() {
  const { ui } = useI18n()
  const c = ui.contact
  const channels = useChannels()
  const draft = useSyncExternalStore(contactDraft.subscribe, contactDraft.get, contactDraft.get)
  const [form, setForm] = useState(EMPTY)
  const [quizId, setQuizId] = useState<number>()
  const [status, setStatus] = useState<Status>('idle')

  // Quem terminou o diagnóstico chega aqui com a mensagem já escrita.
  useEffect(() => {
    if (!draft) return
    setForm((f) => ({ ...f, message: draft.message }))
    setQuizId(draft.quizId)
    setStatus('idle')
  }, [draft])

  const update = (key: TextField) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [key]: e.target.value }))

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!form.email.trim() && !form.whatsapp.trim()) return setStatus('invalid')
    setStatus('sending')
    try {
      await api.sendContact({
        name: form.name,
        email: form.email || undefined,
        whatsapp: form.whatsapp || undefined,
        company: form.company || undefined,
        message: form.message,
        consent: form.consent,
        source: quizId ? 'quiz' : 'form',
        quiz_id: quizId,
        website: form.website,
      })
      setStatus('success')
      setForm(EMPTY)
      setQuizId(undefined)
      contactDraft.set(null)
    } catch {
      setStatus('error')
    }
  }

  return (
    <Section id="contato">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading align="left" eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />
          <Reveal delay={0.1}>
            <ul className="mt-8 space-y-3">
              {c.promises.map((p) => (
                <li key={p} className="flex items-center gap-3 text-[15px] text-fg-soft">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                    <Check className="size-3.5" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
          {channels.length > 0 && (
            <Reveal delay={0.15} className="mt-10">
              <p className="text-sm font-semibold text-muted">{c.channels}</p>
              <SocialLinks withLabels className="mt-3" />
            </Reveal>
          )}
        </div>

        <GlassCard strong interactive={false} className="rounded-[2rem] p-6 sm:p-8">
          <AnimatePresence mode="wait" initial={false}>
            {status === 'success' ? (
              <motion.div
                key="ok"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, ease }}
                className="grid min-h-[28rem] place-items-center text-center"
                role="status"
              >
                <div>
                  <span className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                    <CircleCheck className="size-8" />
                  </span>
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight">{c.success.title}</h3>
                  <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-muted">{c.success.text}</p>
                  <button type="button" onClick={() => setStatus('idle')} className="btn btn-glass mt-8 h-11 px-5 text-sm">
                    {c.success.again}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid gap-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label={c.form.name}>
                    <input required minLength={2} autoComplete="name" value={form.name} onChange={update('name')} className="field" />
                  </Field>
                  <Field label={c.form.email}>
                    <input type="email" autoComplete="email" value={form.email} onChange={update('email')} className="field" />
                  </Field>
                  <Field label={c.form.whatsapp}>
                    <input
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={form.whatsapp}
                      onChange={update('whatsapp')}
                      className="field"
                    />
                  </Field>
                  <Field label={c.form.company}>
                    <input autoComplete="organization" value={form.company} onChange={update('company')} className="field" />
                  </Field>
                </div>
                <Field label={c.form.message}>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={update('message')}
                    placeholder={c.form.placeholder}
                    className="field resize-none"
                  />
                </Field>
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={form.website}
                  onChange={update('website')}
                  className="hidden"
                />
                <label className="flex items-start gap-2.5 text-sm leading-snug text-fg-soft">
                  <input
                    type="checkbox"
                    required
                    checked={form.consent}
                    onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
                    className="mt-0.5 size-4 shrink-0 accent-accent"
                  />
                  {c.form.consent}
                </label>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn btn-primary mt-1 h-12 w-full disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'sending' ? (
                    <>
                      <LoaderCircle className="size-4 animate-spin" />
                      {c.form.sending}
                    </>
                  ) : (
                    <>
                      {c.form.submit}
                      <Send className="size-4" />
                    </>
                  )}
                </button>
                {status === 'invalid' && (
                  <p role="alert" className="text-sm text-rose-600 dark:text-rose-400">
                    {c.form.needContact}
                  </p>
                )}
                {status === 'error' && (
                  <p role="alert" className="text-sm text-rose-600 dark:text-rose-400">
                    {c.form.error}
                  </p>
                )}
                <p className="text-xs text-muted">
                  {c.form.privacy}{' '}
                  <Link to="/privacidade" className="underline underline-offset-2 hover:text-fg">
                    {ui.footer.privacyPolicy}
                  </Link>
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </GlassCard>
      </div>
    </Section>
  )
}
