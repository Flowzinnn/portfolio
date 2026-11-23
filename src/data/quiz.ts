// Mini diagnóstico de IA para empresários: perguntas e a lógica que monta o resultado.
// Para mudar uma pergunta, edite `quizQuestions`. Para mudar as recomendações, edite os mapas abaixo.
import type { L, Lang } from '../lib/types'
import { services, type Service, type SolutionId } from './services'

export type QuestionId = 'sector' | 'pain' | 'size' | 'data' | 'priority' | 'timing'
export type Answers = Partial<Record<QuestionId, string>>
type Option = { id: string; label: L }
export type Question = { id: QuestionId; title: L; options: Option[] }

export const quizQuestions: Question[] = [
  {
    id: 'sector',
    title: { pt: 'Qual é o ramo do seu negócio?', en: 'What industry is your business in?' },
    options: [
      { id: 'comercio', label: { pt: 'Comércio e varejo', en: 'Retail and commerce' } },
      { id: 'servicos', label: { pt: 'Serviços (clínica, escritório, consultoria…)', en: 'Services (clinic, office, consulting…)' } },
      { id: 'industria', label: { pt: 'Indústria, agro ou logística', en: 'Industry, agribusiness or logistics' } },
      { id: 'alimentacao', label: { pt: 'Alimentação e hospitalidade', en: 'Food and hospitality' } },
      { id: 'outro', label: { pt: 'Outro ramo', en: 'Something else' } },
    ],
  },
  {
    id: 'pain',
    title: { pt: 'Onde sua equipe mais perde tempo hoje?', en: 'Where does your team lose the most time today?' },
    options: [
      { id: 'atendimento', label: { pt: 'Respondendo clientes e mensagens', en: 'Answering customers and messages' } },
      {
        id: 'repetitivo',
        label: { pt: 'Tarefas repetitivas (planilhas, cadastros, relatórios)', en: 'Repetitive tasks (spreadsheets, data entry, reports)' },
      },
      {
        id: 'documentos',
        label: { pt: 'Procurando informação em documentos e e-mails', en: 'Searching for information in documents and emails' },
      },
      { id: 'ti', label: { pt: 'Resolvendo problemas de TI, acessos e segurança', en: 'Dealing with IT issues, access and security' } },
      { id: 'naosei', label: { pt: 'Ainda não sei por onde começar', en: "I'm not sure where to start" } },
    ],
  },
  {
    id: 'size',
    title: { pt: 'Quantas pessoas trabalham na empresa?', en: 'How many people work at your company?' },
    options: [
      { id: 'ate5', label: { pt: 'Até 5', en: 'Up to 5' } },
      { id: 'ate20', label: { pt: 'De 6 a 20', en: '6 to 20' } },
      { id: 'ate100', label: { pt: 'De 21 a 100', en: '21 to 100' } },
      { id: 'mais100', label: { pt: 'Mais de 100', en: 'More than 100' } },
    ],
  },
  {
    id: 'data',
    title: { pt: 'Como estão seus dados e sistemas hoje?', en: 'How are your data and systems today?' },
    options: [
      { id: 'espalhados', label: { pt: 'Espalhados em WhatsApp, planilhas e papel', en: 'Scattered across WhatsApp, spreadsheets and paper' } },
      { id: 'sistema', label: { pt: 'Em um sistema, mas pouco integrado', en: 'In a system, but poorly integrated' } },
      { id: 'organizados', label: { pt: 'Organizados e integrados', en: 'Organized and integrated' } },
    ],
  },
  {
    id: 'priority',
    title: { pt: 'O que pesa mais na sua decisão?', en: 'What matters most in your decision?' },
    options: [
      { id: 'seguranca', label: { pt: 'Segurança dos dados', en: 'Data security' } },
      { id: 'qualidade', label: { pt: 'Qualidade no atendimento e na entrega', en: 'Quality of service and delivery' } },
      { id: 'economia', label: { pt: 'Reduzir custos e tempo', en: 'Cutting costs and time' } },
    ],
  },
  {
    id: 'timing',
    title: { pt: 'Quando você gostaria de começar?', en: 'When would you like to start?' },
    options: [
      { id: 'agora', label: { pt: 'O quanto antes', en: 'As soon as possible' } },
      { id: 'breve', label: { pt: 'Nos próximos 3 meses', en: 'In the next 3 months' } },
      { id: 'pesquisando', label: { pt: 'Só estou pesquisando', en: 'Just researching' } },
    ],
  },
]

/* ── Regras do resultado ──────────────────────────────────── */

const painToSolution: Record<string, SolutionId> = {
  atendimento: 'atendimento',
  repetitivo: 'automacao',
  documentos: 'documentos',
  ti: 'infra',
  naosei: 'consultoria',
}
const painWeight: Record<string, number> = { atendimento: 2, repetitivo: 2, documentos: 2, ti: 1, naosei: 1 }
const sizeScore: Record<string, number> = { ate5: 1, ate20: 2, ate100: 3, mais100: 3 }
const dataBonus: Record<string, number> = { espalhados: 0, sistema: 1, organizados: 1 }

const sectorExample: Record<string, L> = {
  comercio: { pt: 'responder dúvidas sobre produtos, preços e pedidos', en: 'answer questions about products, prices and orders' },
  servicos: {
    pt: 'agendar, confirmar e lembrar horários sem ninguém preso ao telefone',
    en: 'book, confirm and remind appointments without anyone stuck on the phone',
  },
  industria: {
    pt: 'encontrar procedimentos, relatórios e ordens de serviço em segundos',
    en: 'find procedures, reports and work orders in seconds',
  },
  alimentacao: {
    pt: 'receber pedidos e reservas pelo WhatsApp, mesmo no horário de pico',
    en: 'take orders and reservations on WhatsApp, even at peak hours',
  },
  outro: { pt: 'tirar das costas da equipe as tarefas que mais se repetem', en: "take the most repetitive tasks off your team's plate" },
}

const painInsight: Record<string, L> = {
  atendimento: {
    pt: 'Cliente sem resposta é cliente que compra do concorrente. Um assistente bem treinado responde na hora e organiza cada conversa.',
    en: 'A customer without an answer buys from your competitor. A well-trained assistant replies instantly and keeps every conversation organized.',
  },
  repetitivo: {
    pt: 'Tarefa repetitiva é onde a automação paga a conta mais rápido: menos horas gastas e menos erro de digitação.',
    en: 'Repetitive work is where automation pays for itself fastest: fewer hours spent and fewer typing mistakes.',
  },
  documentos: {
    pt: 'Quando a informação existe mas ninguém acha, a equipe perde tempo e erra. Um assistente com seus documentos resolve isso.',
    en: "When information exists but nobody can find it, your team wastes time and makes mistakes. An assistant trained on your documents fixes that.",
  },
  ti: {
    pt: 'Antes de colocar IA, a base precisa estar firme: acessos, rede e segurança organizados evitam dor de cabeça e vazamentos.',
    en: 'Before adding AI, the foundation has to be solid: organized access, network and security prevent headaches and leaks.',
  },
  naosei: {
    pt: 'Começar pelo diagnóstico evita o erro mais caro: pagar por ferramenta que não resolve o seu problema.',
    en: "Starting with an assessment avoids the most expensive mistake: paying for a tool that doesn't solve your problem.",
  },
}

const sizeInsight: Record<string, L> = {
  ate5: {
    pt: 'Em equipes enxutas, cada hora economizada faz diferença direta no caixa.',
    en: 'In small teams, every hour saved goes straight to the bottom line.',
  },
  ate20: {
    pt: 'Com uma equipe desse tamanho, pequenas automações já liberam horas toda semana.',
    en: 'With a team this size, small automations already free up hours every week.',
  },
  ate100: {
    pt: 'Nesse porte, padronizar com IA reduz retrabalho entre setores e dá previsibilidade.',
    en: 'At this size, standardizing with AI reduces rework between teams and brings predictability.',
  },
  mais100: {
    pt: 'Nesse porte, padronizar com IA reduz retrabalho entre setores e dá previsibilidade.',
    en: 'At this size, standardizing with AI reduces rework between teams and brings predictability.',
  },
}

const firstStep: Record<string, L> = {
  espalhados: {
    pt: 'Juntar as informações essenciais num lugar só — simples e barato. É o que faz a IA acertar desde o começo.',
    en: 'Bring the essential information into one place — simple and cheap. That is what makes the AI get things right from the start.',
  },
  sistema: {
    pt: 'Conectar a IA ao sistema que você já usa, sem trocar nada do que funciona.',
    en: 'Connect the AI to the system you already use, without replacing anything that works.',
  },
  organizados: {
    pt: 'Partir direto para um piloto com casos reais do seu negócio e medir o resultado.',
    en: 'Go straight to a pilot with real cases from your business and measure the results.',
  },
}

const care: Record<string, { title: L; text: L }> = {
  seguranca: {
    title: { pt: 'Segurança', en: 'Security' },
    text: {
      pt: 'Acesso restrito, registro do que a IA faz e dados sensíveis só onde precisam estar. LGPD considerada desde o primeiro dia.',
      en: 'Restricted access, a log of what the AI does and sensitive data only where it needs to be. Privacy law (LGPD) considered from day one.',
    },
  },
  qualidade: {
    title: { pt: 'Qualidade', en: 'Quality' },
    text: {
      pt: 'Testo com perguntas e situações reais do seu negócio antes de ir ao ar, e sempre existe um humano como rede de segurança.',
      en: 'I test with real questions and situations from your business before going live, and there is always a human safety net.',
    },
  },
  economia: {
    title: { pt: 'Economia', en: 'Savings' },
    text: {
      pt: 'Começo pelo que dá retorno mais rápido, com ferramentas de custo justo. Você vê resultado antes de ampliar o investimento.',
      en: 'I start with what pays off fastest, using fairly priced tools. You see results before investing more.',
    },
  },
}

const closing: Record<string, L> = {
  agora: {
    pt: 'Dá pra começar já: me chame e marcamos uma conversa ainda esta semana.',
    en: "We can start right away: reach out and we'll talk this week.",
  },
  breve: {
    pt: 'Ótimo prazo para planejar com calma e fazer bem feito. Vamos desenhar o plano juntos?',
    en: "That's a great timeline to plan calmly and do it right. Shall we sketch the plan together?",
  },
  pesquisando: {
    pt: 'Sem compromisso: te explico o caminho em uma conversa rápida e você decide com tranquilidade.',
    en: 'No strings attached: I will walk you through the path in a quick call and you decide at your own pace.',
  },
}

export type Potential = 'high' | 'medium' | 'starter'

export type QuizResult = {
  solution: Service
  potential: Potential
  why: string[]
  firstStep: string
  care: { title: string; text: string }
  closing: string
  /** Mensagem pronta para o formulário de contato. */
  summary: string
}

export function buildResult(answers: Answers, lang: Lang): QuizResult {
  const tx = (l: L | undefined) => (l ? l[lang] : '')
  const pain = answers.pain ?? 'naosei'
  const solutionId = painToSolution[pain] ?? 'consultoria'
  const solution = services.find((s) => s.id === solutionId) ?? services[0]

  const score = (sizeScore[answers.size ?? ''] ?? 1) + (painWeight[pain] ?? 1) + (dataBonus[answers.data ?? ''] ?? 0)
  const potential: Potential = score >= 5 ? 'high' : score >= 3 ? 'medium' : 'starter'

  const example = tx(sectorExample[answers.sector ?? 'outro'] ?? sectorExample.outro)
  const why = [
    lang === 'pt'
      ? `No seu ramo, a IA costuma dar mais retorno quando ajuda a ${example}.`
      : `In your industry, AI usually pays off most when it helps ${example}.`,
    tx(painInsight[pain]),
    tx(sizeInsight[answers.size ?? '']),
  ].filter(Boolean)

  const careItem = care[answers.priority ?? 'seguranca'] ?? care.seguranca

  const label = (id: QuestionId) => {
    const question = quizQuestions.find((q) => q.id === id)
    const option = question?.options.find((o) => o.id === answers[id])
    return option ? tx(option.label) : '—'
  }

  const summary =
    lang === 'pt'
      ? [
          'Olá, Nicolas! Fiz o diagnóstico de IA no seu site:',
          `• Ramo: ${label('sector')}`,
          `• Onde mais perdemos tempo: ${label('pain')}`,
          `• Tamanho da equipe: ${label('size')}`,
          `• Dados e sistemas: ${label('data')}`,
          `• Prioridade: ${label('priority')}`,
          `• Quando começar: ${label('timing')}`,
          '',
          `Sugestão do diagnóstico: ${tx(solution.title)}. Quero conversar sobre isso.`,
        ].join('\n')
      : [
          'Hi Nicolas! I took the AI assessment on your website:',
          `• Industry: ${label('sector')}`,
          `• Where we lose the most time: ${label('pain')}`,
          `• Team size: ${label('size')}`,
          `• Data and systems: ${label('data')}`,
          `• Priority: ${label('priority')}`,
          `• When to start: ${label('timing')}`,
          '',
          `Suggested solution: ${tx(solution.title)}. I'd like to talk about it.`,
        ].join('\n')

  return {
    solution,
    potential,
    why,
    firstStep: tx(firstStep[answers.data ?? 'espalhados'] ?? firstStep.espalhados),
    care: { title: tx(careItem.title), text: tx(careItem.text) },
    closing: tx(closing[answers.timing ?? 'pesquisando'] ?? closing.pesquisando),
    summary,
  }
}
