import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Featured projects and case studies by Mudassir Mohammed. Production-grade web and mobile applications.",
};

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-16 pb-24">
      <section className="mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-[var(--color-text-primary)]">
          Projects
        </h1>
        <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
          Production systems I&apos;ve designed and built. Each project is a case study in solving real problems with scalable architecture.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            slug={project.slug}
            title={project.title}
            description={project.description}
            stack={project.stack}
          />
        ))}
      </div>
    </div>
  );
}
