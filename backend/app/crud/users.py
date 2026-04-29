from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import hash_password


def get_user_by_email(db: Session, user_email: str):
    return db.query(User).filter(User.email == user_email).first()

def create_user(db: Session, user: UserCreate):
    hashed = hash_password(user.password)
    db_user = User(name = user.name, email = user.email, hashed_password = hashed, phone = user.phone)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user