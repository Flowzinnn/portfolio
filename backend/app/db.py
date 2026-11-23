"""Banco de dados: tabelas de diagnósticos do quiz e de contatos (leads)."""

from datetime import datetime, timezone
from pathlib import Path

from sqlalchemy import JSON, DateTime, ForeignKey, String, Text, create_engine, event
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, sessionmaker


def utcnow() -> datetime:
    """Horário UTC sem fuso (o SQLite não guarda fuso; o front converte para o horário local)."""
    return datetime.now(timezone.utc).replace(tzinfo=None)


class Base(DeclarativeBase):
    pass


class QuizSubmission(Base):
    """Um diagnóstico respondido no site (anônimo)."""

    __tablename__ = "quiz_submissions"

    id: Mapped[int] = mapped_column(primary_key=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=utcnow, index=True)
    lang: Mapped[str] = mapped_column(String(5))
    sector: Mapped[str] = mapped_column(String(40), index=True)
    solution: Mapped[str] = mapped_column(String(40), index=True)
    potential: Mapped[str] = mapped_column(String(20))
    answers: Mapped[dict] = mapped_column(JSON)


class Contact(Base):
    """Alguém que deixou nome e contato — pelo formulário ou no fim do diagnóstico."""

    __tablename__ = "contacts"

    id: Mapped[int] = mapped_column(primary_key=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=utcnow, index=True)
    name: Mapped[str] = mapped_column(String(120))
    email: Mapped[str | None] = mapped_column(String(200))
    whatsapp: Mapped[str | None] = mapped_column(String(30))
    company: Mapped[str | None] = mapped_column(String(160))
    message: Mapped[str] = mapped_column(Text, default="")
    source: Mapped[str] = mapped_column(String(10), default="form")
    status: Mapped[str] = mapped_column(String(20), default="novo", index=True)
    quiz_id: Mapped[int | None] = mapped_column(ForeignKey("quiz_submissions.id"))


def make_sessionmaker(url: str) -> sessionmaker:
    """Cria o banco (e a pasta dele) se ainda não existir e devolve a fábrica de sessões."""
    is_sqlite = url.startswith("sqlite")
    if is_sqlite:
        path = url.removeprefix("sqlite:///")
        if path and path != ":memory:":
            Path(path).parent.mkdir(parents=True, exist_ok=True)

    engine = create_engine(url, connect_args={"check_same_thread": False} if is_sqlite else {})

    if is_sqlite:
        # WAL: leituras do painel não travam gravações do site.
        @event.listens_for(engine, "connect")
        def _pragmas(dbapi_conn, _record):
            cur = dbapi_conn.cursor()
            cur.execute("PRAGMA journal_mode=WAL")
            cur.execute("PRAGMA foreign_keys=ON")
            cur.close()

    Base.metadata.create_all(engine)
    return sessionmaker(engine, expire_on_commit=False)
