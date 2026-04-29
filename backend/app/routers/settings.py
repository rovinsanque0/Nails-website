from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.settings import SiteSettings
from app.core.dependencies import get_current_admin

router = APIRouter()

def get_setting(db: Session, key: str, default: str = "true") -> str:
    row = db.query(SiteSettings).filter(SiteSettings.key == key).first()
    return row.value if row else default

def set_setting(db: Session, key: str, value: str):
    row = db.query(SiteSettings).filter(SiteSettings.key == key).first()
    if row:
        row.value = value
    else:
        db.add(SiteSettings(key=key, value=value))
    db.commit()

@router.get("/settings/booking")
def get_booking_status(db: Session = Depends(get_db)):
    return {"booking_enabled": get_setting(db, "booking_enabled") == "true"}

@router.patch("/settings/booking")
def toggle_booking(db: Session = Depends(get_db), current_user=Depends(get_current_admin)):
    current = get_setting(db, "booking_enabled")
    new_value = "false" if current == "true" else "true"
    set_setting(db, "booking_enabled", new_value)
    return {"booking_enabled": new_value == "true"}
