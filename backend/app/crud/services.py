from sqlalchemy.orm import Session
from app.models.service import Service
from app.schemas.service import ServiceCreate

def get_services(db: Session):
    return db.query(Service).all()


def get_service(db: Session, service_id: int):
    return db.query(Service).filter(Service.id == service_id).first()

def create_service(db: Session, service: ServiceCreate):
    db_service = Service(**service.model_dump())
    db.add(db_service)
    db.commit()
    db.refresh(db_service)
    return db_service



def delete_service(db: Session, service_id: int):
    db.query(Service).filter(Service.id == service_id).delete()
    db.commit()