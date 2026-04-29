from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.user import UserCreate, UserResponse, UserLogin
from app.core.security import verify_password, create_access_token
from app.crud.users import get_user_by_email, create_user

router = APIRouter()



@router.post("/user/register", response_model= UserResponse)
def new_user(user: UserCreate,db: Session= Depends(get_db)):
    return create_user(db, user)


@router.post("/user/login")
def login(user: UserLogin, db: Session= Depends(get_db)):
    db_user = get_user_by_email(db, user.email)
    if not db_user:
        raise HTTPException(status_code= 401, detail="Invalid credentials")
    if not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code= 401, detail="Invalid credentials")
    return {"access_token": create_access_token({"sub": user.email}), "is_admin": db_user.is_admin}
