import Link from "next/link";
import { site } from "@/content/site";
import { Download } from "./icons";
import { NavLinks } from "./nav-links";

export function SiteHeader() {
  return (
    <header className="border-b border-rule">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-4 sm:py-5">
        <Link href="/" className="group flex items-baseline gap-2.5 whitespace-nowrap">
          <span className="font-medium tracking-tight text-ink">{site.name}</span>
          <span className="hidden text-sm text-ink-3 lg:inline">{site.role}</span>
        </Link>

        <a
          href={site.links.resume}
          className="inline-flex items-center gap-1.5 text-[0.9375rem] text-ink-2 transition-colors hover:text-ink sm:order-last"
        >
          <Download className="text-accent" />
          Résumé
        </a>

        <nav aria-label="Primary" className="-mx-1 w-full px-1 sm:ml-auto sm:w-auto">
          <NavLinks />
        </nav>
      </div>
    </header>
  );
}
