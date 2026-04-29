from pydantic import BaseModel

class UserCreate(BaseModel):

    name: str
    email: str
    password: str
    phone: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    is_admin: bool


class UserLogin(BaseModel):
    email: str
    password: str