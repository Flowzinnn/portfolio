import { useEffect, useState, useSyncExternalStore, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, CircleCheck, LoaderCircle, Send } from 'lucide-react'
import { GlassCard } from '../components/GlassCard'
import { Reveal } from '../components/Reveal'
import { Section, SectionHeading } from '../components/Section'
import { SocialLinks, useChannels } from '../components/SocialLinks'
import { site } from '../config/site'
import { contactDraft } from '../lib/contactDraft'
import { useI18n } from '../lib/i18n'
import { ease } from '../lib/utils'

type Status = 'idle' | 'sending' | 'success' | 'copied' | 'error'
const EMPTY = { name: '', email: '', company: '', message: '', website: '' }

// Como o formulário entrega a mensagem, conforme o que estiver configurado em src/config/site.ts:
// Web3Forms (chega no seu e-mail) → app de e-mail do visitante → copiar e abrir seu LinkedIn.
const MODE = site.web3formsKey ? 'web3forms' : site.email ? 'mailto' : site.linkedin ? 'linkedin' : null

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
  const [status, setStatus] = useState<Status>('idle')
  const canSend = MODE !== null

  // Quando o visitante termina o quiz, a mensagem já chega escrita aqui.
  useEffect(() => {
    if (!draft) return
    setForm((f) => ({ ...f, message: draft }))
    setStatus('idle')
  }, [draft])

  const update = (key: keyof typeof EMPTY) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (form.website) return setStatus('success') // armadilha para robôs

    const body = `${form.message}\n\n— ${form.name}${form.company ? ` (${form.company})` : ''}\n${form.email}`

    if (MODE === 'linkedin') {
      try {
        await navigator.clipboard.writeText(body)
      } catch {
        /* sem permissão de área de transferência: o painel explica o que fazer */
      }
      window.open(site.linkedin, '_blank', 'noopener,noreferrer')
      setStatus('copied')
      return
    }

    if (MODE === 'web3forms') {
      setStatus('sending')
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: site.web3formsKey,
            subject: c.form.subject(form.name),
            from_name: 'Portfólio Nicolas Wolf',
            name: form.name,
            email: form.email,
            company: form.company,
            message: form.message,
          }),
        })
        const data = (await res.json()) as { success?: boolean }
        if (!data.success) throw new Error('falha no envio')
        setStatus('success')
        setForm(EMPTY)
        contactDraft.set('')
      } catch {
        setStatus('error')
      }
      return
    }

    if (MODE === 'mailto') {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(c.form.subject(form.name))}&body=${encodeURIComponent(body)}`
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
            {status === 'success' || status === 'copied' ? (
              <motion.div
                key="ok"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, ease }}
                className="grid min-h-[26rem] place-items-center text-center"
                role="status"
              >
                <div>
                  <span className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                    <CircleCheck className="size-8" />
                  </span>
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                    {status === 'copied' ? c.copied.title : c.success.title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-muted">
                    {status === 'copied' ? c.copied.text : c.success.text}
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    {status === 'copied' && (
                      <a href={site.linkedin} target="_blank" rel="noreferrer" className="btn btn-primary h-11 px-5 text-sm">
                        {c.copied.open}
                      </a>
                    )}
                    <button type="button" onClick={() => setStatus('idle')} className="btn btn-glass h-11 px-5 text-sm">
                      {c.success.again}
                    </button>
                  </div>
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
                    <input required autoComplete="name" value={form.name} onChange={update('name')} className="field" />
                  </Field>
                  <Field label={c.form.email}>
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={update('email')}
                      className="field"
                    />
                  </Field>
                </div>
                <Field label={c.form.company}>
                  <input autoComplete="organization" value={form.company} onChange={update('company')} className="field" />
                </Field>
                <Field label={c.form.message}>
                  <textarea
                    required
                    rows={7}
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
                <button
                  type="submit"
                  disabled={!canSend || status === 'sending'}
                  className="btn btn-primary mt-1 h-12 w-full disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'sending' ? (
                    <>
                      <LoaderCircle className="size-4 animate-spin" />
                      {c.form.sending}
                    </>
                  ) : (
                    <>
                      {MODE === 'linkedin' ? c.form.submitLinkedin : c.form.submit}
                      <Send className="size-4" />
                    </>
                  )}
                </button>
                {status === 'error' && (
                  <p role="alert" className="text-sm text-rose-600 dark:text-rose-400">
                    {c.form.error}
                  </p>
                )}
                {import.meta.env.DEV && MODE !== 'web3forms' && (
                  <p className="rounded-xl bg-amber-300/30 px-3 py-2 text-xs text-amber-900 dark:text-amber-200">
                    {c.form.notConfigured}
                  </p>
                )}
                <p className="text-xs text-muted">{c.form.privacy}</p>
              </motion.form>
            )}
          </AnimatePresence>
        </GlassCard>
      </div>
    </Section>
  )
}
