// Seus dados pessoais e trajetória. `draft: true` = texto que ainda precisa ser confirmado
// (aparece com uma etiqueta "rascunho" só no modo de desenvolvimento).
import type { IconName } from '../lib/icons'
import type { TechLogo } from '../lib/techLogos'
import type { L } from '../lib/types'

type Trait = { icon: IconName; title: L; text: L }
type TimelineItem = { period: L; title: L; org: L; text: L; draft?: boolean }
type Certification = { name: L; area: L; issuer?: string; year?: string; url?: string }
type StackCategory = { id: string; icon: IconName; label: L; blurb: L; items: StackItem[] }
/** `logo` = logo oficial (src/lib/techLogos.ts); `icon` = ícone genérico, para o que não tem logo. */
type StackItem = { name: string | L; logo?: TechLogo; icon?: IconName }

export const profile = {
  name: 'Nicolas Wolf',
  initials: 'NW',
  /** Foto: coloque o arquivo em public/images/ e informe o caminho, ex.: 'images/nicolas.webp' */
  photo: 'images/nicolas-wolf.webp',
  role: { pt: 'Fundador da Wolf Solutions', en: 'Founder of Wolf Solutions' } as L,
  org: { pt: 'IA aplicada a processos de negócio', en: 'Applied AI for business processes' } as L,
  location: { pt: 'Três Lagoas – MS, Brasil', en: 'Três Lagoas, MS – Brazil' } as L,

  about: [
    {
      pt: 'Ajudo empresas a colocar a IA para trabalhar no dia a dia: agentes que atendem clientes e analisam documentos, automações que tiram tarefas repetitivas da mão da equipe e integrações que fazem os sistemas da empresa conversarem entre si.',
      en: "I help companies put AI to work every day: agents that serve customers and review documents, automations that take repetitive tasks off your team's plate, and integrations that get your company's systems talking to each other.",
    },
    {
      pt: 'Venho da infraestrutura de TI. Desde 2023 trabalho na Prefeitura de Três Lagoas (MS), primeiro como técnico de informática e hoje como coordenador da área, cuidando de redes, servidores e do suporte que mantém a administração municipal funcionando. É daí que vem o meu cuidado com o que realmente importa: sistema que não pode parar, dado que não pode vazar e orçamento que precisa render.',
      en: 'I come from IT infrastructure. Since 2023 I have worked for the City of Três Lagoas (MS), first as an IT technician and now as IT coordinator, looking after the networks, servers and support that keep the municipal administration running. That is where my focus on what really matters comes from: systems that can’t go down, data that can’t leak and budgets that have to stretch.',
    },
    {
      pt: 'Sou Técnico em Informática pelo IFMS e concluo Análise e Desenvolvimento de Sistemas na mesma instituição em 2026. Trabalho em etapas claras: entendo o seu processo, mostro onde a IA traz retorno e entrego funcionando, com segurança desde o primeiro dia.',
      en: 'I hold an IT Technician diploma from IFMS and will complete my degree in Systems Analysis and Development there in 2026. I work in clear steps: I learn your process, show you where AI pays off and deliver it working, secure from day one.',
    },
    {
      pt: 'Um exemplo está aqui mesmo: o diagnóstico de IA deste site, o painel de contatos e os avisos automáticos que recebo a cada novo cliente rodam com as mesmas ferramentas que uso nos projetos.',
      en: 'You can see an example right here: this site’s AI assessment, its contact dashboard and the automatic alerts I get for every new lead run on the same tools I use in client projects.',
    },
  ] as L[],

  traits: [
    {
      icon: 'target',
      title: { pt: 'Direto ao ponto', en: 'Straight to the point' },
      text: {
        pt: 'Sem jargão e sem enrolação. Você entende exatamente o que está contratando.',
        en: 'No jargon, no fluff. You know exactly what you are paying for.',
      },
    },
    {
      icon: 'calm',
      title: { pt: 'Calmo sob pressão', en: 'Calm under pressure' },
      text: {
        pt: 'Acostumado a resolver problema com o sistema rodando e gente esperando do outro lado.',
        en: 'Used to fixing problems with systems live and people waiting on the other side.',
      },
    },
    {
      icon: 'handshake',
      title: { pt: 'Próximo de verdade', en: 'Genuinely close' },
      text: {
        pt: 'Você fala comigo, não com uma central de atendimento. Parceria de longo prazo.',
        en: 'You talk to me, not to a call center. A long-term partnership.',
      },
    },
    {
      icon: 'results',
      title: { pt: 'Focado em resultado', en: 'Results-driven' },
      text: {
        pt: 'Cada entrega tem um objetivo claro: ganhar tempo, cortar custo ou conquistar cliente.',
        en: 'Every delivery has a clear goal: save time, cut costs or win customers.',
      },
    },
  ] as Trait[],

  timeline: [
    {
      period: { pt: 'Hoje', en: 'Today' },
      title: { pt: 'Fundador da Wolf Solutions', en: 'Founder of Wolf Solutions' },
      org: { pt: 'IA aplicada a processos de negócio', en: 'Applied AI for business processes' },
      text: {
        pt: 'Agentes de IA, automação de processos e integrações entre sistemas, do protótipo ao servidor.',
        en: 'AI agents, process automation and system integrations, from prototype to server.',
      },
    },
    {
      period: { pt: 'jul/2026 – hoje', en: 'Jul 2026 – present' },
      title: { pt: 'Coordenador de Informática', en: 'IT Coordinator' },
      org: { pt: 'Prefeitura Municipal de Três Lagoas – MS', en: 'City of Três Lagoas – MS (municipal government)' },
      text: {
        pt: 'Coordeno a área de informática da prefeitura: infraestrutura, redes, servidores e o suporte aos setores da administração municipal.',
        en: "I coordinate the city's IT department: infrastructure, networks, servers and support for the municipal administration.",
      },
    },
    {
      period: { pt: 'mar/2023 – jul/2026', en: 'Mar 2023 – Jul 2026' },
      title: { pt: 'Técnico de Informática', en: 'IT Technician' },
      org: { pt: 'Prefeitura Municipal de Três Lagoas – MS', en: 'City of Três Lagoas – MS (municipal government)' },
      text: {
        pt: 'Suporte técnico, redes e servidores Linux no dia a dia da administração municipal.',
        en: 'Technical support, networks and Linux servers in the day-to-day of the municipal administration.',
      },
    },
    {
      period: { pt: '2024 – 2026', en: '2024 – 2026' },
      title: { pt: 'Tecnólogo em Análise e Desenvolvimento de Sistemas', en: "Associate degree in Systems Analysis and Development" },
      org: { pt: 'IFMS — Instituto Federal de Mato Grosso do Sul', en: 'IFMS — Federal Institute of Mato Grosso do Sul' },
      text: {
        pt: 'Conclusão prevista para dezembro de 2026. Projetos com agentes de IA, Machine Learning e APIs.',
        en: 'Expected to graduate in December 2026. Projects with AI agents, Machine Learning and APIs.',
      },
    },
    {
      period: { pt: '2019 – 2022', en: '2019 – 2022' },
      title: { pt: 'Técnico em Informática', en: 'IT Technician' },
      org: { pt: 'IFMS — curso técnico integrado ao ensino médio', en: 'IFMS — technical high school program' },
      text: {
        pt: 'Base em programação, redes e manutenção de sistemas.',
        en: 'Foundations in programming, networking and systems maintenance.',
      },
    },
  ] as TimelineItem[],

  /**
   * Certificações. Para adicionar uma, copie uma linha. Campos opcionais:
   * `issuer` (quem emitiu), `year` (ano) e `url` (link da credencial — vira o botão "Ver credencial").
   */
  certifications: [
    // Ex.: { name: { pt: 'AWS Cloud Practitioner', en: 'AWS Cloud Practitioner' }, area: { pt: 'Nuvem', en: 'Cloud' },
    //        issuer: 'Amazon Web Services', year: '2026', url: 'https://...' },
    // Só coloque certificados que você tem, com o link da credencial: é o que passa confiança.
  ] as Certification[],

  /**
   * Tecnologias, por área (menu com abas na seção "Sobre"). Cada bolha mostra o logo oficial (`logo`)
   * ou, para conceitos sem logo, um ícone genérico (`icon`).
   * Mantenha só o que você usa de verdade: o cliente pode perguntar.
   */
  stack: [
    {
      id: 'backend',
      icon: 'server',
      label: { pt: 'Backend', en: 'Backend' },
      blurb: { pt: 'APIs e integrações que conectam sistemas e automatizam processos.', en: 'APIs and integrations that connect systems and automate processes.' },
      items: [
        { name: 'Python', logo: 'python' },
        { name: 'FastAPI', logo: 'fastapi' },
        { name: 'REST APIs', icon: 'plug' },
        { name: 'SQLAlchemy', logo: 'sqlalchemy' },
        { name: 'Pydantic', logo: 'pydantic' },
        { name: 'Webhooks', icon: 'webhook' },
      ],
    },
    {
      id: 'frontend',
      icon: 'frontend',
      label: { pt: 'Frontend', en: 'Frontend' },
      blurb: { pt: 'Sites, painéis e interfaces rápidas, bonitas e fáceis de usar.', en: 'Fast, good-looking and easy-to-use websites, dashboards and interfaces.' },
      items: [
        { name: 'React', logo: 'react' },
        { name: 'TypeScript', logo: 'typescript' },
        { name: 'JavaScript', logo: 'javascript' },
        { name: 'Tailwind CSS', logo: 'tailwind' },
        { name: 'Vite', logo: 'vite' },
        { name: 'HTML & CSS', logo: 'html' },
      ],
    },
    {
      id: 'database',
      icon: 'database',
      label: { pt: 'Banco de dados', en: 'Databases' },
      blurb: { pt: 'Dados organizados, seguros e prontos para virar informação.', en: 'Organized, secure data ready to become insight.' },
      items: [
        { name: 'PostgreSQL', logo: 'postgresql' },
        { name: 'MySQL', logo: 'mysql' },
        { name: 'SQLite', logo: 'sqlite' },
        { name: 'SQL', icon: 'database' },
      ],
    },
    {
      id: 'cloud',
      icon: 'cloud',
      label: { pt: 'Nuvem & Infra', en: 'Cloud & Infra' },
      blurb: { pt: 'Do servidor à nuvem: tudo no ar, monitorado e com backup.', en: 'From server to cloud: always on, monitored and backed up.' },
      items: [
        { name: 'AWS', icon: 'cloud' },
        { name: 'Docker', logo: 'docker' },
        { name: 'Linux', logo: 'linux' },
        { name: { pt: 'Redes', en: 'Networking' }, icon: 'network' },
        { name: 'Cloudflare', logo: 'cloudflare' },
        { name: 'Netlify', logo: 'netlify' },
        { name: 'Render', logo: 'render' },
        { name: 'Git & GitHub', logo: 'github' },
      ],
    },
    {
      id: 'ai',
      icon: 'ai',
      label: { pt: 'IA & Automação', en: 'AI & Automation' },
      blurb: { pt: 'Agentes e fluxos automáticos que trabalham pela sua equipe.', en: 'Agents and automated workflows that work for your team.' },
      items: [
        { name: { pt: 'Agentes de IA', en: 'AI agents' }, icon: 'bot' },
        { name: { pt: 'APIs de LLM', en: 'LLM APIs' }, icon: 'sparkles' },
        { name: 'n8n', logo: 'n8n' },
        { name: 'Machine Learning', icon: 'ai' },
        { name: 'Telegram Bots', logo: 'telegram' },
      ],
    },
  ] as StackCategory[],
}
