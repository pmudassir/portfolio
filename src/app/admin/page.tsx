"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { DBProject, DBArticle } from "@/lib/supabase";

export default function AdminOverview() {
  const [projects, setProjects] = useState<DBProject[]>([]);
  const [articles, setArticles] = useState<DBArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [pRes, aRes] = await Promise.all([
        supabase.from("projects").select("*").order("created_at", { ascending: false }),
        supabase.from("journal_articles").select("*").order("created_at", { ascending: false }),
      ]);
      setProjects(pRes.data ?? []);
      setArticles(aRes.data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-full text-[var(--color-text-muted)]">Loading...</div>;

  const publishedProjects = projects.filter(p => p.status === "published").length;
  const draftProjects = projects.filter(p => p.status === "draft").length;
  const publishedArticles = articles.filter(a => a.status === "published").length;
  const draftArticles = articles.filter(a => a.status === "draft").length;

  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Content Manager</h1>
        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[var(--color-primary-dim)] text-[var(--color-primary)]">
          V2.4.0
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-10">
        {[
          { label: "Published Projects", value: publishedProjects, color: "text-green-400" },
          { label: "Draft Projects", value: draftProjects, color: "text-amber-400" },
          { label: "Published Articles", value: publishedArticles, color: "text-green-400" },
          { label: "Draft Articles", value: draftArticles, color: "text-amber-400" },
        ].map((stat) => (
          <div key={stat.label} className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
            <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
            <div className="text-xs text-[var(--color-text-muted)] font-mono uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4 mb-10">
        <Link href="/admin/projects/new" className="px-6 py-3 rounded-lg bg-[var(--color-primary)] text-[var(--color-background)] font-bold text-sm hover:opacity-90 transition-opacity">
          + New Project
        </Link>
        <Link href="/admin/journal/new" className="px-6 py-3 rounded-lg border border-[var(--color-border)] text-[var(--color-text-primary)] font-bold text-sm hover:border-[var(--color-primary)]/50 transition-colors">
          + New Article
        </Link>
      </div>

      {/* Recent Content */}
      <div className="grid grid-cols-2 gap-8">
        {/* Recent Projects */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">Recent Projects</h2>
          <div className="space-y-2">
            {projects.slice(0, 5).map((p) => (
              <Link key={p.id} href={`/admin/projects/${p.id}`} className="flex items-center justify-between p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/30 transition-colors">
                <div>
                  <div className="font-medium text-sm text-[var(--color-text-primary)]">{p.title}</div>
                  <div className="text-[11px] text-[var(--color-text-muted)] font-mono mt-1">
                    {new Date(p.created_at).toLocaleDateString()}
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                  p.status === "published" ? "bg-green-500/10 text-green-400" : "bg-amber-500/10 text-amber-400"
                }`}>
                  {p.status}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Articles */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-4">Recent Articles</h2>
          <div className="space-y-2">
            {articles.slice(0, 5).map((a) => (
              <Link key={a.id} href={`/admin/journal/${a.id}`} className="flex items-center justify-between p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/30 transition-colors">
                <div>
                  <div className="font-medium text-sm text-[var(--color-text-primary)]">{a.title}</div>
                  <div className="text-[11px] text-[var(--color-text-muted)] font-mono mt-1">
                    {new Date(a.created_at).toLocaleDateString()}
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                  a.status === "published" ? "bg-green-500/10 text-green-400" : "bg-amber-500/10 text-amber-400"
                }`}>
                  {a.status}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
