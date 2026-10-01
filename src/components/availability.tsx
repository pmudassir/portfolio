import { site } from "@/content/site";

export function Availability({ className = "" }: { className?: string }) {
  if (!site.availability.open) return null;
  return (
    <p className={`inline-flex items-center gap-2 text-sm text-ink-2 ${className}`}>
      <span className="relative inline-flex size-2 rounded-full bg-ok" aria-hidden="true" />
      {site.availability.label}
    </p>
  );
}
