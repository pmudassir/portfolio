"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";

const CATEGORIES = ["Architecture", "Mobile", "TypeScript", "Infrastructure", "Product", "DevOps", "Frontend", "Backend"];

export default function EditArticle({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "", slug: "", excerpt: "", content: "",
    category: "Architecture", read_time: "5 min read",
    published_at: "",
    status: "draft" as "draft" | "published",
  });

  useEffect(() => {
    fetch(`/api/admin/articles/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.id) {
          setForm({
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt || "",
            content: data.content || "",
            category: data.category || "Architecture",
            read_time: data.read_time || "5 min read",
            published_at: data.published_at ? data.published_at.split("T")[0] : "",
            status: data.status,
          });
        }
        setLoading(false);
      });
  }, [id]);

  async function handleSave(status: "draft" | "published") {
    if (!form.title.trim()) { setError("Title is required."); return; }
    setError("");
    setSaving(true);

    const res = await fetch(`/api/admin/articles/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, status }),
    });

    setSaving(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Failed to save article.");
      return;
    }
    router.push("/admin/journal");
  }

  if (loading) return <div className="flex items-center justify-center h-full text-[var(--color-text-muted)]">Loading...</div>;

  return (
    <div className="p-8 max-w-4xl">
      <div className="text-sm text-[var(--color-text-muted)] font-mono mb-6">
        Journal &gt; <span className="text-[var(--color-text-primary)]">Edit</span>
      </div>
      <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-10">Edit Article</h1>

      {error && (
        <div className="mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Title */}
      <div className="mb-8">
        <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--color-primary)] block mb-2">Title</label>
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full bg-transparent border-b border-[var(--color-border)] pb-2 text-[var(--color-text-primary)] text-xl font-bold focus:border-[var(--color-primary)] focus:outline-none transition-colors" />
      </div>

      {/* Meta */}
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
          <input value={form.read_time} onChange={(e) => setForm({ ...form, read_time: e.target.value })}
            className="w-full bg-transparent border-b border-[var(--color-border)] pb-2 text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:outline-none transition-colors" />
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
        <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2}
          className="w-full bg-transparent border border-[var(--color-border)] rounded-lg p-4 text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:outline-none resize-y" />
      </div>

      {/* Content */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--color-primary)]">Content (Markdown)</label>
          <span className="text-[10px] text-[var(--color-text-muted)] font-mono">Supports ## headers, ```code```, &gt; quotes, - lists</span>
        </div>
        <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={20}
          className="w-full bg-[#0d1117] border border-[var(--color-border)] rounded-lg p-5 text-[var(--color-text-secondary)] font-mono text-sm focus:border-[var(--color-primary)] focus:outline-none resize-y leading-relaxed" />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 border-t border-[var(--color-border)] pt-6">
        <button onClick={() => handleSave("draft")} disabled={saving}
          className="px-6 py-3 rounded-lg border border-[var(--color-border)] text-[var(--color-text-primary)] font-bold text-sm hover:border-[var(--color-primary)]/50 transition-colors disabled:opacity-50">
          {saving ? "Saving…" : "Save Draft"}
        </button>
        <button onClick={() => handleSave("published")} disabled={saving}
          className="px-6 py-3 rounded-lg bg-[var(--color-primary)] text-[var(--color-background)] font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
          {saving ? "Publishing…" : "Publish"}
        </button>
      </div>
    </div>
  );
}
