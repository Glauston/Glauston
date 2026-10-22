from datetime import date, timedelta
from sqlalchemy import select
from sqlalchemy.orm import Session
from .models import Tenant, User, Client, ClientAssignment, Obligation, DocumentRequest, TaxRule
from .security import hash_password

def seed(db: Session):
    if db.scalar(select(Tenant.id).limit(1)):
        return
    tenant = Tenant(name="Escritório Contábil Demonstração")
    db.add(tenant); db.flush()
    users = [
        User(tenant_id=tenant.id, name="Administrador", email="admin@demo.local", password_hash=hash_password("Admin@123"), role="admin"),
        User(tenant_id=tenant.id, name="Contador Responsável", email="contador@demo.local", password_hash=hash_password("Contador@123"), role="contador"),
        User(tenant_id=tenant.id, name="Operacional Fiscal", email="operacional@demo.local", password_hash=hash_password("Operacional@123"), role="operacional"),
    ]
    db.add_all(users); db.flush()
    clients = [
        Client(tenant_id=tenant.id, legal_name="Alfa Comércio Ltda", trade_name="Alfa", cnpj="00.000.000/0001-01", tax_regime="Simples Nacional", health_score=86, responsible_email="financeiro@alfa.example"),
        Client(tenant_id=tenant.id, legal_name="Beta Serviços Ltda", trade_name="Beta", cnpj="00.000.000/0001-02", tax_regime="Lucro Presumido", health_score=72, responsible_email="contato@beta.example"),
        Client(tenant_id=tenant.id, legal_name="Gama Indústria S.A.", trade_name="Gama", cnpj="00.000.000/0001-03", tax_regime="Lucro Real", health_score=94, responsible_email="fiscal@gama.example"),
    ]
    db.add_all(clients); db.flush()
    for u in users:
        for c in clients:
            db.add(ClientAssignment(tenant_id=tenant.id, user_id=u.id, client_id=c.id, can_edit=u.role != "consulta"))
    today = date.today()
    obligations = [
        Obligation(tenant_id=tenant.id, client_id=clients[0].id, code="PGDAS-D", competence=today.strftime("%Y-%m"), due_date=today + timedelta(days=4), risk="high", owner_user_id=users[2].id),
        Obligation(tenant_id=tenant.id, client_id=clients[1].id, code="EFD-Reinf", competence=today.strftime("%Y-%m"), due_date=today + timedelta(days=7), risk="medium", owner_user_id=users[2].id),
        Obligation(tenant_id=tenant.id, client_id=clients[2].id, code="DCTFWeb/MIT", competence=today.strftime("%Y-%m"), due_date=today + timedelta(days=12), risk="low", owner_user_id=users[1].id),
    ]
    db.add_all(obligations)
    db.add_all([
        DocumentRequest(tenant_id=tenant.id, client_id=clients[0].id, competence=today.strftime("%Y-%m"), item="Extrato bancário completo"),
        DocumentRequest(tenant_id=tenant.id, client_id=clients[0].id, competence=today.strftime("%Y-%m"), item="XML das notas de entrada pendentes"),
        DocumentRequest(tenant_id=tenant.id, client_id=clients[1].id, competence=today.strftime("%Y-%m"), item="Comprovantes de retenções"),
    ])
    db.add(TaxRule(tenant_id=tenant.id, tax_name="REGRA-DEMO", regime="Simples Nacional", scope="Demonstração — não usar em produção", rate=0, valid_from=today, legal_basis="Regra fictícia para validar versionamento. Substituir por regras homologadas.", approved=False))
    db.commit()
