import Link from "next/link";
import { nav, site } from "@/content/site";
import { Download } from "./icons";
import { LocalTime } from "./local-time";
import { SiteMenu } from "./site-menu";

export function SiteHeader() {
  return (
    // Scrolls away with the page; the round menu button stays reachable everywhere.
    <header className="absolute inset-x-0 top-0 z-30">
      <div data-site-bar className="wide-wrap flex items-center justify-between gap-6 py-4 sm:py-6">
        <Link href="/" className="whitespace-nowrap font-medium uppercase text-ink">
          {site.name}
        </Link>
        <div className="flex items-center gap-6 pr-16 text-[0.9375rem] text-ink-2 sm:pr-20">
          <LocalTime className="hidden sm:block" />
          <a href={site.links.resume} className="inline-flex items-center gap-1.5 transition-colors hover:text-ink">
            <Download className="text-accent" />
            Résumé
          </a>
        </div>
      </div>
      <SiteMenu />
      {/* The menu needs JavaScript; without it, plain links stand in for the button. */}
      <noscript>
        <nav aria-label="Primary" className="wide-wrap flex flex-wrap gap-x-5 gap-y-1 text-[0.9375rem] text-ink-2">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>
      </noscript>
    </header>
  );
}
