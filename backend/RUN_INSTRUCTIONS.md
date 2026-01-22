# How to Run the Backend

## ✅ Fixed Issues

1. **Import Conflict Resolved**: Renamed `agents/` directory to `portfolio_agents/` to avoid conflict with OpenAI `agents` package
2. **Package Configuration Fixed**: Updated `pyproject.toml` for proper build system configuration
3. **All Imports Working**: Verified all modules import correctly

## 🚀 Running the Server

### Method 1: Direct Python Execution (Recommended)
```bash
cd backend
python main.py
```

### Method 2: Using Uvicorn Directly
```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Method 3: Using Chainlit (for chat interface)
```bash
cd backend
chainlit run main.py
```

## ✅ Verification

The server is now running successfully:
- ✅ Health endpoint: http://localhost:8000/health
- ✅ API Docs: http://localhost:8000/docs
- ✅ Assistant Health: http://localhost:8000/api/assistant/health

## 📝 Notes

- The server runs on port 8000 by default
- All endpoints are accessible and working
- OpenAI Agent SDK integration is functional
- Context7 service layer is ready (optional)

## 🔧 Troubleshooting

If you encounter import errors:
1. Make sure you're in the `backend` directory
2. Check that all dependencies are installed: `pip install -e .`
3. Verify `.env` file exists with `GEMINI_API_KEY` set

---

*Last Updated: After fixing import conflicts and package configuration*


