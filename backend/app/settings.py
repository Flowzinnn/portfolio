"""Configurações lidas das variáveis de ambiente (arquivo .env no Docker)."""

import os
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

# Pasta onde fica o banco SQLite (no Docker: o volume /data).
DATA_DIR = Path(os.getenv("DATA_DIR", ROOT / "data"))
DATABASE_URL = os.getenv("DATABASE_URL", f"sqlite:///{(DATA_DIR / 'portfolio.db').as_posix()}")
# No Render o disco é apagado a cada reinício: sem um Postgres configurado, os contatos se perderiam.
if os.getenv("RENDER") and not os.getenv("DATABASE_URL"):
    raise RuntimeError("Defina DATABASE_URL (Postgres do Neon) nas variáveis do Render; o SQLite lá seria apagado.")
# Postgres na nuvem (Neon, Render…) entrega "postgres://" ou "postgresql://": usa o driver psycopg 3.
for _prefix in ("postgres://", "postgresql://"):
    if DATABASE_URL.startswith(_prefix):
        DATABASE_URL = "postgresql+psycopg://" + DATABASE_URL.removeprefix(_prefix)
        break

# Senha do painel /admin. Vazia = painel desligado.
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "")

# Opcional: URL de um webhook (ex.: n8n) chamada a cada novo contato — para avisar no WhatsApp, Telegram, e-mail…
LEAD_WEBHOOK_URL = os.getenv("LEAD_WEBHOOK_URL", "")

# Pasta com o site já compilado (npm run build).
STATIC_DIR = Path(os.getenv("STATIC_DIR", ROOT / "dist"))
