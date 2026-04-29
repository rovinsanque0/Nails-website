from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.contact import ContactCreate, ContactResponse
from app.crud.contact import get_contact as crud_get_contact, get_contacts as crud_get_contacts, mark_read as crud_mark_read, create_contact as crud_create_contact
from app.core.dependencies import get_current_admin
from app.core.email import send_contact_email

router = APIRouter()

@router.get("/contact", response_model=list[ContactResponse])
def get_contacts(db: Session = Depends(get_db), current_user=Depends(get_current_admin)):
    return crud_get_contacts(db)

@router.get("/contact/{contact_id}", response_model=ContactResponse)
def get_contact(contact_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_admin)):
    return crud_get_contact(db, contact_id)

@router.post("/contact/", response_model=ContactResponse)
async def create_contact(contact: ContactCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    db_contact = crud_create_contact(db, contact)
    background_tasks.add_task(send_contact_email, contact.name, contact.email, contact.message)
    return db_contact

@router.patch("/contact/{contact_id}", response_model=ContactResponse)
def mark_read(contact_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_admin)):
    return crud_mark_read(db, contact_id)
