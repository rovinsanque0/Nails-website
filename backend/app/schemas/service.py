from pydantic import BaseModel
from typing import Optional


class ServiceCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    duration: int
    is_active: bool

class ServiceResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: float
    duration: int
    is_active: bool