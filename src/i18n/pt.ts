// Textos fixos do site em PORTUGUÊS. A versão em inglês fica em en.ts (mesma estrutura).
import type { IconName } from '../lib/icons'

export const pt = {
  meta: {
    title: 'Nicolas Wolf — Soluções de IA com segurança, qualidade e economia',
    blog: 'Blog — Nicolas Wolf',
    notFound: 'Página não encontrada — Nicolas Wolf',
  },
  skip: 'Pular para o conteúdo',
  nav: {
    solutions: 'Soluções',
    quiz: 'Diagnóstico',
    cases: 'Cases',
    about: 'Sobre',
    blog: 'Blog',
    cta: 'Fale comigo',
    open: 'Abrir menu',
    close: 'Fechar menu',
    home: 'Nicolas Wolf — início',
    main: 'Navegação principal',
  },
  theme: { toLight: 'Ativar tema claro', toDark: 'Ativar tema escuro' },
  lang: { label: 'Idioma' },
  common: { seeCase: 'Ver case', draft: 'rascunho', minRead: 'min de leitura' },
  social: { linkedin: 'LinkedIn', github: 'GitHub', whatsapp: 'WhatsApp', email: 'E-mail' },

  hero: {
    badge: 'Disponível para novos projetos',
    titleA: 'IA que resolve.',
    titleB: 'Sem complicar',
    titleC: 'o seu negócio.',
    subtitle:
      'Sou Nicolas Wolf. Desenvolvo agentes de IA e automações sob medida para empresas, com a base de quem trabalha há mais de 3 anos com infraestrutura, redes e servidores. Soluções seguras, bem testadas e que se pagam.',
    ctaPrimary: 'Fazer diagnóstico gratuito',
    ctaHint: '2 min',
    ctaSecondary: 'Ver cases',
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
    eyebrow: 'O que eu entrego',
    title: 'Soluções de IA que trabalham por você — e não viram mais um problema.',
    subtitle:
      'Nada de tecnologia pela tecnologia. Cada solução começa por uma pergunta simples: isso economiza tempo, reduz risco ou traz cliente?',
  },

  method: {
    eyebrow: 'Como eu trabalho',
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
        text: 'Começo pelo que dá retorno mais rápido, sem contrato inflado nem ferramenta que você não vai usar. Você vê o resultado antes de ampliar.',
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
    title: 'Descubra em 2 minutos onde a IA dá retorno no seu negócio.',
    subtitle: 'Seis perguntas rápidas. No final, você recebe um ponto de partida claro — sem cadastro e sem compromisso.',
    bullets: [
      'A solução que mais combina com o seu ramo',
      'O primeiro passo prático',
      'Como fica a segurança dos seus dados',
    ],
    progress: (n: number, total: number) => `Pergunta ${n} de ${total}`,
    back: 'Voltar',
    resultEyebrow: 'Seu ponto de partida',
    potential: 'Potencial de ganho',
    levels: { high: 'Alto', medium: 'Médio', starter: 'Bom começo' },
    whyTitle: 'Por que essa solução',
    firstStepTitle: 'Primeiro passo',
    careTitle: (pillar: string) => `Como eu cuido da ${pillar.toLowerCase()}`,
    cta: 'Quero conversar sobre isso',
    restart: 'Refazer',
    privacy: 'Suas respostas ficam só no seu navegador até você decidir falar comigo.',
  },

  cases: {
    eyebrow: 'Cases',
    title: 'Problema real, solução que funciona.',
    subtitle: 'Projetos reais com agentes de IA, Machine Learning e APIs — com o código aberto no GitHub.',
    nextTitle: 'O próximo case pode ser o seu.',
    nextText: 'Faça o diagnóstico gratuito e descubra por onde começar no seu negócio.',
    nextCta: 'Começar diagnóstico',
    back: 'Todos os cases',
    context: 'Contexto',
    challenge: 'Desafio',
    solution: 'O que foi feito',
    results: 'Resultados',
    stack: 'Tecnologias',
    business: 'E no seu negócio?',
    repo: 'Ver código no GitHub',
    next: 'Próximo case',
    ctaTitle: 'Quer um resultado assim no seu negócio?',
    ctaText:
      'Me conte o seu cenário. Em uma conversa rápida eu te mostro o caminho — com clareza sobre prazo, custo e retorno.',
    ctaButton: 'Falar com o Nicolas',
  },

  about: {
    eyebrow: 'Quem está por trás',
    title: 'Prazer, Nicolas Wolf.',
    traitsTitle: 'Como é trabalhar comigo',
    timelineTitle: 'Trajetória',
  },

  tools: {
    eyebrow: 'Como as soluções são construídas',
    title: 'Cada camada com a ferramenta certa.',
    subtitle:
      'Você não precisa decorar nenhum desses nomes. O que importa é o que cada camada faz pelo seu negócio — e eu escolho a ferramenta pelo problema, não pela moda.',
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
    ctaText: 'Faça o diagnóstico gratuito e receba um ponto de partida em 2 minutos.',
    ctaButton: 'Fazer diagnóstico',
  },

  contact: {
    eyebrow: 'Contato',
    title: 'Vamos conversar sobre o seu negócio?',
    subtitle:
      'Me conte o que está tomando o seu tempo. Eu respondo com clareza: o que dá para fazer, quanto custa e o que você ganha.',
    promises: [
      'Conversa inicial sem custo e sem compromisso',
      'Proposta clara, sem letras miúdas',
      'Seus dados tratados com sigilo',
    ],
    channels: 'Ou fale direto comigo',
    form: {
      name: 'Seu nome',
      email: 'Seu e-mail',
      company: 'Empresa (opcional)',
      message: 'Como posso ajudar?',
      placeholder: 'Ex.: perdemos muito tempo respondendo clientes no WhatsApp…',
      submit: 'Enviar mensagem',
      submitLinkedin: 'Copiar e enviar pelo LinkedIn',
      sending: 'Enviando…',
      error: 'Não consegui enviar agora. Tente de novo ou fale comigo pelos outros canais.',
      notConfigured:
        'Só você vê este aviso: sem web3formsKey em src/config/site.ts, o formulário não chega no seu e-mail (por enquanto ele envia pelo LinkedIn).',
      privacy: 'Seus dados são usados apenas para responder você.',
      subject: (name: string) => `Novo contato pelo portfólio — ${name}`,
    },
    success: {
      title: 'Mensagem enviada!',
      text: 'Obrigado pelo contato. Vou ler com atenção e te respondo em breve.',
      again: 'Enviar outra mensagem',
    },
    copied: {
      title: 'Mensagem copiada!',
      text: 'Abri meu LinkedIn em outra aba. É só clicar em “Enviar mensagem”, colar (Ctrl+V) e enviar.',
      open: 'Abrir o LinkedIn de novo',
    },
  },

  footer: {
    rights: 'Todos os direitos reservados.',
    built: 'Feito com React, Vite e Motion.',
    source: 'Código no GitHub',
    top: 'Topo',
  },

  notFound: {
    title: 'Página não encontrada',
    text: 'O endereço pode ter mudado ou não existe mais.',
    cta: 'Voltar ao início',
  },
}

export type Copy = typeof pt
