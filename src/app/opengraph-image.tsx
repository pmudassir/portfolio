import { site } from "@/content/site";
import { ogImage, ogSize } from "@/lib/og";

export const alt = `${site.name}: ${site.headline}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    label: `${site.role} · ${site.location.city}, ${site.location.country}`,
    title: site.name,
    subtitle: "Full-stack engineer for workflow-heavy products, and the LLM features on top of them.",
    footer: "TypeScript · React · Vue · Node.js · Python · PostgreSQL",
  });
}
