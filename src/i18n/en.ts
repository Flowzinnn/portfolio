// Textos fixos do site em INGLÊS. Precisa ter exatamente a mesma estrutura de pt.ts.
import type { Copy } from './pt'

export const en: Copy = {
  meta: {
    title: 'Wolf Solutions — AI applied to your business',
    blog: 'Blog — Wolf Solutions',
    notFound: 'Page not found — Wolf Solutions',
    privacy: 'Privacy policy — Wolf Solutions',
    segment: (name: string) => `AI for ${name.toLowerCase()} — Wolf Solutions`,
  },
  skip: 'Skip to content',
  nav: {
    solutions: 'Solutions',
    segments: 'Industries',
    quiz: 'Assessment',
    about: 'About',
    faq: 'FAQ',
    cta: 'Contact us',
    open: 'Open menu',
    close: 'Close menu',
    home: 'Wolf Solutions — home',
    main: 'Main navigation',
  },
  theme: { toLight: 'Switch to light theme', toDark: 'Switch to dark theme' },
  lang: { label: 'Language' },
  common: { draft: 'draft', minRead: 'min read' },
  social: { linkedin: 'LinkedIn', whatsapp: 'WhatsApp', email: 'Email' },

  hero: {
    badge: 'Now booking new projects',
    titleA: 'AI that delivers.',
    titleB: 'Without complicating',
    titleC: 'your business.',
    subtitle:
      'Wolf Solutions builds custom AI agents and automations for businesses, backed by over 3 years of hands-on infrastructure and security work with networks and servers. Solutions that are secure, well tested and pay for themselves.',
    ctaPrimary: 'Take the free assessment',
    ctaHint: '3 min',
    ctaSecondary: 'Solutions by industry',
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
    eyebrow: 'What we deliver',
    title: "AI solutions that work for you — and don't become another problem.",
    subtitle:
      'No technology for its own sake. Every solution starts with a simple question: does it save time, reduce risk or bring in customers?',
  },

  segments: {
    eyebrow: 'Solutions by industry',
    title: 'Every business has its own routine. AI adapts to it.',
    subtitle: 'Concrete examples of what can be automated in your industry — and where to start.',
    cta: 'See solutions',
    other: "Don't see your industry? The assessment works for any business.",
    otherCta: 'Take the assessment',
  },

  segmentPage: {
    eyebrow: 'AI for',
    back: 'All industries',
    pains: 'What usually slows things down',
    useCases: 'What AI does for you',
    gains: 'What changes day to day',
    ctaTitle: 'Find out where to start in your business',
    ctaText: 'The free assessment starts with your industry already selected and takes about 3 minutes.',
    ctaButton: 'Take the assessment',
    others: 'Other industries',
  },

  method: {
    eyebrow: 'How we work',
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
        text: "We start with what pays off fastest — no bloated contracts, no tools you won't use. You see results before investing more.",
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
    title: 'Find out in 3 minutes where AI pays off in your business.',
    subtitle:
      'Ten quick questions. At the end you get the right solution for your industry, a first step and a report to save — no commitment.',
    bullets: ['The solution that best fits your industry', 'A practical example for your business', 'A report you can save as PDF'],
    progress: (n: number, total: number) => `Question ${n} of ${total}`,
    back: 'Back',
    next: 'Continue',
    multiHint: 'You can pick more than one',
    resultEyebrow: 'Your assessment',
    potential: 'Potential gain',
    levels: { high: 'High', medium: 'Medium', starter: 'Good start' },
    whyTitle: 'Why this solution',
    segmentTitle: (name: string) => `In practice, for ${name.toLowerCase()}`,
    firstStepTitle: 'First step',
    careTitle: (pillar: string) => `How we handle ${pillar.toLowerCase()}`,
    reportTitle: 'AI assessment',
    reportDate: 'Generated on',
    lead: {
      title: 'Want a proposal for this assessment?',
      text: "Leave your details and we'll get in touch — no commitment.",
      name: 'Your name',
      whatsapp: 'WhatsApp',
      email: 'Email',
      needContact: 'Please fill in WhatsApp or email.',
      consent: 'I allow Wolf Solutions to contact me about this assessment.',
      submit: 'Contact me',
      sending: 'Sending…',
      done: "Got it! We'll be in touch soon.",
      error: "Couldn't send right now. Please try again or use the contact form.",
    },
    save: 'Save report (PDF)',
    write: "I'd rather write a message",
    restart: 'Start over',
    privacy: "Assessment answers are stored without identifying you. Your name and contact are only sent if you fill in the form.",
  },

  about: {
    eyebrow: 'Who is behind it',
    title: "Hi, I'm Nicolas Wolf.",
    traitsTitle: 'What working with me is like',
    timelineTitle: 'Journey',
    certificationsTitle: 'Certifications',
    credential: 'View credential',
    photoAlt: 'Nicolas Wolf, founder of Wolf Solutions',
  },

  tools: {
    eyebrow: 'How the solutions are built',
    title: 'The right tool for every layer.',
    subtitle:
      "You don't need to memorize any of these names. What matters is what each layer does for your business — and we pick tools by the problem, not by hype.",
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Before we start, you might be wondering…',
    subtitle: "If your question isn't here, just reach out.",
    more: 'Talk to us',
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
    ctaText: 'Take the free assessment and get a starting point in 3 minutes.',
    ctaButton: 'Take the assessment',
  },

  contact: {
    eyebrow: 'Contact',
    title: "Let's talk about your business?",
    subtitle: "Tell us what's eating up your time. We'll answer clearly: what can be done, what it costs and what you gain.",
    promises: ['A first conversation at no cost, no strings attached', 'A clear proposal, no fine print', 'Your data handled confidentially'],
    channels: 'Or reach us directly',
    form: {
      name: 'Your name',
      email: 'Your email',
      whatsapp: 'WhatsApp',
      company: 'Company (optional)',
      message: 'How can we help?',
      placeholder: 'E.g.: we spend too much time answering customers on WhatsApp…',
      needContact: 'Please fill in email or WhatsApp so we can reply.',
      consent: 'I allow Wolf Solutions to contact me.',
      submit: 'Send message',
      sending: 'Sending…',
      error: "Couldn't send right now. Please try again or reach us through the other channels.",
      privacy: 'Your data is only used to reply to you.',
    },
    success: {
      title: 'Message sent!',
      text: "Thanks for reaching out. We'll read it carefully and get back to you soon.",
      again: 'Send another message',
    },
  },

  footer: {
    rights: 'All rights reserved.',
    top: 'Top',
    privacy: 'Privacy',
    privacyPolicy: 'Privacy policy',
  },

  notFound: {
    title: 'Page not found',
    text: 'The address may have changed or no longer exists.',
    cta: 'Back to home',
  },
}
