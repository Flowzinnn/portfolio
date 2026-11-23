import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { ease } from '../lib/utils'

type Props = { children: ReactNode; delay?: number; className?: string; y?: number }

/**
 * Aparece suavemente ao entrar na tela (sobe um pouco e tira o desfoque).
 * Obs.: não coloque elementos de vidro (.glass) aqui dentro — use <GlassCard>,
 * que já anima sozinho, para o desfoque do vidro não "piscar".
 */
export function Reveal({ children, delay = 0, className, y = 18 }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  )
}
