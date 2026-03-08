import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjectSlugs, getPublishedProjects } from "@/lib/data";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  const baseUrl = "https://mudassirmhd.in";
  const url = `${baseUrl}/projects/${slug}`;

  return {
    title: project.title,
    description: project.description,
    keywords: [
      ...project.stack,
      "case study",
      "project",
      "Mudassir Mohammed",
      "Full Stack Engineer",
    ],
    alternates: { canonical: url },
    openGraph: {
      title: `${project.title} — Mudassir Mohammed`,
      description: project.description,
      url,
      type: "article",
      images: [{ url: `${baseUrl}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Mudassir Mohammed`,
      description: project.description,
      creator: "@mudassirmhd",
    },
  };
}

export default async function ProjectCaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const allProjects = await getPublishedProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  const archDecisions = project.architectural_decisions as { title: string; description: string; icon: string }[];
  const impactMetrics = project.impact_metrics as { metric: string; label: string }[];

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    url: `https://mudassirmhd.in/projects/${slug}`,
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    author: {
      "@type": "Person",
      name: "Mudassir Mohammed",
      url: "https://mudassirmhd.in",
    },
    programmingLanguage: project.stack,
    ...(project.live_url ? { sameAs: project.live_url } : {}),
  };

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <section className="pt-16 pb-24 md:pt-20">
        {/* Header */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors mb-8"
        >
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          All Projects
        </Link>

        <h1 className="text-3xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4 leading-tight">
          {project.title}
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl mb-10 leading-relaxed">
          {project.subtitle}
        </p>

        {/* Meta Row */}
        <div className="flex flex-wrap gap-8 text-sm mb-16 pb-10 border-b border-[var(--color-border)]">
          <div>
            <span className="text-[var(--color-text-muted)] font-mono text-[10px] uppercase tracking-widest block mb-1">Role</span>
            <span className="text-[var(--color-text-primary)]">{project.role}</span>
          </div>
          <div>
            <span className="text-[var(--color-text-muted)] font-mono text-[10px] uppercase tracking-widest block mb-1">Timeline</span>
            <span className="text-[var(--color-text-primary)]">{project.timeline}</span>
          </div>
          <div>
            <span className="text-[var(--color-text-muted)] font-mono text-[10px] uppercase tracking-widest block mb-1">Stack</span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {project.stack.map((tech) => (
                <span key={tech} className="px-2 py-0.5 text-[11px] font-mono rounded bg-[var(--color-primary-dim)] text-[var(--color-primary)]">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Challenge */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">The Challenge</h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed text-base">{project.challenge}</p>
        </div>

        {/* Architectural Decisions */}
        {archDecisions.length > 0 && (
          <div className="mb-16">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6">Architectural Decisions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {archDecisions.map((decision) => (
                <div key={decision.title} className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="material-symbols-outlined text-[var(--color-primary)] text-xl">{decision.icon}</span>
                    <h3 className="font-bold text-[var(--color-text-primary)] text-sm">{decision.title}</h3>
                  </div>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">{decision.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Code Snippet */}
        {project.code_snippet && (
          <div className="mb-16">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Implementation</h2>
            <div className="rounded-xl border border-[var(--color-border)] bg-[#0d1117] overflow-hidden">
              <div className="px-4 py-2 border-b border-[var(--color-border)] flex items-center gap-2">
                <span className="size-3 rounded-full bg-red-500/80" />
                <span className="size-3 rounded-full bg-yellow-500/80" />
                <span className="size-3 rounded-full bg-green-500/80" />
                <span className="text-[11px] font-mono text-[var(--color-text-muted)] ml-3">{project.code_language}</span>
              </div>
              <pre className="p-5 text-sm text-[var(--color-text-secondary)] overflow-x-auto font-mono leading-relaxed">
                <code>{project.code_snippet}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Impact */}
        {impactMetrics.length > 0 && (
          <div className="mb-16">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6">Impact</h2>
            <div className="grid grid-cols-3 gap-4">
              {impactMetrics.map((item) => (
                <div key={item.label} className="text-center p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
                  <div className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-2">{item.metric}</div>
                  <div className="text-xs text-[var(--color-text-muted)] font-mono uppercase tracking-widest">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        <div className="flex gap-4 mb-16 pb-10 border-b border-[var(--color-border)]">
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-[var(--color-primary)] text-[var(--color-background)] font-bold text-sm hover:opacity-90 transition-opacity">
              View Live ↗
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg border border-[var(--color-border)] text-[var(--color-text-primary)] font-bold text-sm hover:border-[var(--color-primary)]/50 transition-colors">
              GitHub ↗
            </a>
          )}
        </div>

        {/* Next Project */}
        {nextProject && nextProject.slug !== slug && (
          <Link href={`/projects/${nextProject.slug}`} className="group block">
            <span className="text-[var(--color-text-muted)] text-xs font-mono uppercase tracking-widest">Next Project</span>
            <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mt-2 group-hover:text-[var(--color-primary)] transition-colors">
              {nextProject.title} →
            </h3>
          </Link>
        )}
      </section>
    </div>
  );
}
