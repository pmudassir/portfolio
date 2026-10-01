import type { ReactNode } from "react";

// Building blocks for case studies. Server components only; no client JS.

/* ── Flow diagram ─────────────────────────────────────────
   Layers stacked top to bottom with connectors between them.
   Each layer can hold several nodes side by side. Built from
   HTML so it reflows on small screens and reads as a list.   */

export type FlowNode = { title: string; detail?: string; accent?: boolean };
export type FlowLayer = { label: string; nodes: FlowNode[]; edge?: string };

export function FlowDiagram({ caption, layers }: { caption: string; layers: FlowLayer[] }) {
  return (
    <figure className="not-prose my-8 max-w-[42rem]">
      <ol className="rounded-lg border border-rule bg-paper-2 p-3 sm:p-5" aria-label={caption}>
        {layers.map((layer, i) => (
          <li key={layer.label}>
            <div className="grid gap-2 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
              <div className="eyebrow pt-0.5 sm:pt-3 sm:text-right">{layer.label}</div>
              <ul className="flex flex-wrap gap-2">
                {layer.nodes.map((node) => (
                  <li
                    key={node.title}
                    className={`min-w-[9rem] flex-1 rounded-md border bg-paper px-3 py-2.5 ${
                      node.accent ? "border-accent/60" : "border-rule-strong"
                    }`}
                  >
                    <div className="text-sm font-medium text-ink">{node.title}</div>
                    {node.detail ? <div className="mt-0.5 text-[0.8125rem] leading-snug text-ink-3">{node.detail}</div> : null}
                  </li>
                ))}
              </ul>
            </div>
            {i < layers.length - 1 ? (
              <div className="grid sm:grid-cols-[7.5rem_1fr] sm:gap-4" aria-hidden={layer.edge ? undefined : true}>
                <span className="hidden sm:block" />
                <div className="flex items-center gap-2 py-1.5 pl-4">
                  <svg width="10" height="22" viewBox="0 0 10 22" className="shrink-0 text-ink-3" aria-hidden="true">
                    <path d="M5 0v19M1.5 15.5 5 19.5l3.5-4" fill="none" stroke="currentColor" strokeWidth="1.25" />
                  </svg>
                  {layer.edge ? <span className="font-mono text-xs text-ink-3">{layer.edge}</span> : null}
                </div>
              </div>
            ) : null}
          </li>
        ))}
      </ol>
      <figcaption className="mt-3 text-sm text-ink-3">{caption}</figcaption>
    </figure>
  );
}

/* ── Decision records ─────────────────────────────────────── */

export type Decision = {
  title: string;
  why: ReactNode;
  instead?: ReactNode;
  revisit?: ReactNode;
};

export function Decisions({ items }: { items: Decision[] }) {
  return (
    <ol className="not-prose mt-6 max-w-[42rem] divide-y divide-rule border-y border-rule">
      {items.map((d, i) => (
        <li key={d.title} className="grid gap-x-4 py-5 sm:grid-cols-[2.25rem_1fr]">
          <span className="font-mono text-sm text-ink-3" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="font-medium leading-snug text-ink">{d.title}</h3>
            <dl className="mt-2 space-y-2 text-[0.9375rem] leading-relaxed text-ink-2">
              <div>
                <dt className="sr-only">Why</dt>
                <dd className="inline-code">{d.why}</dd>
              </div>
              {d.instead ? (
                <div>
                  <dt className="inline text-ink-3">Instead of: </dt>
                  <dd className="inline-code inline">{d.instead}</dd>
                </div>
              ) : null}
              {d.revisit ? (
                <div>
                  <dt className="inline text-ink-3">Revisit when: </dt>
                  <dd className="inline-code inline">{d.revisit}</dd>
                </div>
              ) : null}
            </dl>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ── Problem → solution pairs ─────────────────────────────── */

export function Challenge({ title, problem, solution }: { title: string; problem: ReactNode; solution: ReactNode }) {
  return (
    <div className="not-prose mt-6 max-w-[42rem] border-l-2 border-rule-strong pl-4 sm:pl-5">
      <h3 className="font-medium text-ink">{title}</h3>
      <p className="inline-code mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{problem}</p>
      <p className="inline-code mt-2 text-[0.9375rem] leading-relaxed text-ink-2">
        <span className="font-medium text-ink">What I did: </span>
        {solution}
      </p>
    </div>
  );
}

/* ── Data table (eval results etc.) ───────────────────────── */

export function DataTable({
  caption,
  columns,
  rows,
  note,
}: {
  caption: string;
  columns: string[];
  rows: (string | number)[][];
  note?: ReactNode;
}) {
  return (
    <figure className="not-prose my-6 max-w-[42rem]">
      <div className="overflow-x-auto rounded-lg border border-rule" tabIndex={0} role="region" aria-label={caption}>
        <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead className="bg-paper-2">
            <tr>
              {columns.map((c) => (
                <th key={c} scope="col" className="px-3 py-2 font-medium text-ink-2 first:pl-4">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-rule">
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c} className="px-3 py-2 font-mono text-[0.8125rem] text-ink first:pl-4 first:font-sans first:text-sm">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-2 text-sm text-ink-3">{note ?? caption}</figcaption>
    </figure>
  );
}

/* ── Labelled list (features, gaps) ───────────────────────── */

export function Points({ items }: { items: ReactNode[] }) {
  return (
    <ul>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <aside className="not-prose my-6 max-w-[42rem] rounded-lg bg-paper-2 px-4 py-3.5 text-[0.9375rem] leading-relaxed text-ink-2 inline-code">
      {children}
    </aside>
  );
}
