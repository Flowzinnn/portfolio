# Portfólio — Nicolas Wolf

Site pessoal com foco em **soluções de IA para empresas**: visual de vidro (glassmorphism) claro e escuro, animações suaves, português e inglês, diagnóstico interativo para empresários, cases e blog.

**No ar em:** https://flowzinnn.github.io/portfolio/

Feito com React 19, Vite, TypeScript, Tailwind CSS 4, Motion e Lenis.

## Rodar no computador

```bash
npm install
npm run dev
```

Abra http://localhost:5173/portfolio/ — cada arquivo salvo atualiza a página na hora.
Textos marcados como **rascunho** (etiqueta amarela) só aparecem aqui, nunca no site publicado.

## Onde mudar cada coisa

| Quero mudar…                               | Arquivo                                   |
| ------------------------------------------ | ----------------------------------------- |
| Textos fixos (títulos, botões, menus)      | `src/i18n/pt.ts` e `src/i18n/en.ts`       |
| Foto, cargo, “sobre mim”, trajetória       | `src/data/profile.ts`                     |
| Soluções oferecidas                        | `src/data/services.ts`                    |
| **Ferramentas e tecnologias**              | `src/data/tools.ts`                       |
| Cases (projetos)                           | `src/data/cases.ts`                       |
| Perguntas e respostas do diagnóstico       | `src/data/quiz.ts`                        |
| LinkedIn, e-mail, WhatsApp, formulário     | `src/config/site.ts`                      |
| Cores dos temas claro e escuro             | topo de `src/index.css`                   |
| Ordem das seções da página inicial         | `src/pages/Home.tsx`                      |

### Adicionar uma ferramenta nova

Em `src/data/tools.ts`, inclua o nome na lista do grupo certo:

```ts
tools: ['ChatGPT / OpenAI', 'Claude', 'n8n', 'Nova ferramenta'],
```

Se o nome muda conforme o idioma: `{ pt: 'Planilhas', en: 'Spreadsheets' }`.

### Adicionar um case

Copie um bloco em `src/data/cases.ts`, troque o `slug` (vira o endereço `/cases/<slug>`) e os textos.
Para usar um print de verdade, salve a imagem em `public/images/` (1600×900 ou maior, de preferência `.webp`) e preencha `cover: 'images/nome.webp'`.

### Escrever um artigo no blog

Crie `src/content/blog/pt/<nome-do-artigo>.md` (e, se quiser, a versão em inglês com o **mesmo nome** em `src/content/blog/en/`):

```md
---
title: Título do artigo
description: Uma frase que resume o artigo.
date: 2026-12-01
tags: IA, Negócios
---

Texto em Markdown…
```

### Formulário de contato

Crie uma chave grátis em https://web3forms.com (ela chega no seu e-mail) e cole em `web3formsKey` no `src/config/site.ts`. As mensagens do site passam a chegar no seu e-mail.

## Publicar

O GitHub publica sozinho a cada `git push` na branch `main` (arquivo `.github/workflows/deploy.yml`).
Uma única vez, no repositório: **Settings → Pages → Source: GitHub Actions**.

Domínio próprio (opcional): configure em Settings → Pages → Custom domain e troque `base` para `'/'` em `vite.config.ts`.
