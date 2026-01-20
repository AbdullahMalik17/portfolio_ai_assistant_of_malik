"""
Configuration management for the backend application.
Handles environment variables, API keys, and application settings.
"""
import os
from typing import Optional
from dotenv import load_dotenv, find_dotenv


# Load environment variables
load_dotenv(find_dotenv())


class Settings:
    """Application settings loaded from environment variables."""
    
    def __init__(self):
        # API Keys
        self.openai_api_key: Optional[str] = os.getenv("OPENAI_API_KEY", "")
        self.gemini_api_key: Optional[str] = os.getenv("GEMINI_API_KEY", "")
        
        # Application Settings
        self.app_name: str = "Portfolio AI Assistant"
        self.app_version: str = "1.0.0"
        self.debug: bool = os.getenv("DEBUG", "false").lower() == "true"
        
        # Server Settings
        self.host: str = os.getenv("HOST", "0.0.0.0")
        self.port: int = int(os.getenv("PORT", "8000"))
        
        # CORS Settings
        cors_origins_str = os.getenv("CORS_ORIGINS", "")
        if cors_origins_str:
            self.cors_origins: list[str] = [origin.strip() for origin in cors_origins_str.split(",")]
        else:
            self.cors_origins: list[str] = ["*"]
        
        # AI Model Settings
        self.default_model: str = os.getenv("DEFAULT_MODEL", "gemini-2.5-flash")
        self.gemini_base_url: str = "https://generativelanguage.googleapis.com/v1beta/openai/"
        
        # Context7 Settings (if using Context7 MCP)
        self.context7_enabled: bool = os.getenv("CONTEXT7_ENABLED", "false").lower() == "true"
        
        # Session Settings
        self.session_db_path: str = os.getenv("SESSION_DB_PATH", "conversations.db")


# Global settings instance
settings = Settings()


def validate_settings() -> tuple[bool, Optional[str]]:
    """
    Validate that required settings are present.
    
    Returns:
        Tuple of (is_valid, error_message)
    """
    if not settings.gemini_api_key:
        return False, "GEMINI_API_KEY environment variable is required"
    
    return True, None

