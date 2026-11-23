"""Formato dos dados que entram e saem da API (validados antes de tocar no banco)."""

import re
from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, field_serializer, field_validator, model_validator

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

Answer = str | list[str]


class QuizIn(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    lang: Literal["pt", "en"] = "pt"
    answers: dict[str, Answer]
    solution: str = Field(min_length=1, max_length=40)
    potential: str = Field(min_length=1, max_length=20)

    @field_validator("answers")
    @classmethod
    def _limit_answers(cls, value: dict[str, Answer]) -> dict[str, Answer]:
        if len(value) > 20:
            raise ValueError("respostas demais")
        for key, answer in value.items():
            items = answer if isinstance(answer, list) else [answer]
            if len(key) > 30 or len(items) > 10 or any(len(item) > 40 for item in items):
                raise ValueError("resposta inválida")
        return value


class QuizOut(BaseModel):
    id: int


class ContactIn(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    name: str = Field(min_length=2, max_length=120)
    email: str | None = Field(default=None, max_length=200)
    whatsapp: str | None = Field(default=None, max_length=30)
    company: str | None = Field(default=None, max_length=160)
    message: str = Field(default="", max_length=4000)
    source: Literal["form", "quiz"] = "form"
    quiz_id: int | None = None
    consent: bool = False
    website: str = ""  # armadilha para robôs: pessoas não veem este campo

    @field_validator("email", "company", "whatsapp", mode="before")
    @classmethod
    def _blank_to_none(cls, value):
        return value or None

    @field_validator("email")
    @classmethod
    def _check_email(cls, value: str | None) -> str | None:
        if value and not EMAIL_RE.match(value):
            raise ValueError("e-mail inválido")
        return value.lower() if value else None

    @field_validator("whatsapp")
    @classmethod
    def _check_whatsapp(cls, value: str | None) -> str | None:
        if not value:
            return None
        digits = re.sub(r"\D", "", value)
        if not 10 <= len(digits) <= 15:
            raise ValueError("WhatsApp inválido")
        return digits

    @model_validator(mode="after")
    def _check_required(self):
        if self.website:
            return self
        if not self.consent:
            raise ValueError("é preciso autorizar o contato")
        if not (self.email or self.whatsapp):
            raise ValueError("informe e-mail ou WhatsApp")
        return self


class ContactStatusIn(BaseModel):
    status: Literal["novo", "em contato", "fechado", "descartado"]


def _iso_utc(value: datetime) -> str:
    return value.replace(microsecond=0).isoformat() + "Z"


class ContactOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    name: str
    email: str | None
    whatsapp: str | None
    company: str | None
    message: str
    source: str
    status: str
    quiz_id: int | None

    @field_serializer("created_at")
    def _ser_created(self, value: datetime) -> str:
        return _iso_utc(value)


class QuizSubmissionOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    lang: str
    sector: str
    solution: str
    potential: str
    answers: dict[str, Answer]

    @field_serializer("created_at")
    def _ser_created(self, value: datetime) -> str:
        return _iso_utc(value)


class Summary(BaseModel):
    total_quiz: int
    quiz_last_7_days: int
    total_contacts: int
    new_contacts: int
    contacts_from_quiz: int
    by_sector: dict[str, int]
    by_solution: dict[str, int]
