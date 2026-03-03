"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { useState } from "react";
import { articles, categories } from "@/data/journal";

export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredArticles =
    activeCategory === "All"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-8 pt-16 pb-24">
      {/* Header */}
      <section className="mb-20">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-[var(--color-text-primary)]">
          Journal
        </h1>
        <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
          Sharing technical findings, architecture notes, and deep dives into full-stack engineering.
        </p>
      </section>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-12 border-b border-[var(--color-border)] pb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)] mr-4">
          Filter By
        </span>
        <button
          onClick={() => setActiveCategory("All")}
          className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all ${
            activeCategory === "All"
              ? "bg-[var(--color-primary)] text-[var(--color-background)]"
              : "bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-dim)]"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all ${
              activeCategory === cat
                ? "bg-[var(--color-primary)] text-[var(--color-background)]"
                : "bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-dim)]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Article List */}
      <main className="space-y-2">
        {filteredArticles.map((article) => (
          <Link key={article.slug} href={`/journal/${article.slug}`}>
            <article className="group relative p-8 -mx-8 rounded-xl hover:bg-[var(--color-surface)] transition-all cursor-pointer">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-3 flex-1">
                  <time className="block text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
                    {article.date}
                  </time>
                  <h2 className="text-2xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-[var(--color-text-secondary)] line-clamp-1 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
                <div className="flex items-center shrink-0">
                  <span className="px-3 py-1 rounded bg-[var(--color-primary-dim)] text-[var(--color-primary)] text-[10px] font-mono uppercase tracking-widest">
                    {article.category}
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </main>
    </div>
  );
}
