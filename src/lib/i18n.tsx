import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { L, Lang } from './types'
import { copy, type Copy } from '../i18n'

const STORAGE_KEY = 'nw-lang'

function detectLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'pt' || saved === 'en') return saved
  } catch {
    /* armazenamento indisponível */
  }
  return navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

type I18nContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  /** Escolhe o texto do idioma atual (aceita string simples também). */
  t: (value: string | L) => string
  /** Textos fixos da interface no idioma atual. */
  ui: Copy
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* armazenamento indisponível */
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
  }, [lang])

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      setLang,
      t: (v) => (typeof v === 'string' ? v : v[lang]),
      ui: copy[lang],
    }),
    [lang, setLang],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n precisa estar dentro de <I18nProvider>')
  return ctx
}
