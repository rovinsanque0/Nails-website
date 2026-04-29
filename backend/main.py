from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.base import Base
from app.database.database import engine
from app.core.config import settings

# Importing models
from app.models import service, gallery, user, contact, appointment

# Importing routers
from app.routers import services, appointments, contact, gallery, users

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(services.router)
app.include_router(appointments.router)
app.include_router(contact.router)
app.include_router(gallery.router)
app.include_router(users.router)

@app.get("/")
def root():
    return {"message": "Nails by Regina API"}

@app.get("/health")
def health():
    return {"status": "ok"}

Base.metadata.create_all(bind=engine)
