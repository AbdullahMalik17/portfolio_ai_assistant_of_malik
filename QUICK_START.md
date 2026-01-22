# ⚡ Quick Start Guide

## Get Up and Running in 5 Minutes!

### 1. Get Your Gemini API Key
👉 [Click here](https://makersuite.google.com/app/apikey) and create your API key

### 2. Setup Backend (Terminal 1)

```bash
# Navigate to backend
cd backend

# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# OR
source venv/bin/activate  # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Create .env file and add your key
copy env.example .env
# Edit .env and paste your GEMINI_API_KEY

# Test setup
python test_setup.py

# Start backend
python main.py
```

✅ Backend running at: http://localhost:8000

### 3. Setup Frontend (Terminal 2)

```bash
# Navigate to frontend
cd frontend

# Install dependencies (if not done)
npm install

# Start frontend
npm run dev
```

✅ Frontend running at: http://localhost:3000

### 4. You're Done! 🎉

Open your browser: http://localhost:3000

### 📁 Important Files

- `backend/.env` - Add your GEMINI_API_KEY here
- `backend/main.py` - Backend server
- `frontend/app/components/` - Edit your content here
- `backend/routes/` - API endpoints

### 🧪 Test It

1. Go to http://localhost:3000
2. Scroll to Contact section
3. Fill out the form
4. Click "Send Message"
5. You should see a success message!

### 📖 API Docs

Visit: http://localhost:8000/docs

---

**Having issues?** Check `SETUP_GUIDE.md` for detailed troubleshooting.

