import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { getPublishedProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description: "Engineering case studies by Mudassir Mohammed — Full Stack Engineer. Real-world projects in React, Next.js, TypeScript, Node.js, Vue, and React Native with documented architectural decisions.",
  alternates: { canonical: "https://mudassirmhd.in/projects" },
  openGraph: {
    title: "Projects — Mudassir Mohammed",
    description: "Engineering case studies documenting real architectural decisions, challenges, and impact metrics from production web and mobile systems.",
    url: "https://mudassirmhd.in/projects",
    type: "website",
  },
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-8">
      <section className="pt-16 pb-24 md:pt-20">
        <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-text-primary)] mb-4">
          Projects
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mb-16">
          Case studies in architecture, performance, and product thinking.
          Each project documents real engineering decisions and their outcomes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
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
    </div>
  );
}
