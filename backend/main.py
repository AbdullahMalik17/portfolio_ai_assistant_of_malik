"""
Main application entry point for Portfolio AI Assistant backend.
Provides both FastAPI REST API and optional Chainlit interface.
"""
import logging
import sys
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from config import settings, validate_settings
from routes import assistant_router

# Configure logging
logging.basicConfig(
    level=logging.DEBUG if settings.debug else logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout),
    ]
)

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan context manager.
    Handles startup and shutdown tasks.
    """
    # Startup
    logger.info(f"Starting {settings.app_name} v{settings.app_version}")
    
    # Validate settings
    is_valid, error_msg = validate_settings()
    if not is_valid:
        logger.error(f"Configuration error: {error_msg}")
        logger.error("Please set required environment variables in .env file")
        sys.exit(1)
    
    logger.info("Configuration validated successfully")
    logger.info(f"Using model: {settings.default_model}")
    
    # Initialize agent (lazy loading, but pre-initialize for faster first request)
    try:
        from portfolio_agents import get_portfolio_agent
        agent = get_portfolio_agent()
        logger.info("Portfolio agent initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize agent: {e}", exc_info=True)
        sys.exit(1)
    
    yield
    
    # Shutdown
    logger.info("Shutting down application...")


# Create FastAPI application
app = FastAPI(
    title=settings.app_name,
    description="Professional Portfolio AI Assistant with OpenAI Agent SDK",
    version=settings.app_version,
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(assistant_router)
from routes import compat_router
app.include_router(compat_router)
from routes.contact import router as contact_router
app.include_router(contact_router)

# Root endpoint
@app.get("/")
async def root():
    """Root endpoint providing API information."""
    return {
        "service": settings.app_name,
        "version": settings.app_version,
        "status": "operational",
        "docs": "/docs",
        "health": "/api/assistant/health",
    }


@app.get("/health")
async def health():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "service": settings.app_name,
        "version": settings.app_version,
    }


# Error handlers
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """Global exception handler."""
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "error": "An unexpected error occurred",
            "detail": str(exc) if settings.debug else "Internal server error",
        }
    )


# Chainlit integration (optional, for chat interface)
try:
    import chainlit as cl
    
    @cl.on_chat_start
    async def chainlit_start():
        """Chainlit chat start handler."""
        from portfolio_agents import get_portfolio_agent
        agent = get_portfolio_agent()
        cl.Message(
            content="Hello! I'm your professional portfolio assistant. How can I help you today?"
        ).send()
    
    @cl.on_message
    async def chainlit_message(message: cl.Message):
        """Chainlit message handler."""
        import agents as openai_agents
        from portfolio_agents import get_portfolio_agent, get_agent_session
        
        agent = get_portfolio_agent()
        session = get_agent_session("chainlit_session")
        
        result = await openai_agents.Runner.run(
            starting_agent=agent,
            input=message.content,
            session=session,
        )
        
        cl.Message(content=result.final_output).send()
    
    logger.info("Chainlit integration enabled")
    
except ImportError:
    logger.debug("Chainlit not available, skipping Chainlit integration")


if __name__ == "__main__":
    import uvicorn
    
    logger.info(f"Starting server on {settings.host}:{settings.port}")
    uvicorn.run(
        "main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug,
        log_level="info",
    )
