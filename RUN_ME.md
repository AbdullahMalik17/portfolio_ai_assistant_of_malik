# 🚀 Quick Start Guide - Portfolio AI Assistant

## ⚡ Fastest Way to Run

### Option 1: Run Everything at Once (Recommended)
```bash
python start_all.py
```

This will:
- Check all dependencies
- Start backend server (http://localhost:8000)
- Start frontend server (http://localhost:3000)
- Open both in separate windows

---

### Option 2: Run Manually (Step by Step)

#### 1. Start Backend (Terminal 1)
```bash
cd backend
python run.py
```

✅ Backend will be at: http://localhost:8000
📚 API Docs will be at: http://localhost:8000/docs

#### 2. Start Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```

✅ Frontend will be at: http://localhost:3000

---

## 🧪 Test Backend Before Running

```bash
cd backend
python test_setup.py
```

This verifies:
- All dependencies installed
- Environment variables configured
- Gemini API key working
- Can connect to AI service

---

## 🔧 First Time Setup

### Prerequisites
- ✅ Python 3.9+ installed
- ✅ Node.js 18+ installed
- ✅ Gemini API Key (get free at: https://makersuite.google.com/app/apikey)

### Step 1: Install Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### Step 2: Install Frontend Dependencies
```bash
cd frontend
npm install
```

### Step 3: Configure API Key
```bash
cd backend
# Copy env.example to .env
copy env.example .env   # Windows
cp env.example .env     # Mac/Linux

# Edit .env and add your GEMINI_API_KEY
# The file already has a key, but you can replace it with yours
```

### Step 4: Test Setup
```bash
cd backend
python test_setup.py
```

### Step 5: Run the Application
```bash
# From root directory
python start_all.py

# OR run manually (see Option 2 above)
```

---

## 📍 Application URLs

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:3000 | Main portfolio website |
| **Backend API** | http://localhost:8000 | REST API server |
| **API Docs** | http://localhost:8000/docs | Interactive API documentation |
| **Health Check** | http://localhost:8000/health | Backend health status |

---

## 🎯 What You Get

### Frontend Features
- ✨ Modern portfolio website
- 🌙 Dark mode support
- 📱 Fully responsive
- 💼 Sections: Hero, About, Skills, Projects, Contact
- 🔄 Smooth animations & scrolling

### Backend Features
- 🤖 AI-powered chat (Google Gemini)
- 📧 Contact form handling
- 🚀 FastAPI REST API
- 📊 Auto-generated API docs
- 🔒 CORS configured

---

## 🐛 Troubleshooting

### Backend won't start
```bash
cd backend
python test_setup.py
```
Check the output and fix any issues shown.

### Frontend won't start
```bash
cd frontend
npm install
npm run dev
```

### API Key Issues
1. Go to: https://makersuite.google.com/app/apikey
2. Create a new API key
3. Edit `backend/.env`
4. Replace `GEMINI_API_KEY=your_key_here`

### Port Already in Use
- Backend uses port 8000
- Frontend uses port 3000
- Kill any processes using these ports or change them in the code

---

## 📚 More Information

- **Full Documentation**: See `README.md`
- **Detailed Setup**: See `SETUP_GUIDE.md`
- **Quick Reference**: See `QUICK_START.md`
- **Project Status**: See `PROJECT_STATUS.md`

---

## 🎉 That's It!

You should now have:
- ✅ Backend running at http://localhost:8000
- ✅ Frontend running at http://localhost:3000
- ✅ AI assistant working
- ✅ Contact form functional

**Enjoy building! 🚀**

---

## 💡 Quick Commands Cheat Sheet

```bash
# Test backend setup
cd backend && python test_setup.py

# Run backend only
cd backend && python run.py

# Run frontend only
cd frontend && npm run dev

# Run everything
python start_all.py

# List available Gemini models
cd backend && python list_models.py

# Test backend API
cd backend && python test_backend.py
```

---

**Need Help?** Check the detailed guides in the root directory or open an issue on GitHub.