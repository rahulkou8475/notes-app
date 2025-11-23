-- Add summary column if it doesn't exist
ALTER TABLE notes 
ADD COLUMN IF NOT EXISTS summary TEXT;

