# Guia de instalação e operação

Guia prático para editar o conteúdo, rodar localmente, colocar o site no ar 24h e cuidar dos dados.

> **Atenção:** o repositório é público, então este arquivo também é. Nunca escreva aqui senhas, tokens ou chaves —
> eles ficam só no arquivo `.env` do servidor, que não vai para o GitHub.

## Como funciona

```
Visitante ──► túnel Cloudflare (HTTPS) ──► contêiner "wolf-solutions" (porta 8080)
                                              ├─ entrega o site (pasta dist/)
                                              ├─ /api/quiz      salva cada diagnóstico (anônimo)
                                              ├─ /api/contact   salva cada contato (lead)
                                              └─ /api/admin/*   painel /admin, protegido por senha
                                                     │
                                                     └─ banco SQLite no volume "dados"
```

## Rodar no computador

Precisa de Node 24 e Python 3.12.

```bash
npm install
python -m venv .venv
.venv/Scripts/pip install -r backend/requirements-dev.txt    # Linux/Mac: .venv/bin/pip
```

Em dois terminais:

```bash
# 1) servidor (API + banco). Senha do painel só para testes locais:
ADMIN_PASSWORD=teste .venv/Scripts/python -m uvicorn backend.app.main:create_app --factory --reload --port 8000

# 2) site com recarregamento automático
npm run dev
```

Abra http://localhost:5173 — o painel fica em http://localhost:5173/admin.
Textos marcados como **rascunho** (etiqueta amarela) só aparecem aqui, nunca no site publicado.

Testes da API: `.venv/Scripts/python -m pytest backend/tests`

> **Windows:** se a pasta do projeto tiver um caminho muito longo, o Python pode dar erro de "nome do arquivo muito grande". Crie o `.venv` num caminho curto (ex.: `C:\venvs\wolf`).

## Onde mudar cada coisa

| Quero mudar…                                   | Arquivo                               |
| ---------------------------------------------- | ------------------------------------- |
| Nome da marca e slogan                         | `src/config/brand.ts`                 |
| E-mail, LinkedIn, WhatsApp                     | `src/config/site.ts`                  |
| Textos fixos (títulos, botões, menus)          | `src/i18n/pt.ts` e `src/i18n/en.ts`   |
| Soluções oferecidas                            | `src/data/services.ts`                |
| **Ramos** (clínicas, comércio… e suas páginas) | `src/data/segments.ts`                |
| Perguntas e regras do diagnóstico              | `src/data/quiz.ts`                    |
| Perguntas frequentes                           | `src/data/faq.ts`                     |
| Ferramentas por camada                         | `src/data/tools.ts`                   |
| Foto, “sobre mim”, trajetória                  | `src/data/profile.ts`                 |
| Cores dos temas claro e escuro                 | topo de `src/index.css`               |
| Logotipo                                       | `src/components/Logo.tsx` e `public/` |
| Ordem das seções da página inicial             | `src/pages/Home.tsx`                  |

**Foto:** salve em `public/images/` (quadrada, 800×800 ou maior) e preencha `photo: 'images/nome.webp'` em `profile.ts`.

**Novo ramo:** copie um bloco em `segments.ts`. Ele ganha página própria em `/ia-para/<slug>` e entra sozinho no diagnóstico.

**Artigo no blog:** crie `src/content/blog/pt/<nome>.md` (e a versão em inglês com o mesmo nome em `en/`):

```md
---
title: Título do artigo
description: Uma frase que resume o artigo.
date: 2026-12-01
tags: IA, Negócios
---

Texto em Markdown…
```

## Colocar no ar 24h (servidor Linux, ex.: VM no Proxmox)

1. Crie uma **VM com Debian 12 ou Ubuntu 24.04** (2 GB de RAM e 10 GB de disco sobram).
   Se preferir um contêiner LXC, ative *Options → Features → nesting* para o Docker funcionar.
2. Instale o Docker: `curl -fsSL https://get.docker.com | sh`
3. Baixe o projeto e configure:
   ```bash
   git clone https://github.com/Flowzinnn/portfolio.git wolf-solutions
   cd wolf-solutions
   cp .env.example .env
   nano .env        # defina ADMIN_PASSWORD
   docker compose up -d --build
   ```
4. Teste na rede local: `http://IP-DA-VM:8080`. O contêiner volta sozinho se a máquina reiniciar.

**Atualizar depois de mudanças:** `git pull && docker compose up -d --build`

## Publicar na internet sem IP público

Os dois jeitos abaixo funcionam **sem IP público, sem abrir porta no roteador e até atrás de CGNAT**: a própria máquina abre uma conexão de saída.

### Opção A — Cloudflare Tunnel (recomendado, com domínio próprio)

1. Registre um domínio (ex.: no registro.br) e adicione-o a uma conta grátis da Cloudflare (ela indica os DNS para trocar no registro.br).
2. Na Cloudflare: **Zero Trust → Networks → Tunnels → Create a tunnel** (tipo *Cloudflared*). Copie o token.
3. Em *Public hostname*, aponte seu domínio para o serviço `http://app:8080`.
4. Cole o token em `CLOUDFLARE_TUNNEL_TOKEN` no `.env` e rode:
   ```bash
   docker compose --profile tunnel up -d --build
   ```

### Opção B — Tailscale Funnel (grátis, sem domínio)

Instale o Tailscale na VM, ative o Funnel no painel do Tailscale e rode `tailscale funnel 8080`. O site fica num endereço `https://<maquina>.<rede>.ts.net`.

## Painel de leads

Acesse `/admin` e entre com o `ADMIN_PASSWORD`. Você vê os números, cada contato (com status *novo / em contato / fechado / descartado*), cada diagnóstico e exporta tudo para Excel (CSV).

**Aviso de novo lead no celular:** crie um fluxo no n8n com um gatilho *Webhook* e coloque a URL em `LEAD_WEBHOOK_URL` no `.env`. A cada contato o servidor chama esse webhook — dali você manda para WhatsApp, Telegram ou e-mail.

## Backup do banco

```bash
docker compose exec app python -m backend.app.backup     # guarda os 14 mais recentes em /data/backups
docker compose cp app:/data/backups ./backups            # copia para fora do contêiner
```

Para automatizar, agende no `crontab -e` da VM (troque o caminho pela pasta do projeto):
`0 3 * * * cd /caminho/wolf-solutions && docker compose exec -T app python -m backend.app.backup`

## Privacidade (LGPD)

- O diagnóstico é salvo **sem nome, contato ou IP**.
- Nome e contato só são gravados quando a pessoa preenche o formulário e marca a autorização.
- Para apagar os dados de alguém a pedido, remova o registro no banco (`/data/portfolio.db`).
