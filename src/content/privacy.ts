// Política de privacidade (LGPD — Lei 13.709/2018). Página /privacidade.
// Ao mudar algo aqui, atualize também `updated`.
import { site } from '../config/site'
import type { Lang } from '../lib/types'

/** paragraphs vêm antes da lista; note, depois. */
export type PrivacySection = { title: string; paragraphs?: string[]; items?: string[]; note?: string }
export type PrivacyPolicy = { title: string; updated: string; intro: string; sections: PrivacySection[] }

export const PRIVACY_UPDATED = '2026-11-26'

export const privacy: Record<Lang, PrivacyPolicy> = {
  pt: {
    title: 'Política de privacidade',
    updated: 'Atualizada em',
    intro:
      'Esta política explica, de forma direta, quais dados a Wolf Solutions coleta neste site, para que usa, com quem compartilha e como você exerce os seus direitos previstos na Lei Geral de Proteção de Dados (LGPD — Lei 13.709/2018).',
    sections: [
      {
        title: '1. Quem é o responsável pelos seus dados',
        paragraphs: [
          `O controlador dos dados é a Wolf Solutions, conduzida por Nicolas Wolf. Para qualquer assunto sobre privacidade, inclusive para exercer os seus direitos, escreva para ${site.email}.`,
        ],
      },
      {
        title: '2. Quais dados coletamos',
        items: [
          'Diagnóstico de IA: as respostas que você marca (ramo, porte, onde a equipe perde tempo etc.), o resultado sugerido, o idioma e a data. Essas respostas não pedem nem guardam o seu nome ou contato.',
          'Formulário de contato e "Quero ser contatado": nome, e-mail e/ou WhatsApp, empresa (opcional) e a mensagem. Quando o contato vem do diagnóstico, ele fica ligado às respostas desse diagnóstico.',
          'Dados técnicos: o seu endereço IP é usado por alguns minutos, apenas na memória do servidor, para limitar envios repetidos e tentativas de abuso. Ele não é gravado no nosso banco de dados. Os provedores de hospedagem podem manter registros técnicos de acesso (como IP, data e página) por um período limitado, por segurança.',
          'Preferências do site: o tema (claro/escuro) e o idioma escolhidos ficam salvos apenas no seu navegador e não são enviados para nós.',
        ],
        note: 'Não usamos cookies de publicidade, ferramentas de rastreamento ou estatísticas de terceiros.',
      },
      {
        title: '3. Para que usamos',
        items: [
          'Responder ao seu contato e preparar a proposta que você pediu.',
          'Enviar um e-mail confirmando que recebemos o seu contato.',
          'Entender, de forma agregada e sem identificar ninguém, quais ramos e necessidades aparecem mais no diagnóstico, para melhorar os nossos serviços.',
          'Manter o site seguro e funcionando.',
        ],
        note: 'Não vendemos os seus dados e não os usamos para enviar propagandas ou newsletters sem o seu pedido.',
      },
      {
        title: '4. Bases legais',
        items: [
          'Consentimento (art. 7º, I): quando você marca a autorização de contato nos formulários.',
          'Procedimentos preliminares a um contrato, a seu pedido (art. 7º, V): para analisar a sua necessidade e montar uma proposta.',
          'Legítimo interesse (art. 7º, IX): para a segurança do site e as estatísticas sem identificação do diagnóstico.',
        ],
      },
      {
        title: '5. Com quem compartilhamos',
        paragraphs: [
          'Usamos fornecedores que tratam os dados apenas para nos prestar o serviço (operadores):',
        ],
        items: [
          'Netlify — hospedagem do site.',
          'Render — servidor que recebe os formulários.',
          'Neon — banco de dados onde os contatos e diagnósticos ficam guardados.',
          'Google (Gmail) — envio e recebimento de e-mails.',
          'Telegram — avisos internos de novo contato e cópias de segurança dos dados, acessíveis só à nossa equipe.',
        ],
      },
      {
        title: '6. Transferência para fora do Brasil',
        paragraphs: [
          'Alguns desses fornecedores guardam dados em servidores fora do Brasil, principalmente nos Estados Unidos. A transferência acontece para atender ao seu pedido de contato e com empresas que adotam medidas de segurança e proteção de dados compatíveis com a LGPD.',
        ],
      },
      {
        title: '7. Por quanto tempo guardamos',
        items: [
          'Dados de contato: enquanto houver conversa ou relação comercial e por até 24 meses após o último contato, salvo se a lei exigir prazo maior. Você pode pedir a exclusão antes disso.',
          'Respostas do diagnóstico sem contato: podem ser mantidas por tempo indeterminado, pois não identificam você.',
        ],
      },
      {
        title: '8. Como protegemos',
        paragraphs: [
          'O site e o envio dos formulários usam conexão criptografada (HTTPS). O acesso aos contatos é restrito e protegido por senha, e só a nossa equipe consegue consultá-los.',
        ],
      },
      {
        title: '9. Os seus direitos',
        paragraphs: ['Pela LGPD (art. 18), você pode, a qualquer momento:'],
        items: [
          'confirmar se tratamos dados seus e acessá-los;',
          'corrigir dados incompletos, inexatos ou desatualizados;',
          'pedir a anonimização, o bloqueio ou a eliminação de dados desnecessários ou tratados em desconformidade;',
          'pedir a portabilidade dos seus dados;',
          'saber com quem os compartilhamos;',
          'revogar o consentimento e pedir a eliminação dos dados tratados com base nele.',
        ],
      },
      {
        title: '10. Como fazer um pedido',
        paragraphs: [
          `Envie um e-mail para ${site.email} dizendo o que deseja. Respondemos em até 15 dias. Se não ficar satisfeito, você também pode procurar a Autoridade Nacional de Proteção de Dados (ANPD).`,
        ],
      },
      {
        title: '11. Mudanças nesta política',
        paragraphs: [
          'Podemos atualizar esta política quando o site ou os nossos serviços mudarem. A data da última atualização fica sempre no topo desta página.',
        ],
      },
    ],
  },
  en: {
    title: 'Privacy policy',
    updated: 'Last updated',
    intro:
      "This policy explains, in plain terms, what data Wolf Solutions collects on this website, why, who we share it with and how you can exercise your rights under Brazil's General Data Protection Law (LGPD — Law 13,709/2018).",
    sections: [
      {
        title: '1. Who is responsible for your data',
        paragraphs: [
          `The data controller is Wolf Solutions, run by Nicolas Wolf. For any privacy matter, including exercising your rights, write to ${site.email}.`,
        ],
      },
      {
        title: '2. What we collect',
        items: [
          'AI assessment: the answers you choose (industry, company size, where your team loses time etc.), the suggested result, the language and the date. These answers do not ask for or store your name or contact details.',
          'Contact form and "Contact me": name, email and/or WhatsApp, company (optional) and your message. When the contact comes from the assessment, it is linked to that assessment\'s answers.',
          'Technical data: your IP address is used for a few minutes, only in the server\'s memory, to limit repeated submissions and abuse. It is not saved in our database. Hosting providers may keep technical access logs (such as IP, date and page) for a limited time, for security.',
          'Site preferences: your chosen theme (light/dark) and language are saved only in your browser and are never sent to us.',
        ],
        note: 'We do not use advertising cookies, tracking tools or third-party analytics.',
      },
      {
        title: '3. How we use it',
        items: [
          'To reply to you and prepare the proposal you asked for.',
          'To send an email confirming we received your message.',
          'To understand, in aggregate and without identifying anyone, which industries and needs show up most in the assessment, to improve our services.',
          'To keep the website secure and running.',
        ],
        note: 'We do not sell your data or use it to send ads or newsletters you did not ask for.',
      },
      {
        title: '4. Legal bases',
        items: [
          'Consent (art. 7, I): when you tick the contact authorization in our forms.',
          'Pre-contractual steps at your request (art. 7, V): to understand your needs and prepare a proposal.',
          'Legitimate interest (art. 7, IX): for website security and anonymous assessment statistics.',
        ],
      },
      {
        title: '5. Who we share it with',
        paragraphs: ['We rely on providers that process data only to deliver their service to us (processors):'],
        items: [
          'Netlify — website hosting.',
          'Render — server that receives the forms.',
          'Neon — database where contacts and assessments are stored.',
          'Google (Gmail) — sending and receiving email.',
          'Telegram — internal new-contact alerts and data backups, accessible only to our team.',
        ],
      },
      {
        title: '6. Transfers outside Brazil',
        paragraphs: [
          'Some of these providers store data on servers outside Brazil, mainly in the United States. The transfer happens to fulfil your contact request and only with companies that apply security and data protection measures compatible with the LGPD.',
        ],
      },
      {
        title: '7. How long we keep it',
        items: [
          'Contact data: while we are in conversation or doing business and for up to 24 months after the last contact, unless the law requires longer. You can ask us to delete it sooner.',
          'Assessment answers without contact details: may be kept indefinitely, since they do not identify you.',
        ],
      },
      {
        title: '8. How we protect it',
        paragraphs: [
          'The website and form submissions use encrypted connections (HTTPS). Access to contacts is restricted and password-protected, and only our team can view them.',
        ],
      },
      {
        title: '9. Your rights',
        paragraphs: ['Under the LGPD (art. 18), you may at any time:'],
        items: [
          'confirm whether we process your data and access it;',
          'correct incomplete, inaccurate or outdated data;',
          'request anonymization, blocking or deletion of unnecessary data or data processed unlawfully;',
          'request portability of your data;',
          'know who we share it with;',
          'withdraw your consent and request deletion of data processed based on it.',
        ],
      },
      {
        title: '10. How to make a request',
        paragraphs: [
          `Email ${site.email} telling us what you need. We reply within 15 days. If you are not satisfied, you may also contact Brazil's National Data Protection Authority (ANPD).`,
        ],
      },
      {
        title: '11. Changes to this policy',
        paragraphs: [
          'We may update this policy when the website or our services change. The date of the latest update is always shown at the top of this page.',
        ],
      },
    ],
  },
}
