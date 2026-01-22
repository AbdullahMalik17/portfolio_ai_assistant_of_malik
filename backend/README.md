# Portfolio AI Assistant - Backend

Professional backend implementation using OpenAI Agent SDK with Context7 integration support.

## 🏗️ Architecture

```
backend/
├── main.py                 # FastAPI application entry point
├── config.py              # Configuration management
├── agents/                # AI Agent implementations
│   ├── __init__.py
│   └── portfolio_agent.py
├── routes/                # API routes
│   ├── __init__.py
│   └── assistant.py
├── services/              # Business logic services
│   ├── __init__.py
│   └── context_service.py # Context7 integration
├── utils/                 # Utility functions
│   ├── __init__.py
│   └── logging_config.py
└── pyproject.toml         # Dependencies
```

## 🚀 Features

- **OpenAI Agent SDK**: Professional agent implementation with proper session management
- **Context7 Integration**: Support for dynamic documentation retrieval (optional)
- **FastAPI**: Modern REST API with automatic documentation
- **Session Management**: SQLite-based conversation history
- **Error Handling**: Comprehensive error handling and logging
- **Chainlit Support**: Optional chat interface integration

## 📦 Installation

```bash
# Install dependencies using uv (recommended)
cd backend
uv sync

# Or using pip
pip install -e .
```

## ⚙️ Configuration

Create a `.env` file in the `backend` directory:

```env
# Required
GEMINI_API_KEY=your_gemini_api_key_here

# Optional
OPENAI_API_KEY=your_openai_api_key_here
DEBUG=false
HOST=0.0.0.0
PORT=8000
CONTEXT7_ENABLED=false
SESSION_DB_PATH=conversations.db
```

## 🏃 Running the Server

### Using Python directly:
```bash
python main.py
```

### Using Uvicorn:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Using Chainlit (optional):
```bash
chainlit run main.py
```

## 📡 API Endpoints

### Health Check
```bash
GET /health
GET /api/assistant/health
```

### Chat Endpoint
```bash
POST /api/assistant/chat
Content-Type: application/json

{
  "message": "Tell me about your skills",
  "session_id": "optional_session_id"
}
```

### Synchronous Chat (for testing)
```bash
POST /api/assistant/chat/sync
```

### API Documentation
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 🤖 Agent Features

### Portfolio Agent
- Provides information about portfolio owner
- Discusses skills, projects, and experience
- Maintains conversation context using sessions
- Professional, friendly responses

### Session Management
- Automatic conversation history management
- SQLite-based persistent storage
- Session isolation for multiple users
- Configurable database path

## 🔧 Development

### Code Structure
- **Modular Design**: Separate concerns (agents, routes, services)
- **Type Safety**: Full type hints throughout
- **Error Handling**: Comprehensive exception handling
- **Logging**: Structured logging for debugging

### Adding New Features
1. **New Agents**: Add to `agents/` directory
2. **New Routes**: Add to `routes/` directory
3. **New Services**: Add to `services/` directory

## 📚 Dependencies

- `fastapi`: Web framework
- `uvicorn`: ASGI server
- `openai-agents`: OpenAI Agent SDK
- `chainlit`: Optional chat interface
- `pydantic`: Data validation
- `python-dotenv`: Environment variable management

## 🔐 Security Notes

- Never commit `.env` files
- Keep API keys secure
- Use environment variables for sensitive data
- Enable CORS only for trusted origins in production

## 🐛 Troubleshooting

### Agent Initialization Fails
- Check that `GEMINI_API_KEY` is set correctly
- Verify API key is valid
- Check network connectivity

### Session Errors
- Ensure write permissions for database file
- Check `SESSION_DB_PATH` is valid

### Import Errors
- Run `pip install -e .` to install in development mode
- Check Python version (requires >= 3.11)

## 📝 License

MIT License

