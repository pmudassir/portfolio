import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import { ogImage, ogSize } from "@/lib/og";

export const alt = "Engineering case study by Mudassir Mohammed";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return ogImage({
    label: `Case study · ${project?.kind ?? ""}`,
    title: project?.name ?? site.name,
    subtitle: project?.tagline ?? site.description,
    footer: `${site.name} · ${project?.stack.slice(0, 4).join(" · ") ?? ""}`,
  });
}
