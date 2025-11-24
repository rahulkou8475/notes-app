"""
Vercel serverless function for FastAPI backend
Uses Mangum to adapt FastAPI to AWS Lambda/Vercel format
"""
import sys
import os

# Add the app directory to the path so we can import from it
# On GitHub, your backend code is in the 'app' folder in root
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from mangum import Mangum
from app.main import app

# Create the handler for Vercel
handler = Mangum(app, lifespan="off")
