
# Portfolio AI Assistant

A modern, full-stack portfolio website with AI-powered features built with Next.js frontend and Python FastAPI backend integrated with Google Gemini.

## 🚀 Features

### Frontend (Next.js)
- ✨ Modern UI with smooth animations
- 🌙 Dark mode support
- 📱 Fully responsive design
- 🎨 Beautiful gradient themes
- 💼 Professional sections: Hero, About, Skills, Projects, Contact
- 🔄 Smooth scroll navigation

### Backend (Python FastAPI)
- 🚀 FastAPI REST API
- 🤖 Google Gemini AI integration
- 📧 Contact form handling
- 💬 AI Chat assistant endpoint
- 🔒 CORS configured for frontend
- 📊 Swagger API documentation

## 📁 Project Structure

```
Portfolio-AI-Assistant-/
├── frontend/              # Next.js frontend
│   ├── app/
│   │   ├── components/    # React components
│   │   ├── page.tsx       # Main page
│   │   └── layout.tsx     # Root layout
│   └── package.json
├── backend/               # Python FastAPI backend
│   ├── main.py           # FastAPI server
│   ├── routes/           # API routes
│   ├── agents/           # AI agents
│   └── requirements.txt  # Python dependencies
└── README.md
```

## 🛠️ Quick Start

### Prerequisites

- Node.js 18+ (for frontend)
- Python 3.9+ (for backend)
- Google Gemini API Key ([Get it here](https://makersuite.google.com/app/apikey))

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: http://localhost:3000

### Backend Setup

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Linux/Mac:
source venv/bin/activate

# Install dependencies
cd backend
pip install -r requirements.txt

# Configure API key
# Copy env.example to .env and add your GEMINI_API_KEY
copy env.example .env
# Edit .env and add your key:
# GEMINI_API_KEY=your_key_here

# Run backend server
python main.py
```

Backend runs at: http://localhost:8000

### Getting Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add it to `backend/.env` file

## 📡 API Endpoints

### Contact Form
```bash
POST http://localhost:8000/api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello!"
}
```

### AI Chat
```bash
POST http://localhost:8000/api/assistant/chat
Content-Type: application/json

{
  "message": "Tell me about your services"
}
```

### Health Check
```bash
GET http://localhost:8000/health
```

## 📚 API Documentation

Once the backend is running:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 🎨 Customization

### Frontend
Edit components in `frontend/app/components/`:
- `Hero.tsx` - Hero section
- `About.tsx` - About section
- `Skills.tsx` - Skills section
- `Projects.tsx` - Projects section
- `Contact.tsx` - Contact form

### Backend
Edit routes in `backend/routes/`:
- `contact.py` - Contact form handler
- `assistant.py` - AI assistant endpoints

## 🧪 Development

### Frontend
```bash
cd frontend
npm run dev    # Development server
npm run build  # Production build
npm start      # Production server
```

### Backend
```bash
cd backend
python main.py              # Run server
uvicorn main:app --reload  # Run with auto-reload
```

## 🚢 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy to Vercel
```

### Backend (Python Anywhere, Heroku, etc.)
```bash
cd backend
pip install -r requirements.txt
python main.py
```

## 📝 Technologies

- **Frontend**: Next.js 16, TypeScript, Tailwind CSS
- **Backend**: Python, FastAPI, Google Gemini AI
- **AI**: Google Gemini SDK
- **Styling**: Tailwind CSS, Custom animations

## 📄 License

MIT License

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using Next.js and Python
