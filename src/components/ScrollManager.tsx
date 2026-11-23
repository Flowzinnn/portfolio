import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { scrollToId, scrollToTop } from '../lib/scroll'

/** Ao trocar de página: vai para o topo, ou até a seção indicada no endereço (#contato). */
export function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      const timer = window.setTimeout(() => scrollToId(id, true), 80)
      return () => window.clearTimeout(timer)
    }
    scrollToTop(true)
  }, [pathname, hash])

  return null
}
