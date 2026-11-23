import type { Lang } from '../lib/types'
import { en } from './en'
import { pt, type Copy } from './pt'

export type { Copy }

export const copy: Record<Lang, Copy> = { pt, en }
