"""Servidor do portfólio.

- Salva cada diagnóstico do quiz e cada contato no banco (SQLite).
- Painel privado em /admin (protegido por ADMIN_PASSWORD).
- Entrega o site já compilado (pasta dist/).

Rodar localmente (na raiz do projeto):
    python -m uvicorn backend.app.main:create_app --factory --reload --port 8000
"""

from __future__ import annotations

import csv
import io
import json
import logging
import secrets
import time
import urllib.request
from collections import defaultdict, deque
from datetime import timedelta
from pathlib import Path

from fastapi import BackgroundTasks, Depends, FastAPI, HTTPException, Request, Response
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from . import settings
from .db import Contact, QuizSubmission, make_sessionmaker, utcnow
from .schemas import ContactIn, ContactOut, ContactStatusIn, QuizIn, QuizOut, QuizSubmissionOut, Summary

log = logging.getLogger("portfolio")

QUIZ_FIELDS = ["sector", "size", "pain", "channels", "volume", "data", "aiUse", "priority", "budget", "timing"]


class RateLimiter:
    """Limite simples por IP, em memória (suficiente para um único servidor)."""

    def __init__(self, limit: int, window_seconds: int):
        self.limit = limit
        self.window = window_seconds
        self.hits: dict[str, deque[float]] = defaultdict(deque)

    def allow(self, key: str) -> bool:
        now = time.monotonic()
        hits = self.hits[key]
        while hits and now - hits[0] > self.window:
            hits.popleft()
        if len(hits) >= self.limit:
            return False
        hits.append(now)
        return True


def client_ip(request: Request) -> str:
    """IP real do visitante (atrás do túnel da Cloudflare ou do proxy do Netlify ele vem no cabeçalho)."""
    forwarded = request.headers.get("x-forwarded-for", "").split(",")[0].strip()
    return (
        request.headers.get("cf-connecting-ip")
        or request.headers.get("x-nf-client-connection-ip")
        or forwarded
        or (request.client.host if request.client else "?")
    )


def notify_webhook(url: str, payload: dict) -> None:
    """Avisa um webhook (ex.: n8n) sobre um novo contato. Falhar aqui nunca impede o envio."""
    try:
        body = json.dumps(payload, ensure_ascii=False, default=str).encode()
        req = urllib.request.Request(url, data=body, headers={"Content-Type": "application/json"}, method="POST")
        urllib.request.urlopen(req, timeout=5).close()
    except Exception as exc:  # noqa: BLE001
        log.warning("Webhook de lead falhou: %s", exc)


def csv_response(filename: str, header: list[str], rows: list[list]) -> Response:
    buffer = io.StringIO()
    writer = csv.writer(buffer, delimiter=";")
    writer.writerow(header)
    writer.writerows(rows)
    # BOM para o Excel abrir os acentos certinho
    return Response(
        content="﻿" + buffer.getvalue(),
        media_type="text/csv; charset=utf-8",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )


def create_app(
    database_url: str | None = None,
    admin_password: str | None = None,
    static_dir: Path | None = settings.STATIC_DIR,
    lead_webhook_url: str | None = None,
) -> FastAPI:
    app = FastAPI(title="Portfólio Nicolas Wolf", docs_url=None, redoc_url=None, openapi_url=None)

    SessionLocal = make_sessionmaker(database_url or settings.DATABASE_URL)
    admin_pw = settings.ADMIN_PASSWORD if admin_password is None else admin_password
    webhook = settings.LEAD_WEBHOOK_URL if lead_webhook_url is None else lead_webhook_url

    quiz_limit = RateLimiter(30, 3600)
    contact_limit = RateLimiter(10, 3600)
    failed_login_limit = RateLimiter(10, 900)

    def get_db():
        with SessionLocal() as session:
            yield session

    def require_admin(request: Request) -> None:
        if not admin_pw:
            raise HTTPException(503, "Painel desligado: defina ADMIN_PASSWORD no arquivo .env")
        token = request.headers.get("authorization", "").removeprefix("Bearer ").strip()
        if token and secrets.compare_digest(token.encode(), admin_pw.encode()):
            return
        if not failed_login_limit.allow(client_ip(request)):
            raise HTTPException(429, "Muitas tentativas. Aguarde alguns minutos.")
        raise HTTPException(401, "Senha incorreta")

    admin_only = [Depends(require_admin)]

    @app.middleware("http")
    async def headers_middleware(request: Request, call_next):
        response = await call_next(request)
        path = request.url.path
        response.headers.setdefault("X-Content-Type-Options", "nosniff")
        response.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
        response.headers.setdefault("X-Frame-Options", "DENY")
        if path.startswith("/assets/"):
            response.headers["Cache-Control"] = "public, max-age=31536000, immutable"
        elif path.startswith("/api/"):
            response.headers["Cache-Control"] = "no-store"
        if path.startswith(("/admin", "/api/")):
            response.headers["X-Robots-Tag"] = "noindex"
        return response

    # ── Público ──────────────────────────────────────────────

    @app.get("/api/health")
    def health():
        return {"ok": True}

    @app.post("/api/quiz", response_model=QuizOut, status_code=201)
    def save_quiz(data: QuizIn, request: Request, db: Session = Depends(get_db)):
        if not quiz_limit.allow(client_ip(request)):
            raise HTTPException(429, "Muitos envios. Tente de novo mais tarde.")
        sector = data.answers.get("sector", "")
        row = QuizSubmission(
            lang=data.lang,
            sector=sector if isinstance(sector, str) else "",
            solution=data.solution,
            potential=data.potential,
            answers=data.answers,
        )
        db.add(row)
        db.commit()
        return QuizOut(id=row.id)

    @app.post("/api/contact", status_code=201)
    def save_contact(data: ContactIn, request: Request, background: BackgroundTasks, db: Session = Depends(get_db)):
        if data.website:  # robô preencheu o campo invisível: finge sucesso e descarta
            return {"ok": True}
        if not contact_limit.allow(client_ip(request)):
            raise HTTPException(429, "Muitos envios. Tente de novo mais tarde.")
        quiz_id = data.quiz_id if data.quiz_id and db.get(QuizSubmission, data.quiz_id) else None
        row = Contact(
            name=data.name,
            email=data.email,
            whatsapp=data.whatsapp,
            company=data.company,
            message=data.message,
            source=data.source,
            quiz_id=quiz_id,
        )
        db.add(row)
        db.commit()
        if webhook:
            background.add_task(notify_webhook, webhook, ContactOut.model_validate(row).model_dump(mode="json"))
        return {"ok": True, "id": row.id}

    # ── Painel /admin ────────────────────────────────────────

    @app.get("/api/admin/summary", response_model=Summary, dependencies=admin_only)
    def summary(db: Session = Depends(get_db)):
        def count(model, *where) -> int:
            return db.scalar(select(func.count()).select_from(model).where(*where)) or 0

        def group(column) -> dict[str, int]:
            rows = db.execute(select(column, func.count()).group_by(column).order_by(func.count().desc())).all()
            return {key or "—": total for key, total in rows}

        return Summary(
            total_quiz=count(QuizSubmission),
            quiz_last_7_days=count(QuizSubmission, QuizSubmission.created_at >= utcnow() - timedelta(days=7)),
            total_contacts=count(Contact),
            new_contacts=count(Contact, Contact.status == "novo"),
            contacts_from_quiz=count(Contact, Contact.quiz_id.is_not(None)),
            by_sector=group(QuizSubmission.sector),
            by_solution=group(QuizSubmission.solution),
        )

    @app.get("/api/admin/contacts", response_model=list[ContactOut], dependencies=admin_only)
    def list_contacts(db: Session = Depends(get_db)):
        return db.scalars(select(Contact).order_by(Contact.id.desc()).limit(1000)).all()

    @app.patch("/api/admin/contacts/{contact_id}", response_model=ContactOut, dependencies=admin_only)
    def update_contact(contact_id: int, data: ContactStatusIn, db: Session = Depends(get_db)):
        row = db.get(Contact, contact_id)
        if not row:
            raise HTTPException(404, "Contato não encontrado")
        row.status = data.status
        db.commit()
        return row

    @app.get("/api/admin/quiz", response_model=list[QuizSubmissionOut], dependencies=admin_only)
    def list_quiz(db: Session = Depends(get_db)):
        return db.scalars(select(QuizSubmission).order_by(QuizSubmission.id.desc()).limit(1000)).all()

    @app.get("/api/admin/export/contatos.csv", dependencies=admin_only)
    def export_contacts(db: Session = Depends(get_db)):
        rows = db.scalars(select(Contact).order_by(Contact.id)).all()
        return csv_response(
            "contatos.csv",
            ["id", "data_utc", "nome", "email", "whatsapp", "empresa", "origem", "status", "diagnostico_id", "mensagem"],
            [
                [r.id, r.created_at.isoformat(" ", "minutes"), r.name, r.email, r.whatsapp, r.company, r.source, r.status, r.quiz_id, r.message]
                for r in rows
            ],
        )

    @app.get("/api/admin/export/diagnosticos.csv", dependencies=admin_only)
    def export_quiz(db: Session = Depends(get_db)):
        rows = db.scalars(select(QuizSubmission).order_by(QuizSubmission.id)).all()

        def answer(r: QuizSubmission, key: str) -> str:
            value = r.answers.get(key, "")
            return ", ".join(value) if isinstance(value, list) else value

        return csv_response(
            "diagnosticos.csv",
            ["id", "data_utc", "idioma", "solucao", "potencial", *QUIZ_FIELDS],
            [[r.id, r.created_at.isoformat(" ", "minutes"), r.lang, r.solution, r.potential, *(answer(r, k) for k in QUIZ_FIELDS)] for r in rows],
        )

    # ── Site ─────────────────────────────────────────────────

    if static_dir and (static_dir / "index.html").is_file():
        root = static_dir.resolve()
        index = root / "index.html"
        if (root / "assets").is_dir():
            app.mount("/assets", StaticFiles(directory=root / "assets"), name="assets")

        @app.get("/{path:path}", include_in_schema=False)
        def spa(path: str):
            if path.startswith("api/"):
                raise HTTPException(404, "Rota não encontrada")
            file = (root / path).resolve()
            if path and file.is_file() and root in file.parents:
                return FileResponse(file)
            # Qualquer outra rota (/blog, /ia-para/clinicas, /admin…) é resolvida pelo React.
            return FileResponse(index, headers={"Cache-Control": "no-cache"})

    return app
