from app.models.appointment import Appointments, Status
from app.schemas.appointment import AppointmentCreate, AppointmentStatusUpdate
from sqlalchemy.orm import Session
from fastapi import HTTPException

def create_appointment(db: Session, appointment: AppointmentCreate, user_id: int):
    data = appointment.model_dump()
    data["date"] = data.pop("appointment_date")
    db_appointment = Appointments(**data, user_id=user_id)
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment

def update_appointment(db: Session, appointment_id: int, status: AppointmentStatusUpdate):
    appointment = db.query(Appointments).filter(Appointments.id == appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    appointment.status = status.status
    db.commit()
    db.refresh(appointment)
    return appointment

def get_appointments(db: Session):
    return db.query(Appointments).all()

def get_user_appointments(db: Session, user_id: int):
    return db.query(Appointments).filter(Appointments.user_id == user_id).all()
