from datetime import date
from sqlalchemy import select
from sqlalchemy.orm import Session
from .models import Client, Obligation, DocumentRequest

RISK_WEIGHT = {"critical": 100, "high": 70, "medium": 40, "low": 10}

def analyze_portfolio(db: Session, tenant_id: int, allowed_client_ids: list[int] | None = None):
    q = select(Obligation).where(Obligation.tenant_id == tenant_id, Obligation.status != "done")
    if allowed_client_ids is not None:
        q = q.where(Obligation.client_id.in_(allowed_client_ids))
    obligations = db.scalars(q).all()
    requests = db.scalars(select(DocumentRequest).where(DocumentRequest.tenant_id == tenant_id, DocumentRequest.status == "pending")).all()
    if allowed_client_ids is not None:
        requests = [r for r in requests if r.client_id in allowed_client_ids]
    req_by_client = {}
    for r in requests:
        req_by_client[r.client_id] = req_by_client.get(r.client_id, 0) + 1
    today = date.today()
    alerts = []
    for ob in obligations:
        days = (ob.due_date - today).days
        urgency = max(0, 30 - days) * 2
        score = RISK_WEIGHT.get(ob.risk, 10) + urgency + req_by_client.get(ob.client_id, 0) * 6
        client = db.get(Client, ob.client_id)
        alerts.append({
            "client_id": ob.client_id,
            "client": client.trade_name or client.legal_name,
            "obligation": ob.code,
            "competence": ob.competence,
            "due_date": ob.due_date.isoformat(),
            "days_to_due": days,
            "pending_documents": req_by_client.get(ob.client_id, 0),
            "risk": ob.risk,
            "priority_score": score,
            "recommended_action": "Cobrar documentos e revisar fechamento" if req_by_client.get(ob.client_id, 0) else "Revisar obrigação e preparar validação"
        })
    return sorted(alerts, key=lambda x: x["priority_score"], reverse=True)

def draft_collection_email(client: Client, competence: str, items: list[str], urgency: str = "normal"):
    subject = f"Documentos pendentes – competência {competence}"
    intro = "Identificamos documentos ainda pendentes para concluirmos seu fechamento contábil e fiscal."
    if urgency == "high":
        intro = "O prazo do fechamento está próximo e ainda identificamos documentos pendentes que podem impactar as obrigações da competência."
    bullets = "\n".join(f"- {item}" for item in items)
    body = f"Olá,\n\n{intro}\n\nPrecisamos dos seguintes itens:\n{bullets}\n\nPedimos, por gentileza, o envio assim que possível. Caso algum item já tenha sido encaminhado, nossa equipe fará a validação antes de encerrar a pendência.\n\nAtenciosamente,\nEquipe Contábil"
    return subject, body
