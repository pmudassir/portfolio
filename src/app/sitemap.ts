import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { absoluteUrl } from "@/lib/metadata";

// Bump when content changes meaningfully.
const lastModified = new Date("2026-10-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "/", priority: 1 },
    { path: "/projects", priority: 0.9 },
    { path: "/work", priority: 0.9 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.6 },
  ];

  return [
    ...pages.map((p) => ({ url: absoluteUrl(p.path), lastModified, priority: p.priority })),
    ...projects.map((p) => ({ url: absoluteUrl(`/projects/${p.slug}`), lastModified, priority: p.featured ? 0.8 : 0.6 })),
  ];
}
