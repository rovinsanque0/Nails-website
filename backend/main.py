from fastapi import FastAPI
from app.database.base import Base
from app.database.database import engine

#Importing models

from app.models import service, gallery, user, contact, appointment

#importing service
from app.routers import services, appointments, contact, gallery, users


app = FastAPI()

app.include_router(services.router)
app.include_router(appointments.router)
app.include_router(contact.router)
app.include_router(gallery.router)
app.include_router(users.router)

@app.get("/")
def root():
    return {"message": "Hello World"}


Base.metadata.create_all(bind=engine)