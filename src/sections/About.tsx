import { MapPin } from 'lucide-react'
import { GlassCard } from '../components/GlassCard'
import { Reveal } from '../components/Reveal'
import { DraftBadge, Section, SectionHeading } from '../components/Section'
import { SocialLinks } from '../components/SocialLinks'
import { profile } from '../data/profile'
import { useI18n } from '../lib/i18n'
import { icons } from '../lib/icons'
import { asset } from '../lib/utils'

function Portrait() {
  if (profile.photo) {
    return (
      <img
        src={asset(profile.photo)}
        alt={profile.name}
        width={800}
        height={1000}
        decoding="async"
        className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
      />
    )
  }
  return (
    <div className="relative isolate grid aspect-[4/5] w-full place-items-center overflow-hidden rounded-[1.5rem] bg-linear-to-br from-accent via-accent-2/80 to-accent/70">
      <div className="bg-grid absolute inset-0 opacity-50" />
      <span className="text-7xl font-semibold tracking-tighter text-accent-fg/90">{profile.initials}</span>
    </div>
  )
}

export function About() {
  const { ui, t } = useI18n()
  const a = ui.about

  return (
    <Section id="sobre">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <GlassCard strong interactive={false} className="mx-auto max-w-sm rounded-[2rem] p-4 lg:max-w-none">
            <Portrait />
            <div className="px-2 pt-5 pb-2">
              <h3 className="text-xl font-semibold tracking-tight">{profile.name}</h3>
              <p className="mt-1 text-sm font-medium text-fg-soft">{t(profile.role)}</p>
              <p className="text-sm text-muted">{t(profile.org)}</p>
              <p className="mt-3 flex items-center gap-1.5 text-sm text-muted">
                <MapPin className="size-4 text-accent" />
                {t(profile.location)}
              </p>
              <SocialLinks className="mt-5" />
            </div>
          </GlassCard>
        </div>

        <div>
          <SectionHeading align="left" eyebrow={a.eyebrow} title={a.title} />
          <Reveal delay={0.1} className="mt-6 space-y-4 text-lg leading-relaxed text-pretty text-fg-soft">
            {profile.about.map((p) => (
              <p key={p.pt}>{t(p)}</p>
            ))}
          </Reveal>

          <h3 className="mt-14 text-xs font-semibold tracking-[0.16em] text-muted uppercase">{a.traitsTitle}</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {profile.traits.map((trait, i) => {
              const Icon = icons[trait.icon]
              return (
                <GlassCard key={trait.title.pt} delay={i * 0.06} className="p-5">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-xl bg-accent-soft text-accent">
                      <Icon className="size-[18px]" />
                    </span>
                    <p className="font-semibold tracking-tight">{t(trait.title)}</p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{t(trait.text)}</p>
                </GlassCard>
              )
            })}
          </div>

          <h3 className="mt-14 text-xs font-semibold tracking-[0.16em] text-muted uppercase">{a.timelineTitle}</h3>
          <ol className="mt-6 space-y-8 border-l border-line pl-6">
            {profile.timeline.map((item, i) => (
              <li key={item.title.pt} className="relative">
                <span className="absolute top-1.5 -left-[29.5px] size-2.5 rounded-full bg-accent ring-4 ring-accent-soft" />
                <Reveal delay={i * 0.06}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="chip">{t(item.period)}</span>
                    {item.draft && <DraftBadge label={ui.common.draft} />}
                  </div>
                  <p className="mt-2.5 font-semibold tracking-tight">{t(item.title)}</p>
                  <p className="text-sm text-muted">{t(item.org)}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-fg-soft">{t(item.text)}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
