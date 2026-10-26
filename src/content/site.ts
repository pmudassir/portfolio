// Single source of truth for identity, links and availability.
// Everything here is shown publicly; keep it factual.

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://mudassir.in").replace(/\/+$/, "");

export const site = {
  url: siteUrl,
  name: "Mudassir Mohammed",
  shortName: "Mudassir",
  role: "Lead Software Engineer",
  // Used for <title>, OG images and structured data.
  headline: "Full-stack engineer for workflow-heavy products",
  description:
    "Mudassir Mohammed is a Lead Software Engineer building workflow-heavy product software (requests, approvals, roles, audit trails) with TypeScript, React, Vue, Node.js, Python and PostgreSQL, plus LLM features that are evaluated before they ship. Based in Kerala, India; open to remote roles.",
  email: "pmuddasir@gmail.com",
  location: {
    city: "Kerala",
    country: "India",
    countryCode: "IN",
    timezone: "IST (UTC+5:30)",
    /** IANA zone for the live clocks. */
    timeZone: "Asia/Kolkata",
  },
  currently: {
    title: "Lead Software Engineer",
    company: "BestDoc Technology",
    companyUrl: "https://www.bestdoc.in",
    since: "Nov 2024",
  },
  startedYear: 2022,
  /** First production job (yyyy-mm), for the years-shipping figure. */
  startedOn: "2022-10",
  availability: {
    open: true,
    label: "Open to remote roles",
    detail: "Remote full-stack, backend or product engineering roles",
  },
  links: {
    github: "https://github.com/pmudassir",
    linkedin: "https://www.linkedin.com/in/mudassir--mohammed/",
    resume: "/resume.pdf",
    source: "https://github.com/pmudassir/portfolio",
  },
} as const;

/** Whole years since the first production job. Static pages compute it at build time. */
export const yearsShipping = Math.floor(
  (Date.now() - new Date(`${site.startedOn}-01T00:00:00Z`).getTime()) / (365.25 * 24 * 60 * 60 * 1000),
);

/** The site's host, e.g. "mudassir.in", for printed URLs and barcodes. */
export const siteHost = new URL(site.url).host;

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
