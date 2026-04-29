from sqlalchemy import Column, String, Integer, Enum, DateTime, ForeignKey
from app.database.base import Base
import enum


class Status(str,enum.Enum):
    pending = "pending"
    confirmed = "confirmed"
    cancelled = "cancelled"

class Appointments(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key= True, index= True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable= False)
    service_id = Column(Integer, ForeignKey("services.id"), nullable= False)
    status = Column(Enum(Status), nullable=False, default=Status.pending)
    date = Column(DateTime, nullable= False)
    notes = Column(String)
