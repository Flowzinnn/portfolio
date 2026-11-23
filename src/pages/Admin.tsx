// Painel privado: /admin (só para você — protegido pela senha ADMIN_PASSWORD do servidor).
import { useCallback, useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { Download, LoaderCircle, LogOut, RefreshCw } from 'lucide-react'
import { GlassCard } from '../components/GlassCard'
import { Logo } from '../components/Logo'
import { labelFor, quizQuestions } from '../data/quiz'
import { services } from '../data/services'
import { api, ApiError, type ContactRow, type ContactStatus, type QuizRow, type Summary } from '../lib/api'
import { useDocumentTitle } from '../lib/hooks'
import { cn } from '../lib/utils'

const TOKEN_KEY = 'ws-admin'
const STATUSES: ContactStatus[] = ['novo', 'em contato', 'fechado', 'descartado']
const STATUS_STYLE: Record<ContactStatus, string> = {
  novo: 'bg-accent-soft text-accent',
  'em contato': 'bg-amber-400/15 text-amber-700 dark:text-amber-300',
  fechado: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
  descartado: 'bg-line text-muted',
}
const POTENTIAL: Record<string, string> = { high: 'Alto', medium: 'Médio', starter: 'Bom começo' }

const solutionName = (id: string) => services.find((s) => s.id === id)?.title.pt ?? id
const sectorName = (id: string) => (id === '—' ? '—' : labelFor('sector', id, 'pt'))
const when = (iso: string) => new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(iso))

type Data = { summary: Summary; contacts: ContactRow[]; quiz: QuizRow[] }

function readToken() {
  try {
    return sessionStorage.getItem(TOKEN_KEY) ?? ''
  } catch {
    return ''
  }
}

export default function Admin() {
  useDocumentTitle('Painel — Wolf Solutions')
  const [token, setToken] = useState(readToken)
  const [password, setPassword] = useState('')
  const [data, setData] = useState<Data | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState<'contatos' | 'diagnosticos'>('contatos')

  const load = useCallback(async (key: string) => {
    setLoading(true)
    setError('')
    try {
      // Confere a senha com UMA chamada: senha errada conta como uma tentativa só no limite do servidor.
      const summary = await api.admin.summary(key)
      const [contacts, quiz] = await Promise.all([api.admin.contacts(key), api.admin.quiz(key)])
      setData({ summary, contacts, quiz })
      setToken(key)
      try {
        sessionStorage.setItem(TOKEN_KEY, key)
      } catch {
        /* sem armazenamento: pede a senha de novo ao recarregar */
      }
    } catch (e) {
      setData(null)
      if (e instanceof ApiError && e.status === 401) {
        setToken('')
        try {
          sessionStorage.removeItem(TOKEN_KEY)
        } catch {
          /* ignora */
        }
      }
      setError(e instanceof ApiError ? (e.status === 401 ? 'Senha incorreta.' : e.message) : 'Servidor indisponível. Ele está rodando?')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const saved = readToken()
    if (saved) void load(saved)
  }, [load])

  function logout() {
    try {
      sessionStorage.removeItem(TOKEN_KEY)
    } catch {
      /* ignora */
    }
    setToken('')
    setData(null)
    setPassword('')
  }

  async function changeStatus(row: ContactRow, status: ContactStatus) {
    if (!data) return
    setData({ ...data, contacts: data.contacts.map((c) => (c.id === row.id ? { ...c, status } : c)) })
    try {
      await api.admin.setStatus(token, row.id, status)
    } catch {
      void load(token)
    }
  }

  if (!data) {
    return (
      <div className="grid min-h-svh place-items-center px-4 py-16">
        <GlassCard strong interactive={false} className="w-full max-w-sm rounded-[2rem] p-8">
          <Logo />
          <h1 className="mt-8 text-2xl font-semibold tracking-tight">Painel</h1>
          <p className="mt-1 text-sm text-muted">Diagnósticos e contatos recebidos pelo site.</p>
          <form
            className="mt-6 grid gap-3"
            onSubmit={(e: FormEvent) => {
              e.preventDefault()
              void load(password)
            }}
          >
            <input
              type="password"
              required
              autoFocus
              autoComplete="current-password"
              placeholder="Senha do painel"
              aria-label="Senha do painel"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field"
            />
            <button type="submit" disabled={loading} className="btn btn-primary h-11 disabled:opacity-60">
              {loading ? <LoaderCircle className="size-4 animate-spin" /> : 'Entrar'}
            </button>
            {error && (
              <p role="alert" className="text-sm text-rose-600 dark:text-rose-400">
                {error}
              </p>
            )}
          </form>
        </GlassCard>
      </div>
    )
  }

  const { summary, contacts, quiz } = data
  const conversion = summary.total_quiz ? Math.round((summary.contacts_from_quiz / summary.total_quiz) * 100) : 0

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <header className="glass-strong flex flex-wrap items-center justify-between gap-3 rounded-full py-2 pr-2 pl-4">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="chip">Painel</span>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => void load(token)} className="icon-btn" aria-label="Atualizar" title="Atualizar">
            <RefreshCw className={cn('size-4', loading && 'animate-spin')} />
          </button>
          <button type="button" onClick={logout} className="icon-btn" aria-label="Sair" title="Sair">
            <LogOut className="size-4" />
          </button>
        </div>
      </header>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
        <Stat label="Diagnósticos feitos" value={summary.total_quiz} />
        <Stat label="Nos últimos 7 dias" value={summary.quiz_last_7_days} />
        <Stat label="Contatos recebidos" value={summary.total_contacts} />
        <Stat label="Contatos novos" value={summary.new_contacts} highlight={summary.new_contacts > 0} />
        <Stat label="Diagnóstico → contato" value={`${conversion}%`} />
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <Breakdown title="Diagnósticos por ramo" items={summary.by_sector} name={sectorName} />
        <Breakdown title="Solução indicada" items={summary.by_solution} name={solutionName} />
      </div>

      <GlassCard strong interactive={false} className="mt-3 overflow-hidden rounded-[1.75rem]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line p-3">
          <div className="flex rounded-full bg-black/[0.04] p-1 dark:bg-white/[0.06]">
            {(['contatos', 'diagnosticos'] as const).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                className={cn(
                  'rounded-full px-4 py-1.5 text-sm font-semibold transition-colors',
                  tab === key ? 'bg-accent text-accent-fg' : 'text-muted hover:text-fg',
                )}
              >
                {key === 'contatos' ? `Contatos (${contacts.length})` : `Diagnósticos (${quiz.length})`}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => void api.admin.download(token, tab === 'contatos' ? 'contatos.csv' : 'diagnosticos.csv')}
            className="btn btn-glass h-9 px-4 text-sm"
          >
            <Download className="size-4" />
            Exportar para Excel (CSV)
          </button>
        </div>

        <div className="overflow-x-auto">
          {tab === 'contatos' ? (
            <Table
              empty="Nenhum contato ainda."
              head={['Recebido', 'Nome', 'Contato', 'Empresa', 'Origem', 'Status', 'Mensagem']}
              rows={contacts.map((c) => [
                when(c.created_at),
                <span className="font-semibold">{c.name}</span>,
                <div className="grid gap-0.5">
                  {c.whatsapp && (
                    <a className="text-accent hover:underline" href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noreferrer">
                      WhatsApp {c.whatsapp}
                    </a>
                  )}
                  {c.email && (
                    <a className="text-accent hover:underline" href={`mailto:${c.email}`}>
                      {c.email}
                    </a>
                  )}
                </div>,
                c.company ?? '—',
                c.source === 'quiz' ? `Diagnóstico #${c.quiz_id ?? '?'}` : 'Formulário',
                <select
                  value={c.status}
                  onChange={(e) => void changeStatus(c, e.target.value as ContactStatus)}
                  aria-label={`Status de ${c.name}`}
                  className={cn('rounded-full border-0 px-3 py-1 text-xs font-semibold', STATUS_STYLE[c.status])}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>,
                <Details text={c.message} />,
              ])}
            />
          ) : (
            <Table
              empty="Nenhum diagnóstico ainda."
              head={['Feito em', 'Ramo', 'Solução indicada', 'Potencial', 'Orçamento', 'Quando começar', 'Respostas']}
              rows={quiz.map((r) => [
                when(r.created_at),
                sectorName(r.sector),
                solutionName(r.solution),
                POTENTIAL[r.potential] ?? r.potential,
                labelFor('budget', r.answers.budget, 'pt'),
                labelFor('timing', r.answers.timing, 'pt'),
                <Details text={quizQuestions.map((q) => `${q.title.pt} ${labelFor(q.id, r.answers[q.id], 'pt')}`).join('\n')} />,
              ])}
            />
          )}
        </div>
      </GlassCard>
    </div>
  )
}

function Stat({ label, value, highlight }: { label: string; value: number | string; highlight?: boolean }) {
  return (
    <GlassCard interactive={false} className={cn('rounded-2xl p-4', highlight && 'ring-2 ring-accent/40')}>
      <p className="text-xs font-medium text-muted">{label}</p>
      <p className="mt-1 text-3xl font-semibold tracking-tight">{value}</p>
    </GlassCard>
  )
}

function Breakdown({ title, items, name }: { title: string; items: Record<string, number>; name: (id: string) => string }) {
  const entries = Object.entries(items)
  const max = Math.max(1, ...entries.map(([, n]) => n))
  return (
    <GlassCard interactive={false} className="rounded-2xl p-5">
      <p className="text-sm font-semibold">{title}</p>
      {entries.length === 0 ? (
        <p className="mt-3 text-sm text-muted">Sem dados ainda.</p>
      ) : (
        <ul className="mt-4 grid gap-2.5">
          {entries.map(([id, n]) => (
            <li key={id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 text-sm">
              <span className="truncate text-fg-soft">{name(id)}</span>
              <span className="font-semibold tabular-nums">{n}</span>
              <span className="col-span-2 h-1.5 overflow-hidden rounded-full bg-line">
                <span className="block h-full rounded-full bg-linear-to-r from-accent to-accent-2" style={{ width: `${(n / max) * 100}%` }} />
              </span>
            </li>
          ))}
        </ul>
      )}
    </GlassCard>
  )
}

function Table({ head, rows, empty }: { head: string[]; rows: ReactNode[][]; empty: string }) {
  if (!rows.length) return <p className="p-8 text-center text-sm text-muted">{empty}</p>
  return (
    <table className="w-full min-w-[860px] text-left text-sm">
      <thead>
        <tr className="border-b border-line text-xs tracking-wider text-muted uppercase">
          {head.map((h) => (
            <th key={h} scope="col" className="px-4 py-3 font-semibold">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((cells, i) => (
          <tr key={i} className="border-b border-line align-top last:border-0">
            {cells.map((cell, j) => (
              <td key={j} className="px-4 py-3 text-fg-soft">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function Details({ text }: { text: string }) {
  if (!text) return <span className="text-muted">—</span>
  return (
    <details className="max-w-sm">
      <summary className="cursor-pointer text-accent">Ver</summary>
      <p className="mt-2 text-xs leading-relaxed whitespace-pre-line">{text}</p>
    </details>
  )
}
