# Deploy: site no Netlify + API no Render + banco no Neon

```
Visitante → seusite.netlify.app ──(/api/*)──→ wolf-solutions-api.onrender.com ──→ Postgres (Neon)
```

- **Netlify** entrega o site (React).
- **Render** roda a API em Python (plano grátis, pelo `Dockerfile`).
- **Neon** guarda os diagnósticos e contatos num Postgres grátis que não se apaga.

O Netlify repassa tudo que começa com `/api` para o Render. Por isso o site não precisa saber
onde a API está e não há configuração de CORS.

## 1. Banco de dados no Neon

1. Crie uma conta em https://neon.com e um projeto (região **AWS US East (N. Virginia)**, perto do Render).
2. Em **Connect**, copie a *connection string*. Ela começa com `postgresql://` e termina com `?sslmode=require`.

## 2. API no Render

1. Crie uma conta em https://render.com entrando com o GitHub.
2. **New → Blueprint** → escolha o repositório `portfolio`. O Render lê o `render.yaml` e cria o serviço `wolf-solutions-api`.
3. Ele vai pedir as variáveis:
   - `DATABASE_URL`: a connection string do Neon.
   - `ADMIN_PASSWORD`: a senha do painel `/admin` (use uma senha longa).
   - `LEAD_WEBHOOK_URL`: opcional, pode deixar vazio.
4. Espere o deploy terminar e abra `https://<nome-do-serviço>.onrender.com/api/health`. Deve aparecer `{"ok":true}`.
   Anote esse endereço (sem o `/api/health`).

> Sem `DATABASE_URL` a API se recusa a subir no Render, de propósito: lá o disco é apagado a cada
> reinício e os contatos se perderiam.

## 3. Site no Netlify

1. **Site configuration → Environment variables → Add a variable**:
   - `API_URL` = endereço do passo 2, ex.: `https://wolf-solutions-api.onrender.com`
2. **Deploys → Trigger deploy → Deploy site**.

O build (`netlify.toml`) gera o arquivo `_redirects` com esse endereço. Se `API_URL` não estiver
definida, o build falha com uma mensagem explicando, e o Netlify mantém no ar a versão anterior.

## 4. Conferir

- Envie o formulário de contato no site → deve aparecer "Mensagem enviada!".
- Abra `/admin` no site do Netlify e entre com a `ADMIN_PASSWORD` → o contato está lá.

## Bom saber

- **API dormindo:** no plano grátis o Render desliga a API após 15 min sem acesso, e ela leva
  cerca de 1 minuto para voltar. O site "acorda" a API assim que a página abre, então quando a
  pessoa termina o diagnóstico ela já está de pé. Para eliminar isso: plano pago do Render.
- **Backup:** o Neon guarda o histórico do banco; no painel `/admin` dá para exportar tudo para CSV.
- **Rodar no seu PC continua igual:** sem `DATABASE_URL`, a API usa o SQLite em `data/`.
