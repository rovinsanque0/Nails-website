import resend
from app.core.config import settings

resend.api_key = settings.resend_api_key

async def send_appointment_email(user_email: str, service_name: str, appointment_date: str):
    body = f"""
    <h3>New Appointment Booked — DBClaws</h3>
    <p><strong>Service:</strong> {service_name}</p>
    <p><strong>Date:</strong> {appointment_date}</p>
    <p><strong>Client Email:</strong> {user_email}</p>
    """

    resend.Emails.send({
        "from": "DBClaws <noreply@nails.rovin.cloud>",
        "to": settings.mail_to,
        "subject": f"New appointment: {service_name}",
        "html": body,
    })

async def send_contact_email(name: str, email: str, message: str):
    body = f"""
    <h3>New Contact Form Submission: DBClaws</h3>
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
