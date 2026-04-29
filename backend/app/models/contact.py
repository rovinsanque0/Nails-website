from sqlalchemy import String, Integer, Column, Boolean
from app.database.base import Base

class Contact(Base):
    __tablename__ = "contact"

    id = Column(Integer, primary_key= True, index= True)
    name = Column(String, nullable= False)
    email = Column(String, nullable= False)
    message = Column(String, nullable= False)
    is_read = Column(Boolean, default= False)