import { Link } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import { GlassCard } from '../components/GlassCard'
import { useDocumentTitle } from '../lib/hooks'
import { useI18n } from '../lib/i18n'

export default function NotFound() {
  const { ui } = useI18n()
  useDocumentTitle(ui.meta.notFound)

  return (
    <div className="grid min-h-[80svh] place-items-center px-4 pt-32 pb-16 sm:px-6">
      <GlassCard strong interactive={false} className="w-full max-w-lg rounded-[2rem] p-10 text-center">
        <p className="text-gradient text-7xl font-semibold tracking-tighter">404</p>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">{ui.notFound.title}</h1>
        <p className="mt-3 text-muted">{ui.notFound.text}</p>
        <Link to="/" className="btn btn-primary mt-8 h-12 px-6">
          <ArrowLeft className="size-4" />
          {ui.notFound.cta}
        </Link>
      </GlassCard>
    </div>
  )
}
