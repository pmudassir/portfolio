import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface DBProject {
  id: string;
  slug: string;
  title: string;
  description: string;
  subtitle: string;
  role: string;
  timeline: string;
  stack: string[];
  challenge: string;
  architectural_decisions: { title: string; description: string; icon: string }[];
  code_snippet: string;
  code_language: string;
  impact_metrics: { metric: string; label: string }[];
  live_url: string;
  github_url: string;
  featured: boolean;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

export interface DBArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  read_time: string;
  status: 'draft' | 'published';
  published_at: string;
  created_at: string;
  updated_at: string;
}
