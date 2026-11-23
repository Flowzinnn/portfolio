// Perguntas frequentes. Para adicionar uma, copie um bloco.
import type { L } from '../lib/types'

export const faq: { q: L; a: L }[] = [
  {
    q: { pt: 'Quanto custa uma solução de IA?', en: 'How much does an AI solution cost?' },
    a: {
      pt: 'Depende do tamanho do problema. O diagnóstico é gratuito e, depois dele, você recebe uma proposta com escopo e valor definidos antes de começar. Muitas soluções começam pequenas e se pagam com o tempo que a equipe economiza.',
      en: 'It depends on the size of the problem. The assessment is free, and afterwards you get a proposal with a defined scope and price before anything starts. Many solutions start small and pay for themselves with the time your team saves.',
    },
  },
  {
    q: { pt: 'Quanto tempo leva para ficar pronto?', en: 'How long does it take?' },
    a: {
      pt: 'Depende do escopo. Trabalhamos em etapas curtas: primeiro um protótipo funcionando para você testar com casos reais, depois os ajustes e a implantação. Você acompanha cada etapa.',
      en: 'It depends on the scope. We work in short stages: first a working prototype for you to test with real cases, then adjustments and rollout. You follow every step.',
    },
  },
  {
    q: { pt: 'Preciso trocar os sistemas que já uso?', en: 'Do I need to replace the systems I already use?' },
    a: {
      pt: 'Não. A ideia é conectar a IA ao que você já usa — WhatsApp, planilhas, ERP, e-mail. Só sugerimos mudar algo quando isso realmente economiza dinheiro.',
      en: 'No. The idea is to connect AI to what you already use — WhatsApp, spreadsheets, ERP, email. We only suggest changing something when it truly saves money.',
    },
  },
  {
    q: { pt: 'Meus dados ficam seguros?', en: 'Is my data safe?' },
    a: {
      pt: 'Segurança vem antes de tudo: acessos restritos, registro do que a IA faz e dados sensíveis só onde precisam estar. Você sabe onde cada informação fica guardada e quem tem acesso a ela.',
      en: 'Security comes first: restricted access, a log of what the AI does and sensitive data only where it needs to be. You know where every piece of information is stored and who can access it.',
    },
  },
  {
    q: { pt: 'E a LGPD?', en: "What about Brazil's privacy law (LGPD)?" },
    a: {
      pt: 'A solução nasce pensada para a LGPD: coletar só o necessário, deixar claro para o seu cliente como os dados são usados e permitir que sejam apagados quando ele pedir.',
      en: "Solutions are designed for the LGPD from the start: collect only what is needed, make it clear to your customers how their data is used and let it be deleted on request.",
    },
  },
  {
    q: { pt: 'A IA pode errar com o meu cliente?', en: 'Can the AI make mistakes with my customers?' },
    a: {
      pt: 'Pode, como qualquer pessoa. Por isso ela é testada com situações reais do seu negócio, segue regras claras e passa para um humano quando não tem certeza ou quando o assunto é sensível.',
      en: 'It can, like anyone. That is why it is tested against real situations from your business, follows clear rules and hands over to a human when it is unsure or the topic is sensitive.',
    },
  },
  {
    q: { pt: 'Preciso ter alguém técnico na empresa?', en: 'Do I need technical staff?' },
    a: {
      pt: 'Não. Cuidamos da parte técnica e entregamos tudo funcionando, com orientação para a sua equipe usar no dia a dia.',
      en: 'No. We handle the technical side and deliver everything working, with guidance so your team can use it day to day.',
    },
  },
  {
    q: { pt: 'Como funciona depois que fica pronto?', en: 'What happens after it is delivered?' },
    a: {
      pt: 'Você pode seguir por conta própria ou contar com acompanhamento mensal: monitoramento, ajustes e evolução conforme o negócio cresce.',
      en: 'You can run it on your own or choose monthly support: monitoring, adjustments and improvements as your business grows.',
    },
  },
]
