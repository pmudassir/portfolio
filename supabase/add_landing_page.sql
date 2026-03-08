-- ============================================================
-- Migration: Add landing_page column to projects table
-- Run this in your Supabase dashboard → SQL Editor
-- ============================================================

ALTER TABLE projects
ADD COLUMN IF NOT EXISTS landing_page JSONB DEFAULT NULL;

-- Expected JSON shape for the landing_page column:
-- {
--   "tagline": "Short punchy hero tagline",
--   "hero_description": "One sentence for non-technical users",
--   "theme": {
--     "primary_color": "#3b82f6",
--     "mood": "enterprise",          -- minimal | bold | technical | playful | enterprise | dark | vibrant
--     "font_style": "modern-sans"    -- geometric | humanist | monospace | serif | modern-sans
--   },
--   "features": [
--     { "title": "Feature Name", "description": "What it does", "icon": "⚡" }
--   ],
--   "problem_statement": "Pain the user felt before this existed.",
--   "solution_statement": "How this product concretely solves it.",
--   "target_audience": "Hospital operations managers and frontline staff",
--   "screenshots_description": "Describe key screens for mockup reference"
-- }

-- Verify the column was added:
-- SELECT column_name, data_type FROM information_schema.columns
-- WHERE table_name = 'projects' AND column_name = 'landing_page';
