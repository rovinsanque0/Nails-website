from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.gallery import GalleryCreate, GalleryResponse

#import crud gallery
from app.crud.gallery import get_gallery as crud_get_gallery, create_gallery as crud_create_gallery, delete_gallery as crud_delete_gallery

from app.core.dependencies import get_current_admin

router = APIRouter()

@router.get("/gallery", response_model=list[GalleryResponse])
def get_gallery(db: Session = Depends(get_db)):
    return crud_get_gallery(db)


@router.post("/gallery", response_model=GalleryResponse)
def create_gallery(gallery: GalleryCreate, db: Session = Depends(get_db),current_user = Depends(get_current_admin)):
    return crud_create_gallery(db, gallery)

@router.delete("/gallery/{gallery_id}")
def delete_gallery(gallery_id: int, db: Session = Depends(get_db),current_user = Depends(get_current_admin)):
    crud_delete_gallery(db, gallery_id)
    return {"message": "Successfully deleted image"}
