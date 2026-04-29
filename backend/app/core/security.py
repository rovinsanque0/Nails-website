import bcrypt
from jose import jwt, JWTError
from datetime import datetime, timedelta
from app.core.config import settings


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


def create_access_token(data: dict):
    copy_data = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=settings.jwt_expire_minutes)
    copy_data.update({"exp": expire})
    encode_data = jwt.encode(copy_data, settings.jwt_secret, algorithm=settings.jwt_algorithm)
    return encode_data

def decode_access_token(token: str):
    try:
        decode = jwt.decode(token, settings.jwt_secret, algorithms=[settings.jwt_algorithm])
        return decode
    except JWTError:
        return None
    

    