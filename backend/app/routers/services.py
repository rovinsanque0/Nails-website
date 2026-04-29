from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.service import ServiceCreate, ServiceResponse

#All crud imports
from app.crud.services import get_service as crud_get_service, create_service as crud_create_services, delete_service as crud_delete_service, get_services as crud_get_services
from app.core.dependencies import get_current_admin


router = APIRouter()


@router.get("/services", response_model=list[ServiceResponse])
def get_services(db: Session = Depends(get_db)):
    return crud_get_services(db)

@router.get("/services/{service_id}", response_model=ServiceResponse)
def get_service(service_id: int, db: Session= Depends(get_db)):
    return crud_get_service(db, service_id)

@router.post("/services", response_model=ServiceResponse)
def create_service(services: ServiceCreate,db: Session = Depends(get_db),current_user = Depends(get_current_admin)):
    return crud_create_services(db, services)

@router.delete("/services/{service_id}")
def delete_service(service_id:int, db: Session= Depends(get_db),current_user = Depends(get_current_admin)):
    crud_delete_service(db, service_id)
    return {"message" : "Service deleted successfully"}


    


