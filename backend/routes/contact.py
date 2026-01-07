"""
FastAPI routes for contact form submissions.
Saves contact messages to a SQLite database and sends email notifications.
"""
import sqlite3
import logging
import smtplib
import os
from datetime import datetime
from pathlib import Path
from typing import List, Optional
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr, Field

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/contact", tags=["contact"])

# Database file
DB_FILE = Path("contacts.db")


class ContactRequest(BaseModel):
    """Request model for contact form."""
    name: str = Field(..., min_length=1, description="Sender's name")
    email: EmailStr = Field(..., description="Sender's email")
    phone: Optional[str] = Field(None, description="Sender's phone number")
    subject: str = Field(..., min_length=1, description="Message subject")
    message: str = Field(..., min_length=1, description="Message content")


class ContactResponse(BaseModel):
    """Response model for contact form."""
    success: bool
    message: str


def init_db():
    """Initialize the database table and handle migrations."""
    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        
        # Create table if not exists (original schema)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS contacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                message TEXT NOT NULL,
                timestamp TEXT NOT NULL
            )
        """)
        
        # Check and migrate columns
        cursor.execute("PRAGMA table_info(contacts)")
        columns = [info[1] for info in cursor.fetchall()]
        
        if 'phone' not in columns:
            cursor.execute("ALTER TABLE contacts ADD COLUMN phone TEXT")
            logger.info("Added 'phone' column to contacts table")
            
        if 'subject' not in columns:
            cursor.execute("ALTER TABLE contacts ADD COLUMN subject TEXT")
            logger.info("Added 'subject' column to contacts table")

        conn.commit()
        conn.close()
        return True
    except Exception as e:
        logger.error(f"Error initializing database: {e}")
        return False


def save_contact(contact_data: dict):
    """Save contact data to SQLite database."""
    try:
        # Ensure DB exists and is migrated
        init_db()
        
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        
        timestamp = datetime.now().isoformat()
        
        cursor.execute("""
            INSERT INTO contacts (name, email, phone, subject, message, timestamp)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (
            contact_data["name"], 
            contact_data["email"], 
            contact_data.get("phone"), 
            contact_data["subject"], 
            contact_data["message"], 
            timestamp
        ))
        
        conn.commit()
        conn.close()
        return True
    except Exception as e:
        logger.error(f"Error saving contact: {e}")
        return False


def send_email_notification(contact_data: dict):
    """Send an email notification about the new contact."""
    sender_email = os.getenv("EMAIL_USER")
    sender_password = os.getenv("EMAIL_PASSWORD")
    recipient_email = os.getenv("RECIPIENT_EMAIL", "muhammadabdullah51700@gmail.com")
    smtp_host = os.getenv("EMAIL_HOST", "smtp.gmail.com")
    smtp_port = int(os.getenv("EMAIL_PORT", "587"))

    if not sender_email or not sender_password:
        logger.warning("Email credentials (EMAIL_USER, EMAIL_PASSWORD) not set. Skipping email notification.")
        return False

    try:
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = recipient_email
        msg['Subject'] = f"New Portfolio Contact: {contact_data['subject']}"

        body = f"""
        You have received a new message from your portfolio website.

        Name: {contact_data['name']}
        Email: {contact_data['email']}
        Phone: {contact_data.get('phone', 'N/A')}
        Subject: {contact_data['subject']}
        
        Message:
        {contact_data['message']}
        """

        msg.attach(MIMEText(body, 'plain'))

        server = smtplib.SMTP(smtp_host, smtp_port)
        server.starttls()
        server.login(sender_email, sender_password)
        text = msg.as_string()
        server.sendmail(sender_email, recipient_email, text)
        server.quit()
        
        logger.info(f"Email notification sent to {recipient_email}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email notification: {e}")
        return False


@router.post("", response_model=ContactResponse)
async def submit_contact(request: ContactRequest):
    """
    Handle contact form submission.
    Saves the message to a SQLite database and sends an email.
    """
    try:
        logger.info(f"Received contact message from {request.email}")
        
        contact_data = request.model_dump()
        
        # 1. Save to Database
        db_success = save_contact(contact_data)
        
        # 2. Send Email Notification
        email_success = send_email_notification(contact_data)
        
        if db_success:
            msg = "Thank you! Your message has been received."
            if not email_success:
                # We don't tell the user email failed if DB saved, but we log it.
                logger.warning("Contact saved to DB but email notification failed.")
            
            return ContactResponse(
                success=True,
                message=msg
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to save message"
            )
            
    except Exception as e:
        logger.error(f"Error processing contact form: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
