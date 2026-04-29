from sqlalchemy import String, Integer, Column
from app.database.base import Base


class Gallery(Base):
    __tablename__ = "gallery"

    id = Column(Integer, primary_key= True, index= True)
    image_url = Column(String, nullable= False)
    caption = Column(String)

    