// Textos fixos do site em PORTUGUÊS. A versão em inglês fica em en.ts (mesma estrutura).
import type { IconName } from '../lib/icons'

export const pt = {
  meta: {
    title: 'Wolf Solutions — IA aplicada ao seu negócio',
    blog: 'Blog — Wolf Solutions',
    notFound: 'Página não encontrada — Wolf Solutions',
    privacy: 'Política de privacidade — Wolf Solutions',
    segment: (name: string) => `IA para ${name.toLowerCase()} — Wolf Solutions`,
  },
  skip: 'Pular para o conteúdo',
  nav: {
    solutions: 'Soluções',
    segments: 'Por ramo',
    quiz: 'Diagnóstico',
    about: 'Sobre',
    faq: 'Dúvidas',
    cta: 'Fale conosco',
    open: 'Abrir menu',
    close: 'Fechar menu',
    home: 'Wolf Solutions — início',
    main: 'Navegação principal',
  },
  theme: { toLight: 'Ativar tema claro', toDark: 'Ativar tema escuro' },
  lang: { label: 'Idioma' },
  common: { draft: 'rascunho', minRead: 'min de leitura' },
  social: { linkedin: 'LinkedIn', whatsapp: 'WhatsApp', email: 'E-mail' },

  hero: {
    badge: 'Agenda aberta para novos projetos',
    titleA: 'IA que resolve.',
    titleB: 'Sem complicar',
    titleC: 'o seu negócio.',
    subtitle:
      'A Wolf Solutions desenvolve agentes de IA e automações sob medida para empresas, com a base de infraestrutura e segurança de quem trabalha há mais de 3 anos com redes e servidores. Soluções seguras, bem testadas e que se pagam.',
    ctaPrimary: 'Fazer diagnóstico gratuito',
    ctaHint: '3 min',
    ctaSecondary: 'Soluções por ramo',
    pillars: [
      { icon: 'shield' as IconName, title: 'Segurança', text: 'Dados sob controle' },
      { icon: 'quality' as IconName, title: 'Qualidade', text: 'Testado antes de ir ao ar' },
      { icon: 'economy' as IconName, title: 'Economia', text: 'Retorno antes de escalar' },
    ],
    visual: {
      assistant: 'Assistente · Sua empresa',
      online: 'online agora',
      tag: 'IA',
      messages: [
        { from: 'client', text: 'Oi! Vocês abrem no sábado?' },
        { from: 'ai', text: 'Oi, Ana! Abrimos sim, das 8h às 12h. Quer que eu já reserve um horário pra você?' },
        { from: 'client', text: 'Quero! Às 10h pode ser?' },
        { from: 'ai', text: 'Prontinho: sábado às 10h está reservado. Na sexta eu te mando um lembrete.' },
      ] as { from: 'client' | 'ai'; text: string }[],
      human: 'Passa para um humano sempre que precisar',
      secureTitle: 'Dados protegidos',
      secureText: 'Acesso restrito · LGPD',
      flowTitle: 'Automação rodando',
      flow: ['Pedido', 'Planilha', 'Nota', 'E-mail'],
    },
  },

  solutions: {
    eyebrow: 'O que entregamos',
    title: 'Soluções de IA que trabalham por você — e não viram mais um problema.',
    subtitle:
      'Nada de tecnologia pela tecnologia. Cada solução começa por uma pergunta simples: isso economiza tempo, reduz risco ou traz cliente?',
  },

  segments: {
    eyebrow: 'Soluções por ramo',
    title: 'Cada negócio tem sua rotina. A IA se adapta a ela.',
    subtitle: 'Exemplos concretos do que dá para automatizar no seu ramo — e por onde começar.',
    cta: 'Ver soluções',
    other: 'Seu ramo não está na lista? O diagnóstico funciona para qualquer negócio.',
    otherCta: 'Fazer diagnóstico',
  },

  segmentPage: {
    eyebrow: 'IA para',
    back: 'Todos os ramos',
    pains: 'O que costuma travar a rotina',
    useCases: 'O que a IA faz por você',
    gains: 'O que muda no dia a dia',
    ctaTitle: 'Descubra por onde começar no seu negócio',
    ctaText: 'O diagnóstico gratuito já começa com o seu ramo selecionado e leva cerca de 3 minutos.',
    ctaButton: 'Fazer o diagnóstico',
    others: 'Outros ramos',
  },

  method: {
    eyebrow: 'Como trabalhamos',
    title: 'Calma, método e resultado à vista.',
    subtitle: 'Você sabe o que vai acontecer, quanto vai investir e o que vai ganhar — antes de começar.',
    pillars: [
      {
        icon: 'shield' as IconName,
        title: 'Segurança',
        text: 'Dados sensíveis sob controle: acessos restritos, registro do que a IA faz e LGPD considerada desde o primeiro dia.',
      },
      {
        icon: 'quality' as IconName,
        title: 'Qualidade',
        text: 'Nada vai para o seu cliente sem teste. A IA é validada com situações reais do seu negócio e sempre tem um humano como rede de segurança.',
      },
      {
        icon: 'economy' as IconName,
        title: 'Economia',
        text: 'Começamos pelo que dá retorno mais rápido, sem contrato inflado nem ferramenta que você não vai usar. Você vê o resultado antes de ampliar.',
      },
    ],
    steps: [
      { title: 'Diagnóstico', text: 'Uma conversa objetiva para entender sua rotina, suas dores e o que realmente vale automatizar.' },
      { title: 'Protótipo', text: 'Uma primeira versão funcionando, rápido, para você testar com casos reais.' },
      { title: 'Implantação segura', text: 'Integração com os seus sistemas, acessos configurados e equipe orientada.' },
      { title: 'Acompanhamento', text: 'Medição de resultado, ajustes finos e evolução conforme o negócio cresce.' },
    ],
  },

  quiz: {
    eyebrow: 'Diagnóstico gratuito',
    title: 'Descubra em 3 minutos onde a IA dá retorno no seu negócio.',
    subtitle:
      'Dez perguntas rápidas. No final, você recebe a solução indicada para o seu ramo, o primeiro passo e um relatório para salvar — sem compromisso.',
    bullets: ['A solução que mais combina com o seu ramo', 'Um exemplo prático para o seu negócio', 'Relatório para salvar em PDF'],
    progress: (n: number, total: number) => `Pergunta ${n} de ${total}`,
    back: 'Voltar',
    next: 'Continuar',
    multiHint: 'Pode marcar mais de uma opção',
    resultEyebrow: 'Seu diagnóstico',
    potential: 'Potencial de ganho',
    levels: { high: 'Alto', medium: 'Médio', starter: 'Bom começo' },
    whyTitle: 'Por que essa solução',
    segmentTitle: (name: string) => `Na prática, em ${name.toLowerCase()}`,
    firstStepTitle: 'Primeiro passo',
    careTitle: (pillar: string) => `Como cuidamos da ${pillar.toLowerCase()}`,
    reportTitle: 'Diagnóstico de IA',
    reportDate: 'Gerado em',
    lead: {
      title: 'Quer uma proposta para este diagnóstico?',
      text: 'Deixe seu contato e falamos com você — sem compromisso.',
      name: 'Seu nome',
      whatsapp: 'WhatsApp',
      email: 'E-mail',
      needContact: 'Preencha o WhatsApp ou o e-mail.',
      consent: 'Autorizo a Wolf Solutions a entrar em contato comigo sobre este diagnóstico.',
      submit: 'Quero ser contatado',
      sending: 'Enviando…',
      done: 'Recebido! Entraremos em contato em breve.',
      error: 'Não foi possível enviar agora. Tente de novo ou use o formulário de contato.',
    },
    save: 'Salvar relatório (PDF)',
    write: 'Prefiro escrever uma mensagem',
    restart: 'Refazer',
    privacy:
      'As respostas do diagnóstico são guardadas sem identificar você. Seu nome e contato só são enviados se você preencher o formulário.',
  },

  about: {
    eyebrow: 'Quem está por trás',
    title: 'Prazer, Nicolas Wolf.',
    traitsTitle: 'Como é trabalhar comigo',
    timelineTitle: 'Trajetória',
    stackTitle: 'Tecnologias',
    certificationsTitle: 'Certificações',
    credential: 'Ver credencial',
    photoAlt: 'Nicolas Wolf, fundador da Wolf Solutions',
  },

  tools: {
    eyebrow: 'Como as soluções são construídas',
    title: 'Cada camada com a ferramenta certa.',
    subtitle:
      'Você não precisa decorar nenhum desses nomes. O que importa é o que cada camada faz pelo seu negócio — e escolhemos a ferramenta pelo problema, não pela moda.',
  },

  faq: {
    eyebrow: 'Dúvidas frequentes',
    title: 'Antes de começar, você pode estar se perguntando…',
    subtitle: 'Se a sua dúvida não estiver aqui, é só chamar.',
    more: 'Falar com a gente',
  },

  blog: {
    eyebrow: 'Blog',
    title: 'Ideias práticas sobre IA e tecnologia para negócios.',
    subtitle: 'Sem hype: o que funciona, quanto custa e onde tomar cuidado.',
    all: 'Ver todos os artigos',
    back: 'Todos os artigos',
    empty: 'Novos artigos em breve.',
    fallback: 'Este artigo ainda não tem versão em português.',
    ctaTitle: 'Quer aplicar isso no seu negócio?',
    ctaText: 'Faça o diagnóstico gratuito e receba um ponto de partida em 3 minutos.',
    ctaButton: 'Fazer diagnóstico',
  },

  contact: {
    eyebrow: 'Contato',
    title: 'Vamos conversar sobre o seu negócio?',
    subtitle:
      'Conte o que está tomando o seu tempo. Respondemos com clareza: o que dá para fazer, quanto custa e o que você ganha.',
    promises: [
      'Conversa inicial sem custo e sem compromisso',
      'Proposta clara, sem letras miúdas',
      'Seus dados tratados com sigilo',
    ],
    channels: 'Ou fale direto',
    form: {
      name: 'Seu nome',
      email: 'Seu e-mail',
      whatsapp: 'WhatsApp',
      company: 'Empresa (opcional)',
      message: 'Como podemos ajudar?',
      placeholder: 'Ex.: perdemos muito tempo respondendo clientes no WhatsApp…',
      needContact: 'Preencha o e-mail ou o WhatsApp para podermos responder.',
      consent: 'Autorizo a Wolf Solutions a entrar em contato comigo.',
      submit: 'Enviar mensagem',
      sending: 'Enviando…',
      error: 'Não foi possível enviar agora. Tente de novo ou fale direto pelos canais ao lado.',
      privacy: 'Seus dados são usados apenas para responder você.',
    },
    success: {
      title: 'Mensagem enviada!',
      text: 'Obrigado pelo contato. Vamos ler com atenção e responder em breve.',
      again: 'Enviar outra mensagem',
    },
  },

  footer: {
    rights: 'Todos os direitos reservados.',
    top: 'Topo',
    privacy: 'Privacidade',
    privacyPolicy: 'Política de privacidade',
  },

  notFound: {
    title: 'Página não encontrada',
    text: 'O endereço pode ter mudado ou não existe mais.',
    cta: 'Voltar ao início',
  },
}

export type Copy = typeof pt
