from pydantic import BaseModel
from typing import Optional


class GalleryCreate(BaseModel):
    image_url: str
    caption: Optional[str]

class GalleryResponse(BaseModel):
    id: int
    image_url: str
    caption: Optional[str]


    