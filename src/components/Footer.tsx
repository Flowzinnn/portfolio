import { ArrowUp } from 'lucide-react'
import { site } from '../config/site'
import { profile } from '../data/profile'
import { useI18n } from '../lib/i18n'
import { scrollToTop } from '../lib/scroll'
import { Logo } from './Logo'

export function Footer() {
  const { ui } = useI18n()
  return (
    <footer className="px-4 pt-6 pb-8 sm:px-6">
      <div className="glass mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 rounded-3xl px-6 py-5 text-sm text-muted md:flex-row">
        <div className="flex items-center gap-3 text-center md:text-left">
          <Logo className="size-7 rounded-lg text-[10px]" />
          <span>
            © {new Date().getFullYear()} {profile.name}. {ui.footer.rights}
          </span>
        </div>
        <div className="flex items-center gap-5">
          <span className="hidden lg:inline">{ui.footer.built}</span>
          <a href={site.repo} target="_blank" rel="noreferrer" className="transition-colors hover:text-fg">
            {ui.footer.source}
          </a>
          <button
            type="button"
            onClick={() => scrollToTop()}
            className="inline-flex items-center gap-1 transition-colors hover:text-fg"
          >
            <ArrowUp className="size-4" />
            {ui.footer.top}
          </button>
        </div>
      </div>
    </footer>
  )
}
