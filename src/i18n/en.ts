// Textos fixos do site em INGLÊS. Precisa ter exatamente a mesma estrutura de pt.ts.
import type { Copy } from './pt'

export const en: Copy = {
  meta: {
    title: 'Nicolas Wolf — AI solutions with security, quality and real savings',
    blog: 'Blog — Nicolas Wolf',
    notFound: 'Page not found — Nicolas Wolf',
  },
  skip: 'Skip to content',
  nav: {
    solutions: 'Solutions',
    quiz: 'Assessment',
    cases: 'Cases',
    about: 'About',
    blog: 'Blog',
    cta: 'Get in touch',
    open: 'Open menu',
    close: 'Close menu',
    home: 'Nicolas Wolf — home',
    main: 'Main navigation',
  },
  theme: { toLight: 'Switch to light theme', toDark: 'Switch to dark theme' },
  lang: { label: 'Language' },
  common: { seeCase: 'View case', draft: 'draft', minRead: 'min read' },
  social: { linkedin: 'LinkedIn', github: 'GitHub', whatsapp: 'WhatsApp', email: 'Email' },

  hero: {
    badge: 'Available for new projects',
    titleA: 'AI that delivers.',
    titleB: 'Without complicating',
    titleC: 'your business.',
    subtitle:
      "I'm Nicolas Wolf. I build custom AI agents and automations for businesses, backed by over 3 years of hands-on work with infrastructure, networks and servers. Solutions that are secure, well tested and pay for themselves.",
    ctaPrimary: 'Take the free assessment',
    ctaHint: '2 min',
    ctaSecondary: 'See cases',
    pillars: [
      { icon: 'shield', title: 'Security', text: 'Your data under control' },
      { icon: 'quality', title: 'Quality', text: 'Tested before going live' },
      { icon: 'economy', title: 'Savings', text: 'Returns before scaling' },
    ],
    visual: {
      assistant: 'Assistant · Your company',
      online: 'online now',
      tag: 'AI',
      messages: [
        { from: 'client', text: 'Hi! Are you open on Saturday?' },
        { from: 'ai', text: 'Hi, Ana! Yes, from 8am to noon. Want me to book a time for you?' },
        { from: 'client', text: 'Yes please! Does 10am work?' },
        { from: 'ai', text: "Done: Saturday at 10am is booked. I'll send you a reminder on Friday." },
      ],
      human: 'Hands over to a human whenever needed',
      secureTitle: 'Data protected',
      secureText: 'Restricted access · LGPD',
      flowTitle: 'Automation running',
      flow: ['Order', 'Sheet', 'Invoice', 'Email'],
    },
  },

  solutions: {
    eyebrow: 'What I deliver',
    title: "AI solutions that work for you — and don't become another problem.",
    subtitle:
      'No technology for its own sake. Every solution starts with a simple question: does it save time, reduce risk or bring in customers?',
  },

  method: {
    eyebrow: 'How I work',
    title: 'Calm, method and visible results.',
    subtitle: "You know what will happen, what you'll invest and what you'll gain — before we start.",
    pillars: [
      {
        icon: 'shield',
        title: 'Security',
        text: 'Sensitive data stays under control: restricted access, a log of what the AI does and privacy law (LGPD) considered from day one.',
      },
      {
        icon: 'quality',
        title: 'Quality',
        text: 'Nothing reaches your customers untested. The AI is validated against real situations from your business, with a human as a safety net.',
      },
      {
        icon: 'economy',
        title: 'Savings',
        text: "I start with what pays off fastest — no bloated contracts, no tools you won't use. You see results before investing more.",
      },
    ],
    steps: [
      { title: 'Assessment', text: 'A focused conversation to understand your routine, pain points and what is really worth automating.' },
      { title: 'Prototype', text: 'A working first version, fast, so you can test it with real cases.' },
      { title: 'Secure rollout', text: 'Integration with your systems, access configured and your team onboarded.' },
      { title: 'Follow-up', text: 'Measuring results, fine-tuning and evolving as your business grows.' },
    ],
  },

  quiz: {
    eyebrow: 'Free assessment',
    title: 'Find out in 2 minutes where AI pays off in your business.',
    subtitle: 'Six quick questions. At the end you get a clear starting point — no sign-up, no commitment.',
    bullets: ['The solution that best fits your industry', 'A practical first step', 'How your data stays secure'],
    progress: (n: number, total: number) => `Question ${n} of ${total}`,
    back: 'Back',
    resultEyebrow: 'Your starting point',
    potential: 'Potential gain',
    levels: { high: 'High', medium: 'Medium', starter: 'Good start' },
    whyTitle: 'Why this solution',
    firstStepTitle: 'First step',
    careTitle: (pillar: string) => `How I handle ${pillar.toLowerCase()}`,
    cta: "Let's talk about it",
    restart: 'Start over',
    privacy: 'Your answers stay in your browser until you decide to contact me.',
  },

  cases: {
    eyebrow: 'Cases',
    title: 'Real problem, solution that works.',
    subtitle: 'Real projects with AI agents, Machine Learning and APIs — with open source code on GitHub.',
    nextTitle: 'The next case could be yours.',
    nextText: 'Take the free assessment and find out where to start in your business.',
    nextCta: 'Start assessment',
    back: 'All cases',
    context: 'Context',
    challenge: 'Challenge',
    solution: 'What was done',
    results: 'Results',
    stack: 'Technologies',
    business: 'What about your business?',
    repo: 'View code on GitHub',
    next: 'Next case',
    ctaTitle: 'Want results like this in your business?',
    ctaText: "Tell me about your situation. In a quick call I'll show you the way — with clarity on timeline, cost and return.",
    ctaButton: 'Talk to Nicolas',
  },

  about: {
    eyebrow: 'Who is behind it',
    title: "Hi, I'm Nicolas Wolf.",
    traitsTitle: 'What working with me is like',
    timelineTitle: 'Journey',
  },

  tools: {
    eyebrow: 'How the solutions are built',
    title: 'The right tool for every layer.',
    subtitle:
      "You don't need to memorize any of these names. What matters is what each layer does for your business — and I pick tools by the problem, not by hype.",
  },

  blog: {
    eyebrow: 'Blog',
    title: 'Practical ideas on AI and technology for business.',
    subtitle: 'No hype: what works, what it costs and where to be careful.',
    all: 'See all articles',
    back: 'All articles',
    empty: 'New articles coming soon.',
    fallback: "This article isn't available in English yet.",
    ctaTitle: 'Want to apply this to your business?',
    ctaText: 'Take the free assessment and get a starting point in 2 minutes.',
    ctaButton: 'Take the assessment',
  },

  contact: {
    eyebrow: 'Contact',
    title: "Let's talk about your business?",
    subtitle: "Tell me what's eating up your time. I'll answer clearly: what can be done, what it costs and what you gain.",
    promises: ['A first conversation at no cost, no strings attached', 'A clear proposal, no fine print', 'Your data handled confidentially'],
    channels: 'Or reach me directly',
    form: {
      name: 'Your name',
      email: 'Your email',
      company: 'Company (optional)',
      message: 'How can I help?',
      placeholder: 'E.g.: we spend too much time answering customers on WhatsApp…',
      submit: 'Send message',
      submitLinkedin: 'Copy and send via LinkedIn',
      sending: 'Sending…',
      error: "I couldn't send it right now. Please try again or use one of the other channels.",
      notConfigured:
        'Only you see this note: without web3formsKey in src/config/site.ts, the form does not reach your email (for now it sends via LinkedIn).',
      privacy: 'Your data is only used to reply to you.',
      subject: (name: string) => `New portfolio contact — ${name}`,
    },
    success: {
      title: 'Message sent!',
      text: "Thanks for reaching out. I'll read it carefully and get back to you soon.",
      again: 'Send another message',
    },
    copied: {
      title: 'Message copied!',
      text: 'I opened my LinkedIn in a new tab. Just click “Message”, paste (Ctrl+V) and send.',
      open: 'Open LinkedIn again',
    },
  },

  footer: {
    rights: 'All rights reserved.',
    built: 'Built with React, Vite and Motion.',
    source: 'Source on GitHub',
    top: 'Top',
  },

  notFound: {
    title: 'Page not found',
    text: 'The address may have changed or no longer exists.',
    cta: 'Back to home',
  },
}
