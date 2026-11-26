// Logos oficiais das tecnologias (Simple Icons, licença CC0 — https://simpleicons.org).
// As marcas pertencem aos seus donos; aparecem aqui só para indicar as ferramentas que uso.
// Para adicionar uma: procure o nome em simpleicons.org, importe `si<Nome>` e coloque no mapa.
import {
  siCloudflare,
  siDocker,
  siFastapi,
  siGithub,
  siHtml5,
  siJavascript,
  siLinux,
  siMysql,
  siN8n,
  siNetlify,
  siPostgresql,
  siPydantic,
  siPython,
  siReact,
  siRender,
  siSqlalchemy,
  siSqlite,
  siTailwindcss,
  siTelegram,
  siTypescript,
  siVite,
} from 'simple-icons'

export const techLogos = {
  python: siPython,
  fastapi: siFastapi,
  sqlalchemy: siSqlalchemy,
  pydantic: siPydantic,
  react: siReact,
  typescript: siTypescript,
  javascript: siJavascript,
  tailwind: siTailwindcss,
  vite: siVite,
  html: siHtml5,
  postgresql: siPostgresql,
  mysql: siMysql,
  sqlite: siSqlite,
  docker: siDocker,
  linux: siLinux,
  cloudflare: siCloudflare,
  netlify: siNetlify,
  render: siRender,
  github: siGithub,
  n8n: siN8n,
  telegram: siTelegram,
}

export type TechLogo = keyof typeof techLogos
