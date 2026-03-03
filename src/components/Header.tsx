"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/journal", label: "Journal" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[var(--color-background)]/80 border-b border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="size-8 bg-[var(--color-primary)] rounded-lg flex items-center justify-center">
            <svg className="size-4 text-[var(--color-background)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight text-[var(--color-text-primary)]">
            Mudassir
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-2 px-5 py-2 rounded-full bg-[var(--color-primary)] text-[var(--color-background)] text-sm font-bold tracking-wide hover:opacity-90 transition-opacity"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-[var(--color-text-secondary)]"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-background)]/95 backdrop-blur-xl">
          <nav className="flex flex-col px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 px-5 py-2.5 rounded-full bg-[var(--color-primary)] text-[var(--color-background)] text-sm font-bold tracking-wide text-center hover:opacity-90 transition-opacity"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
