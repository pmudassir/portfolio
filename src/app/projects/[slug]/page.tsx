import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { Barcode } from "@/components/receipt/barcode";
import { Paper, PaperRule, PaperTitle, Stub } from "@/components/receipt/paper";
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
    { term: "Stack", detail: project.stack.join(", ") },
  ];
  const contents = project.sections.map((s) => ({ id: s.id, label: s.title }));

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
    <>
      <JsonLd data={structuredData} />
      <Paper wide index={{ label: "On this invoice", items: contents }}>
        <article>
          <nav aria-label="Breadcrumb" className="receipt-kicker">
            <ol className="flex gap-2">
              <li>
                <Link href="/projects" className="underline underline-offset-2">
                  Projects
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{project.name}</li>
            </ol>
            <span>Invoice · {project.kind}</span>
          </nav>

          <PaperTitle>{project.name}</PaperTitle>
          <p className="receipt-lede">{project.tagline}</p>

          <dl className="receipt-facts">
            {facts.map((f) => (
              <div key={f.term}>
                <dt>{f.term}</dt>
                <dd>{f.detail}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[0.9375rem]">
            {project.repoUrl ? (
              <a href={project.repoUrl} className="underline underline-offset-2" target="_blank" rel="noopener noreferrer">
                Source on GitHub ↗
              </a>
            ) : null}
            {project.links.map((l) => (
              <a key={l.href} href={l.href} className="underline underline-offset-2" target="_blank" rel="noopener noreferrer">
                {l.label} ↗
              </a>
            ))}
            {project.sourceNote ? <span className="text-ink-3">{project.sourceNote}</span> : null}
          </p>

          <nav aria-label="Contents" className="min-[86rem]:hidden">
            <PaperRule label="Contents" right={`${contents.length} sections`} />
            <ol className="receipt-contents">
              {contents.map((c) => (
                <li key={c.id}>
                  <a href={`#${c.id}`}>{c.label}</a>
                </li>
              ))}
            </ol>
          </nav>

          {project.sections.map((s, i) => (
            <section key={s.id} aria-labelledby={s.id}>
              <PaperRule as="h2" id={s.id} label={s.title} right={String(i + 1).padStart(2, "0")} />
              <div className="prose mt-5">{s.body}</div>
            </section>
          ))}

          <footer>
            <PaperRule label="Total" right="Due on request" />
            <p className="mt-4 leading-relaxed">
              Happy to go deeper on any of this, or walk through the code.{" "}
              <Link href="/contact" className="underline underline-offset-2">
                Get in touch
              </Link>
              .
            </p>
            {next && next.slug !== project.slug ? (
              <>
                <PaperRule label="Next case study" right="Tear to open" />
                <ul>
                  <Stub project={next} item={projects.indexOf(next) + 1} />
                </ul>
              </>
            ) : null}
            <div className="receipt-foot">
              {/* A short item code: a long address would squeeze bars below a pixel on phones. */}
              <Barcode value={project.slug.toUpperCase()} className="mx-auto h-14 w-full max-w-[18rem]" />
              <p>Item {project.slug.toUpperCase()}</p>
            </div>
          </footer>
        </article>
      </Paper>
    </>
  );
}
