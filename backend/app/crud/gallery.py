from app.models.gallery import Gallery
from app.schemas.gallery import GalleryCreate
from sqlalchemy.orm import Session


def create_gallery(db: Session, gallery: GalleryCreate):
    db_gallery = Gallery(**gallery.model_dump())
    db.add(db_gallery)
    db.commit()
    db.refresh(db_gallery)
    return db_gallery

def get_gallery(db: Session):
    return db.query(Gallery).all()

def delete_gallery(db: Session, gallery_id: int):
    db.query(Gallery).filter(Gallery.id == gallery_id).delete()
    db.commit()