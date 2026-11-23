import Lenis from 'lenis'

let lenis: Lenis | null = null

/** Espaço reservado para a barra de navegação fixa ao rolar até uma seção. */
const NAV_OFFSET = -96

/** Rolagem suave (desligada para quem pede menos movimento no sistema). */
export function initSmoothScroll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}
  lenis = new Lenis({ autoRaf: true, lerp: 0.1 })
  return () => {
    lenis?.destroy()
    lenis = null
  }
}

export function scrollToId(id: string, immediate = false) {
  const el = document.getElementById(id)
  if (!el) return false
  if (lenis) {
    lenis.resize()
    lenis.scrollTo(el, { offset: NAV_OFFSET, immediate, duration: 1.2 })
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + NAV_OFFSET
    window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' })
  }
  return true
}

export function scrollToTop(immediate = false) {
  if (lenis) lenis.scrollTo(0, { immediate })
  else window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' })
}
