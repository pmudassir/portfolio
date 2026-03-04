"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { DBArticle } from "@/lib/supabase";

export default function JournalPage() {
  const [articles, setArticles] = useState<DBArticle[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("journal_articles")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false });
      const arts = data ?? [];
      setArticles(arts);
      setCategories([...new Set(arts.map((a) => a.category))]);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = activeCategory === "All"
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-8">
      <section className="pt-16 pb-24 md:pt-20">
        <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-text-primary)] mb-4">
          Journal
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mb-16">
          Sharing technical findings, architecture notes, and deep dives into
          full-stack engineering.
        </p>

        {/* Filter */}
        <div className="flex items-center gap-4 mb-10 flex-wrap">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
            FILTER BY
          </span>
          <button
            onClick={() => setActiveCategory("All")}
            className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider border transition-colors ${
              activeCategory === "All"
                ? "bg-[var(--color-primary)] text-[var(--color-background)] border-transparent"
                : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]/50"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider border transition-colors ${
                activeCategory === cat
                  ? "bg-[var(--color-primary)] text-[var(--color-background)] border-transparent"
                  : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="border-t border-[var(--color-border)]">
          {loading ? (
            <div className="py-20 text-center text-[var(--color-text-muted)]">Loading...</div>
          ) : (
            filtered.map((article) => (
              <Link
                key={article.slug}
                href={`/journal/${article.slug}`}
                className="block py-8 border-b border-[var(--color-border)] group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-mono text-[var(--color-text-muted)] uppercase tracking-widest">
                      {new Date(article.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase()}
                    </span>
                    <h3 className="text-xl font-bold text-[var(--color-text-primary)] mt-2 group-hover:text-[var(--color-primary)] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-[var(--color-text-secondary)] mt-2 max-w-2xl">
                      {article.excerpt}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest border border-[var(--color-border)] text-[var(--color-primary)] shrink-0 mt-6">
                    {article.category}
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
