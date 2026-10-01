import { roles } from "@/content/experience";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/metadata";

export const dynamic = "force-static";

// Plain-text summary for LLM-based search tools, generated from the same content as the site.
export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "## Contact",
    `- Email: ${site.email}`,
    `- GitHub: ${site.links.github}`,
    `- LinkedIn: ${site.links.linkedin}`,
    `- Résumé: ${absoluteUrl(site.links.resume)}`,
    `- Location: ${site.location.city}, ${site.location.country} · ${site.location.timezone}`,
    `- Availability: ${site.availability.detail}`,
    "",
    "## Experience",
    ...roles.map((r) => `- ${r.title}, ${r.company} (${r.period}): ${r.summary}`),
    "",
    "## Case studies",
    ...projects.map((p) => `- [${p.name}](${absoluteUrl(`/projects/${p.slug}`)}): ${p.tagline}`),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
