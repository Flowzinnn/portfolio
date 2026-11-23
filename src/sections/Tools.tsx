import { GlassCard } from '../components/GlassCard'
import { Section, SectionHeading } from '../components/Section'
import { toolGroups } from '../data/tools'
import { useI18n } from '../lib/i18n'
import { icons } from '../lib/icons'

export function Tools() {
  const { ui, t } = useI18n()
  const s = ui.tools

  return (
    <Section id="ferramentas">
      <SectionHeading eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} />
      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {toolGroups.map((group, i) => {
          const Icon = icons[group.icon]
          return (
            <GlassCard key={group.id} delay={(i % 2) * 0.08} className="p-7">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-accent-soft text-accent">
                  <Icon className="size-5" />
                </span>
                <h3 className="text-lg font-semibold tracking-tight">{t(group.title)}</h3>
              </div>
              <ul className="mt-6 flex flex-wrap gap-2">
                {group.tools.map((tool) => (
                  <li key={t(tool)} className="chip-lg">
                    {t(tool)}
                  </li>
                ))}
              </ul>
            </GlassCard>
          )
        })}
      </div>
    </Section>
  )
}
