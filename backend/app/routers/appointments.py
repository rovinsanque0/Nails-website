from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.appointment import AppointmentCreate, AppointmentStatusUpdate, AppointmentResponse

#crud import for appointment

from app.crud.appointments import create_appointment as crud_create_appointment, update_appointment as crud_update_appointment, get_appointments as crud_get_appointment, get_user_appointments as crud_get_user_appointments

from app.core.dependencies import get_current_admin, get_current_user

router = APIRouter()


@router.post("/appointment", response_model= AppointmentResponse)
def create_appointment( appointment: AppointmentCreate,db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return crud_create_appointment(db, appointment,current_user.id)


@router.patch("/appointment/{appointment_id}", response_model=AppointmentResponse)
def update_appointment(appointment_id: int, status: AppointmentStatusUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_admin)):
    return crud_update_appointment(db, appointment_id, status)

@router.get("/appointment", response_model = list[AppointmentResponse])
def get_appointment(db: Session= Depends(get_db), current_user = Depends(get_current_user)):
    return crud_get_appointment(db)


@router.get("/appointment/{user_id}", response_model= list[AppointmentResponse])
def get_user_appointments(user_id: int, db: Session= Depends(get_db), current_user = Depends(get_current_user)):
    if current_user.id == user_id:
        return crud_get_user_appointments(db, user_id)
    raise HTTPException(status_code=403, detail="User not authenticated")