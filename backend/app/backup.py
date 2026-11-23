"""Cópia de segurança do banco, segura mesmo com o site no ar.

No servidor:  docker compose exec app python -m backend.app.backup
Guarda os 14 backups mais recentes em /data/backups.
"""

import sqlite3
from datetime import datetime

from . import settings


def main() -> None:
    source = settings.DATA_DIR / "portfolio.db"
    folder = settings.DATA_DIR / "backups"
    folder.mkdir(parents=True, exist_ok=True)
    target = folder / f"portfolio-{datetime.now():%Y%m%d-%H%M%S}.db"

    with sqlite3.connect(source) as src, sqlite3.connect(target) as dst:
        src.backup(dst)

    for old in sorted(folder.glob("portfolio-*.db"))[:-14]:
        old.unlink()
    print(f"Backup salvo em {target}")


if __name__ == "__main__":
    main()
