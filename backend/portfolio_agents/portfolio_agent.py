"""
Portfolio Agent implementation using OpenAI Agent SDK.
This agent handles queries about the portfolio owner's information,
skills, projects, and experience.
"""
import logging
import sys
from typing import Optional
from pathlib import Path

# Import from OpenAI Agent SDK
# Now safe to import since we renamed our local module to portfolio_agents
import agents as openai_agents
from agents.memory import Session, SQLiteSession

from config import settings

logger = logging.getLogger(__name__)


# Portfolio owner information
PORTFOLIO_INFO = """
# Portfolio Owner Information

## Personal Details
- **Name**: Muhammad Abdullah Athar
- **Age**: 17
- **Email**: muhammadabdullah51700@gmail.com
- **LinkedIn**: www.linkedin.com/in/muhammad-abdullah-athar
- **GitHub**: https://github.com/AbdullahMalik17

## Skills & Technologies
- **Frontend**: HTML, CSS, JavaScript, TypeScript
- **Backend**: Python
- **Tools**: N8n, OpenAI Agent SDK, Git & GitHub
- **Learning**: MCP (Model Context Protocol)
- **Education**: Learned through Panaversity.org

## Projects & Repositories
1. **Main Repository**: [AbdullahMalik17](https://github.com/AbdullahMalik17/AbdullahMalik17)
2. **Web Development Projects**: [Projects-of-html](https://github.com/AbdullahMalik17/Projects-of-html)
3. **AI Agents & Chatbots**: [Agentic_AI](https://github.com/AbdullahMalik17/Agentic_AI/tree/main/_Projects)
"""


def create_portfolio_agent() -> openai_agents.Agent:
    """
    Create and configure the portfolio assistant agent.
    
    Returns:
        Configured Agent instance
    """
    # Initialize OpenAI client with Gemini API
    client = openai_agents.AsyncOpenAI(
        api_key=settings.gemini_api_key,
        base_url=settings.gemini_base_url,
    )
    
    # Configure the LLM model
    model = openai_agents.OpenAIChatCompletionsModel(
        model=settings.default_model,
        openai_client=client,
    )
    
    # Agent instructions
    instructions = f"""You are a professional portfolio assistant agent. Your role is to help visitors 
learn about the portfolio owner in a friendly, concise, and professional manner.

{PORTFOLIO_INFO}

## Your Responsibilities:
1. Provide accurate information about the portfolio owner
2. Discuss skills, projects, and experience when asked
3. Be friendly, professional, and concise
4. Decline requests for private/sensitive information (addresses, phone numbers, secrets)
5. If unsure about something, admit it rather than guessing
6. Use the portfolio information provided above to answer questions accurately

## Guidelines:
- Keep responses clear and engaging
- Highlight relevant projects and skills when appropriate
- Encourage visitors to explore the portfolio
- Maintain a professional yet approachable tone
"""
    
    # Create the agent
    agent = openai_agents.Agent(
        name="PortfolioAssistant",
        instructions=instructions,
        model=model,
    )
    
    logger.info("Portfolio agent created successfully")
    return agent


def get_agent_session(session_id: str) -> Session:
    """
    Get or create a session for the agent.
    
    Args:
        session_id: Unique identifier for the session
        
    Returns:
        Session instance
    """
    return SQLiteSession(
        session_id=session_id,
        db_path=settings.session_db_path,
    )


# Global agent instance
_portfolio_agent: Optional[openai_agents.Agent] = None


def get_portfolio_agent() -> openai_agents.Agent:
    """Get the global portfolio agent instance (singleton)."""
    global _portfolio_agent
    if _portfolio_agent is None:
        _portfolio_agent = create_portfolio_agent()
    return _portfolio_agent

