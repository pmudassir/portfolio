import { site } from "@/content/site";

export function SiteFooter() {
  const links = [
    { href: `mailto:${site.email}`, label: "Email" },
    { href: site.links.github, label: "GitHub", external: true },
    { href: site.links.linkedin, label: "LinkedIn", external: true },
    { href: site.links.resume, label: "Résumé (PDF)" },
  ];

  return (
    <footer className="mt-24 border-t border-rule sm:mt-32">
      <div className="wrap flex flex-col gap-6 py-10 text-sm text-ink-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <p className="text-ink-2">
            {site.name} · {site.role}
          </p>
          <p>
            {site.location.city}, {site.location.country} · {site.location.timezone}
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="text-ink-2 transition-colors hover:text-ink"
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="wrap pb-10 text-xs text-ink-3">
        Static pages built with Next.js.{" "}
        <a href={site.links.source} className="underline underline-offset-2 hover:text-ink-2">
          Source on GitHub
        </a>
        .
      </div>
    </footer>
  );
}
