import { ArrowUpRight } from "@/components/icons";
import { ProjectRow } from "@/components/project-row";
import { otherBuilds, projects } from "@/content/projects";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Engineering case studies by Mudassir Mohammed: OpsPilot (multi-tenant FastAPI platform with LLM tool calling and evals), Mentrex (production LMS), Koin (React Native + Kotlin expense tracker) and Nexus SaaS.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <div className="wrap pt-12 sm:pt-16">
      <header className="max-w-[44rem]">
        <p className="eyebrow">Case studies</p>
        <h1 className="mt-3 font-serif text-[2.5rem] leading-tight tracking-tight text-ink sm:text-[3.25rem]">Projects</h1>
        <p className="mt-4 text-[1.125rem] leading-relaxed text-ink-2">
          Four builds, strongest first. Each case study covers the problem, what I personally built, how it&apos;s put
          together, the decisions behind it, and what&apos;s still missing.
        </p>
      </header>

      <div className="mt-10 divide-y divide-rule border-t border-rule sm:mt-14">
        {projects.map((p, i) => (
          <ProjectRow key={p.slug} project={p} index={i} headingLevel={2} />
        ))}
      </div>

      <section aria-labelledby="also" className="mt-16 sm:mt-20">
        <h2 id="also" className="border-b border-rule pb-4 font-serif text-[1.75rem] leading-tight tracking-tight text-ink">
          Also built
        </h2>
        <ul className="divide-y divide-rule">
          {otherBuilds.map((b) => (
            <li key={b.name} className="grid gap-x-10 gap-y-2 py-6 lg:grid-cols-[15rem_1fr]">
              <h3 className="font-medium text-ink">
                {"href" in b ? (
                  <a href={b.href} className="link inline-flex items-center gap-1" target="_blank" rel="noopener noreferrer">
                    {b.name}
                    <ArrowUpRight />
                  </a>
                ) : (
                  b.name
                )}
              </h3>
              <div className="max-w-[42rem]">
                <p className="leading-relaxed text-ink-2">{b.description}</p>
                <p className="mt-2 font-mono text-[0.8125rem] text-ink-3">
                  {b.stack.join(" · ")}
                  {"note" in b ? ` · ${b.note}` : ""}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-ink-2">
          Everything else, including older experiments, is on{" "}
          <a href={site.links.github} className="link" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          .
        </p>
      </section>
    </div>
  );
}
