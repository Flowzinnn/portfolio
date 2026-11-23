// Comunicação com o servidor (backend/app/main.py).
import type { Answers } from '../data/quiz'

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
  }
}

async function request<T>(path: string, init: RequestInit & { token?: string } = {}): Promise<T> {
  const { token, ...rest } = init
  const headers = new Headers(rest.headers)
  if (rest.body) headers.set('Content-Type', 'application/json')
  if (token) headers.set('Authorization', `Bearer ${token}`)
  const res = await fetch(`/api${path}`, { ...rest, headers })
  if (!res.ok) {
    const detail = await res
      .json()
      .then((d: { detail?: unknown }) => (typeof d.detail === 'string' ? d.detail : ''))
      .catch(() => '')
    throw new ApiError(res.status, detail || res.statusText)
  }
  return res.json() as Promise<T>
}

export type ContactPayload = {
  name: string
  email?: string
  whatsapp?: string
  company?: string
  message?: string
  source: 'form' | 'quiz'
  quiz_id?: number
  consent: boolean
  website?: string
}

export type ContactRow = {
  id: number
  created_at: string
  name: string
  email: string | null
  whatsapp: string | null
  company: string | null
  message: string
  source: 'form' | 'quiz'
  status: ContactStatus
  quiz_id: number | null
}
export type ContactStatus = 'novo' | 'em contato' | 'fechado' | 'descartado'

export type QuizRow = {
  id: number
  created_at: string
  lang: string
  sector: string
  solution: string
  potential: string
  answers: Answers
}

export type Summary = {
  total_quiz: number
  quiz_last_7_days: number
  total_contacts: number
  new_contacts: number
  contacts_from_quiz: number
  by_sector: Record<string, number>
  by_solution: Record<string, number>
}

export const api = {
  saveQuiz: (body: { lang: string; answers: Answers; solution: string; potential: string }) =>
    request<{ id: number }>('/quiz', { method: 'POST', body: JSON.stringify(body) }),

  sendContact: (body: ContactPayload) => request<{ ok: boolean }>('/contact', { method: 'POST', body: JSON.stringify(body) }),

  admin: {
    summary: (token: string) => request<Summary>('/admin/summary', { token }),
    contacts: (token: string) => request<ContactRow[]>('/admin/contacts', { token }),
    quiz: (token: string) => request<QuizRow[]>('/admin/quiz', { token }),
    setStatus: (token: string, id: number, status: ContactStatus) =>
      request<ContactRow>(`/admin/contacts/${id}`, { method: 'PATCH', body: JSON.stringify({ status }), token }),
    /** Baixa um CSV (o navegador salva o arquivo). */
    async download(token: string, file: 'contatos.csv' | 'diagnosticos.csv') {
      const res = await fetch(`/api/admin/export/${file}`, { headers: { Authorization: `Bearer ${token}` } })
      if (!res.ok) throw new ApiError(res.status, res.statusText)
      const url = URL.createObjectURL(await res.blob())
      const a = Object.assign(document.createElement('a'), { href: url, download: file })
      a.click()
      URL.revokeObjectURL(url)
    },
  },
}
