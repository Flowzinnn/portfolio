// Ferramentas e tecnologias. Para adicionar uma, inclua o nome na lista do grupo.
// Nomes de marca ficam como texto simples; termos que mudam de idioma usam { pt, en }.
import type { IconName } from '../lib/icons'
import type { L } from '../lib/types'

export type ToolGroup = { id: string; icon: IconName; title: L; tools: Array<string | L> }

export const toolGroups: ToolGroup[] = [
  {
    id: 'ia',
    icon: 'sparkles',
    title: { pt: 'IA & Automação', en: 'AI & Automation' },
    tools: [
      'Claude',
      'Codex',
      'n8n',
      'LangChain',
      'LangGraph',
      'Google Gemini',
      { pt: 'Agentes de IA', en: 'AI agents' },
      { pt: 'Engenharia de prompt', en: 'Prompt engineering' },
    ],
  },
  {
    id: 'dev',
    icon: 'code',
    title: { pt: 'Desenvolvimento', en: 'Development' },
    tools: ['Python', 'Flask', 'FastAPI', 'Pydantic', 'scikit-learn', 'pandas', 'APIs REST', 'Git'],
  },
  {
    id: 'infra',
    icon: 'server',
    title: { pt: 'Infraestrutura & Segurança', en: 'Infrastructure & Security' },
    tools: [
      'Docker',
      'Linux',
      { pt: 'Administração de servidores', en: 'Server administration' },
      { pt: 'Redes', en: 'Networking' },
      { pt: 'Controle de acessos', en: 'Access control' },
      'Backup',
    ],
  },
  {
    id: 'gestao',
    icon: 'users',
    title: { pt: 'Gestão & Suporte', en: 'Management & Support' },
    tools: [
      { pt: 'Gestão de equipes', en: 'Team leadership' },
      { pt: 'Suporte técnico', en: 'Technical support' },
      { pt: 'Documentação de processos', en: 'Process documentation' },
    ],
  },
]
