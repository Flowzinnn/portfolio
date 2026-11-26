import { Link } from 'react-router'
import { ArrowUp } from 'lucide-react'
import { brand } from '../config/brand'
import { useI18n } from '../lib/i18n'
import { scrollToTop } from '../lib/scroll'
import { Logo } from './Logo'
import { SocialLinks } from './SocialLinks'

export function Footer() {
  const { ui, t } = useI18n()
  return (
    <footer className="px-4 pt-6 pb-8 sm:px-6">
      <div className="glass mx-auto grid max-w-6xl gap-6 rounded-3xl px-6 py-6 text-sm text-muted md:grid-cols-[1fr_auto] md:items-center">
        <div className="grid gap-2 text-center md:text-left">
          <Logo className="justify-center md:justify-start" />
          <p>
            {t(brand.tagline)} · © {new Date().getFullYear()} {brand.name}. {ui.footer.rights}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 md:justify-end">
          <SocialLinks />
          <Link to="/blog" className="transition-colors hover:text-fg">
            Blog
          </Link>
          <Link to="/privacidade" className="transition-colors hover:text-fg">
            {ui.footer.privacy}
          </Link>
          <button type="button" onClick={() => scrollToTop()} className="inline-flex items-center gap-1 transition-colors hover:text-fg">
            <ArrowUp className="size-4" />
            {ui.footer.top}
          </button>
        </div>
      </div>
    </footer>
  )
}
