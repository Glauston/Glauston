import os
from datetime import datetime, timedelta, timezone
import jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from .db import get_db
from .models import User

SECRET = os.getenv("APP_SECRET", "dev-only-secret-change-me")
TOKEN_MINUTES = int(os.getenv("ACCESS_TOKEN_MINUTES", "480"))
ALGO = "HS256"
pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2 = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

ROLE_LEVEL = {"consulta": 10, "operacional": 20, "supervisor": 30, "contador": 40, "admin": 50}

def hash_password(value: str) -> str:
    return pwd.hash(value)

def verify_password(value: str, hashed: str) -> bool:
    return pwd.verify(value, hashed)

def create_token(user: User) -> str:
    now = datetime.now(timezone.utc)
    return jwt.encode({"sub": str(user.id), "tenant": user.tenant_id, "role": user.role, "iat": now, "exp": now + timedelta(minutes=TOKEN_MINUTES)}, SECRET, algorithm=ALGO)

def current_user(token: str = Depends(oauth2), db: Session = Depends(get_db)) -> User:
    try:
        payload = jwt.decode(token, SECRET, algorithms=[ALGO])
        uid = int(payload["sub"])
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Sessão inválida")
    user = db.get(User, uid)
    if not user or not user.active:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Usuário inativo")
    return user

def require(level: str):
    def dep(user: User = Depends(current_user)):
        if ROLE_LEVEL.get(user.role, 0) < ROLE_LEVEL[level]:
            raise HTTPException(status_code=403, detail="Permissão insuficiente")
        return user
    return dep
