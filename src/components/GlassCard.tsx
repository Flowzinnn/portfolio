import type { PointerEvent } from 'react'
import { motion, type HTMLMotionProps } from 'motion/react'
import { cn, ease } from '../lib/utils'

type Props = HTMLMotionProps<'div'> & {
  /** Vidro mais opaco (melhor para textos longos e formulários). */
  strong?: boolean
  /** Levita e acende um brilho que segue o mouse. */
  interactive?: boolean
  delay?: number
}

/** Cartão de vidro fosco que aparece suavemente ao entrar na tela. */
export function GlassCard({ strong, interactive = true, delay = 0, className, children, onPointerMove, ...rest }: Props) {
  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (interactive) {
      const rect = e.currentTarget.getBoundingClientRect()
      e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
      e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
    }
    onPointerMove?.(e)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.8, ease, delay }}
      onPointerMove={handlePointerMove}
      className={cn(strong ? 'glass-strong' : 'glass', 'rounded-3xl', interactive && 'spotlight lift', className)}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
