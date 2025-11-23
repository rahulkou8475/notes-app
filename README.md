# Notes App

A full-stack notes application with authentication, file storage, and AI-powered text summarization.

## Tech Stack

- **Backend**: FastAPI (Python)
- **Database & Auth**: Supabase (PostgreSQL + Authentication)
- **Storage**: Supabase Storage
- **Frontend**: React + TypeScript + Vite
- **AI**: OpenAI API (for text summarization)
- **Deployment**: Vercel (frontend), Railway/Render (backend)

## Features

- ✅ User authentication (register/login)
- ✅ Create, read, and delete notes
- ✅ Image uploads for notes
- ✅ AI-powered text summarization
- ✅ Protected routes and authorization
- ✅ Modern, responsive UI

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 18+
- Supabase account (free tier available)
- OpenAI API key (optional, for AI features)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up Supabase:
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to SQL Editor and run the SQL from `backend/supabase_setup.sql`
   - Go to Storage and create a bucket named `note-images` (make it public)
   - Get your project URL and API keys from Settings > API

5. Create `.env` file:
```bash
cp .env.example .env
```

Fill in your Supabase credentials and OpenAI API key.

6. Run the backend:
```bash
uvicorn app.main:app --reload
```

Backend will run at `http://localhost:8000`
API docs at `http://localhost:8000/docs`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Create `.env` file:
```env
VITE_API_URL=http://localhost:8000
```

4. Run the frontend:
```bash
npm run dev
```

Frontend will run at `http://localhost:5173`

## Project Structure

```
NotesApp(V2)/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py           # FastAPI app entry point
│   │   ├── config.py         # Configuration settings
│   │   ├── database.py       # Supabase client setup
│   │   ├── schemas.py        # Pydantic models
│   │   ├── middleware/
│   │   │   └── auth.py       # JWT authentication
│   │   ├── routes/
│   │   │   ├── auth.py       # Authentication endpoints
│   │   │   ├── notes.py      # Notes CRUD endpoints
│   │   │   └── upload.py     # Image upload endpoint
│   │   └── services/
│   │       └── ai_service.py # OpenAI integration
│   ├── requirements.txt
│   ├── supabase_setup.sql    # Database schema
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API client
│   │   ├── context/          # React context (Auth)
│   │   └── App.tsx
│   ├── package.json
│   └── README.md
└── README.md
```

## Deployment

### Backend Deployment (Railway/Render)

1. Push your code to GitHub
2. Connect your repository to Railway or Render
3. Set environment variables in the platform
4. Deploy!

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Import project in Vercel
3. Set `VITE_API_URL` to your deployed backend URL
4. Deploy!

## Learning Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

## License

MIT

