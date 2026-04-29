from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.core.security import decode_access_token
from app.crud.users import get_user_by_email

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/user/login")

def get_current_user(token: str= Depends(oauth2_scheme) ,db: Session= Depends(get_db)):

    payload = decode_access_token(token)

    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    email = payload.get("sub")
    if not email:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = get_user_by_email(db, email)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")
    return user

def get_current_admin(token: str= Depends(oauth2_scheme) ,db: Session= Depends(get_db)):
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    email = payload.get("sub")
    if not email:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = get_user_by_email(db,email)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    return user
