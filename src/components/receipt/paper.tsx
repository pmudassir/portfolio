import Link from "next/link";
import type { ReactNode } from "react";
import type { ProjectMeta } from "@/content/projects";

// Printed-paper building blocks shared by every page: the sheet itself, dashed section rules,
// tear-off project stubs and the section index that sits in the margin on wide screens.

type IndexItem = { id: string; label: string };

export function Paper({
  wide = false,
  thermal = false,
  index,
  className = "",
  children,
}: {
  wide?: boolean;
  /** Section links shown in the margin beside the sheet on wide screens. */
  index?: { label: string; items: IndexItem[] };
  /** Grain on everything, as on the home receipt. Long reading pages keep body text crisp. */
  thermal?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`receipt-feed ${wide ? "receipt-feed-wide" : ""}`}>
      {index ? <SheetIndex label={index.label} items={index.items} wide={wide} /> : null}
      <div className="receipt-shadow" aria-hidden />
      <div data-receipt className={`receipt paper ${thermal ? "thermal" : ""} ${className}`}>
        {children}
      </div>
    </div>
  );
}

/** A big condensed title, printed with heavy grain. */
export function PaperTitle({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h1 id={id} className="receipt-title">
      {children}
    </h1>
  );
}

export function PaperRule({
  id,
  label,
  right,
  as: Tag = "div",
}: {
  id?: string;
  label: ReactNode;
  right?: ReactNode;
  as?: "div" | "h2";
}) {
  return (
    <Tag id={id} className="receipt-rule scroll-mt-24">
      <span>{label}</span>
      {right ? <span>{right}</span> : null}
    </Tag>
  );
}

export function Stub({ project, item, headingLevel = 3 }: { project: ProjectMeta; item: number; headingLevel?: 2 | 3 }) {
  const Name = headingLevel === 2 ? "h2" : "h3";
  return (
    <li>
      <p className="receipt-perf" aria-hidden>
        <svg viewBox="0 0 24 24" className="size-4">
          <circle cx="6" cy="6" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="6" cy="18" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M8.5 7.5 20 17M8.5 16.5 20 7" stroke="currentColor" strokeWidth="2" />
        </svg>
      </p>
      <Link href={`/projects/${project.slug}`} className="receipt-stub">
        <span className="receipt-stub-top">
          <span>Item {String(item).padStart(2, "0")}</span>
          <span>{project.period}</span>
        </span>
        <Name className="receipt-stub-name">{project.name}</Name>
        <span className="receipt-stub-kind">
          {project.kind} · {project.role.split(":")[0]}
        </span>
        <span className="receipt-stub-text">{project.tagline}</span>
        <span className="receipt-stub-cta">Read the case study ↗</span>
      </Link>
    </li>
  );
}

// Rides alongside its sheet (sticky inside the sheet's own height), so it never drifts over the footer.
function SheetIndex({ label, items, wide }: { label: string; items: IndexItem[]; wide: boolean }) {
  return (
    <nav aria-label={label} className={`receipt-index ${wide ? "receipt-index-wide" : ""}`}>
      <div className="receipt-index-inner">
        <p className="mb-2 text-ink-2">{label}</p>
        {items.map((s) => (
          <a key={s.id} href={`#${s.id}`}>
            {s.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
