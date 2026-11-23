// Soluções que você oferece. Para adicionar uma nova, copie um bloco e ajuste.
import type { IconName } from '../lib/icons'
import type { L } from '../lib/types'

export type SolutionId = 'atendimento' | 'automacao' | 'documentos' | 'infra' | 'consultoria' | 'treinamento'

export type Service = { id: SolutionId; icon: IconName; title: L; text: L; bullets: L[] }

export const services: Service[] = [
  {
    id: 'atendimento',
    icon: 'chat',
    title: { pt: 'Atendimento com IA', en: 'AI-powered customer service' },
    text: {
      pt: 'Um assistente que responde seus clientes no WhatsApp, Instagram ou site 24 horas por dia, com o tom da sua marca — e passa para um humano quando precisa.',
      en: 'An assistant that answers your customers on WhatsApp, Instagram or your website 24/7, in your brand voice — and hands over to a human when needed.',
    },
    bullets: [
      { pt: 'Respostas em segundos, até de madrugada', en: 'Answers in seconds, even at 3am' },
      { pt: 'Agenda, orçamentos e pedidos', en: 'Bookings, quotes and orders' },
      { pt: 'Histórico organizado de cada cliente', en: 'An organized history for every customer' },
    ],
  },
  {
    id: 'automacao',
    icon: 'workflow',
    title: { pt: 'Automação de processos', en: 'Process automation' },
    text: {
      pt: 'Tarefas repetitivas — planilhas, cadastros, e-mails, relatórios — rodando sozinhas e integradas aos sistemas que você já usa.',
      en: 'Repetitive tasks — spreadsheets, data entry, emails, reports — running on their own and connected to the systems you already use.',
    },
    bullets: [
      { pt: 'Menos erro de digitação', en: 'Fewer typing mistakes' },
      { pt: 'Equipe livre para o que gera dinheiro', en: 'Your team freed up for what makes money' },
      { pt: 'Integra com planilhas, ERP e e-mail', en: 'Works with spreadsheets, ERP and email' },
    ],
  },
  {
    id: 'documentos',
    icon: 'docs',
    title: { pt: 'Assistente com seus documentos', en: 'An assistant for your documents' },
    text: {
      pt: 'Uma IA que consulta contratos, manuais e procedimentos internos e responde sua equipe em segundos, sem expor informação sensível.',
      en: 'An AI that searches contracts, manuals and internal procedures and answers your team in seconds, without exposing sensitive information.',
    },
    bullets: [
      { pt: 'Perguntas em linguagem natural', en: 'Questions in plain language' },
      { pt: 'Respostas com a fonte citada', en: 'Answers that cite the source' },
      { pt: 'Acesso controlado por pessoa ou setor', en: 'Access controlled per person or team' },
    ],
  },
  {
    id: 'infra',
    icon: 'shield',
    title: { pt: 'Infraestrutura e segurança', en: 'Infrastructure and security' },
    text: {
      pt: 'Rede, servidores, contas e acessos organizados e protegidos. É a base que faz qualquer IA funcionar sem riscos.',
      en: 'Networks, servers, accounts and access organized and protected. The foundation that lets any AI run without risk.',
    },
    bullets: [
      { pt: 'Servidores Linux e ambientes em contêiner', en: 'Linux servers and containerized environments' },
      { pt: 'Backup e políticas de segurança', en: 'Backups and security policies' },
      { pt: 'Controle de acessos documentado', en: 'Documented access control' },
    ],
  },
  {
    id: 'consultoria',
    icon: 'compass',
    title: { pt: 'Diagnóstico e consultoria', en: 'Assessment and consulting' },
    text: {
      pt: 'Mapeamos seus processos e mostramos onde a IA gera retorno de verdade — e onde não vale o investimento.',
      en: "We map your processes and show you where AI truly pays off — and where it isn't worth the investment.",
    },
    bullets: [
      { pt: 'Plano com prioridades e custos', en: 'A plan with priorities and costs' },
      { pt: 'Escolha das ferramentas certas', en: 'Choosing the right tools' },
      { pt: 'Sem amarrar você a um fornecedor', en: 'No vendor lock-in' },
    ],
  },
  {
    id: 'treinamento',
    icon: 'training',
    title: { pt: 'Treinamento de equipes', en: 'Team training' },
    text: {
      pt: 'Sua equipe usando IA no dia a dia com segurança: o que pode, o que não pode e como tirar o máximo das ferramentas.',
      en: 'Your team using AI every day, safely: what is allowed, what is not, and how to get the most out of the tools.',
    },
    bullets: [
      { pt: 'Treinamento prático e direto', en: 'Hands-on, straightforward training' },
      { pt: 'Boas práticas de privacidade', en: 'Privacy best practices' },
      { pt: 'Material de apoio para consulta', en: 'Reference material to keep' },
    ],
  },
]
