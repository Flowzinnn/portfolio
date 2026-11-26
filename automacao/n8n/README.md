# n8n: aviso de contatos no Telegram, e-mail de boas-vindas e monitor do site

Roda no seu PC. A cada 2 minutos o n8n pergunta à API (no Render) se chegou contato novo, te avisa
no Telegram e manda um e-mail de boas-vindas para o cliente. Também avisa se o site/API cair, quando voltar, e manda um resumo todo dia às 8h.

```
Site (Netlify) → API (Render) → banco (Neon)
                      ↑  a cada 2 min
              n8n no seu PC ──→ Telegram 📱
```

**E-mail de boas-vindas para o cliente:** sai do seu Gmail com o nome *Wolf Solutions*, para todo
contato que deixou e-mail (o site só aceita o contato com a autorização marcada). Texto diferente para
quem veio do diagnóstico e para quem usou o formulário. Respostas do cliente caem no seu Gmail. Se o
PC ficou desligado mais de 48 h, o e-mail não é mandado (um "recebemos" dias depois soa estranho) e o
Telegram te avisa para responder você mesmo. Para desligar: `enviarBoasVindas` = false no nó
**Configuração**.

Por que o n8n *pergunta* em vez de a API *avisar*: assim o seu PC não fica exposto na internet e
você não precisa de domínio. De quebra, as consultas a cada 2 minutos mantêm a API do Render
acordada, e o site nunca demora a responder.

O que você recebe:

| Mensagem | Quando |
|---|---|
| 🐺 Monitor ligado | Na primeira vez que o fluxo roda |
| 🔔 Novo contato no site | Cada contato novo (nome, empresa, WhatsApp clicável, e-mail, mensagem) |
| ⚠️ Boas-vindas não foi enviado | O Gmail recusou o e-mail de boas-vindas (responda o cliente você) |
| 🚨 Site/API com problema | 3 verificações seguidas falharam (~6 min fora do ar ou senha errada) |
| ✅ API voltou | Na primeira verificação que der certo depois de um alerta |
| ☀️ Resumo do dia | Todo dia às 8h (contatos, diagnósticos da semana, ramos) |

## 1. Instalar o Docker (uma vez)

No Kali/Debian:

```bash
sudo apt update
sudo apt install -y docker.io docker-compose
sudo systemctl enable --now docker                     # Docker liga sozinho com o PC
sudo usermod -aG docker $USER                          # usar docker sem sudo (saia e entre na sessão)
```

## 2. Subir o n8n

```bash
cd ~/Projetos/portfolio && git pull
cd automacao/n8n
docker compose up -d          # ou: docker-compose up -d
```

Abra http://localhost:5678 e crie a conta de dono do n8n (fica só no seu PC).

## 3. Criar o bot do Telegram

1. No Telegram, fale com **@BotFather** → `/newbot` → dê um nome (ex.: *Wolf Solutions Avisos*) e um
   usuário terminado em `bot`. Ele te dá o **token** (ex.: `123456:ABC...`). Guarde.
2. Abra o seu bot novo e mande qualquer mensagem (ex.: `oi`). Sem isso ele não consegue te escrever.
3. Descubra o seu **chat_id**: fale com **@userinfobot** e copie o número que ele mostra em `Id`.

## 4. Importar o fluxo

1. No n8n: **Create workflow → ⋯ (canto superior direito) → Import from File** → escolha
   `wolf-solutions-monitor.json` (nesta pasta).
2. No nó **Configuração**, troque:
   - `apiUrl` → endereço da API no Render (ex.: `https://wolf-solutions-api.onrender.com`)
   - `siteUrl` → endereço do site no Netlify (ex.: `https://wolfsolutions.netlify.app`)
   - `chatId` → o número do @userinfobot
   - `emailRemetente` → já vem com `trabalho.nicolaswolf@gmail.com`
3. Nos nós **Buscar contatos** e **Buscar resumo**, em *Credential*, crie uma **Header Auth**:
   - Name: `Authorization`
   - Value: `Bearer SUA_SENHA_DO_ADMIN` (a mesma `ADMIN_PASSWORD` do Render, com a palavra
     `Bearer` e um espaço antes)
   Use a mesma credencial nos dois nós.
4. No nó **Enviar no Telegram**, crie uma credencial **Telegram API** com o token do BotFather.
5. No nó **Enviar boas-vindas**, crie uma credencial **SMTP** (veja o passo 5 abaixo).
6. Salve e ligue o botão **Inactive → Active** no topo.

Em até 2 minutos chega a mensagem 🐺 *Monitor ligado*.

> Testando com **Execute workflow** (o botão manual), o n8n não guarda a memória do fluxo: cada
> teste manda o *Monitor ligado* de novo. Com o fluxo **Active**, ele lembra do último contato avisado.

## 5. Senha de app do Gmail (para o e-mail de boas-vindas)

O Gmail não aceita a sua senha normal em programas. Ele gera uma "senha de app" só para o n8n:

1. Na conta `trabalho.nicolaswolf@gmail.com`, ative a **Verificação em duas etapas**
   (myaccount.google.com → Segurança).
2. Abra **myaccount.google.com/apppasswords**, dê o nome `n8n` e clique em **Criar**.
   Ele mostra 16 letras (ex.: `abcd efgh ijkl mnop`). Copie.
3. No n8n, credencial **SMTP**:
   - User: `trabalho.nicolaswolf@gmail.com`
   - Password: as 16 letras (pode colar com ou sem espaços)
   - Host: `smtp.gmail.com` · Port: `465` · SSL/TLS: **ligado**

Para testar, envie o formulário do site com um e-mail seu: em até 2 minutos chegam o aviso no
Telegram e o e-mail de boas-vindas.

## Problemas comuns

- **Não chega nada:** você mandou mensagem para o bot antes? O `chatId` está certo?
- **Chega 🚨 com `HTTP 401`:** a senha da credencial Header Auth não bate com a `ADMIN_PASSWORD`
  do Render (lembre do `Bearer ` antes).
- **Chega ⚠️ Boas-vindas não foi enviado:** confira a senha de app e se a verificação em duas
  etapas do Gmail está ativa.
- **E-mail de boas-vindas caiu no spam do cliente:** é mais comum com Gmail pessoal. Quando tiver um
  domínio (ex.: `contato@wolfsolutions.com.br`), troque o remetente.
- **PC desligado:** sem avisos enquanto isso. Os contatos continuam salvos no banco; quando o PC
  ligar, o n8n avisa todos os que chegaram nesse meio tempo.
- **Render grátis:** dá 750 horas por mês; uma API ligada o mês todo usa ~744. Não crie outro
  serviço grátis no Render, ou as horas acabam antes do fim do mês.
