"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const TECH_OPTIONS = [
  "TypeScript", "React", "Next.js", "Vue.js", "Nuxt", "Node.js", "Express",
  "MongoDB", "PostgreSQL", "Redis", "Tailwind CSS", "React Native", "Expo",
  "Tauri", "Rust", "Go", "Docker", "Kubernetes", "Socket.io", "GraphQL",
];

export default function NewProject() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "", slug: "", description: "", subtitle: "", role: "", timeline: "",
    stack: [] as string[], challenge: "",
    architectural_decisions: [{ title: "", description: "", icon: "bolt" }],
    code_snippet: "", code_language: "typescript",
    impact_metrics: [{ metric: "", label: "" }],
    live_url: "", github_url: "", featured: false,
    status: "draft" as "draft" | "published",
  });

  function autoSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function toggleTech(tech: string) {
    setForm((f) => ({
      ...f,
      stack: f.stack.includes(tech) ? f.stack.filter((t) => t !== tech) : [...f.stack, tech],
    }));
  }

  function addDecision() {
    setForm((f) => ({ ...f, architectural_decisions: [...f.architectural_decisions, { title: "", description: "", icon: "bolt" }] }));
  }

  function updateDecision(i: number, field: string, value: string) {
    setForm((f) => {
      const decisions = [...f.architectural_decisions];
      decisions[i] = { ...decisions[i], [field]: value };
      return { ...f, architectural_decisions: decisions };
    });
  }

  function removeDecision(i: number) {
    setForm((f) => ({ ...f, architectural_decisions: f.architectural_decisions.filter((_, idx) => idx !== i) }));
  }

  function addMetric() {
    setForm((f) => ({ ...f, impact_metrics: [...f.impact_metrics, { metric: "", label: "" }] }));
  }

  function updateMetric(i: number, field: string, value: string) {
    setForm((f) => {
      const metrics = [...f.impact_metrics];
      metrics[i] = { ...metrics[i], [field]: value };
      return { ...f, impact_metrics: metrics };
    });
  }

  function removeMetric(i: number) {
    setForm((f) => ({ ...f, impact_metrics: f.impact_metrics.filter((_, idx) => idx !== i) }));
  }

  async function handleSave(status: "draft" | "published") {
    setSaving(true);
    const slug = form.slug || autoSlug(form.title);
    const { error } = await supabase.from("projects").insert({
      ...form,
      slug,
      status,
      architectural_decisions: form.architectural_decisions.filter((d) => d.title),
      impact_metrics: form.impact_metrics.filter((m) => m.metric),
    });
    setSaving(false);
    if (error) { alert("Error: " + error.message); return; }
    router.push("/admin/projects");
  }

  return (
    <div className="p-8 max-w-4xl">
      {/* Breadcrumb */}
      <div className="text-sm text-[var(--color-text-muted)] font-mono mb-6">
        Projects &gt; <span className="text-[var(--color-text-primary)]">New Case Study</span>
      </div>

      <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">Create New Project</h1>
      <p className="text-[var(--color-text-secondary)] mb-10">Document a new technical achievement for your professional portfolio.</p>

      {/* Basic Info */}
      <div className="mb-10">
        <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
          <span className="text-[var(--color-primary)]">●</span> Basic Info
        </h2>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--color-primary)] block mb-2">Project Title</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value, slug: autoSlug(e.target.value) })}
              placeholder="e.g. Distributed Consensus Engine"
              className="w-full bg-transparent border-b border-[var(--color-border)] pb-2 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--color-primary)] block mb-2">Project URL</label>
            <input
              value={form.live_url}
              onChange={(e) => setForm({ ...form, live_url: e.target.value })}
              placeholder="https://github.com/repo-link"
              className="w-full bg-transparent border-b border-[var(--color-border)] pb-2 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div>
            <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--color-primary)] block mb-2">Role</label>
            <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="e.g. Lead Engineer"
              className="w-full bg-transparent border-b border-[var(--color-border)] pb-2 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--color-primary)] block mb-2">Timeline</label>
            <input value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })} placeholder="e.g. 3 Months"
              className="w-full bg-transparent border-b border-[var(--color-border)] pb-2 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--color-primary)] block mb-2">GitHub URL</label>
            <input value={form.github_url} onChange={(e) => setForm({ ...form, github_url: e.target.value })} placeholder="https://github.com/..."
              className="w-full bg-transparent border-b border-[var(--color-border)] pb-2 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none transition-colors" />
          </div>
        </div>
        <div>
          <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--color-primary)] block mb-2">Subtitle</label>
          <input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} placeholder="One-line description..."
            className="w-full bg-transparent border-b border-[var(--color-border)] pb-2 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none transition-colors" />
        </div>
      </div>

      {/* The Stack */}
      <div className="mb-10">
        <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
          <span className="text-[var(--color-primary)]">◆</span> The Stack
        </h2>
        <div className="flex flex-wrap gap-3">
          {TECH_OPTIONS.map((tech) => (
            <button key={tech} onClick={() => toggleTech(tech)}
              className={`px-4 py-2 rounded-lg text-sm font-mono flex items-center gap-2 border transition-colors ${
                form.stack.includes(tech)
                  ? "border-[var(--color-primary)] bg-[var(--color-primary-dim)] text-[var(--color-primary)]"
                  : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]/50"
              }`}>
              {form.stack.includes(tech) && <span className="text-[var(--color-primary)]">✓</span>}
              {tech}
            </button>
          ))}
        </div>
      </div>

      {/* Description & Challenge */}
      <div className="mb-10">
        <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
          <span className="text-[var(--color-primary)]">●</span> Content
        </h2>
        <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--color-primary)] block mb-2">Description</label>
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Full project description..."
          className="w-full bg-transparent border border-[var(--color-border)] rounded-lg p-4 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none transition-colors resize-y mb-6" />

        <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--color-primary)] block mb-2">Challenge</label>
        <textarea value={form.challenge} onChange={(e) => setForm({ ...form, challenge: e.target.value })} rows={3} placeholder="Describe the architectural complexity..."
          className="w-full bg-transparent border border-[var(--color-border)] rounded-lg p-4 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none transition-colors resize-y" />
      </div>

      {/* Architectural Decisions */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-[var(--color-text-primary)] flex items-center gap-2">
            <span className="text-[var(--color-primary)]">◆</span> Architectural Decisions
          </h2>
          <button onClick={addDecision} className="text-sm text-[var(--color-primary)] hover:underline">+ Add</button>
        </div>
        <div className="space-y-4">
          {form.architectural_decisions.map((d, i) => (
            <div key={i} className="grid grid-cols-[1fr_2fr_auto] gap-4 items-start p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
              <input value={d.title} onChange={(e) => updateDecision(i, "title", e.target.value)} placeholder="Title"
                className="bg-transparent border-b border-[var(--color-border)] pb-1 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none" />
              <input value={d.description} onChange={(e) => updateDecision(i, "description", e.target.value)} placeholder="Description"
                className="bg-transparent border-b border-[var(--color-border)] pb-1 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none" />
              <button onClick={() => removeDecision(i)} className="text-[var(--color-text-muted)] hover:text-red-400 transition-colors p-1">✕</button>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Metrics */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-[var(--color-text-primary)] flex items-center gap-2">
            <span className="text-[var(--color-primary)]">●</span> Impact Metrics
          </h2>
          <button onClick={addMetric} className="text-sm text-[var(--color-primary)] hover:underline">+ Add</button>
        </div>
        <div className="space-y-3">
          {form.impact_metrics.map((m, i) => (
            <div key={i} className="grid grid-cols-[1fr_2fr_auto] gap-4 items-center">
              <input value={m.metric} onChange={(e) => updateMetric(i, "metric", e.target.value)} placeholder="e.g. 500+"
                className="bg-transparent border-b border-[var(--color-border)] pb-1 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none" />
              <input value={m.label} onChange={(e) => updateMetric(i, "label", e.target.value)} placeholder="e.g. Users Served"
                className="bg-transparent border-b border-[var(--color-border)] pb-1 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none" />
              <button onClick={() => removeMetric(i)} className="text-[var(--color-text-muted)] hover:text-red-400 transition-colors p-1">✕</button>
            </div>
          ))}
        </div>
      </div>

      {/* Code Snippet */}
      <div className="mb-10">
        <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--color-primary)] block mb-2">Code Snippet (optional)</label>
        <textarea value={form.code_snippet} onChange={(e) => setForm({ ...form, code_snippet: e.target.value })} rows={8} placeholder="Paste a key code snippet..."
          className="w-full bg-[#0d1117] border border-[var(--color-border)] rounded-lg p-4 text-[var(--color-text-secondary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none font-mono text-sm resize-y" />
      </div>

      {/* Options */}
      <div className="flex items-center gap-6 mb-10">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            className="accent-[var(--color-primary)]" />
          <span className="text-sm text-[var(--color-text-secondary)]">Featured project</span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-6">
        <div className="text-[11px] text-[var(--color-text-muted)] font-mono">Auto-saved</div>
        <div className="flex gap-3">
          <button onClick={() => handleSave("draft")} disabled={saving}
            className="px-6 py-3 rounded-lg border border-[var(--color-border)] text-[var(--color-text-primary)] font-bold text-sm hover:border-[var(--color-primary)]/50 transition-colors disabled:opacity-50">
            Save Draft
          </button>
          <button onClick={() => handleSave("published")} disabled={saving}
            className="px-6 py-3 rounded-lg bg-[var(--color-primary)] text-[var(--color-background)] font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
            Publish Project
          </button>
        </div>
      </div>
    </div>
  );
}
