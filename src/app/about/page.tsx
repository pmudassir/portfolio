import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "About Mudassir Mohammed — Full Stack Engineer, founder of Mentrex, building production-grade web and mobile systems.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-8 pt-16 pb-24">
      {/* Header */}
      <section className="mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-[var(--color-text-primary)]">
          About
        </h1>
        <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed">
          Engineer. Builder. Obsessed with clean systems.
        </p>
      </section>

      {/* Journey */}
      <section className="mb-16 space-y-6 text-lg text-[var(--color-text-secondary)] leading-relaxed">
        <p>
          I&apos;m <span className="text-[var(--color-text-primary)] font-medium">Mudassir Mohammed</span> — a Full Stack Engineer 
          with 2+ years of experience building production-grade web and mobile applications. I don&apos;t just write 
          code; I design systems that solve real problems.
        </p>
        <p>
          I run <span className="text-[var(--color-primary)] font-medium">Mentrex</span>, a coding institute where 
          I teach aspiring developers how to build real-world applications — not toy projects. The LMS powering 
          Mentrex? Built it from scratch. The finance tracker my students use for learning? Built that too.
        </p>
        <p>
          My stack is intentionally versatile: <span className="text-[var(--color-text-primary)]">React, Next.js, TypeScript</span> on 
          the frontend. <span className="text-[var(--color-text-primary)]">Node.js, Express, MongoDB, PostgreSQL</span> on 
          the backend. <span className="text-[var(--color-text-primary)]">React Native (Expo)</span> for mobile. 
          I pick tools based on the problem, not the trend.
        </p>
      </section>

      {/* Engineering Philosophy */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-8">
          Engineering Philosophy
        </h2>
        <div className="space-y-8">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <h3 className="text-lg font-bold text-[var(--color-primary)] mb-2">Ship first, optimize second</h3>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              A working product in users&apos; hands teaches you more than any amount of premature optimization. 
              I build MVPs fast, gather feedback, then iterate with data.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <h3 className="text-lg font-bold text-[var(--color-primary)] mb-2">Types are not optional</h3>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              TypeScript everywhere. From database schemas to API contracts to UI components. The time spent 
              writing types is always less than debugging runtime errors at 2 AM.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <h3 className="text-lg font-bold text-[var(--color-primary)] mb-2">Architecture is about trade-offs</h3>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              There&apos;s no perfect architecture — only the right one for the current constraints. I choose 
              simplicity until complexity is proven necessary.
            </p>
          </div>
        </div>
      </section>

      {/* What I Care About */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-8">
          What I Care About When Building
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "User experience over developer experience", icon: "🎯" },
            { label: "Performance as a feature, not an afterthought", icon: "⚡" },
            { label: "Clean, readable code over clever code", icon: "📖" },
            { label: "Horizontal scalability from day one", icon: "📐" },
            { label: "Tight feedback loops with real users", icon: "🔄" },
            { label: "Documentation as part of the product", icon: "📝" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-3 p-4 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary)]/20 transition-colors"
            >
              <span className="text-lg shrink-0">{item.icon}</span>
              <span className="text-sm text-[var(--color-text-secondary)]">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pt-8 border-t border-[var(--color-border)]">
        <p className="text-[var(--color-text-secondary)] mb-6">
          Interested in working together? I&apos;m currently available for select projects.
        </p>
        <Link
          href="/contact"
          className="inline-block px-8 py-3 rounded-lg bg-[var(--color-primary)] text-[var(--color-background)] font-bold text-sm tracking-wide hover:opacity-90 transition-opacity"
        >
          Get in Touch
        </Link>
      </section>
    </div>
  );
}
