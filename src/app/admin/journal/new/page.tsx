"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const CATEGORIES = ["Architecture", "Mobile", "TypeScript", "Infrastructure", "Product", "DevOps", "Frontend", "Backend"];

export default function NewArticle() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "", slug: "", excerpt: "", content: "",
    category: "Architecture", read_time: "5 min read",
    published_at: new Date().toISOString().split("T")[0],
    status: "draft" as "draft" | "published",
  });

  function autoSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  async function handleSave(status: "draft" | "published") {
    setSaving(true);
    const slug = form.slug || autoSlug(form.title);
    const { error } = await supabase.from("journal_articles").insert({
      ...form, slug, status,
    });
    setSaving(false);
    if (error) { alert("Error: " + error.message); return; }
    router.push("/admin/journal");
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="text-sm text-[var(--color-text-muted)] font-mono mb-6">
        Journal &gt; <span className="text-[var(--color-text-primary)]">New Article</span>
      </div>

      <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">Write New Article</h1>
      <p className="text-[var(--color-text-secondary)] mb-10">Share technical insights and engineering notes.</p>

      {/* Title & Slug */}
      <div className="mb-8">
        <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--color-primary)] block mb-2">Title</label>
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: autoSlug(e.target.value) })} placeholder="e.g. Building Offline-First Mobile Apps"
          className="w-full bg-transparent border-b border-[var(--color-border)] pb-2 text-[var(--color-text-primary)] text-xl font-bold placeholder:text-[var(--color-text-muted)] placeholder:font-normal focus:border-[var(--color-primary)] focus:outline-none transition-colors" />
      </div>

      {/* Meta Fields */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div>
          <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--color-primary)] block mb-2">Category</label>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-2.5 text-sm text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:outline-none">
            {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--color-primary)] block mb-2">Read Time</label>
          <input value={form.read_time} onChange={(e) => setForm({ ...form, read_time: e.target.value })} placeholder="5 min read"
            className="w-full bg-transparent border-b border-[var(--color-border)] pb-2 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none transition-colors" />
        </div>
        <div>
          <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--color-primary)] block mb-2">Publish Date</label>
          <input type="date" value={form.published_at} onChange={(e) => setForm({ ...form, published_at: e.target.value })}
            className="w-full bg-transparent border-b border-[var(--color-border)] pb-2 text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:outline-none transition-colors" />
        </div>
      </div>

      {/* Excerpt */}
      <div className="mb-8">
        <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--color-primary)] block mb-2">Excerpt</label>
        <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} placeholder="A short summary for the article listing..."
          className="w-full bg-transparent border border-[var(--color-border)] rounded-lg p-4 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none transition-colors resize-y" />
      </div>

      {/* Content */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--color-primary)]">Content (Markdown)</label>
          <span className="text-[10px] text-[var(--color-text-muted)] font-mono">Supports ## headers, ```code```, &gt; quotes, - lists</span>
        </div>
        <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={20} placeholder="Write your article in Markdown..."
          className="w-full bg-[#0d1117] border border-[var(--color-border)] rounded-lg p-5 text-[var(--color-text-secondary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none font-mono text-sm resize-y leading-relaxed" />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 border-t border-[var(--color-border)] pt-6">
        <button onClick={() => handleSave("draft")} disabled={saving}
          className="px-6 py-3 rounded-lg border border-[var(--color-border)] text-[var(--color-text-primary)] font-bold text-sm hover:border-[var(--color-primary)]/50 transition-colors disabled:opacity-50">
          Save Draft
        </button>
        <button onClick={() => handleSave("published")} disabled={saving}
          className="px-6 py-3 rounded-lg bg-[var(--color-primary)] text-[var(--color-background)] font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
          Publish Article
        </button>
      </div>
    </div>
  );
}
