"""Testes da API: rode com  python -m pytest backend/tests  (na raiz do projeto)."""

import pytest
from fastapi.testclient import TestClient

from backend.app.main import create_app

AUTH = {"Authorization": "Bearer senha-teste"}
ANSWERS = {
    "sector": "saude",
    "size": "ate20",
    "pain": "atendimento",
    "channels": ["whatsapp", "instagram"],
    "volume": "ate100",
    "data": "sistema",
    "aiUse": "chatgpt",
    "priority": "seguranca",
    "budget": "ate2000",
    "timing": "agora",
}


@pytest.fixture
def client(tmp_path):
    app = create_app(
        database_url=f"sqlite:///{(tmp_path / 'teste.db').as_posix()}",
        admin_password="senha-teste",
        static_dir=None,
        lead_webhook_url="",
    )
    with TestClient(app) as test_client:
        yield test_client


def save_quiz(client) -> int:
    res = client.post("/api/quiz", json={"lang": "pt", "answers": ANSWERS, "solution": "atendimento", "potential": "high"})
    assert res.status_code == 201
    return res.json()["id"]


def test_quiz_then_lead_appears_in_admin(client):
    quiz_id = save_quiz(client)
    res = client.post(
        "/api/contact",
        json={"name": "Ana Souza", "whatsapp": "(67) 99999-0000", "consent": True, "source": "quiz", "quiz_id": quiz_id},
    )
    assert res.status_code == 201

    summary = client.get("/api/admin/summary", headers=AUTH).json()
    assert summary["total_quiz"] == 1
    assert summary["total_contacts"] == 1
    assert summary["contacts_from_quiz"] == 1
    assert summary["new_contacts"] == 1
    assert summary["by_sector"] == {"saude": 1}

    contact = client.get("/api/admin/contacts", headers=AUTH).json()[0]
    assert contact["whatsapp"] == "67999990000"
    assert contact["quiz_id"] == quiz_id
    assert contact["created_at"].endswith("Z")

    quiz = client.get("/api/admin/quiz", headers=AUTH).json()[0]
    assert quiz["answers"]["channels"] == ["whatsapp", "instagram"]


@pytest.mark.parametrize(
    "payload",
    [
        {"name": "Ana", "email": "ana@exemplo.com", "consent": False},  # sem autorização
        {"name": "Ana", "consent": True},  # sem e-mail nem WhatsApp
        {"name": "Ana", "email": "nao-e-email", "consent": True},
        {"name": "Ana", "whatsapp": "123", "consent": True},
    ],
)
def test_contact_validation(client, payload):
    assert client.post("/api/contact", json=payload).status_code == 422


def test_unknown_quiz_id_is_dropped(client):
    res = client.post("/api/contact", json={"name": "Ana", "email": "ana@exemplo.com", "consent": True, "quiz_id": 999})
    assert res.status_code == 201
    assert client.get("/api/admin/contacts", headers=AUTH).json()[0]["quiz_id"] is None


def test_honeypot_is_discarded(client):
    res = client.post("/api/contact", json={"name": "Bot", "email": "bot@spam.com", "consent": True, "website": "http://spam"})
    assert res.status_code == 201
    assert client.get("/api/admin/summary", headers=AUTH).json()["total_contacts"] == 0


def test_admin_requires_password(client):
    assert client.get("/api/admin/summary").status_code == 401
    assert client.get("/api/admin/summary", headers={"Authorization": "Bearer errada"}).status_code == 401
    assert client.get("/api/admin/summary", headers=AUTH).status_code == 200


def test_admin_disabled_without_password(tmp_path):
    app = create_app(database_url=f"sqlite:///{(tmp_path / 'x.db').as_posix()}", admin_password="", static_dir=None)
    with TestClient(app) as c:
        assert c.get("/api/admin/summary", headers=AUTH).status_code == 503


def test_status_update_and_csv_export(client):
    client.post("/api/contact", json={"name": "Bruno Lima", "email": "bruno@exemplo.com", "consent": True, "message": "Olá"})
    contact_id = client.get("/api/admin/contacts", headers=AUTH).json()[0]["id"]

    res = client.patch(f"/api/admin/contacts/{contact_id}", json={"status": "em contato"}, headers=AUTH)
    assert res.json()["status"] == "em contato"
    assert client.patch(f"/api/admin/contacts/{contact_id}", json={"status": "inventado"}, headers=AUTH).status_code == 422

    csv_res = client.get("/api/admin/export/contatos.csv", headers=AUTH)
    assert csv_res.headers["content-type"].startswith("text/csv")
    assert "Bruno Lima" in csv_res.text

    save_quiz(client)
    quiz_csv = client.get("/api/admin/export/diagnosticos.csv", headers=AUTH).text
    assert "whatsapp, instagram" in quiz_csv


def test_quiz_rejects_oversized_answers(client):
    res = client.post("/api/quiz", json={"answers": {"sector": "x" * 100}, "solution": "a", "potential": "b"})
    assert res.status_code == 422
