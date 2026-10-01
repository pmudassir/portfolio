import Link from "next/link";
import { Availability } from "@/components/availability";
import { ButtonLink } from "@/components/buttons";
import { CopyEmail } from "@/components/copy-email";
import { ArrowRight, Download, GitHub, LinkedIn } from "@/components/icons";
import { ProjectRow } from "@/components/project-row";
import { SectionHeading } from "@/components/section-heading";
import { roles } from "@/content/experience";
import { featuredProjects } from "@/content/projects";
import { site } from "@/content/site";
import { alsoUsed, skillGroups } from "@/content/skills";

const facts = [
  { term: "Now", detail: `${site.currently.title}, ${site.currently.company}` },
  { term: "Experience", detail: `Shipping production software since ${site.startedYear}` },
  { term: "Based in", detail: `${site.location.city}, ${site.location.country} · ${site.location.timezone}` },
  { term: "Looking for", detail: site.availability.detail },
  { term: "Works in", detail: "TypeScript, React / Next.js, Vue / Nuxt, Node.js, Python / FastAPI, PostgreSQL" },
];

const principles = [
  {
    title: "Write the decision down",
    body: "OpsPilot has 26 decision records. Each one names the alternatives I rejected and the condition that would make me revisit it. That record is what lets the next person change the code safely.",
    href: "/projects/opspilot#decisions",
    proof: "OpsPilot's decision records",
  },
  {
    title: "Put the important rules in the database",
    body: "If a rule matters, a bug shouldn't be able to break it. That means a trigger that makes the audit log append-only, CHECK constraints, and composite foreign keys that make cross-tenant links impossible.",
    href: "/projects/opspilot#architecture",
    proof: "How OpsPilot isolates tenants",
  },
  {
    title: "Treat model output as untrusted input",
    body: "LLM features get strict schemas, no database ids, read-only tools scoped to the user, and a person who approves the result. The app still works with AI switched off.",
    href: "/projects/opspilot#ai",
    proof: "The OpsPilot AI layer",
  },
  {
    title: "Measure before trusting",
    body: "The default model in OpsPilot was chosen by a deterministic eval suite that includes prompt-injection cases, not by how the demo felt. When the grader was wrong, I fixed it and said so.",
    href: "/projects/opspilot#evals",
    proof: "Eval results",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="intro" className="wrap pt-12 pb-16 sm:pt-20 sm:pb-24">
        <Availability />
        <h1
          id="intro"
          className="mt-5 max-w-[26ch] font-serif text-[2.35rem] leading-[1.08] tracking-[-0.015em] text-ink sm:text-[3rem] lg:text-[3.4rem]"
        >
          Full-stack engineer for workflow‑heavy products, and the LLM features on top of them.
        </h1>

        <div className="mt-8 grid gap-12 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
          <div>
            <p className="max-w-[40rem] text-[1.125rem] leading-relaxed text-ink-2 sm:text-[1.1875rem]">
              Requests, approvals, roles, lifecycles and audit trails are the parts of a product that have to be
              right. I&apos;m {site.name}. I lead full-stack work on hospital workflow software at{" "}
              {site.currently.company.replace(" Technology", "")}. Outside work I build systems end to end, most
              recently{" "}
              <Link href="/projects/opspilot" className="link">
                OpsPilot
              </Link>
              : a multi-tenant FastAPI and Next.js platform with a tool-calling assistant and its own eval suite.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/projects/opspilot">
                Read the OpsPilot case study
                <ArrowRight />
              </ButtonLink>
              <ButtonLink href={site.links.resume} variant="secondary">
                <Download />
                Résumé (PDF)
              </ButtonLink>
            </div>

            <ul className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.9375rem] text-ink-2">
              <li>
                <a href={site.links.github} className="inline-flex items-center gap-2 hover:text-ink" rel="noopener noreferrer" target="_blank">
                  <GitHub /> GitHub
                </a>
              </li>
              <li>
                <a href={site.links.linkedin} className="inline-flex items-center gap-2 hover:text-ink" rel="noopener noreferrer" target="_blank">
                  <LinkedIn /> LinkedIn
                </a>
              </li>
              <li>
                <CopyEmail email={site.email} label={site.email} className="inline-flex items-center gap-2 hover:text-ink" />
              </li>
            </ul>
          </div>

          <dl className="divide-y divide-rule self-start border-y border-rule text-[0.9375rem]">
            {facts.map((f) => (
              <div key={f.term} className="grid grid-cols-[7.5rem_1fr] gap-3 py-3">
                <dt className="text-ink-3">{f.term}</dt>
                <dd className="text-ink">{f.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Selected work */}
      <section aria-labelledby="work" className="wrap">
        <SectionHeading
          id="work"
          intro="Three builds I'd walk a hiring panel through. Each case study covers what I built, how it fits together, and what's still missing."
          action={{ href: "/projects", label: "All projects" }}
        >
          Selected work
        </SectionHeading>
        <div className="divide-y divide-rule">
          {featuredProjects.map((p, i) => (
            <ProjectRow key={p.slug} project={p} index={i} compact />
          ))}
        </div>
      </section>

      {/* Experience */}
      <section aria-labelledby="experience" className="wrap mt-16 sm:mt-24">
        <SectionHeading id="experience" action={{ href: "/work", label: "Full experience" }}>
          Experience
        </SectionHeading>
        <ol className="divide-y divide-rule">
          {roles.map((r) => (
            <li key={r.company} className="grid gap-x-10 gap-y-1 py-6 lg:grid-cols-[15rem_1fr]">
              <p className="font-mono text-[0.8125rem] leading-6 text-ink-3">{r.period}</p>
              <div className="max-w-[42rem]">
                <h3 className="font-medium text-ink">
                  {r.title} <span className="font-normal text-ink-3">at</span> {r.company}
                </h3>
                <p className="mt-1 leading-relaxed text-ink-2">{r.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* How I work */}
      <section aria-labelledby="approach" className="wrap mt-16 sm:mt-24">
        <SectionHeading
          id="approach"
          intro="Four habits, each with somewhere you can check it."
        >
          How I work
        </SectionHeading>
        <div className="grid gap-x-12 sm:grid-cols-2">
          {principles.map((p) => (
            <div key={p.title} className="border-b border-rule py-7">
              <h3 className="font-medium text-ink">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-2">{p.body}</p>
              <Link href={p.href} className="link mt-3 inline-block text-[0.9375rem]">
                {p.proof}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Toolbox */}
      <section aria-labelledby="toolbox" className="wrap mt-16 sm:mt-24">
        <SectionHeading id="toolbox" intro="Grouped by what I use it for, with where you can see it.">
          Toolbox
        </SectionHeading>
        <dl className="divide-y divide-rule">
          {skillGroups.map((g) => (
            <div key={g.label} className="grid gap-x-10 gap-y-1.5 py-5 lg:grid-cols-[15rem_1fr]">
              <dt className="font-medium text-ink">{g.label}</dt>
              <dd className="max-w-[42rem]">
                <p className="text-ink">{g.items.join(", ")}</p>
                <p className="mt-1 text-sm text-ink-3">Seen in: {g.proof}</p>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 max-w-[42rem] text-sm text-ink-3 lg:ml-[17.5rem]">Also used in past work: {alsoUsed.join(", ")}.</p>
      </section>

      {/* Contact */}
      <section aria-labelledby="contact" className="wrap mt-16 sm:mt-24">
        <div className="rounded-xl bg-paper-2 px-5 py-10 sm:px-10 sm:py-12">
          <h2 id="contact" className="max-w-[30ch] font-serif text-[2rem] leading-tight tracking-tight text-ink sm:text-[2.4rem]">
            Hiring for a remote engineering role?
          </h2>
          <p className="mt-3 max-w-[38rem] leading-relaxed text-ink-2">
            Email is the quickest way to reach me. A line about the team and what you&apos;re building is plenty. If
            you&apos;d like to see the private code behind OpsPilot or Mentrex, ask and I&apos;ll walk you through it.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <ButtonLink href={`mailto:${site.email}`}>Email {site.shortName}</ButtonLink>
            <CopyEmail email={site.email} className="inline-flex items-center gap-2 rounded-md border border-rule-strong px-4 py-2.5 text-[0.9375rem] font-medium text-ink transition-colors hover:border-ink-3 hover:bg-paper" />
            <ButtonLink href={site.links.linkedin} variant="quiet" className="sm:ml-2" target="_blank" rel="noopener noreferrer">
              <LinkedIn /> LinkedIn
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
