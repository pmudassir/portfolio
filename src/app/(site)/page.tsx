import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { getFeaturedProjects } from "@/lib/data";
import { currentlyBuilding } from "@/data/experience";

const stackColumns = [
  {
    title: "LANGUAGES",
    items: [
      { icon: "🔤", name: "C" },
      { icon: "☕", name: "Java" },
      { icon: "⚡", name: "JavaScript" },
      { icon: "◇", name: "TypeScript" },
    ],
  },
  {
    title: "FRONTEND",
    items: [
      { icon: "⚛", name: "React / Next.js" },
      { icon: "📱", name: "React Native" },
      { icon: "🎨", name: "Tailwind / Shadcn" },
      { icon: "🧊", name: "Three.js" },
      { icon: "🔄", name: "Redux" },
    ],
  },
  {
    title: "BACKEND & INFRA",
    items: [
      { icon: "◆", name: "Node.js / NestJS" },
      { icon: "⬡", name: "Express / GraphQL" },
      { icon: "◫", name: "PostgreSQL / MySQL" },
      { icon: "▣", name: "MongoDB / Redis" },
      { icon: "🔌", name: "Socket.io / REST" },
    ],
  },
  {
    title: "CLOUD & TOOLS",
    items: [
      { icon: "☁", name: "AWS / S3" },
      { icon: "🔥", name: "Firebase / Vercel" },
      { icon: "🐳", name: "Docker / K8s" },
      { icon: "⚙", name: "Nginx / Prisma" },
      { icon: "🧪", name: "Jest / Mocha / Git" },
    ],
  },
];

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function Home() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-8">
      {/* Hero Section */}
      <section className="pt-20 pb-24 md:pt-32 md:pb-32">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-[var(--color-text-primary)] leading-[1.1] animate-fade-in">
          Full Stack Engineer
          <br />
          building scalable web &
          <br />
          mobile systems.
        </h1>
        <p className="mt-8 text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl leading-relaxed animate-fade-in-delay">
          A product-first mindset combined with technical excellence. Focused on architecting
          high-performance applications and distributed systems that scale with your business.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 animate-fade-in-delay-2">
          <Link
            href="/projects"
            className="px-8 py-3 rounded-lg bg-[var(--color-primary)] text-[var(--color-background)] font-bold text-sm tracking-wide hover:opacity-90 transition-opacity"
          >
            View Projects
          </Link>
          <Link
            href="/journal"
            className="px-8 py-3 rounded-lg border border-[var(--color-border)] text-[var(--color-text-primary)] font-bold text-sm tracking-wide hover:border-[var(--color-primary)]/50 hover:text-[var(--color-primary)] transition-all"
          >
            Read Notes
          </Link>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="pb-24">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
            Featured Projects
          </h2>
          <div className="flex-1 h-px bg-[var(--color-border)]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.slice(0, 4).map((project) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              title={project.title}
              description={project.description}
              stack={project.stack}
              hasLandingPage={!!project.landing_page}
            />
          ))}
        </div>
      </section>

      {/* Architecture & Stack */}
      <section className="pb-24">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">
          Architecture & Stack
        </h2>
        <p className="text-[var(--color-text-secondary)] mb-10">
          The tools and technologies I use to build modern digital products.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stackColumns.map((col) => (
            <div
              key={col.title}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
            >
              <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--color-primary)] mb-6">
                {col.title}
              </h3>
              <ul className="space-y-4">
                {col.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]"
                  >
                    <span className="text-base">{item.icon}</span>
                    <span className="font-mono">{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Currently Building */}
      <section className="pb-24">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">
          Currently Building
        </h2>
        <p className="text-[var(--color-text-secondary)] mb-10">
          Active side projects and open-source contributions.
        </p>
        <div className="space-y-3">
          {currentlyBuilding.map((item) => (
            <div
              key={item.title}
              className="flex items-center justify-between p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/20 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <span
                  className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-widest ${
                    item.status === "IN PROGRESS"
                      ? "bg-[var(--color-primary-dim)] text-[var(--color-primary)]"
                      : item.status === "BETA"
                      ? "bg-purple-500/10 text-purple-400"
                      : "bg-amber-500/10 text-amber-400"
                  }`}
                >
                  {item.status}
                </span>
                <span className="font-medium text-[var(--color-text-primary)]">
                  {item.title}
                  <span className="text-[var(--color-text-muted)] font-normal">
                    {" "}— {item.description}
                  </span>
                </span>
              </div>
              <svg
                className="size-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
