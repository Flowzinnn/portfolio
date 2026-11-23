// Ferramentas organizadas por CAMADA da solução: primeiro o que a camada faz pelo cliente
// (`description`), depois as ferramentas. Para adicionar uma, inclua o nome na lista do grupo.
// Nomes de marca ficam como texto simples; termos que mudam de idioma usam { pt, en }.
import type { IconName } from '../lib/icons'
import type { L } from '../lib/types'

export type ToolGroup = { id: string; icon: IconName; title: L; description: L; tools: Array<string | L> }

export const toolGroups: ToolGroup[] = [
  {
    id: 'ia',
    icon: 'sparkles',
    title: { pt: 'IA aplicada', en: 'Applied AI' },
    description: {
      pt: 'Modelos de linguagem e agentes que entendem pedidos, consultam informações e agem dentro das regras do seu negócio.',
      en: 'Language models and agents that understand requests, look up information and act within your business rules.',
    },
    tools: [
      { pt: 'Modelos de linguagem (Claude, Gemini)', en: 'Language models (Claude, Gemini)' },
      { pt: 'Agentes com ferramentas', en: 'Tool-using agents' },
      'LangChain',
      'LangGraph',
      { pt: 'Engenharia de prompt', en: 'Prompt engineering' },
    ],
  },
  {
    id: 'automacao',
    icon: 'workflow',
    title: { pt: 'Automação e integrações', en: 'Automation & integrations' },
    description: {
      pt: 'Fluxos que conectam WhatsApp, e-mail, planilhas e sistemas — sem ninguém copiando e colando.',
      en: 'Workflows that connect WhatsApp, email, spreadsheets and systems — with nobody copying and pasting.',
    },
    tools: ['n8n', 'APIs REST', 'Webhooks', { pt: 'Orquestração de fluxos', en: 'Workflow orchestration' }],
  },
  {
    id: 'dev',
    icon: 'code',
    title: { pt: 'Back-end e dados', en: 'Back end & data' },
    description: {
      pt: 'As regras de negócio, as APIs e os modelos de Machine Learning que ficam por trás de tudo, com testes automatizados.',
      en: 'The business rules, APIs and Machine Learning models behind everything, with automated tests.',
    },
    tools: [
      'Python',
      'FastAPI',
      'Flask',
      'Pydantic',
      'pandas',
      'scikit-learn',
      'pytest',
      { pt: 'Desenvolvimento assistido por IA (Claude Code, Codex)', en: 'AI-assisted development (Claude Code, Codex)' },
    ],
  },
  {
    id: 'infra',
    icon: 'server',
    title: { pt: 'Infraestrutura e segurança', en: 'Infrastructure & security' },
    description: {
      pt: 'Um ambiente estável, isolado e protegido para a solução rodar igual no meu computador e no seu servidor.',
      en: 'A stable, isolated and protected environment, so the solution runs the same on my machine and on your server.',
    },
    tools: [
      { pt: 'Contêineres (Docker)', en: 'Containers (Docker)' },
      { pt: 'Servidores Linux', en: 'Linux servers' },
      { pt: 'Redes', en: 'Networking' },
      { pt: 'Controle de acessos', en: 'Access control' },
      'Backup',
      'Git',
    ],
  },
]
