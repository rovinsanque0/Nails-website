from pydantic import BaseModel
from typing import Optional


class ServiceCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    duration: str
    is_active: bool = True

class ServiceResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: float
    duration: str
    is_active: bool