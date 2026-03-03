import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const project = getProjectBySlug(slug);
    if (!project) return { title: "Project Not Found" };
    return {
      title: project.title,
      description: project.subtitle,
    };
  });
}

export default async function ProjectCaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex(p => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-8 pt-16 pb-24">
      {/* Back Link */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors mb-12"
      >
        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to Projects
      </Link>

      {/* Header */}
      <header className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
          {project.title}
        </h1>
        <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed mb-10">
          {project.subtitle}
        </p>

        {/* Meta Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-[var(--color-border)]">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)]">Role</span>
            <p className="mt-1 font-medium text-[var(--color-text-primary)]">{project.role}</p>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)]">Timeline</span>
            <p className="mt-1 font-medium text-[var(--color-text-primary)]">{project.timeline}</p>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)]">Stack</span>
            <p className="mt-1 font-medium text-[var(--color-text-primary)]">{project.stack.slice(0, 3).join(", ")}</p>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)]">Focus</span>
            <p className="mt-1 font-medium text-[var(--color-text-primary)]">{project.focus}</p>
          </div>
        </div>
      </header>

      {/* The Challenge */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">The Challenge</h2>
        <div className="text-[var(--color-text-secondary)] leading-relaxed space-y-4 text-lg">
          <p>{project.challenge}</p>
        </div>
      </section>

      {/* Architectural Decisions */}
      <section className="mb-16">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-8">Architectural Decisions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.architecturalDecisions.map((decision) => (
              <div key={decision.title} className="space-y-2">
                <h3 className="text-lg font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                  <span className="text-[var(--color-primary)]">◆</span>
                  {decision.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {decision.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Insight / Code Snippet */}
      {project.codeSnippet && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">Technical Insight</h2>
          <div className="rounded-xl overflow-hidden border border-[var(--color-border)]">
            <div className="flex items-center gap-2 px-4 py-3 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
              <div className="flex gap-1.5">
                <span className="size-3 rounded-full bg-red-500/80" />
                <span className="size-3 rounded-full bg-yellow-500/80" />
                <span className="size-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs font-mono text-[var(--color-text-muted)] ml-2">
                {project.codeSnippet.filename}
              </span>
            </div>
            <pre className="p-6 bg-[var(--color-surface)] overflow-x-auto">
              <code className="text-sm font-mono text-[var(--color-text-secondary)] leading-relaxed">
                {project.codeSnippet.code}
              </code>
            </pre>
          </div>
        </section>
      )}

      {/* Impact & Results */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-8 text-center">
          Impact & Results
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {project.impact.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-2">
                {item.metric}
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Links */}
      <section className="mb-16 flex flex-wrap gap-4">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg bg-[var(--color-primary)] text-[var(--color-background)] font-bold text-sm hover:opacity-90 transition-opacity"
          >
            View Live ↗
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg border border-[var(--color-border)] text-[var(--color-text-primary)] font-bold text-sm hover:border-[var(--color-primary)]/50 transition-colors"
          >
            View Source ↗
          </a>
        )}
      </section>

      {/* Next Project */}
      <footer className="pt-8 border-t border-[var(--color-border)] flex justify-end">
        <Link
          href={`/projects/${nextProject.slug}`}
          className="group text-right"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
            Next Project
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
              {nextProject.title.split(" — ")[0]}
            </span>
            <svg className="size-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </Link>
      </footer>
    </div>
  );
}
