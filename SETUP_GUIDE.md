# 🚀 Setup Guide - Portfolio AI Assistant

## Step-by-Step Setup Instructions

### 1️⃣ Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"** (or use an existing key)
4. Copy your API key (it will look like: `AIzaSy...`)

### 2️⃣ Setup Backend

Open a new terminal window:

```bash
# Navigate to project
cd Portfolio-AI-Assistant-

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Linux/Mac:
source venv/bin/activate

# Navigate to backend
cd backend

# Install dependencies
pip install -r requirements.txt

# Create .env file (copy from example)
copy env.example .env

# Edit .env file and add your Gemini API key
# Open .env in any text editor and replace:
# GEMINI_API_KEY=your_gemini_api_key_here
# with your actual key like:
# GEMINI_API_KEY=AIzaSy...
```

### 3️⃣ Run Backend Server

```bash
# Make sure you're in the backend directory
# and virtual environment is activated

python main.py
```

You should see:
```
INFO:     Started server process
INFO:     Uvicorn running on http://0.0.0.0:8000
```

✅ Backend is now running at: http://localhost:8000

### 4️⃣ Setup Frontend (Already Running)

The frontend is already running at: http://localhost:3000

If not, in a new terminal:

```bash
cd frontend
npm install
npm run dev
```

### 5️⃣ Test the Connection

1. Open browser: http://localhost:3000
2. Scroll down to the Contact section
3. Fill out the form and click "Send Message"
4. You should see a success message!

### 6️⃣ View API Documentation

Open in browser: http://localhost:8000/docs

You can test all API endpoints here!

## 🎯 Testing Your Gemini API Key

### Quick Test Script

Create a file `test_gemini.py` in the backend folder:

```python
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("❌ GEMINI_API_KEY not found in .env file")
    exit(1)

try:
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content("Say hello!")
    print("✅ Gemini API is working!")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"❌ Error: {e}")
```

Run it:
```bash
python test_gemini.py
```

## 🐛 Troubleshooting

### Backend won't start

**Problem**: `ImportError` or `ModuleNotFoundError`
```bash
# Make sure virtual environment is activated
# Reinstall dependencies
pip install -r requirements.txt
```

### API Key not working

**Problem**: 403 or 401 errors

**Solution**:
1. Check `.env` file exists in `backend/` folder
2. Make sure the key is on one line: `GEMINI_API_KEY=your_key_here`
3. No quotes around the key
4. Restart the server after changing `.env`

### Frontend can't connect to backend

**Problem**: CORS or connection refused

**Solution**:
1. Make sure backend is running on http://localhost:8000
2. Check terminal for backend errors
3. Try: http://localhost:8000/health to test

### Port already in use

**Problem**: Port 3000 or 8000 already in use

**Solution**:

For frontend (port 3000):
```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

For backend (port 8000):
```bash
# Kill process on port 8000
# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

Or change the port in `main.py`:
```python
uvicorn.run(app, host="0.0.0.0", port=8001)
```

## ✅ Success Checklist

- [ ] Gemini API key obtained
- [ ] Python virtual environment created and activated
- [ ] Backend dependencies installed
- [ ] `.env` file created with API key
- [ ] Backend server running on http://localhost:8000
- [ ] Frontend running on http://localhost:3000
- [ ] Contact form successfully sends messages
- [ ] API documentation accessible at http://localhost:8000/docs

## 🎉 You're All Set!

Your portfolio website with AI assistant is now fully functional!

**Next Steps**:
- Customize the frontend content to match your information
- Add your actual projects and skills
- Deploy to production when ready

**Need Help?**
- Check backend logs in terminal
- Visit http://localhost:8000/docs for API documentation
- Test with: http://localhost:8000/health

