import { useEffect, useState, type MouseEvent } from 'react'
import { Link, useLocation } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useI18n } from '../lib/i18n'
import { useActiveSection, useSectionNav } from '../lib/hooks'
import { scrollToTop } from '../lib/scroll'
import { cn, ease } from '../lib/utils'
import { Logo } from './Logo'
import { LangToggle, ThemeToggle } from './Toggles'

const HOME_SECTIONS = ['inicio', 'solucoes', 'metodo', 'diagnostico', 'cases', 'sobre', 'ferramentas', 'blog', 'contato']

type Item = { id: string; label: string; route?: string }

export function Navbar() {
  const { ui } = useI18n()
  const go = useSectionNav()
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const active = useActiveSection(isHome ? HOME_SECTIONS : [])
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  const items: Item[] = [
    { id: 'solucoes', label: ui.nav.solutions },
    { id: 'diagnostico', label: ui.nav.quiz },
    { id: 'cases', label: ui.nav.cases },
    { id: 'sobre', label: ui.nav.about },
    { id: 'blog', label: ui.nav.blog, route: '/blog' },
  ]

  const isActive = (item: Item) =>
    Boolean(item.route && pathname.startsWith(item.route)) || (isHome && active === item.id)

  const linkTo = (item: Item) => item.route ?? { pathname: '/', hash: `#${item.id}` }

  const onItemClick = (item: Item) => (e: MouseEvent) => {
    setOpen(false)
    if (item.route) return
    e.preventDefault()
    go(item.id)
  }

  const onContact = (e: MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    go('contato')
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <a
        href="#conteudo"
        className="btn btn-primary absolute top-4 left-4 h-10 -translate-y-24 px-4 text-sm focus:translate-y-0"
      >
        {ui.skip}
      </a>

      <nav
        aria-label={ui.nav.main}
        className={cn(
          'mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full py-2 pr-2 pl-3 transition-[background-color,box-shadow] duration-500',
          scrolled ? 'glass-strong' : 'glass',
        )}
      >
        <Link
          to="/"
          aria-label={ui.nav.home}
          onClick={(e) => {
            if (isHome) {
              e.preventDefault()
              scrollToTop()
            }
          }}
          className="flex items-center gap-2.5 rounded-full pr-2"
        >
          <Logo />
          <span className="text-[15px] font-semibold tracking-tight">Nicolas Wolf</span>
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                to={linkTo(item)}
                onClick={onItemClick(item)}
                aria-current={isActive(item) ? 'true' : undefined}
                className={cn(
                  'relative isolate block rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300',
                  isActive(item) ? 'text-fg' : 'text-muted hover:text-fg',
                )}
              >
                {isActive(item) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-accent-soft"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <LangToggle />
          <ThemeToggle />
          <Link
            to={{ pathname: '/', hash: '#contato' }}
            onClick={onContact}
            className="btn btn-primary ml-1 hidden h-9 px-4 text-sm sm:inline-flex"
          >
            {ui.nav.cta}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? ui.nav.close : ui.nav.open}
            className="icon-btn lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.3, ease }}
            className="glass-strong mx-auto mt-2 max-w-6xl origin-top rounded-3xl p-2 lg:hidden"
          >
            <ul className="grid">
              {items.map((item) => (
                <li key={item.id}>
                  <Link
                    to={linkTo(item)}
                    onClick={onItemClick(item)}
                    className={cn(
                      'block rounded-2xl px-4 py-3 text-base font-medium transition-colors',
                      isActive(item) ? 'bg-accent-soft text-fg' : 'text-fg-soft hover:bg-accent-soft',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to={{ pathname: '/', hash: '#contato' }}
              onClick={onContact}
              className="btn btn-primary mt-2 h-12 w-full sm:hidden"
            >
              {ui.nav.cta}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
