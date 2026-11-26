// Roda no build do Netlify (ver netlify.toml): gera dist/_redirects a partir da variável API_URL.
// API_URL = endereço da API no Render, ex.: https://wolf-solutions-api.onrender.com
// Assim o endereço da API fica nas configurações do Netlify, não no código.
import { writeFileSync } from 'node:fs'

const api = (process.env.API_URL ?? '').trim().replace(/\/+$/, '')

if (!/^https:\/\/[^/\s]+$/.test(api)) {
  console.error(
    '\n✖ Defina a variável API_URL no Netlify (Site configuration → Environment variables),\n' +
      '  com o endereço da API, ex.: https://wolf-solutions-api.onrender.com\n' +
      `  Valor atual: "${process.env.API_URL ?? ''}"\n`,
  )
  process.exit(1)
}

const rules = [
  // Chamadas /api vão para o servidor Python (o "!" garante que sempre são repassadas).
  `/api/*  ${api}/api/:splat  200!`,
  // Rotas do React (/blog, /admin, /ia-para/...) abrem o index.html.
  '/*  /index.html  200',
]

writeFileSync('dist/_redirects', rules.join('\n') + '\n')
console.log(`✔ _redirects gerado: /api/* → ${api}/api/`)
