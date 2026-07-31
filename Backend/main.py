from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, SessionLocal
from models import Base, Contact
from schemas import ContactCreate

# Create tables automatically
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="College Website API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "College Website Backend Running"}


@app.post("/contact")
def receive_contact(contact: ContactCreate):

    db: Session = SessionLocal()

    new_message = Contact(
        name=contact.name,
        email=contact.email,
        subject=contact.subject,
        message=contact.message
    )

    db.add(new_message)
    db.commit()
    db.refresh(new_message)
    db.close()

    return {
        "success": True,
        "message": "Message saved successfully!"
    }