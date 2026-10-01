import type { Metadata } from "next";
import { site } from "@/content/site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: `/${string}`;
  type?: "website" | "article" | "profile";
};

// Per-page metadata with canonical URL and matching OpenGraph/Twitter tags.
// The OG image comes from the nearest opengraph-image file.
export function pageMetadata({ title, description, path, type = "website" }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      title: `${title} · ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${site.name}`,
      description,
    },
  };
}

export function absoluteUrl(path: string) {
  return `${site.url}${path === "/" ? "" : path}`;
}
