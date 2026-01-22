"""
FastAPI routes for the AI assistant endpoints.
Handles chat requests and conversation management.
"""
import logging
from typing import Optional
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
import sys
from pathlib import Path

# Fix import - use OpenAI agents package
backend_path = Path(__file__).parent.parent
if str(backend_path) not in sys.path:
    sys.path.insert(0, str(backend_path))

import agents as openai_agents
from portfolio_agents import get_portfolio_agent, get_agent_session
from config import settings

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/assistant", tags=["assistant"])

# Compatibility router for frontend
compat_router = APIRouter(prefix="/api", tags=["compat"])


# Request/Response Models
class ChatRequest(BaseModel):
    """Request model for chat endpoint."""
    message: str = Field(..., description="User's message", min_length=1, max_length=2000)
    session_id: Optional[str] = Field(None, description="Session ID for conversation continuity")
    conversation_history: Optional[list[dict]] = Field(None, description="Previous conversation messages")


class ChatResponse(BaseModel):
    """Response model for chat endpoint."""
    success: bool = Field(..., description="Whether the request was successful")
    response: str = Field(..., description="Assistant's response")
    session_id: Optional[str] = Field(None, description="Session ID for the conversation")
    model: str = Field(..., description="Model used for generation")


class HealthResponse(BaseModel):
    """Health check response model."""
    status: str
    service: str
    version: str
    model: str


@router.get("/health", response_model=HealthResponse)
async def health_check():
    """
    Health check endpoint to verify service status.
    
    Returns:
        Health status information
    """
    return HealthResponse(
        status="healthy",
        service=settings.app_name,
        version=settings.app_version,
        model=settings.default_model,
    )


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Chat endpoint for interacting with the portfolio assistant.
    
    Args:
        request: Chat request with message and optional session info
        
    Returns:
        Chat response with assistant's reply
        
    Raises:
        HTTPException: If request is invalid or processing fails
    """
    try:
        # Validate message
        if not request.message or not request.message.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Message cannot be empty"
            )
        
        logger.info(f"Received chat request: {request.message[:50]}...")
        
        # Get agent instance
        agent = get_portfolio_agent()
        
        # Handle session
        session = None
        session_id = request.session_id or "default_session"
        
        if session_id:
            session = get_agent_session(session_id)
            logger.debug(f"Using session: {session_id}")
        
        # Run the agent
        try:
            result = await openai_agents.Runner.run(
                starting_agent=agent,
                input=request.message.strip(),
                session=session,
            )
            
            response_text = result.final_output
            logger.info(f"Agent response generated successfully")
            
        except Exception as e:
            logger.error(f"Error running agent: {e}", exc_info=True)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Error processing request: {str(e)}"
            )
        
        return ChatResponse(
            success=True,
            response=response_text,
            session_id=session_id,
            model=settings.default_model,
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error in chat endpoint: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred"
        )


@router.post("/chat/sync", response_model=ChatResponse)
async def chat_sync(request: ChatRequest):
    """
    Synchronous chat endpoint (for testing/compatibility).
    
    Args:
        request: Chat request with message and optional session info
        
    Returns:
        Chat response with assistant's reply
    """
    try:
        if not request.message or not request.message.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Message cannot be empty"
            )
        
        logger.info(f"Received sync chat request: {request.message[:50]}...")
        
        agent = get_portfolio_agent()
        
        session = None
        session_id = request.session_id or "default_session"
        
        if session_id:
            session = get_agent_session(session_id)
        
        # Use synchronous runner
        result = openai_agents.Runner.run_sync(
            starting_agent=agent,
            input=request.message.strip(),
            session=session,
        )
        
        return ChatResponse(
            success=True,
            response=result.final_output,
            session_id=session_id,
            model=settings.default_model,
        )
        
    except Exception as e:
        logger.error(f"Error in sync chat: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error processing request: {str(e)}"
        )


# Compatibility endpoint for frontend (/api/chat)
@compat_router.post("/chat")
async def chat_compat(request: ChatRequest):
    """
    Compatibility endpoint for frontend that expects /api/chat.
    Returns response in the format expected by the frontend.
    """
    try:
        # Extract just the message if it contains the system prefix
        message = request.message
        if message.startswith("You are an assistant"):
            # Frontend sends message with system prefix, extract just the user message
            lines = message.split("\n\nUser: ")
            if len(lines) > 1:
                message = lines[-1]
        
        # Create new request with cleaned message
        clean_request = ChatRequest(message=message, session_id=request.session_id)
        
        # Get response
        result = await chat(clean_request)
        
        # Return in format expected by frontend
        return {
            "success": result.success,
            "response": result.response,
            "model": result.model,
        }
    except Exception as e:
        logger.error(f"Error in compat endpoint: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error processing request: {str(e)}"
        )

