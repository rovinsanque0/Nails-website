from app.models.contact import Contact
from app.schemas.contact import ContactCreate
from sqlalchemy.orm import Session

def create_contact(db: Session, contact: ContactCreate):
    db_contact = Contact(**contact.model_dump())
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact


def get_contacts(db: Session):
    return db.query(Contact).all()


def get_contact(db: Session, contact_id: int):
    return db.query(Contact).filter(Contact.id == contact_id).first()

def mark_read(db: Session, contact_id: int):
    contact = db.query(Contact).filter(Contact.id == contact_id).first()
    if not contact:
        return None
    contact.is_read = True
    db.commit()
    db.refresh(contact)
    return contact