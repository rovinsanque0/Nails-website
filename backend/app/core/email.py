import resend
from app.core.config import settings

resend.api_key = settings.resend_api_key

async def send_contact_email(name: str, email: str, message: str):
    body = f"""
    <h3>New Contact Form Submission — DBClaws</h3>
    <p><strong>Name:</strong> {name}</p>
    <p><strong>Email:</strong> {email}</p>
    <p><strong>Message:</strong></p>
    <p>{message}</p>
    """

    resend.Emails.send({
        "from": "DBClaws <noreply@nails.rovin.cloud>",
        "to": settings.mail_to,
        "subject": f"New message from {name}",
        "html": body,
    })
