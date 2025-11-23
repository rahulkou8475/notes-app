# Quick Deployment Guide

Follow these steps to deploy your Notes App:

## Step 1: Initialize Git Repository

```bash
cd /Users/rahulkou/Desktop/NotesApp\(V2\)
git init
git add .
git commit -m "Initial commit - ready for deployment"
```

## Step 2: Push to GitHub

1. Go to [github.com](https://github.com) and create a new repository
2. Name it something like `notes-app` (don't initialize with README)
3. Copy the repository URL
4. Run:

```bash
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

## Step 3: Deploy Backend to Railway (Recommended)

1. **Go to Railway**: [railway.app](https://railway.app)
2. **Sign up** with GitHub
3. **Create New Project** → "Deploy from GitHub repo"
4. **Select your repository**
5. **Configure**:
   - Root Directory: `backend`
   - Railway will auto-detect Python
6. **Add Environment Variables** (in Railway dashboard):
   ```
   SUPABASE_URL=your-supabase-url
   SUPABASE_KEY=your-anon-key
   SUPABASE_SERVICE_KEY=your-service-role-key
   OPENAI_API_KEY=your-openai-key (optional)
   ENVIRONMENT=production
   ```
7. **Set Start Command** (if not auto-detected):
   ```
   uvicorn app.main:app --host 0.0.0.0 --port $PORT
   ```
8. **Deploy** - Railway will automatically deploy
9. **Copy the deployment URL** (e.g., `https://your-app.railway.app`)

### Alternative: Deploy to Render

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. New → Web Service
4. Connect your GitHub repo
5. Configure:
   - Name: `notes-app-backend`
   - Root Directory: `backend`
   - Environment: Python 3
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
6. Add environment variables (same as Railway)
7. Deploy and copy the URL

## Step 4: Deploy Frontend to Vercel

1. **Go to Vercel**: [vercel.com](https://vercel.com)
2. **Sign up** with GitHub
3. **Add New Project** → Import your GitHub repository
4. **Configure**:
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)
5. **Add Environment Variable**:
   - Key: `VITE_API_URL`
   - Value: `https://your-backend-url.railway.app` (use your actual backend URL from Step 3)
6. **Deploy** - Vercel will build and deploy
7. **Copy your Vercel URL** (e.g., `https://your-app.vercel.app`)

## Step 5: Update Backend CORS

After getting your Vercel URL, update the backend:

1. **In Railway/Render**, add environment variable:
   - Key: `FRONTEND_URL`
   - Value: `https://your-app.vercel.app` (your Vercel URL)
2. **Redeploy** the backend (Railway/Render will auto-redeploy when env vars change)

## Step 6: Update Supabase Settings

1. Go to **Supabase Dashboard** → Authentication → URL Configuration
2. Add to **Redirect URLs**:
   - `https://your-app.vercel.app/login`
   - `https://your-app.vercel.app`
3. Update **Site URL** to: `https://your-app.vercel.app`
4. Save changes

## Step 7: Test Your Deployment

1. Visit your Vercel URL
2. Try registering a new account
3. Create a note
4. Upload an image
5. Test AI summarization

## Troubleshooting

### Frontend can't connect to backend
- Verify `VITE_API_URL` is set correctly in Vercel
- Check that backend URL is accessible (visit it in browser)
- Check browser console for CORS errors

### Authentication not working
- Verify Supabase redirect URLs include your Vercel URL
- Check that environment variables are set correctly
- Look at browser console for errors

### Images not uploading
- Verify storage bucket exists and is public
- Check backend logs in Railway/Render
- Verify backend has correct Supabase credentials

## Environment Variables Summary

### Backend (Railway/Render)
```
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-role-key
OPENAI_API_KEY=your-openai-key (optional)
ENVIRONMENT=production
FRONTEND_URL=https://your-app.vercel.app
```

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend-url.railway.app
```

## Need Help?

If you encounter issues:
1. Check the deployment logs in Railway/Render/Vercel
2. Check browser console for frontend errors
3. Verify all environment variables are set correctly
4. Make sure backend is running and accessible

