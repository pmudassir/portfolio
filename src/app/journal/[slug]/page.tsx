import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticleBySlug } from "@/data/journal";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const article = getArticleBySlug(slug);
    if (!article) return { title: "Article Not Found" };
    return {
      title: article.title,
      description: article.excerpt,
    };
  });
}

export default async function JournalArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const currentIndex = articles.findIndex(a => a.slug === slug);
  const nextArticle = articles[(currentIndex + 1) % articles.length];

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeLines: string[] = [];
    let codeLanguage = "";

    lines.forEach((line, i) => {
      if (line.startsWith("```") && !inCodeBlock) {
        inCodeBlock = true;
        codeLanguage = line.replace("```", "").trim();
        codeLines = [];
        return;
      }
      if (line.startsWith("```") && inCodeBlock) {
        inCodeBlock = false;
        elements.push(
          <div key={`code-${i}`} className="my-8 rounded-xl overflow-hidden border border-[var(--color-border)]">
            <div className="flex items-center gap-2 px-4 py-3 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
              <div className="flex gap-1.5">
                <span className="size-3 rounded-full bg-red-500/80" />
                <span className="size-3 rounded-full bg-yellow-500/80" />
                <span className="size-3 rounded-full bg-green-500/80" />
              </div>
              {codeLanguage && (
                <span className="text-xs font-mono text-[var(--color-text-muted)] ml-2">{codeLanguage}</span>
              )}
            </div>
            <pre className="p-6 bg-[var(--color-surface)] overflow-x-auto">
              <code className="text-sm font-mono text-[var(--color-text-secondary)] leading-relaxed">
                {codeLines.join("\n")}
              </code>
            </pre>
          </div>
        );
        return;
      }
      if (inCodeBlock) {
        codeLines.push(line);
        return;
      }

      if (line.startsWith("## ")) {
        elements.push(
          <h2 key={i} className="text-2xl font-bold text-[var(--color-text-primary)] mt-12 mb-4">
            {line.replace("## ", "")}
          </h2>
        );
      } else if (line.startsWith("> ")) {
        elements.push(
          <blockquote key={i} className="my-8 pl-6 border-l-2 border-[var(--color-primary)] italic text-[var(--color-text-secondary)]">
            <p>{line.replace("> ", "").replace(/^"/, "").replace(/"$/, "")}</p>
          </blockquote>
        );
      } else if (line.trim() === "") {
        // skip empty lines
      } else {
        // Handle inline code
        const parts = line.split(/(`[^`]+`)/g);
        elements.push(
          <p key={i} className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
            {parts.map((part, j) =>
              part.startsWith("`") && part.endsWith("`") ? (
                <code key={j} className="px-1.5 py-0.5 rounded bg-[var(--color-surface)] text-[var(--color-primary)] text-sm font-mono">
                  {part.slice(1, -1)}
                </code>
              ) : (
                <span key={j}>{part}</span>
              )
            )}
          </p>
        );
      }
    });

    return elements;
  };

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-8 pt-16 pb-24">
      {/* Back Link */}
      <Link
        href="/journal"
        className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors mb-12"
      >
        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to Journal
      </Link>

      {/* Article Header */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-primary)]">
            {article.category}
          </span>
          <span className="text-[var(--color-text-muted)]">·</span>
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
            {article.date}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
          {article.title}
        </h1>
        <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {article.readTime}
        </div>
      </header>

      {/* Article Content */}
      <article className="prose-custom">
        {renderContent(article.content)}
      </article>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-[var(--color-border)]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p className="text-sm italic text-[var(--color-text-muted)]">
              Thanks for reading. If you found this technical deep-dive useful, feel free to share it with your network.
            </p>
          </div>
          <Link href={`/journal/${nextArticle.slug}`} className="group text-right shrink-0">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
              Next Article
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-base font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                {nextArticle.title.length > 30 ? nextArticle.title.slice(0, 30) + "..." : nextArticle.title}
              </span>
              <svg className="size-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </Link>
        </div>
      </footer>
    </div>
  );
}
