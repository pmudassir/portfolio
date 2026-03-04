import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, getAllArticleSlugs, getPublishedArticles } from "@/lib/data";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code blocks
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <div key={key++} className="my-6 rounded-xl border border-[var(--color-border)] bg-[#0d1117] overflow-hidden">
          <div className="px-4 py-2 border-b border-[var(--color-border)] flex items-center gap-2">
            <span className="size-3 rounded-full bg-red-500/80" />
            <span className="size-3 rounded-full bg-yellow-500/80" />
            <span className="size-3 rounded-full bg-green-500/80" />
            {lang && <span className="text-[11px] font-mono text-[var(--color-text-muted)] ml-3">{lang}</span>}
          </div>
          <pre className="p-5 text-sm text-[var(--color-text-secondary)] overflow-x-auto font-mono leading-relaxed">
            <code>{codeLines.join("\n")}</code>
          </pre>
        </div>
      );
      continue;
    }

    // Blockquotes
    if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={key++} className="border-l-2 border-[var(--color-primary)] pl-5 py-1 my-6 text-[var(--color-text-secondary)] italic">
          {line.slice(2)}
        </blockquote>
      );
      i++;
      continue;
    }

    // Headers
    if (line.startsWith("## ")) {
      elements.push(<h2 key={key++} className="text-xl font-bold text-[var(--color-text-primary)] mt-10 mb-4">{line.slice(3)}</h2>);
      i++;
      continue;
    }

    // List items
    if (line.startsWith("- ")) {
      elements.push(
        <li key={key++} className="text-[var(--color-text-secondary)] ml-4 mb-2 list-disc">
          {line.slice(2).replace(/\*\*(.*?)\*\*/g, "$1")}
        </li>
      );
      i++;
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(line)) {
      elements.push(
        <li key={key++} className="text-[var(--color-text-secondary)] ml-4 mb-2 list-decimal">
          {line.replace(/^\d+\.\s/, "").replace(/\*\*(.*?)\*\*/g, "$1")}
        </li>
      );
      i++;
      continue;
    }

    // Empty lines
    if (line.trim() === "") { i++; continue; }

    // Regular paragraph
    elements.push(
      <p key={key++} className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
        {line}
      </p>
    );
    i++;
  }
  return elements;
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const allArticles = await getPublishedArticles();
  const currentIndex = allArticles.findIndex((a) => a.slug === slug);
  const nextArticle = allArticles[(currentIndex + 1) % allArticles.length];

  const publishDate = new Date(article.published_at).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric"
  }).toUpperCase();

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-8">
      <section className="pt-16 pb-24 md:pt-20">
        <Link href="/journal" className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors mb-8">
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          All Articles
        </Link>

        <div className="flex items-center gap-4 mb-4">
          <span className="text-[11px] font-mono text-[var(--color-text-muted)] uppercase tracking-widest">{publishDate}</span>
          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold border border-[var(--color-border)] text-[var(--color-primary)]">
            {article.category}
          </span>
          <span className="text-[11px] font-mono text-[var(--color-text-muted)]">{article.read_time}</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-10 leading-tight">
          {article.title}
        </h1>

        <div className="prose-custom">{renderContent(article.content)}</div>

        {/* Next Article */}
        {nextArticle && nextArticle.slug !== slug && (
          <div className="mt-16 pt-10 border-t border-[var(--color-border)]">
            <Link href={`/journal/${nextArticle.slug}`} className="group block">
              <span className="text-[var(--color-text-muted)] text-xs font-mono uppercase tracking-widest">Next Article</span>
              <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mt-2 group-hover:text-[var(--color-primary)] transition-colors">
                {nextArticle.title} →
              </h3>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
