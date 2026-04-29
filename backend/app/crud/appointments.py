from app.models.appointment import Appointments, Status
from app.schemas.appointment import AppointmentCreate
from sqlalchemy.orm import Session

def create_appointment(db: Session, appointment: AppointmentCreate, user_id: int):
    db_appointment = Appointments(**appointment.model_dump(), user_id = user_id)
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment


def update_appointment(db: Session, appointment_id: int, status: Status):
    appointment =  db.query(Appointments).filter(Appointments.id == appointment_id).first()
    appointment.status = status
    db.commit()

def get_appointments(db: Session):
    return db.query(Appointments).all()

def get_user_appointments(db: Session, user_id: int):
    return db.query(Appointments).filter(Appointments.user_id == user_id).all()