from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta
from app.core.config import settings

pwd_context  = CryptContext(schemes=["bcrypt"],deprecated="auto")


def hash_password(password:str):
    return pwd_context.hash(password)

def verify_password(plain,hashed):
    return pwd_context.verify(plain,hashed)


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
    

    