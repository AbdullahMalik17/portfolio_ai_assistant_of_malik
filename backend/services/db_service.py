"""
Database service handling connections and operations.
Supports both SQLite (local) and PostgreSQL (Supabase/online) via SQLAlchemy.
"""
import os
import logging
from datetime import datetime
from typing import Optional

from sqlalchemy import create_engine, Column, Integer, String, Text
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.pool import QueuePool

logger = logging.getLogger(__name__)

Base = declarative_base()

class Contact(Base):
    """Contact model for database storage."""
    __tablename__ = 'contacts'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    company = Column(String, nullable=True)
    subject = Column(String, nullable=False)
    project_type = Column(String, nullable=True)
    budget = Column(String, nullable=True)
    timeline = Column(String, nullable=True)
    message = Column(Text, nullable=False)
    timestamp = Column(String, nullable=False, default=datetime.utcnow().isoformat)

class DatabaseService:
    def __init__(self):
        # Prefer DATABASE_URL env var, fallback to local SQLite
        # Note: SQLAlchemy expects 'postgresql://' not 'postgres://' which some providers give
        self.database_url = os.getenv("DATABASE_URL")
        
        if self.database_url:
            if self.database_url.startswith("postgres://"):
                self.database_url = self.database_url.replace("postgres://", "postgresql://", 1)
            logger.info("🔌 Using configured DATABASE_URL (Online Database)")
            self.engine = create_engine(
                self.database_url,
                poolclass=QueuePool,
                pool_size=5,
                max_overflow=10
            )
        else:
            logger.info("📂 Using local SQLite database (contacts.db)")
            # SQLite needs absolute path or correct relative path
            # We assume contacts.db is in the backend root
            db_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "contacts.db")
            self.engine = create_engine(f"sqlite:///{db_path}")

        self.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)
        self._init_db()

    def _init_db(self):
        """Initialize database tables."""
        try:
            Base.metadata.create_all(bind=self.engine)
            logger.info("✅ Database tables verified/created.")
        except Exception as e:
            logger.error(f"❌ Database initialization failed: {e}")

    def save_contact(self, data: dict) -> bool:
        """Save contact data to the database."""
        session = self.SessionLocal()
        try:
            new_contact = Contact(
                name=data["name"],
                email=data["email"],
                phone=data.get("phone"),
                company=data.get("company"),
                subject=data["subject"],
                project_type=data.get("projectType") or data.get("project_type"),
                budget=data.get("budget"),
                timeline=data.get("timeline"),
                message=data["message"],
                timestamp=datetime.now().isoformat()
            )
            session.add(new_contact)
            session.commit()
            session.refresh(new_contact)
            logger.info(f"💾 Contact saved successfully with ID: {new_contact.id}")
            return True
        except Exception as e:
            logger.error(f"❌ Failed to save contact: {e}")
            session.rollback()
            return False
        finally:
            session.close()

# Global instance
db_service = DatabaseService()
