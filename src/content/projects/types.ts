import type { ReactNode } from "react";

export type ProjectLink = { label: string; href: string };

export type ProjectMeta = {
  slug: string;
  name: string;
  /** What it is, in one sentence. */
  tagline: string;
  /** Why it exists and what I built. Used on cards and as the meta description. */
  summary: string;
  /** One technically interesting aspect, shown on cards. */
  highlight: string;
  /** e.g. "Personal project", "In production". */
  kind: string;
  role: string;
  period: string;
  status: string;
  /** Core technologies only. */
  stack: string[];
  links: ProjectLink[];
  /** Public repository, if any. */
  repoUrl?: string;
  /** Shown when the code isn't public. */
  sourceNote?: string;
  featured: boolean;
};

export type CaseStudySection = {
  id: string;
  title: string;
  body: ReactNode;
};

export type Project = ProjectMeta & {
  sections: CaseStudySection[];
};
