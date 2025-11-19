"""
FastAPI routes for contact form submissions.
Saves contact messages to a SQLite database.
"""
import sqlite3
import logging
from datetime import datetime
from pathlib import Path
from typing import List

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
    message: str = Field(..., min_length=1, description="Message content")


class ContactResponse(BaseModel):
    """Response model for contact form."""
    success: bool
    message: str


def init_db():
    """Initialize the database table."""
    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS contacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                message TEXT NOT NULL,
                timestamp TEXT NOT NULL
            )
        """)
        conn.commit()
        conn.close()
        return True
    except Exception as e:
        logger.error(f"Error initializing database: {e}")
        return False


def save_contact(contact_data: dict):
    """Save contact data to SQLite database."""
    try:
        # Ensure DB exists
        init_db()
        
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        
        timestamp = datetime.now().isoformat()
        
        cursor.execute("""
            INSERT INTO contacts (name, email, message, timestamp)
            VALUES (?, ?, ?, ?)
        """, (contact_data["name"], contact_data["email"], contact_data["message"], timestamp))
        
        conn.commit()
        conn.close()
        return True
    except Exception as e:
        logger.error(f"Error saving contact: {e}")
        return False


@router.post("", response_model=ContactResponse)
async def submit_contact(request: ContactRequest):
    """
    Handle contact form submission.
    Saves the message to a SQLite database.
    """
    try:
        logger.info(f"Received contact message from {request.email}")
        
        # Save contact data
        contact_data = request.model_dump()
        if save_contact(contact_data):
            return ContactResponse(
                success=True,
                message="Thank you! Your message has been received."
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
