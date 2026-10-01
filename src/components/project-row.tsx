import Link from "next/link";
import type { ProjectMeta } from "@/content/projects";
import { ArrowRight } from "./icons";

// One project in a list: index + name on the left, substance on the right.
export function ProjectRow({
  project,
  index,
  headingLevel = 3,
  compact = false,
}: {
  project: ProjectMeta;
  index: number;
  headingLevel?: 2 | 3;
  /** Hide the longer summary on small screens. */
  compact?: boolean;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const href = `/projects/${project.slug}`;

  return (
    <article className="group relative grid gap-x-10 gap-y-3 py-8 sm:py-10 lg:grid-cols-[15rem_1fr]">
      <div>
        <p className="eyebrow">
          {String(index + 1).padStart(2, "0")} · {project.kind}
        </p>
        <Heading className="mt-2 font-serif text-[1.75rem] leading-tight tracking-tight text-ink">
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {project.name}
          </Link>
        </Heading>
        <p className="mt-1 text-sm text-ink-3">
          {project.role.split(":")[0]} · {project.period}
        </p>
      </div>

      <div className="max-w-[42rem]">
        <p className="text-[1.0625rem] leading-relaxed text-ink">{project.tagline}</p>
        <p className={`mt-3 leading-relaxed text-ink-2 ${compact ? "hidden sm:block" : ""}`}>{project.summary}</p>
        <p className="mt-4 border-l-2 border-accent/70 pl-3 text-[0.9375rem] leading-relaxed text-ink-2">
          <span className="font-medium text-ink">Under the hood: </span>
          {project.highlight}
        </p>
        <p className="mt-4 font-mono text-[0.8125rem] leading-relaxed text-ink-3">{project.stack.slice(0, 6).join(" · ")}</p>
        <p className="mt-5 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-accent transition-colors group-hover:text-accent-hover">
          Read the case study
          <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
        </p>
      </div>
    </article>
  );
}
