from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime
from app.models.appointment import Status


class AppointmentCreate(BaseModel):
    service_id: int
    appointment_date: datetime
    notes: Optional[str] = None

class AppointmentStatusUpdate(BaseModel):
    status: Status

class AppointmentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    service_id: int
    date: datetime
    status: Status
    notes: Optional[str]
