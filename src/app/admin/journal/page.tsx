"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { DBArticle } from "@/lib/supabase";

export default function AdminJournal() {
  const [articles, setArticles] = useState<DBArticle[]>([]);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("journal_articles").select("*").order("created_at", { ascending: false });
      setArticles(data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = filter === "all" ? articles : articles.filter((a) => a.status === filter);

  async function handleDelete(id: string) {
    if (!confirm("Delete this article?")) return;
    await supabase.from("journal_articles").delete().eq("id", id);
    setArticles((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Journal Articles</h1>
        <Link href="/admin/journal/new" className="px-5 py-2.5 rounded-lg bg-[var(--color-primary)] text-[var(--color-background)] font-bold text-sm hover:opacity-90 transition-opacity">
          + New Article
        </Link>
      </div>

      <div className="flex gap-2 mb-6">
        {(["all", "published", "draft"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-colors ${
              filter === f ? "bg-[var(--color-primary)] text-[var(--color-background)]" : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            }`}>
            {f} ({f === "all" ? articles.length : articles.filter((a) => a.status === f).length})
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20 text-[var(--color-text-muted)]">Loading...</div>
      ) : (
        <div className="border border-[var(--color-border)] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
                <th className="text-left px-5 py-3 text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--color-text-muted)]">Title</th>
                <th className="text-left px-5 py-3 text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--color-text-muted)]">Category</th>
                <th className="text-left px-5 py-3 text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--color-text-muted)]">Status</th>
                <th className="text-left px-5 py-3 text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--color-text-muted)]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((article) => (
                <tr key={article.id} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-surface)]/50">
                  <td className="px-5 py-4">
                    <div className="font-medium text-sm text-[var(--color-text-primary)]">{article.title}</div>
                    <div className="text-[11px] text-[var(--color-text-muted)] font-mono mt-1">
                      {article.published_at ? new Date(article.published_at).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) : "No date"}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-[var(--color-primary-dim)] text-[var(--color-primary)]">{article.category}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase ${
                      article.status === "published" ? "bg-green-500/10 text-green-400" : "bg-amber-500/10 text-amber-400"
                    }`}>{article.status}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <Link href={`/admin/journal/${article.id}`} className="p-2 rounded-lg hover:bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" /></svg>
                      </Link>
                      <button onClick={() => handleDelete(article.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-[var(--color-text-muted)] hover:text-red-400 transition-colors">
                        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
