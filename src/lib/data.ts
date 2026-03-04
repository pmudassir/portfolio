import { supabase, DBProject, DBArticle } from './supabase';

// ---- PROJECTS ----

export async function getPublishedProjects(): Promise<DBProject[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getFeaturedProjects(): Promise<DBProject[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .eq('featured', true)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getProjectBySlug(slug: string): Promise<DBProject | null> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error) return null;
  return data;
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('slug')
    .eq('status', 'published');
  if (error) return [];
  return (data ?? []).map(p => p.slug);
}

// ---- JOURNAL ----

export async function getPublishedArticles(): Promise<DBArticle[]> {
  const { data, error } = await supabase
    .from('journal_articles')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getArticleBySlug(slug: string): Promise<DBArticle | null> {
  const { data, error } = await supabase
    .from('journal_articles')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error) return null;
  return data;
}

export async function getAllArticleSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('journal_articles')
    .select('slug')
    .eq('status', 'published');
  if (error) return [];
  return (data ?? []).map(a => a.slug);
}

export async function getArticleCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from('journal_articles')
    .select('category')
    .eq('status', 'published');
  if (error) return [];
  return [...new Set((data ?? []).map(a => a.category))];
}

// ---- ADMIN (all content, including drafts) ----

export async function getAllProjects(): Promise<DBProject[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getAllArticles(): Promise<DBArticle[]> {
  const { data, error } = await supabase
    .from('journal_articles')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function upsertProject(project: Partial<DBProject>): Promise<DBProject> {
  const { data, error } = await supabase
    .from('projects')
    .upsert(project, { onConflict: 'id' })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function upsertArticle(article: Partial<DBArticle>): Promise<DBArticle> {
  const { data, error } = await supabase
    .from('journal_articles')
    .upsert(article, { onConflict: 'id' })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw error;
}

export async function deleteArticle(id: string): Promise<void> {
  const { error } = await supabase.from('journal_articles').delete().eq('id', id);
  if (error) throw error;
}
