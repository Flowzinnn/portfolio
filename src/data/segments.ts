// Soluções por ramo. Cada ramo tem uma página própria em /ia-para/<slug> e aparece no quiz.
// Para adicionar um ramo: copie um bloco, troque `slug`, `quizId` e os textos.
// `solution` de cada caso de uso liga ao resultado do quiz (veja services.ts).
import type { IconName } from '../lib/icons'
import type { L } from '../lib/types'
import type { SolutionId } from './services'

export type UseCase = { solution: SolutionId; title: L; text: L }

export type Segment = {
  slug: string
  quizId: string
  icon: IconName
  name: L
  short: L
  audience: L
  pains: L[]
  useCases: UseCase[]
  gains: L[]
}

export const segments: Segment[] = [
  {
    slug: 'clinicas',
    quizId: 'saude',
    icon: 'health',
    name: { pt: 'Clínicas e saúde', en: 'Clinics & healthcare' },
    short: {
      pt: 'Agenda cheia, recepção leve e menos faltas.',
      en: 'A full schedule, a lighter front desk and fewer no-shows.',
    },
    audience: {
      pt: 'Clínicas, consultórios, odontologia, estética e fisioterapia.',
      en: 'Clinics, private practices, dentistry, aesthetics and physiotherapy.',
    },
    pains: [
      { pt: 'Recepção sobrecarregada com agendamentos e confirmações', en: 'A front desk overloaded with bookings and confirmations' },
      { pt: 'Pacientes que faltam sem avisar', en: 'Patients who miss appointments without notice' },
      { pt: 'As mesmas dúvidas sobre convênios, preparo e valores', en: 'The same questions about insurance, preparation and prices' },
    ],
    useCases: [
      {
        solution: 'atendimento',
        title: { pt: 'Agendamento pelo WhatsApp', en: 'Booking on WhatsApp' },
        text: {
          pt: 'O assistente consulta a agenda, oferece os horários livres, marca e confirma — e passa para a recepção o que for sensível.',
          en: 'The assistant checks the schedule, offers open slots, books and confirms — and hands anything sensitive to the front desk.',
        },
      },
      {
        solution: 'automacao',
        title: { pt: 'Confirmação e lembrete automáticos', en: 'Automatic confirmations and reminders' },
        text: {
          pt: 'Confirmação na véspera e lembrete no dia, com remarcação em poucos toques.',
          en: 'A confirmation the day before and a reminder on the day, with rescheduling in a few taps.',
        },
      },
      {
        solution: 'documentos',
        title: { pt: 'Respostas sobre convênios e preparos', en: 'Answers about insurance and preparation' },
        text: {
          pt: 'A IA responde com base nas regras da clínica: convênios aceitos, preparo de exames e documentos necessários.',
          en: "The AI answers based on the clinic's rules: accepted insurance, exam preparation and required documents.",
        },
      },
      {
        solution: 'infra',
        title: { pt: 'Dados de pacientes protegidos', en: 'Protected patient data' },
        text: {
          pt: 'Acessos por função, registro de quem viu o quê e dados de saúde fora de onde não precisam estar.',
          en: 'Role-based access, a log of who viewed what and health data kept only where it is needed.',
        },
      },
    ],
    gains: [
      { pt: 'Recepção livre para quem está na clínica', en: 'A front desk free for patients in the room' },
      { pt: 'Menos faltas e horários vazios', en: 'Fewer no-shows and empty slots' },
      { pt: 'Atendimento 24h sem aumentar a equipe', en: '24/7 service without growing the team' },
    ],
  },
  {
    slug: 'comercio',
    quizId: 'comercio',
    icon: 'store',
    name: { pt: 'Comércio e varejo', en: 'Retail & commerce' },
    short: {
      pt: 'Responder na hora e vender mais, até fora do horário.',
      en: 'Answer instantly and sell more, even after hours.',
    },
    audience: {
      pt: 'Lojas físicas, e-commerce, distribuidoras e atacado.',
      en: 'Physical stores, e-commerce, distributors and wholesale.',
    },
    pains: [
      { pt: 'Clientes perguntando preço, estoque e prazo o dia todo', en: 'Customers asking about price, stock and delivery all day' },
      { pt: 'Vendas perdidas pela demora na resposta', en: 'Sales lost to slow replies' },
      { pt: 'Pedidos do WhatsApp digitados à mão no sistema', en: 'WhatsApp orders typed into the system by hand' },
    ],
    useCases: [
      {
        solution: 'atendimento',
        title: { pt: 'Vendedor digital no WhatsApp e Instagram', en: 'A digital salesperson on WhatsApp and Instagram' },
        text: {
          pt: 'Responde sobre produtos, preços e disponibilidade em segundos e encaminha a venda para a equipe fechar.',
          en: 'Answers about products, prices and availability in seconds and routes the sale to your team to close.',
        },
      },
      {
        solution: 'automacao',
        title: { pt: 'Pedido direto no sistema', en: 'Orders straight into the system' },
        text: {
          pt: 'O pedido feito na conversa vai para a planilha ou o ERP sem ninguém digitar de novo.',
          en: 'Orders placed in the chat go into the spreadsheet or ERP without anyone retyping them.',
        },
      },
      {
        solution: 'documentos',
        title: { pt: 'Catálogo inteligente para a equipe', en: 'A smart catalog for your team' },
        text: {
          pt: 'Vendedores perguntam sobre especificações, trocas e políticas e recebem a resposta na hora.',
          en: 'Salespeople ask about specs, returns and policies and get the answer instantly.',
        },
      },
      {
        solution: 'automacao',
        title: { pt: 'Pós-venda e recompra', en: 'After-sales and repeat purchases' },
        text: {
          pt: 'Acompanhamento da entrega, pedido de avaliação e lembrete de reposição no momento certo.',
          en: 'Delivery follow-up, review requests and restock reminders at the right moment.',
        },
      },
    ],
    gains: [
      { pt: 'Mais vendas fechadas fora do horário', en: 'More sales closed after hours' },
      { pt: 'Menos erro em pedidos', en: 'Fewer order mistakes' },
      { pt: 'Cliente atendido em segundos', en: 'Customers served in seconds' },
    ],
  },
  {
    slug: 'industria-agro',
    quizId: 'industria',
    icon: 'factory',
    name: { pt: 'Indústria, agro e logística', en: 'Industry, agribusiness & logistics' },
    short: {
      pt: 'Informação certa, na hora certa, do campo ao escritório.',
      en: 'The right information at the right time, from the field to the office.',
    },
    audience: {
      pt: 'Indústrias, fazendas e cooperativas, transportadoras e prestadores de serviço industrial.',
      en: 'Manufacturers, farms and cooperatives, carriers and industrial service providers.',
    },
    pains: [
      { pt: 'Procedimentos e manuais que ninguém encontra na hora', en: 'Procedures and manuals nobody can find when needed' },
      { pt: 'Relatórios montados à mão a partir de várias planilhas', en: 'Reports assembled by hand from several spreadsheets' },
      { pt: 'Informação de campo que chega atrasada — ou não chega', en: 'Field information that arrives late — or never' },
    ],
    useCases: [
      {
        solution: 'documentos',
        title: { pt: 'Assistente de procedimentos', en: 'A procedures assistant' },
        text: {
          pt: 'A equipe pergunta "como faço a manutenção X?" e recebe o passo a passo do manual certo, com a fonte.',
          en: 'The team asks "how do I service machine X?" and gets the step-by-step from the right manual, with the source.',
        },
      },
      {
        solution: 'automacao',
        title: { pt: 'Relatórios automáticos', en: 'Automatic reports' },
        text: {
          pt: 'Produção, estoque e entregas consolidados e enviados todo dia, sem planilha montada à mão.',
          en: 'Production, inventory and deliveries consolidated and sent daily, with no hand-built spreadsheets.',
        },
      },
      {
        solution: 'atendimento',
        title: { pt: 'Registro de campo pelo WhatsApp', en: 'Field reports via WhatsApp' },
        text: {
          pt: 'Ocorrências, fotos e apontamentos enviados pelo celular viram registro organizado no sistema.',
          en: 'Incidents, photos and notes sent from a phone become organized records in the system.',
        },
      },
      {
        solution: 'infra',
        title: { pt: 'Dados externos no mesmo painel', en: 'External data on one dashboard' },
        text: {
          pt: 'Clima, cotações e rastreio de cargas integrados à operação, num ambiente seguro.',
          en: 'Weather, prices and shipment tracking integrated into operations, in a secure environment.',
        },
      },
    ],
    gains: [
      { pt: 'Decisão com a informação do dia, não do mês passado', en: "Decisions based on today's data, not last month's" },
      { pt: 'Menos retrabalho entre campo e escritório', en: 'Less rework between field and office' },
      { pt: 'Conhecimento da equipe que não se perde', en: 'Team knowledge that never gets lost' },
    ],
  },
  {
    slug: 'restaurantes',
    quizId: 'alimentacao',
    icon: 'food',
    name: { pt: 'Restaurantes e delivery', en: 'Restaurants & delivery' },
    short: {
      pt: 'Nenhum pedido perdido no horário de pico.',
      en: 'No order lost at peak hours.',
    },
    audience: {
      pt: 'Restaurantes, lanchonetes, pizzarias, padarias e dark kitchens.',
      en: 'Restaurants, diners, pizzerias, bakeries and dark kitchens.',
    },
    pains: [
      { pt: 'WhatsApp lotado no horário de pico', en: 'WhatsApp flooded at peak hours' },
      { pt: 'Pedidos anotados errado', en: 'Orders written down wrong' },
      { pt: 'Clientes que pedem uma vez e somem', en: 'Customers who order once and disappear' },
    ],
    useCases: [
      {
        solution: 'atendimento',
        title: { pt: 'Atendente de pedidos 24h', en: '24/7 order assistant' },
        text: {
          pt: 'Mostra o cardápio, tira dúvidas, monta o pedido e calcula a entrega — até no horário de pico.',
          en: 'Shows the menu, answers questions, builds the order and calculates delivery — even at peak hours.',
        },
      },
      {
        solution: 'automacao',
        title: { pt: 'Pedido direto para a cozinha', en: 'Orders straight to the kitchen' },
        text: {
          pt: 'O pedido confirmado chega organizado na cozinha ou no sistema, sem reescrever.',
          en: 'Confirmed orders reach the kitchen or system already organized, with no rewriting.',
        },
      },
      {
        solution: 'atendimento',
        title: { pt: 'Reservas e lista de espera', en: 'Reservations and waitlist' },
        text: {
          pt: 'Reserva de mesa pelo WhatsApp com confirmação e aviso quando a mesa fica livre.',
          en: 'Table reservations on WhatsApp with confirmation and a heads-up when the table is ready.',
        },
      },
      {
        solution: 'automacao',
        title: { pt: 'Campanhas para quem sumiu', en: 'Win-back campaigns' },
        text: {
          pt: 'Mensagem personalizada para quem não pede há um tempo, com o prato favorito da pessoa.',
          en: "A personalized message for customers who haven't ordered in a while, featuring their favorite dish.",
        },
      },
    ],
    gains: [
      { pt: 'Nenhum pedido perdido no pico', en: 'No orders lost at peak time' },
      { pt: 'Menos erro na cozinha', en: 'Fewer mistakes in the kitchen' },
      { pt: 'Mais clientes voltando', en: 'More customers coming back' },
    ],
  },
  {
    slug: 'escritorios',
    quizId: 'escritorios',
    icon: 'briefcase',
    name: { pt: 'Escritórios e serviços profissionais', en: 'Offices & professional services' },
    short: {
      pt: 'Equipe focada no trabalho técnico, não em cobrar documento.',
      en: 'A team focused on expert work, not chasing paperwork.',
    },
    audience: {
      pt: 'Contabilidade, advocacia, consultorias e corretoras de seguros.',
      en: 'Accounting, law firms, consultancies and insurance brokers.',
    },
    pains: [
      { pt: 'Horas gastas cobrando documentos de clientes', en: 'Hours spent chasing documents from clients' },
      { pt: 'As mesmas dúvidas respondidas dezenas de vezes', en: 'The same questions answered dozens of times' },
      { pt: 'Conferência manual de documentos e prazos', en: 'Manual checking of documents and deadlines' },
    ],
    useCases: [
      {
        solution: 'automacao',
        title: { pt: 'Coleta automática de documentos', en: 'Automatic document collection' },
        text: {
          pt: 'Lembretes e checklist por cliente até tudo chegar — e aviso para a equipe quando estiver completo.',
          en: 'Reminders and a per-client checklist until everything arrives — and a heads-up to the team when it is complete.',
        },
      },
      {
        solution: 'documentos',
        title: { pt: 'Conferência de documentos com IA', en: 'AI document review' },
        text: {
          pt: 'Contratos, notas e guias conferidos contra um checklist, com um parecer padronizado para revisão humana.',
          en: 'Contracts, invoices and forms checked against a checklist, with a standardized review for a human to approve.',
        },
      },
      {
        solution: 'atendimento',
        title: { pt: 'Triagem de novos clientes', en: 'New client intake' },
        text: {
          pt: 'O assistente entende o caso, coleta as informações iniciais e agenda a conversa com o profissional certo.',
          en: 'The assistant understands the case, gathers the initial details and books a call with the right professional.',
        },
      },
      {
        solution: 'consultoria',
        title: { pt: 'Base de conhecimento interna', en: 'Internal knowledge base' },
        text: {
          pt: 'A equipe consulta modelos, procedimentos e histórico de casos em linguagem natural.',
          en: 'The team searches templates, procedures and case history in plain language.',
        },
      },
    ],
    gains: [
      { pt: 'Equipe focada no trabalho técnico', en: 'A team focused on expert work' },
      { pt: 'Prazos sob controle', en: 'Deadlines under control' },
      { pt: 'Atendimento mais rápido sem perder o cuidado', en: 'Faster service without losing the personal touch' },
    ],
  },
  {
    slug: 'imobiliarias',
    quizId: 'imobiliarias',
    icon: 'home',
    name: { pt: 'Imobiliárias e construtoras', en: 'Real estate & construction' },
    short: {
      pt: 'Nenhum lead sem resposta, corretor focado em quem compra.',
      en: 'No lead left waiting, agents focused on real buyers.',
    },
    audience: {
      pt: 'Imobiliárias, corretores, construtoras e administradoras de condomínio.',
      en: 'Real estate agencies, brokers, builders and property managers.',
    },
    pains: [
      { pt: 'Leads de vários portais que esfriam sem resposta', en: 'Leads from many portals going cold without a reply' },
      { pt: 'Corretores perdendo tempo com quem não tem perfil', en: "Agents wasting time on prospects who aren't a fit" },
      { pt: 'Visitas marcadas no vai e vem de mensagens', en: 'Viewings scheduled through endless back-and-forth' },
    ],
    useCases: [
      {
        solution: 'atendimento',
        title: { pt: 'Qualificação de leads 24h', en: '24/7 lead qualification' },
        text: {
          pt: 'O assistente responde na hora, entende o que a pessoa procura e quanto pode investir, e entrega o lead pronto ao corretor.',
          en: "The assistant replies instantly, learns what the person is looking for and their budget, and hands a ready lead to the agent.",
        },
      },
      {
        solution: 'automacao',
        title: { pt: 'Leads de todos os portais num lugar só', en: 'Leads from every portal in one place' },
        text: {
          pt: 'Contatos de portais, site e redes sociais centralizados e distribuídos para a equipe automaticamente.',
          en: 'Contacts from portals, website and social media centralized and routed to the team automatically.',
        },
      },
      {
        solution: 'documentos',
        title: { pt: 'Busca inteligente de imóveis', en: 'Smart property search' },
        text: {
          pt: '"3 quartos perto do centro até 500 mil" — a IA encontra as opções no seu portfólio.',
          en: '"3 bedrooms near downtown under 500k" — the AI finds the options in your listings.',
        },
      },
      {
        solution: 'atendimento',
        title: { pt: 'Agendamento de visitas', en: 'Viewing scheduling' },
        text: {
          pt: 'Visitas marcadas direto na agenda do corretor, com confirmação e lembrete.',
          en: "Viewings booked straight into the agent's calendar, with confirmation and reminders.",
        },
      },
    ],
    gains: [
      { pt: 'Nenhum lead sem resposta', en: 'No lead left without a reply' },
      { pt: 'Corretor focado em quem vai comprar', en: 'Agents focused on real buyers' },
      { pt: 'Funil organizado do primeiro contato à visita', en: 'An organized funnel from first contact to viewing' },
    ],
  },
]
