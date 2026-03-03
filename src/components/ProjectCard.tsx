import Link from "next/link";

interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  stack: string[];
  image?: string;
}

export default function ProjectCard({ slug, title, description, stack }: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className="group block">
      <article className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden hover:border-[var(--color-primary)]/30 transition-all duration-300">
        {/* Image placeholder */}
        <div className="aspect-[16/10] bg-gradient-to-br from-[var(--color-surface-light)] to-[var(--color-surface)] flex items-center justify-center overflow-hidden">
          <div className="text-[var(--color-text-muted)] flex flex-col items-center gap-2">
            <svg className="size-10 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
            </svg>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <h3 className="text-xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
            {title}
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed line-clamp-2">
            {description}
          </p>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-2">
            {stack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded bg-[var(--color-background)] text-[var(--color-text-muted)] text-[11px] font-mono uppercase tracking-wider border border-[var(--color-border)]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="pt-2">
            <span className="text-sm font-medium text-[var(--color-primary)] group-hover:underline">
              View Case Study →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
