-- Fix notes table: Add missing columns if they don't exist

-- Add summary column if missing
ALTER TABLE notes 
ADD COLUMN IF NOT EXISTS summary TEXT;

-- Add image_url column if missing
ALTER TABLE notes 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Ensure all required columns exist
-- (id, title, content, user_id, created_at, updated_at should already exist)

-- Verify the table structure
-- You can check by running: SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'notes';

