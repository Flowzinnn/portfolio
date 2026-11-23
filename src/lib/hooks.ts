import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { scrollToId } from './scroll'

/** Vai até uma seção da home — rolando, se já estiver nela, ou navegando até ela. */
export function useSectionNav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  return useCallback(
    (id: string) => {
      if (pathname === '/') scrollToId(id)
      else navigate({ pathname: '/', hash: `#${id}` })
    },
    [pathname, navigate],
  )
}

/** Qual seção está no meio da tela agora (para destacar no menu). */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null)
  const key = ids.join(',')

  useEffect(() => {
    if (!key) {
      setActive(null)
      return
    }
    const elements = key
      .split(',')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [key])

  return active
}

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title
  }, [title])
}
