import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { flushSync } from 'react-dom'

export type Theme = 'light' | 'dark'
type Origin = { x: number; y: number }

const STORAGE_KEY = 'nw-theme'
const THEME_COLORS: Record<Theme, string> = { light: '#f6f5fb', dark: '#0b0a12' }

type ThemeContextValue = { theme: Theme; toggle: (origin?: Origin) => void }
type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> }
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.style.colorScheme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme])
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* armazenamento indisponível */
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // O script no index.html já aplicou o tema salvo; aqui só lemos o estado.
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  )
  const current = useRef(theme)

  useEffect(() => {
    current.current = theme
    applyTheme(theme)
  }, [theme])

  /**
   * Troca de tema sem travar: em vez de animar a cor de cada elemento (pesado com os vidros),
   * o navegador fotografa a página e revela o tema novo num círculo a partir do botão —
   * uma única animação feita pela placa de vídeo. Sem suporte (ou com "reduzir movimento"), troca na hora.
   */
  const toggle = useCallback((origin?: Origin) => {
    const next: Theme = current.current === 'dark' ? 'light' : 'dark'
    const update = () => {
      current.current = next
      applyTheme(next)
      flushSync(() => setTheme(next))
    }

    const doc = document as ViewTransitionDocument
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!doc.startViewTransition || reduced) {
      update()
      return
    }

    const x = origin?.x ?? window.innerWidth / 2
    const y = origin?.y ?? 0
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    doc
      .startViewTransition(update)
      .ready.then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 650, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' },
        )
      })
      .catch(() => {
        /* transição interrompida: o tema já foi aplicado */
      })
  }, [])

  const value = useMemo(() => ({ theme, toggle }), [theme, toggle])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme precisa estar dentro de <ThemeProvider>')
  return ctx
}
