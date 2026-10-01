"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/content/site";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-5 sm:gap-6">
      {nav.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`relative py-1 text-[0.9375rem] transition-colors hover:text-ink ${
                active
                  ? "text-ink after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-accent"
                  : "text-ink-2"
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
