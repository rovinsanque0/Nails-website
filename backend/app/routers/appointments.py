from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.appointment import AppointmentCreate, AppointmentStatusUpdate, AppointmentResponse
from app.crud.appointments import create_appointment as crud_create_appointment, update_appointment as crud_update_appointment, get_appointments as crud_get_appointment, get_user_appointments as crud_get_user_appointments
from app.core.dependencies import get_current_admin, get_current_user
from app.core.email import send_appointment_email
from app.crud.services import get_service as crud_get_service

router = APIRouter()


@router.post("/appointment", response_model= AppointmentResponse)
def create_appointment(appointment: AppointmentCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    db_appointment = crud_create_appointment(db, appointment, current_user.id)
    service = crud_get_service(db, appointment.service_id)
    background_tasks.add_task(send_appointment_email, current_user.email, service.name, str(appointment.appointment_date))
    return db_appointment


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