from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.database.database import get_db
from app.schemas.user import UserCreate, UserResponse, UserLogin
from app.core.security import verify_password, create_access_token, create_reset_token, decode_reset_token, hash_password
from app.crud.users import get_user_by_email, create_user
from app.core.email import send_reset_email
from app.core.config import settings

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


class ForgotPasswordRequest(BaseModel):
    email: str

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str

@router.post("/user/forgot-password")
async def forgot_password(body: ForgotPasswordRequest, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    user = get_user_by_email(db, body.email)
    if user:
        token = create_reset_token(body.email)
        reset_link = f"{settings.frontend_url}/reset-password?token={token}"
        background_tasks.add_task(send_reset_email, body.email, reset_link)
    return {"message": "If that email exists, a reset link has been sent."}

@router.post("/user/reset-password")
def reset_password(body: ResetPasswordRequest, db: Session = Depends(get_db)):
    email = decode_reset_token(body.token)
    if not email:
        raise HTTPException(status_code=400, detail="Invalid or expired reset token.")
    user = get_user_by_email(db, email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
    user.hashed_password = hash_password(body.new_password)
    db.commit()
    return {"message": "Password updated successfully."}
