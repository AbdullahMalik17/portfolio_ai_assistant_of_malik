"""Routes package for backend application."""
from .assistant import router as assistant_router, compat_router

__all__ = ["assistant_router", "compat_router"]

