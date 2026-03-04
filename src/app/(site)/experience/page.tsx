import type { Metadata } from "next";
import { experience } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional experience timeline of Mudassir Mohammed — Full Stack Engineer.",
};

export default function ExperiencePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-8 pt-16 pb-24">
      {/* Header */}
      <section className="mb-20">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight text-[var(--color-text-primary)]">
          Career Trajectory
        </h1>
        <div className="w-12 h-1 bg-[var(--color-primary)] rounded-full" />
      </section>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-[140px] md:left-[180px] top-0 bottom-0 w-px bg-[var(--color-border)] hidden sm:block" />

        <div className="space-y-16">
          {experience.map((entry, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-6 sm:gap-12 relative">
              {/* Date */}
              <div className="sm:w-[140px] md:w-[180px] shrink-0 sm:text-right">
                <span className="text-sm font-mono text-[var(--color-text-muted)] uppercase tracking-wider">
                  {entry.period.split(" — ").map((part, i) => (
                    <span key={i}>
                      {i > 0 && <br />}
                      {part}
                    </span>
                  ))}
                </span>
              </div>

              {/* Dot */}
              <div className="hidden sm:flex items-start relative">
                <div className="size-3 rounded-full bg-[var(--color-primary)] mt-1.5 -ml-1.5 relative z-10" />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
                    {entry.title}
                  </h2>
                  <span className="text-[var(--color-primary)] font-medium">
                    {entry.company}
                  </span>
                </div>
                <ul className="space-y-3">
                  {entry.description.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[var(--color-text-secondary)] leading-relaxed">
                      <span className="text-[var(--color-primary)] mt-2 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)]">
          Timeline End
        </span>
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-primary)]">
          Updated Mar 2026
        </span>
      </div>
    </div>
  );
}
