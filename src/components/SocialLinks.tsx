import type { ComponentType, SVGProps } from 'react'
import { Mail, MessageCircle } from 'lucide-react'
import { site } from '../config/site'
import { useI18n } from '../lib/i18n'
import { cn } from '../lib/utils'

type IconProps = SVGProps<SVGSVGElement> & { className?: string }

function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

type Channel = { key: string; label: string; href: string; Icon: ComponentType<IconProps> }

export function useChannels(): Channel[] {
  const { ui } = useI18n()
  const list: Channel[] = []
  if (site.whatsapp) list.push({ key: 'whatsapp', label: ui.social.whatsapp, href: `https://wa.me/${site.whatsapp}`, Icon: MessageCircle })
  if (site.email) list.push({ key: 'email', label: ui.social.email, href: `mailto:${site.email}`, Icon: Mail })
  if (site.linkedin) list.push({ key: 'linkedin', label: ui.social.linkedin, href: site.linkedin, Icon: LinkedInIcon })
  return list
}

export function SocialLinks({ withLabels = false, className }: { withLabels?: boolean; className?: string }) {
  const channels = useChannels()
  if (!channels.length) return null

  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {channels.map(({ key, label, href, Icon }) => (
        <li key={key}>
          <a
            href={href}
            target={key === 'email' ? undefined : '_blank'}
            rel="noreferrer"
            aria-label={withLabels ? undefined : label}
            title={key === 'email' ? site.email : label}
            className={cn(
              'inline-flex items-center gap-2 rounded-full border border-line bg-[var(--field-bg)] text-sm font-medium text-fg-soft transition-colors duration-300 hover:border-accent/50 hover:text-accent',
              withLabels ? 'h-10 px-4' : 'size-10 justify-center',
            )}
          >
            <Icon className="size-4" />
            {withLabels && (key === 'email' ? site.email : label)}
          </a>
        </li>
      ))}
    </ul>
  )
}
