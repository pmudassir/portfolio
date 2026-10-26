"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { nav, site } from "@/content/site";
import { LocalTime } from "./local-time";

// One round button pinned to the top right, opening a full-screen menu.
export function SiteMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const firstLink = useRef<HTMLAnchorElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  // Focus goes back to the button when the menu is dismissed, but not after following a link:
  // then it belongs to the new page.
  const followedLink = useRef(false);

  // Close whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    followedLink.current = false;
    document.documentElement.style.overflow = "hidden";
    // Everything behind the menu is out of reach for keyboard and screen readers while it's open.
    const behind = [...document.querySelectorAll<HTMLElement>("#main, body > footer, [data-site-bar]")];
    for (const el of behind) el.inert = true;
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const toggle = button.current;
    return () => {
      for (const el of behind) el.inert = false;
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      if (!followedLink.current) toggle?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className="group fixed top-3 right-4 z-50 flex size-14 flex-col items-center justify-center rounded-full bg-ink text-paper transition-transform hover:scale-105 active:scale-95 sm:top-4 sm:right-6"
      >
        <span aria-hidden className="relative block size-5 rounded-full border-2 border-paper">
          <span className={`absolute inset-1 rounded-full transition-colors ${open ? "bg-paper" : "bg-accent"}`} />
        </span>
        <span className="mt-0.5 text-[0.625rem] font-medium uppercase">{open ? "Close" : "Menu"}</span>
      </button>

      {/* Any link click closes the menu, including a link to the page you're already on. */}
      <div
        id={panelId}
        hidden={!open}
        className="fixed inset-0 z-40 overflow-y-auto bg-paper"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) {
            followedLink.current = true;
            setOpen(false);
          }
        }}
      >
        <div className="wide-wrap flex min-h-dvh flex-col justify-between pt-24 pb-32">
          <nav aria-label="Primary">
            <ul>
              <li>
                <Link ref={firstLink} href="/" className="menu-link">
                  Home
                </Link>
              </li>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href || pathname.startsWith(`${item.href}/`) ? "page" : undefined}
                    className="menu-link"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-12 flex flex-wrap items-end justify-between gap-6 text-ink-2">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-ink">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                  GitHub
                </a>
              </li>
              <li>
                <a href={site.links.resume} className="hover:text-ink">
                  Résumé (PDF)
                </a>
              </li>
            </ul>
            <LocalTime />
          </div>
        </div>
      </div>
    </>
  );
}
