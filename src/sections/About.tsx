import { ArrowUpRight, Award, MapPin } from 'lucide-react'
import { GlassCard } from '../components/GlassCard'
import { Reveal } from '../components/Reveal'
import { DraftBadge, Section, SectionHeading } from '../components/Section'
import { SocialLinks } from '../components/SocialLinks'
import { profile } from '../data/profile'
import { useI18n } from '../lib/i18n'
import { icons } from '../lib/icons'
import { asset } from '../lib/utils'

/** Foto em círculo com anel na cor da marca (ou as iniciais, enquanto não houver foto). */
function Portrait() {
  const { ui } = useI18n()
  return (
    <div className="mx-auto w-fit rounded-full bg-linear-to-br from-accent to-accent-2 p-1 shadow-[0_24px_60px_-24px_var(--accent-glow)]">
      {profile.photo ? (
        <img
          src={asset(profile.photo)}
          alt={ui.about.photoAlt}
          width={480}
          height={480}
          decoding="async"
          className="size-48 rounded-full border-4 border-[var(--bg)] bg-white object-cover sm:size-56"
        />
      ) : (
        <div className="grid size-48 place-items-center rounded-full border-4 border-[var(--bg)] bg-linear-to-br from-accent to-accent-2 sm:size-56">
          <span className="text-6xl font-semibold tracking-tighter text-accent-fg">{profile.initials}</span>
        </div>
      )}
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
          <GlassCard strong interactive={false} className="mx-auto max-w-sm rounded-[2rem] px-6 pt-8 pb-7 text-center lg:max-w-none">
            <Portrait />
            <h3 className="mt-6 text-xl font-semibold tracking-tight">{profile.name}</h3>
            <p className="mt-1 text-sm font-medium text-accent">{t(profile.role)}</p>
            <p className="mt-0.5 text-sm text-muted">{t(profile.org)}</p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted">
              <MapPin className="size-4 text-accent" />
              {t(profile.location)}
            </p>
            <SocialLinks className="mt-5 justify-center" />
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

          {profile.certifications.length > 0 && (
            <>
              <h3 className="mt-14 text-xs font-semibold tracking-[0.16em] text-muted uppercase">{a.certificationsTitle}</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {profile.certifications.map((cert, i) => (
                  <GlassCard key={cert.name.pt} delay={i * 0.06} className="flex items-start gap-4 p-5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-linear-to-br from-accent to-accent-2 text-accent-fg">
                      <Award className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold tracking-tight">{t(cert.name)}</p>
                      <p className="mt-0.5 text-sm text-muted">
                        {[t(cert.area), cert.issuer, cert.year].filter(Boolean).join(' · ')}
                      </p>
                      {cert.url && (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
                        >
                          {a.credential}
                          <ArrowUpRight className="size-3.5" />
                        </a>
                      )}
                    </div>
                  </GlassCard>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </Section>
  )
}
