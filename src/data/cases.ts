// Cases (projetos). Cada um ganha uma página própria em /cases/<slug>.
// `cover` (opcional): imagem em public/images/, ex.: 'images/weatherapp.webp' (use 1600×900 ou maior).
// `repo` (opcional): link do código no GitHub.
// `business`: como esse tipo de solução ajuda uma empresa — é o que conquista o cliente.
// `draft: true` = conteúdo a confirmar (etiqueta "rascunho" aparece só no modo de desenvolvimento).
import type { IconName } from '../lib/icons'
import type { L } from '../lib/types'

export type CaseStudy = {
  slug: string
  icon: IconName
  cover?: string
  repo?: string
  org: L
  year?: string
  title: L
  summary: L
  tags: Array<string | L>
  context: L
  challenge: L
  solution: L[]
  results: L[]
  business: L
  stack: Array<string | L>
  draft?: boolean
}

export const cases: CaseStudy[] = [
  {
    slug: 'agente-avaliador-de-codigo',
    icon: 'bot',
    repo: 'https://github.com/Flowzinnn/prova_criacaoAgente',
    org: { pt: 'Projeto acadêmico · IFMS', en: 'Academic project · IFMS' },
    year: '2026',
    title: { pt: 'Agente de IA que corrige código sozinho', en: 'An AI agent that grades code on its own' },
    summary: {
      pt: 'Um agente que lê exercícios de programação, avalia cada um contra uma rubrica, dá nota e feedback por critério e registra tudo em planilha — sem nunca executar o código recebido.',
      en: 'An agent that reads programming exercises, grades each one against a rubric, gives per-criterion feedback and logs everything to a spreadsheet — without ever running the submitted code.',
    },
    tags: [{ pt: 'Agente de IA', en: 'AI agent' }, 'LangChain', 'Python'],
    context: {
      pt: 'Corrigir dezenas de exercícios à mão é lento e cansativo, e a nota pode variar conforme o dia de quem corrige.',
      en: 'Grading dozens of exercises by hand is slow and tiring, and the grade can vary depending on the grader’s day.',
    },
    challenge: {
      pt: 'Fazer a IA seguir a rubrica à risca, nunca passar da nota máxima de cada critério, não registrar a mesma avaliação duas vezes e — por segurança — jamais executar código de terceiros.',
      en: 'Make the AI follow the rubric strictly, never exceed each criterion’s maximum, never log the same evaluation twice and — for security — never execute third-party code.',
    },
    solution: [
      {
        pt: 'Agente com LangChain que decide sozinho qual ferramenta usar: listar entregas, ler o enunciado, ler a solução e registrar a avaliação',
        en: 'A LangChain agent that decides which tool to use: list submissions, read the assignment, read the solution and log the evaluation',
      },
      {
        pt: 'Análise apenas estática: o código é lido e avaliado, nunca executado',
        en: 'Static analysis only: code is read and assessed, never executed',
      },
      {
        pt: 'Memória de conversa com LangGraph para responder perguntas sobre avaliações já feitas sem refazer nada',
        en: 'Conversation memory with LangGraph to answer questions about past evaluations without redoing them',
      },
      {
        pt: 'Limite de requisições e novas tentativas automáticas para controlar custo e instabilidade da API',
        en: 'Rate limiting and automatic retries to keep API cost and instability under control',
      },
    ],
    results: [
      { pt: 'Nota e feedback padronizados por critério da rubrica', en: 'Consistent grades and feedback for every rubric criterion' },
      { pt: 'Registro automático em CSV, pronto para planilha', en: 'Automatic CSV log, ready for a spreadsheet' },
      { pt: 'Nenhum código de terceiros executado', en: 'No third-party code ever executed' },
    ],
    business: {
      pt: 'A mesma arquitetura confere contratos, pedidos, notas fiscais ou laudos contra um checklist da sua empresa — e entrega um parecer padronizado em segundos.',
      en: 'The same architecture can check contracts, orders, invoices or reports against your company’s checklist — and deliver a standardized review in seconds.',
    },
    stack: ['Python', 'LangChain', 'LangGraph', 'Google Gemini', 'Pydantic'],
  },
  {
    slug: 'estimador-de-salario-ml',
    icon: 'results',
    repo: 'https://github.com/Flowzinnn/JSP_MachineLearning_Project',
    org: { pt: 'Projeto em equipe · IFMS', en: 'Team project · IFMS' },
    year: '2026',
    title: { pt: 'Estimador de salário com Machine Learning', en: 'Salary estimator with Machine Learning' },
    summary: {
      pt: 'Sistema que estima o salário de um profissional de tecnologia a partir do perfil — com modelo treinado em dados reais, API e interface web.',
      en: 'A system that estimates a tech professional’s salary from their profile — with a model trained on real data, an API and a web interface.',
    },
    tags: ['Machine Learning', 'FastAPI', 'scikit-learn'],
    context: {
      pt: 'Projeto da disciplina de Machine Learning Aplicado do curso de Análise e Desenvolvimento de Sistemas, feito em equipe de quatro pessoas.',
      en: 'A project for the Applied Machine Learning course in the Systems Analysis and Development degree, built by a team of four.',
    },
    challenge: {
      pt: 'Levar um modelo do notebook para produção: dados reais e bagunçados, várias características do perfil (cargo, experiência, formação, localização…) e uma resposta que qualquer pessoa entenda.',
      en: 'Take a model from notebook to production: real, messy data, many profile features (role, experience, education, location…) and an answer anyone can understand.',
    },
    solution: [
      {
        pt: 'Análise exploratória, treino e validação cruzada de um modelo de regressão com scikit-learn',
        en: 'Exploratory analysis, training and cross-validation of a regression model with scikit-learn',
      },
      {
        pt: 'API em FastAPI com documentação interativa servindo o modelo treinado',
        en: 'A FastAPI service with interactive docs serving the trained model',
      },
      {
        pt: 'Interface web simples que consome a API e mostra a estimativa',
        en: 'A simple web interface that calls the API and shows the estimate',
      },
      {
        pt: 'Testes automatizados da API com pytest',
        en: 'Automated API tests with pytest',
      },
    ],
    results: [
      { pt: 'Fluxo completo: interface → API → modelo → resposta', en: 'End-to-end flow: interface → API → model → answer' },
      { pt: 'Modelo re-treinável com um único comando', en: 'Model retrainable with a single command' },
      { pt: 'API testada e documentada', en: 'Tested, documented API' },
    ],
    business: {
      pt: 'Com os dados que você já tem, dá para prever preço, demanda, prazo de entrega ou risco de inadimplência — e decidir com números, não com achismo.',
      en: 'With the data you already have, you can predict price, demand, delivery time or default risk — and decide with numbers, not guesses.',
    },
    stack: ['Python', 'scikit-learn', 'pandas', 'FastAPI', 'pytest'],
  },
  {
    slug: 'weatherapp-flask',
    icon: 'weather',
    repo: 'https://github.com/Flowzinnn/WeatherAppAPIFlask',
    org: { pt: 'Projeto pessoal', en: 'Personal project' },
    year: '2026',
    title: { pt: 'WeatherApp: clima e hora local em tempo real', en: 'WeatherApp: real-time weather and local time' },
    summary: {
      pt: 'Aplicação web em Flask que consulta o clima de qualquer cidade do mundo, descobre o fuso horário sozinha e muda o visual conforme o tempo lá fora.',
      en: 'A Flask web app that checks the weather for any city in the world, detects the time zone on its own and changes its look to match the conditions outside.',
    },
    tags: ['Flask', 'API', { pt: 'Monitoramento do clima', en: 'Weather monitoring' }],
    context: {
      pt: 'Projeto para praticar integração com APIs externas: transformar dados meteorológicos brutos em uma tela clara e agradável.',
      en: 'A project to practice integrating external APIs: turning raw weather data into a clear, pleasant screen.',
    },
    challenge: {
      pt: 'Mostrar o horário certo de qualquer cidade (cada uma com seu fuso) e apresentar os dados de forma bonita e responsiva, do celular ao desktop.',
      en: 'Show the correct time for any city (each with its own time zone) and present the data beautifully and responsively, from phone to desktop.',
    },
    solution: [
      {
        pt: 'Back-end em Python com Flask consumindo a API da OpenWeatherMap em tempo real',
        en: 'A Python/Flask back end calling the OpenWeatherMap API in real time',
      },
      {
        pt: 'Detecção automática de fuso horário pelas coordenadas da cidade (TimezoneFinder + PyTZ)',
        en: 'Automatic time zone detection from the city’s coordinates (TimezoneFinder + PyTZ)',
      },
      {
        pt: 'Interface em vidro (glassmorphism) com vídeo de fundo que muda conforme o clima',
        en: 'A glassmorphism interface with a background video that changes with the weather',
      },
    ],
    results: [
      { pt: 'Consulta de qualquer cidade do mundo', en: 'Lookup for any city in the world' },
      { pt: 'Hora local correta, sem configuração manual', en: 'Correct local time, no manual setup' },
      { pt: 'Interface responsiva e animada', en: 'Responsive, animated interface' },
    ],
    business: {
      pt: 'Integrar dados externos ao seu sistema — clima para logística e agro, cotações, rastreio de entregas — e transformar tudo em um painel que a equipe entende de primeira.',
      en: 'Bring external data into your systems — weather for logistics and agriculture, exchange rates, delivery tracking — and turn it into a dashboard your team gets at a glance.',
    },
    stack: ['Python', 'Flask', 'OpenWeatherMap API', 'TimezoneFinder', 'HTML/CSS/JS'],
  },
]
