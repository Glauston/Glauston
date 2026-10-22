from datetime import datetime
from pathlib import Path
from fastapi import FastAPI, Depends, HTTPException, Form
from fastapi.responses import FileResponse
from sqlalchemy import select
from sqlalchemy.orm import Session
from .db import Base, engine, get_db, SessionLocal
from .models import User, Client, ClientAssignment, Obligation, DocumentRequest, Communication, TaxRule, AuditLog
from .security import verify_password, create_token, current_user, require
from .agent import analyze_portfolio, draft_collection_email
from .seed import seed

app = FastAPI(title="G|E CONTÁBIL API", version="0.1.0")

@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        seed(db)

def audit(db: Session, user: User | None, action: str, entity: str, entity_id: str = "", detail: str = ""):
    db.add(AuditLog(tenant_id=user.tenant_id if user else 1, user_id=user.id if user else None, action=action, entity=entity, entity_id=entity_id, detail=detail))
    db.commit()

def allowed_clients(db: Session, user: User) -> list[int] | None:
    if user.role in {"admin", "contador", "supervisor"}:
        return None
    return list(db.scalars(select(ClientAssignment.client_id).where(ClientAssignment.tenant_id == user.tenant_id, ClientAssignment.user_id == user.id)).all())

@app.get("/api/health")
def health():
    return {"status": "ok", "service": "ge-contabil", "version": "0.1.0"}

@app.post("/api/auth/login")
def login(username: str = Form(...), password: str = Form(...), db: Session = Depends(get_db)):
    user = db.scalar(select(User).where(User.email == username, User.active == True))
    if not user or not verify_password(password, user.password_hash):
        raise HTTPException(status_code=401, detail="Usuário ou senha inválidos")
    audit(db, user, "auth.login", "user", str(user.id))
    return {"access_token": create_token(user), "token_type": "bearer", "user": {"id": user.id, "name": user.name, "role": user.role}}

@app.get("/api/me")
def me(user: User = Depends(current_user)):
    return {"id": user.id, "name": user.name, "email": user.email, "role": user.role, "tenant_id": user.tenant_id}

@app.get("/api/dashboard")
def dashboard(user: User = Depends(current_user), db: Session = Depends(get_db)):
    ids = allowed_clients(db, user)
    cquery = select(Client).where(Client.tenant_id == user.tenant_id, Client.status == "active")
    oquery = select(Obligation).where(Obligation.tenant_id == user.tenant_id, Obligation.status != "done")
    rquery = select(DocumentRequest).where(DocumentRequest.tenant_id == user.tenant_id, DocumentRequest.status == "pending")
    if ids is not None:
        cquery, oquery, rquery = cquery.where(Client.id.in_(ids)), oquery.where(Obligation.client_id.in_(ids)), rquery.where(DocumentRequest.client_id.in_(ids))
    clients, obs, reqs = db.scalars(cquery).all(), db.scalars(oquery).all(), db.scalars(rquery).all()
    return {"clients_active": len(clients), "obligations_open": len(obs), "pending_documents": len(reqs), "critical_or_high": sum(1 for o in obs if o.risk in {"critical", "high"}), "average_health": round(sum(c.health_score for c in clients)/len(clients), 1) if clients else 0}

@app.get("/api/clients")
def clients(user: User = Depends(current_user), db: Session = Depends(get_db)):
    ids = allowed_clients(db, user)
    q = select(Client).where(Client.tenant_id == user.tenant_id).order_by(Client.trade_name)
    if ids is not None: q = q.where(Client.id.in_(ids))
    return [{"id": c.id, "name": c.trade_name or c.legal_name, "legal_name": c.legal_name, "cnpj": c.cnpj, "tax_regime": c.tax_regime, "health_score": c.health_score, "status": c.status} for c in db.scalars(q).all()]

@app.get("/api/clients/{client_id}/360")
def client_360(client_id: int, user: User = Depends(current_user), db: Session = Depends(get_db)):
    ids = allowed_clients(db, user)
    if ids is not None and client_id not in ids: raise HTTPException(403, "Cliente fora da carteira")
    c = db.get(Client, client_id)
    if not c or c.tenant_id != user.tenant_id: raise HTTPException(404, "Cliente não encontrado")
    obs = db.scalars(select(Obligation).where(Obligation.tenant_id == user.tenant_id, Obligation.client_id == client_id)).all()
    reqs = db.scalars(select(DocumentRequest).where(DocumentRequest.tenant_id == user.tenant_id, DocumentRequest.client_id == client_id)).all()
    return {"client": {"id": c.id, "name": c.trade_name or c.legal_name, "cnpj": c.cnpj, "tax_regime": c.tax_regime, "health_score": c.health_score, "responsible_email": c.responsible_email}, "obligations": [{"id": o.id, "code": o.code, "competence": o.competence, "due_date": o.due_date.isoformat(), "status": o.status, "risk": o.risk, "protocol": o.protocol} for o in obs], "document_requests": [{"id": r.id, "item": r.item, "competence": r.competence, "status": r.status, "reminders": r.reminder_count} for r in reqs]}

@app.get("/api/agent/review")
def agent_review(user: User = Depends(current_user), db: Session = Depends(get_db)):
    alerts = analyze_portfolio(db, user.tenant_id, allowed_clients(db, user))
    audit(db, user, "agent.review", "portfolio", detail=f"{len(alerts)} alertas")
    return {"summary": {"alerts": len(alerts), "top_priority": alerts[0] if alerts else None}, "alerts": alerts[:50]}

@app.post("/api/communications/draft")
def draft_email(client_id: int, competence: str, urgency: str = "normal", user: User = Depends(require("operacional")), db: Session = Depends(get_db)):
    ids = allowed_clients(db, user)
    if ids is not None and client_id not in ids: raise HTTPException(403, "Cliente fora da carteira")
    c = db.get(Client, client_id)
    if not c or c.tenant_id != user.tenant_id: raise HTTPException(404, "Cliente não encontrado")
    reqs = db.scalars(select(DocumentRequest).where(DocumentRequest.tenant_id == user.tenant_id, DocumentRequest.client_id == client_id, DocumentRequest.competence == competence, DocumentRequest.status == "pending")).all()
    if not reqs: raise HTTPException(400, "Não há documentos pendentes para esta competência")
    subject, body = draft_collection_email(c, competence, [r.item for r in reqs], urgency)
    msg = Communication(tenant_id=user.tenant_id, client_id=client_id, channel="email", subject=subject, body=body, status="draft", created_by=user.id)
    db.add(msg); db.commit(); db.refresh(msg)
    audit(db, user, "communication.draft", "communication", str(msg.id), subject)
    return {"id": msg.id, "recipient": c.responsible_email, "subject": subject, "body": body, "status": msg.status}

@app.post("/api/communications/{communication_id}/approve")
def approve_email(communication_id: int, user: User = Depends(require("supervisor")), db: Session = Depends(get_db)):
    msg = db.get(Communication, communication_id)
    if not msg or msg.tenant_id != user.tenant_id: raise HTTPException(404, "Comunicação não encontrada")
    if msg.status != "draft": raise HTTPException(400, "Comunicação não está em rascunho")
    msg.status = "approved"
    msg.approved_at = datetime.utcnow()
    db.commit()
    audit(db, user, "communication.approve", "communication", str(msg.id))
    return {"id": msg.id, "status": msg.status, "note": "Envio externo permanece desabilitado nesta fundação até configurar provedor e política de aprovação."}

@app.get("/api/tax-rules")
def tax_rules(user: User = Depends(current_user), db: Session = Depends(get_db)):
    rules = db.scalars(select(TaxRule).where(TaxRule.tenant_id == user.tenant_id).order_by(TaxRule.tax_name, TaxRule.valid_from.desc())).all()
    return [{"id": r.id, "tax_name": r.tax_name, "regime": r.regime, "scope": r.scope, "rate": float(r.rate), "valid_from": r.valid_from.isoformat(), "valid_to": r.valid_to.isoformat() if r.valid_to else None, "version": r.version, "approved": r.approved, "legal_basis": r.legal_basis} for r in rules]

@app.get("/api/integrations/status")
def integrations(user: User = Depends(current_user)):
    return {"efd_reinf": {"mode": "adapter", "status": "awaiting_certificate_and_homologation"}, "esocial": {"mode": "adapter", "status": "awaiting_certificate_and_homologation"}, "dctfweb_mit": {"mode": "json_import", "status": "schema_adapter_planned"}, "auto_transmission": False}

@app.get("/api/audit")
def audit_logs(user: User = Depends(require("supervisor")), db: Session = Depends(get_db)):
    rows = db.scalars(select(AuditLog).where(AuditLog.tenant_id == user.tenant_id).order_by(AuditLog.created_at.desc()).limit(200)).all()
    return [{"id": a.id, "user_id": a.user_id, "action": a.action, "entity": a.entity, "entity_id": a.entity_id, "detail": a.detail, "created_at": a.created_at.isoformat()} for a in rows]

@app.get("/")
def index():
    return FileResponse(Path("frontend/index.html"))
