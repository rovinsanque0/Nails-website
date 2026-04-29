from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from app.core.config import settings

conf = ConnectionConfig(
    MAIL_USERNAME=settings.mail_username,
    MAIL_PASSWORD=settings.mail_password,
    MAIL_FROM=settings.mail_from,
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
)

async def send_contact_email(name: str, email: str, message: str):
    body = f"""
    <h3>New Contact Form Submission — Nails by Regina</h3>
    <p><strong>Name:</strong> {name}</p>
    <p><strong>Email:</strong> {email}</p>
    <p><strong>Message:</strong></p>
    <p>{message}</p>
    """

    msg = MessageSchema(
        subject=f"New message from {name}",
        recipients=[settings.mail_to],
        body=body,
        subtype=MessageType.html,
    )

    fm = FastMail(conf)
    await fm.send_message(msg)
