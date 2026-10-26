import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[0.9375rem] font-medium transition-colors";

const variants = {
  primary: "bg-accent text-paper hover:bg-accent-hover",
  secondary: "border border-ink/45 text-ink hover:border-ink",
  quiet: "px-0 py-1 text-ink-2 hover:text-ink",
};

type Variant = keyof typeof variants;

export function buttonClass(variant: Variant = "primary", extra = "") {
  return `${base} ${variants[variant]} ${extra}`.trim();
}

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
  ...rest
}: { href: string; variant?: Variant; children: ReactNode; className?: string } & Omit<ComponentProps<"a">, "href">) {
  const cls = buttonClass(variant, className);
  const isInternal = href.startsWith("/") && !href.endsWith(".pdf");
  if (isInternal) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} {...rest}>
      {children}
    </a>
  );
}
