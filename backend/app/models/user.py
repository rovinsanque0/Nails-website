from sqlalchemy import Column, Integer, String, Boolean
from app.database.base import Base

class User(Base):
    __tablename__  = "users"

    id = Column(Integer,primary_key= True, index= True )
    name = Column(String, nullable= False)
    email = Column(String, unique= True, nullable = False)
    phone = Column(String, nullable = False)
    hashed_password = Column(String, nullable = False)
    is_admin = Column(Boolean, default= False)