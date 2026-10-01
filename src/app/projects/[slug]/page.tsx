import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { ArrowRight, ArrowUpRight, GitHub } from "@/components/icons";
import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import { absoluteUrl, pageMetadata } from "@/lib/metadata";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.name} case study`,
    description: project.summary,
    path: `/projects/${project.slug}`,
    type: "article",
  });
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const url = absoluteUrl(`/projects/${project.slug}`);

  const facts = [
    { term: "Role", detail: project.role },
    { term: "When", detail: project.period },
    { term: "Status", detail: project.status },
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": project.repoUrl ? "SoftwareSourceCode" : "CreativeWork",
      name: project.name,
      headline: project.tagline,
      description: project.summary,
      url,
      author: { "@id": `${site.url}/#person` },
      keywords: project.stack.join(", "),
      ...(project.repoUrl ? { codeRepository: project.repoUrl } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Projects", item: absoluteUrl("/projects") },
        { "@type": "ListItem", position: 2, name: project.name, item: url },
      ],
    },
  ];

  return (
    <article className="wrap pt-10 sm:pt-14">
      <JsonLd data={structuredData} />

      <nav aria-label="Breadcrumb" className="text-sm text-ink-3">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/projects" className="hover:text-ink">
              Projects
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-ink-2">
            {project.name}
          </li>
        </ol>
      </nav>

      {/* Header */}
      <header className="mt-6 grid gap-10 pb-2 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16 lg:border-b lg:border-rule lg:pb-10">
        <div>
          <p className="eyebrow">{project.kind}</p>
          <h1 className="mt-3 font-serif text-[2.6rem] leading-[1.05] tracking-tight text-ink sm:text-[3.5rem]">
            {project.name}
          </h1>
          <p className="mt-5 max-w-[40rem] text-[1.125rem] leading-relaxed text-ink-2 sm:text-[1.1875rem]">
            {project.tagline}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.9375rem]">
            {project.repoUrl ? (
              <a href={project.repoUrl} className="link inline-flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                <GitHub /> Source on GitHub
              </a>
            ) : null}
            {project.links.map((l) => (
              <a key={l.href} href={l.href} className="link inline-flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                {l.label}
                <ArrowUpRight />
              </a>
            ))}
            {project.sourceNote ? <span className="text-ink-3">{project.sourceNote}</span> : null}
          </div>
        </div>

        <dl className="divide-y divide-rule self-start border-y border-rule text-[0.9375rem]">
          {facts.map((f) => (
            <div key={f.term} className="grid grid-cols-[5rem_1fr] gap-3 py-3">
              <dt className="text-ink-3">{f.term}</dt>
              <dd className="text-ink">{f.detail}</dd>
            </div>
          ))}
          <div className="grid grid-cols-[5rem_1fr] gap-3 py-3">
            <dt className="text-ink-3">Stack</dt>
            <dd className="font-mono text-[0.8125rem] leading-relaxed text-ink">{project.stack.join(" · ")}</dd>
          </div>
        </dl>
      </header>

      {/* Body */}
      <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[15rem_minmax(0,1fr)]">
        <nav aria-label="On this page" className="lg:sticky lg:top-8 lg:self-start">
          <p className="eyebrow">On this page</p>
          <ol className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[0.9375rem] lg:flex-col lg:gap-2">
            {project.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-ink-2 transition-colors hover:text-accent">
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="min-w-0 space-y-14 sm:space-y-16">
          {project.sections.map((s) => (
            <section key={s.id} aria-labelledby={s.id}>
              <h2 id={s.id} className="scroll-mt-8 font-serif text-[1.875rem] leading-tight tracking-tight text-ink">
                {s.title}
              </h2>
              <div className="prose mt-4">{s.body}</div>
            </section>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 grid gap-8 border-t border-rule pt-10 sm:grid-cols-2">
        <div>
          <p className="eyebrow">Want the details?</p>
          <p className="mt-2 max-w-[28rem] text-ink-2">
            I&apos;m happy to go deeper on any of this, or walk through the code.{" "}
            <Link href="/contact" className="link">
              Get in touch
            </Link>
            .
          </p>
        </div>
        {next && next.slug !== project.slug ? (
          <Link href={`/projects/${next.slug}`} className="group sm:text-right">
            <p className="eyebrow">Next case study</p>
            <p className="mt-2 inline-flex items-center gap-2 font-serif text-[1.75rem] leading-tight text-ink transition-colors group-hover:text-accent">
              {next.name}
              <ArrowRight className="text-[1.25rem] transition-transform group-hover:translate-x-0.5" />
            </p>
          </Link>
        ) : null}
      </footer>
    </article>
  );
}
