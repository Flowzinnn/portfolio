// Diagnóstico de IA para empresários: perguntas e a lógica que monta o resultado.
// Para mudar uma pergunta, edite `quizQuestions`. Para mudar as recomendações, edite os mapas abaixo.
// Os `id` das respostas são o que fica salvo no banco — evite renomear os que já estão em uso.
import type { L, Lang } from '../lib/types'
import { segments } from './segments'
import { services, type Service, type SolutionId } from './services'

export type QuestionId = 'sector' | 'size' | 'pain' | 'channels' | 'volume' | 'data' | 'aiUse' | 'priority' | 'budget' | 'timing'
export type Answer = string | string[]
export type Answers = Partial<Record<QuestionId, Answer>>
type Option = { id: string; label: L }
export type Question = { id: QuestionId; title: L; multi?: boolean; options: Option[] }

export const quizQuestions: Question[] = [
  {
    id: 'sector',
    title: { pt: 'Qual é o ramo do seu negócio?', en: 'What industry is your business in?' },
    options: [
      ...segments.map((s) => ({ id: s.quizId, label: s.name })),
      { id: 'outro', label: { pt: 'Outro ramo', en: 'Something else' } },
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
    id: 'pain',
    title: { pt: 'Onde sua equipe mais perde tempo hoje?', en: 'Where does your team lose the most time today?' },
    options: [
      { id: 'atendimento', label: { pt: 'Respondendo clientes e mensagens', en: 'Answering customers and messages' } },
      { id: 'vendas', label: { pt: 'Acompanhando vendas e retornos a clientes', en: 'Tracking sales and following up with customers' } },
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
    id: 'channels',
    multi: true,
    title: { pt: 'Por onde seus clientes mais falam com você?', en: 'Where do your customers reach you most?' },
    options: [
      { id: 'whatsapp', label: { pt: 'WhatsApp', en: 'WhatsApp' } },
      { id: 'instagram', label: { pt: 'Instagram', en: 'Instagram' } },
      { id: 'telefone', label: { pt: 'Telefone', en: 'Phone' } },
      { id: 'site', label: { pt: 'Site ou e-mail', en: 'Website or email' } },
      { id: 'presencial', label: { pt: 'Pessoalmente', en: 'In person' } },
    ],
  },
  {
    id: 'volume',
    title: { pt: 'Quantas mensagens ou atendimentos por dia, mais ou menos?', en: 'Roughly how many messages or requests per day?' },
    options: [
      { id: 'ate20', label: { pt: 'Até 20', en: 'Up to 20' } },
      { id: 'ate100', label: { pt: 'De 20 a 100', en: '20 to 100' } },
      { id: 'mais100', label: { pt: 'Mais de 100', en: 'More than 100' } },
      { id: 'naosei', label: { pt: 'Não sei dizer', en: "I don't know" } },
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
    id: 'aiUse',
    title: { pt: 'Sua empresa já usa IA hoje?', en: 'Does your company already use AI?' },
    options: [
      { id: 'nao', label: { pt: 'Ainda não', en: 'Not yet' } },
      { id: 'solto', label: { pt: 'Usamos ChatGPT ou similar, mas de forma solta', en: 'We use ChatGPT or similar, but informally' } },
      { id: 'automacao', label: { pt: 'Já temos alguma automação', en: 'We already have some automation' } },
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
    id: 'budget',
    title: { pt: 'Quanto faz sentido investir por mês para começar?', en: 'What monthly investment makes sense to start?' },
    options: [
      { id: 'ate500', label: { pt: 'Até R$ 500', en: 'Up to R$500' } },
      { id: 'ate2000', label: { pt: 'De R$ 500 a R$ 2.000', en: 'R$500 to R$2,000' } },
      { id: 'mais2000', label: { pt: 'Acima de R$ 2.000', en: 'Over R$2,000' } },
      { id: 'conversar', label: { pt: 'Prefiro conversar antes', en: "I'd rather talk first" } },
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
  vendas: 'automacao',
  repetitivo: 'automacao',
  documentos: 'documentos',
  ti: 'infra',
  naosei: 'consultoria',
}
const painWeight: Record<string, number> = { atendimento: 2, vendas: 2, repetitivo: 2, documentos: 2, ti: 1, naosei: 1 }
const sizeScore: Record<string, number> = { ate5: 1, ate20: 2, ate100: 3, mais100: 3 }
const dataBonus: Record<string, number> = { espalhados: 0, sistema: 1, organizados: 1 }
const volumeBonus: Record<string, number> = { mais100: 1 }

const painInsight: Record<string, L> = {
  atendimento: {
    pt: 'Cliente sem resposta é cliente que compra do concorrente. Um assistente bem treinado responde na hora e organiza cada conversa.',
    en: 'A customer without an answer buys from your competitor. A well-trained assistant replies instantly and keeps every conversation organized.',
  },
  vendas: {
    pt: 'Venda que esfria por falta de retorno é dinheiro deixado na mesa. Automatizar o acompanhamento garante que nenhum cliente fique sem resposta.',
    en: 'A deal that goes cold for lack of follow-up is money left on the table. Automating follow-ups makes sure no customer is left waiting.',
  },
  repetitivo: {
    pt: 'Tarefa repetitiva é onde a automação paga a conta mais rápido: menos horas gastas e menos erro de digitação.',
    en: 'Repetitive work is where automation pays for itself fastest: fewer hours spent and fewer typing mistakes.',
  },
  documentos: {
    pt: 'Quando a informação existe mas ninguém acha, a equipe perde tempo e erra. Um assistente com os seus documentos resolve isso.',
    en: 'When information exists but nobody can find it, your team wastes time and makes mistakes. An assistant trained on your documents fixes that.',
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
  ate5: { pt: 'Em equipes enxutas, cada hora economizada faz diferença direta no caixa.', en: 'In small teams, every hour saved goes straight to the bottom line.' },
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

/** Canal digital preferido → frase. Em ordem de prioridade. */
const channelPhrase: [string, L][] = [
  ['whatsapp', { pt: 'pelo WhatsApp', en: 'on WhatsApp' }],
  ['instagram', { pt: 'pelo Instagram', en: 'on Instagram' }],
  ['site', { pt: 'pelo site e por e-mail', en: 'through your website and email' }],
  ['telefone', { pt: 'por telefone', en: 'by phone' }],
]

const aiNote: Record<string, L> = {
  solto: {
    pt: 'Vocês já usam IA de forma solta — dá para transformar isso num processo seguro, com regras claras e sem expor dados de clientes.',
    en: 'You already use AI informally — it can become a secure process, with clear rules and no exposure of customer data.',
  },
  automacao: {
    pt: 'Como já existe alguma automação, dá para evoluir o que funciona em vez de começar do zero.',
    en: 'Since some automation already exists, you can build on what works instead of starting from scratch.',
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
      pt: 'Testamos com perguntas e situações reais do seu negócio antes de ir ao ar, e sempre existe um humano como rede de segurança.',
      en: 'We test with real questions and situations from your business before going live, and there is always a human safety net.',
    },
  },
  economia: {
    title: { pt: 'Economia', en: 'Savings' },
    text: {
      pt: 'Começamos pelo que dá retorno mais rápido, com ferramentas de custo justo. Você vê resultado antes de ampliar o investimento.',
      en: 'We start with what pays off fastest, using fairly priced tools. You see results before investing more.',
    },
  },
}

const closing: Record<string, L> = {
  agora: { pt: 'Dá para começar já: deixe seu contato e falamos com você ainda esta semana.', en: "We can start right away: leave your details and we'll reach out this week." },
  breve: {
    pt: 'Ótimo prazo para planejar com calma e fazer bem feito. Vamos desenhar o plano juntos?',
    en: "That's a great timeline to plan calmly and do it right. Shall we sketch the plan together?",
  },
  pesquisando: {
    pt: 'Sem compromisso: explicamos o caminho numa conversa rápida e você decide com tranquilidade.',
    en: "No strings attached: we'll walk you through the path in a quick call and you decide at your own pace.",
  },
}

export type Potential = 'high' | 'medium' | 'starter'

export type QuizResult = {
  solution: Service
  potential: Potential
  why: string[]
  segment?: { name: string; useCase: { title: string; text: string } }
  firstStep: string
  care: { title: string; text: string }
  closing: string
  /** Texto pronto com todas as respostas (vai para a mensagem de contato). */
  summary: string
}

const asList = (a: Answer | undefined) => (Array.isArray(a) ? a : a ? [a] : [])
const one = (a: Answer | undefined) => (Array.isArray(a) ? (a[0] ?? '') : (a ?? ''))

export function labelFor(id: QuestionId, answer: Answer | undefined, lang: Lang) {
  const question = quizQuestions.find((q) => q.id === id)
  const labels = asList(answer).map((value) => question?.options.find((o) => o.id === value)?.label[lang] ?? value)
  return labels.length ? labels.join(', ') : '—'
}

export function buildResult(answers: Answers, lang: Lang): QuizResult {
  const tx = (l: L | undefined) => (l ? l[lang] : '')
  const pain = one(answers.pain) || 'naosei'
  const size = one(answers.size)
  const solutionId = painToSolution[pain] ?? 'consultoria'
  const solution = services.find((s) => s.id === solutionId) ?? services[0]

  const score =
    (sizeScore[size] ?? 1) + (painWeight[pain] ?? 1) + (dataBonus[one(answers.data)] ?? 0) + (volumeBonus[one(answers.volume)] ?? 0)
  const potential: Potential = score >= 5 ? 'high' : score >= 3 ? 'medium' : 'starter'

  const why: string[] = [tx(painInsight[pain])]
  const channels = asList(answers.channels)
  const channel = channelPhrase.find(([id]) => channels.includes(id))
  if (channel && (solutionId === 'atendimento' || solutionId === 'automacao')) {
    why.push(
      lang === 'pt'
        ? `Seus clientes já falam com você ${channel[1].pt} — a solução começa por aí, sem mudar o hábito de ninguém.`
        : `Your customers already reach you ${channel[1].en} — the solution starts right there, without changing anyone's habits.`,
    )
  }
  if (one(answers.volume) === 'mais100') {
    why.push(
      lang === 'pt'
        ? 'Com mais de 100 atendimentos por dia, cada minuto economizado por conversa vira horas de equipe por semana.'
        : 'With over 100 requests a day, every minute saved per conversation adds up to hours of staff time each week.',
    )
  }
  const note = aiNote[one(answers.aiUse)]
  if (note) why.push(tx(note))
  if (why.length < 4 && sizeInsight[size]) why.push(tx(sizeInsight[size]))

  const segmentData = segments.find((s) => s.quizId === one(answers.sector))
  const useCase = segmentData && (segmentData.useCases.find((u) => u.solution === solutionId) ?? segmentData.useCases[0])
  const careItem = care[one(answers.priority)] ?? care.seguranca

  const lines = quizQuestions.map((q) => `• ${tx(q.title)} ${labelFor(q.id, answers[q.id], lang)}`)
  const summary = [
    lang === 'pt' ? 'Olá! Fiz o diagnóstico de IA no site da Wolf Solutions:' : 'Hi! I took the AI assessment on the Wolf Solutions website:',
    ...lines,
    '',
    lang === 'pt'
      ? `Solução indicada: ${tx(solution.title)}. Quero conversar sobre isso.`
      : `Suggested solution: ${tx(solution.title)}. I'd like to talk about it.`,
  ].join('\n')

  return {
    solution,
    potential,
    why: why.slice(0, 4),
    segment: segmentData && useCase ? { name: tx(segmentData.name), useCase: { title: tx(useCase.title), text: tx(useCase.text) } } : undefined,
    firstStep: tx(firstStep[one(answers.data)] ?? firstStep.espalhados),
    care: { title: tx(careItem.title), text: tx(careItem.text) },
    closing: tx(closing[one(answers.timing)] ?? closing.pesquisando),
    summary,
  }
}
