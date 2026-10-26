import Link from "next/link";
import { nav, site } from "@/content/site";

export function SiteFooter() {
  const links = [
    { href: `mailto:${site.email}`, label: "Email" },
    { href: site.links.github, label: "GitHub", external: true },
    { href: site.links.linkedin, label: "LinkedIn", external: true },
    { href: site.links.resume, label: "Résumé (PDF)" },
  ];

  return (
    <footer className="relative overflow-hidden bg-paper pt-16 pb-28 sm:pt-20">
      <div className="wide-wrap flex flex-col gap-8 text-[0.9375rem] text-ink-2 sm:flex-row sm:justify-between">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="transition-colors hover:text-ink"
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* The name returns at full width as the last thing on every page (after Decimals). */}
      <p
        aria-hidden
        className="mt-16 select-none whitespace-nowrap text-center text-[11.2vw] font-medium uppercase leading-[0.8] tracking-[-0.045em] text-ink/12"
      >
        {site.name}
      </p>
      <div className="wide-wrap mt-6 flex flex-wrap justify-between gap-2 text-sm text-ink-3">
        <p>
          {site.location.city}, {site.location.country} · {site.location.timezone}
        </p>
        <p>
          <a href={site.links.source} className="underline underline-offset-2 hover:text-ink-2">
            Source on GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}
