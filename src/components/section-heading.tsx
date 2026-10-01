import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "./icons";

export function SectionHeading({
  id,
  children,
  intro,
  action,
}: {
  id: string;
  children: ReactNode;
  intro?: ReactNode;
  action?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-rule pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 id={id} className="font-serif text-[2rem] leading-tight tracking-tight text-ink">
          {children}
        </h2>
        {intro ? <p className="mt-2 max-w-[38rem] text-ink-2">{intro}</p> : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className="inline-flex shrink-0 items-center gap-1.5 text-[0.9375rem] text-ink-2 transition-colors hover:text-accent"
        >
          {action.label}
          <ArrowRight />
        </Link>
      ) : null}
    </div>
  );
}
