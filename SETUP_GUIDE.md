# Quick Setup Guide

Follow these steps to get your Notes App running:

## 1. Supabase Setup

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Wait for the project to be ready (takes ~2 minutes)

### Database Setup

1. Go to **SQL Editor** in your Supabase dashboard
2. Click **New Query**
3. Copy and paste the contents of `backend/supabase_setup.sql`
4. Click **Run** to execute the SQL

### Storage Setup

1. Go to **Storage** in your Supabase dashboard
2. Click **New bucket**
3. Name it: `note-images`
4. Make it **Public** (toggle the public switch)
5. Click **Create bucket**

### Get Your API Keys

1. Go to **Settings** > **API**
2. Copy these values:
   - **Project URL** → This is your `SUPABASE_URL`
   - **anon public** key → This is your `SUPABASE_KEY`
   - **service_role** key → This is your `SUPABASE_SERVICE_KEY` (keep this secret!)

## 2. Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file:
```bash
# Copy the example file
cp .env.example .env
```

5. Edit `.env` and add your Supabase credentials:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-role-key
OPENAI_API_KEY=your-openai-key  # Optional, for AI features
ENVIRONMENT=development
```

6. Run the backend:
```bash
uvicorn app.main:app --reload
```

Backend should now be running at `http://localhost:8000`
Test it at `http://localhost:8000/docs`

## 3. Frontend Setup

1. Open a new terminal and navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Create `.env` file if you want to change the API URL:
```env
VITE_API_URL=http://localhost:8000
```

4. Run the frontend:
```bash
npm run dev
```

Frontend should now be running at `http://localhost:5173`

## 4. OpenAI Setup (Optional - for AI summarization)

1. Go to [platform.openai.com](https://platform.openai.com)
2. Create an account or sign in
3. Go to **API Keys**
4. Create a new API key
5. Add it to your backend `.env` file as `OPENAI_API_KEY`

## 5. Test the App

1. Open `http://localhost:5173` in your browser
2. Click "Sign Up" to create an account
3. Create your first note!
4. Try uploading an image
5. Try generating a summary (if you added OpenAI API key)

## Troubleshooting

### Backend won't start
- Make sure your virtual environment is activated
- Check that all dependencies are installed: `pip install -r requirements.txt`
- Verify your `.env` file has correct Supabase credentials

### Installation errors with Python 3.14
- If you get build errors with `pydantic-core`, try upgrading pip first:
  ```bash
  pip install --upgrade pip setuptools wheel
  pip install -r requirements.txt
  ```
- Python 3.11 or 3.12 are recommended for better package compatibility

### Frontend can't connect to backend
- Make sure backend is running on port 8000
- Check that `VITE_API_URL` in frontend `.env` matches your backend URL
- Check browser console for CORS errors

### Authentication errors
- Verify your Supabase keys are correct
- Make sure you ran the SQL setup script
- Check that RLS policies are enabled on the notes table

### Image upload fails
- Verify the `note-images` bucket exists in Supabase Storage
- Make sure the bucket is set to **Public**
- Check file size (max 5MB)

### AI summarization doesn't work
- Verify your OpenAI API key is set in backend `.env`
- Check that you have credits in your OpenAI account
- Look at backend logs for error messages

## Next Steps

- Customize the UI styling
- Add note editing functionality
- Add search functionality
- Deploy to production (Vercel for frontend, Railway/Render for backend)

