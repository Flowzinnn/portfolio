// Seus dados pessoais e trajetória. `draft: true` = texto que ainda precisa ser confirmado
// (aparece com uma etiqueta "rascunho" só no modo de desenvolvimento).
import type { IconName } from '../lib/icons'
import type { L } from '../lib/types'

type Trait = { icon: IconName; title: L; text: L }
type TimelineItem = { period: L; title: L; org: L; text: L; draft?: boolean }

export const profile = {
  name: 'Nicolas Wolf',
  initials: 'NW',
  /** Foto: coloque o arquivo em public/images/ e informe o caminho, ex.: 'images/nicolas.webp' */
  photo: '',
  role: { pt: 'Fundador da Wolf Solutions', en: 'Founder of Wolf Solutions' } as L,
  org: { pt: 'IA aplicada a processos de negócio', en: 'Applied AI for business processes' } as L,
  location: { pt: 'Três Lagoas – MS, Brasil', en: 'Três Lagoas, MS – Brazil' } as L,

  about: [
    {
      pt: 'Sou Nicolas Wolf, de Três Lagoas (MS). Trabalho com IA aplicada a processos de negócio: agentes que atendem clientes e analisam documentos, automações que eliminam tarefas repetitivas e integrações que fazem os sistemas da sua empresa conversarem entre si.',
      en: "I'm Nicolas Wolf, from Três Lagoas, Brazil. I work with applied AI for business processes: agents that serve customers and review documents, automations that remove repetitive work, and integrations that get your company's systems talking to each other.",
    },
    {
      pt: 'Antes da IA veio a infraestrutura: há mais de 3 anos trabalho com redes, servidores Linux e suporte técnico. É daí que vem meu cuidado com o que realmente importa — sistema que não pode parar, dado que não pode vazar e orçamento que precisa render.',
      en: 'Before AI came infrastructure: for over 3 years I have worked with networks, Linux servers and technical support. That is where my focus on what really matters comes from — systems that can’t go down, data that can’t leak and budgets that have to stretch.',
    },
    {
      pt: 'Estou concluindo Análise e Desenvolvimento de Sistemas no IFMS e levo essa disciplina para cada projeto: entendo o seu negócio, mostro onde a IA gera retorno e entrego funcionando — com segurança desde o primeiro dia.',
      en: "I'm finishing a degree in Systems Analysis and Development at IFMS, and I bring that discipline to every project: I learn how your business works, show you where AI pays off and deliver it working — secure from day one.",
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
      period: { pt: '2024 – 2026', en: '2024 – 2026' },
      title: { pt: 'Tecnólogo em Análise e Desenvolvimento de Sistemas', en: "Associate degree in Systems Analysis and Development" },
      org: { pt: 'IFMS — Instituto Federal de Mato Grosso do Sul', en: 'IFMS — Federal Institute of Mato Grosso do Sul' },
      text: {
        pt: 'Conclusão prevista para dezembro de 2026. Projetos com agentes de IA, Machine Learning e APIs.',
        en: 'Expected to graduate in December 2026. Projects with AI agents, Machine Learning and APIs.',
      },
    },
    {
      period: { pt: 'Certificação', en: 'Certification' },
      title: { pt: 'Python e APIs', en: 'Python and APIs' },
      org: { pt: 'Certificado', en: 'Certificate' },
      text: {
        pt: 'Desenvolvimento em Python e integração com APIs.',
        en: 'Python development and API integration.',
      },
      draft: true, // TODO: nome da instituição que emitiu o certificado
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
}
