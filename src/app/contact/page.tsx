import { CopyEmail } from "@/components/copy-email";
import { ArrowUpRight, Download, GitHub, LinkedIn, Mail } from "@/components/icons";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Contact ${site.name}, Lead Software Engineer in ${site.location.city}, ${site.location.country} (${site.location.timezone}). Open to remote full-stack, backend and product engineering roles.`,
  path: "/contact",
});

const channels = [
  { label: "LinkedIn", href: site.links.linkedin, icon: LinkedIn, detail: "mudassir--mohammed" },
  { label: "GitHub", href: site.links.github, icon: GitHub, detail: "pmudassir" },
  { label: "Résumé", href: site.links.resume, icon: Download, detail: "PDF" },
];

export default function ContactPage() {
  return (
    <div className="wrap pt-12 sm:pt-16">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
        <div>
          <p className="eyebrow">Contact</p>
          <h1 className="mt-3 max-w-[18ch] font-serif text-[2.5rem] leading-tight tracking-tight text-ink sm:text-[3.25rem]">
            The quickest way to reach me is email.
          </h1>

          <div className="mt-8 rounded-xl border border-rule p-5 sm:p-6">
            <p className="eyebrow">Email</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-2 block break-all font-serif text-[1.6rem] leading-tight text-ink transition-colors hover:text-accent sm:text-[2rem]"
            >
              {site.email}
            </a>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2.5 text-[0.9375rem] font-medium text-paper transition-colors hover:bg-ink/85"
              >
                <Mail /> Write an email
              </a>
              <CopyEmail
                email={site.email}
                className="inline-flex items-center gap-2 rounded-md border border-rule-strong px-4 py-2.5 text-[0.9375rem] font-medium text-ink transition-colors hover:border-ink-3 hover:bg-paper-2"
              />
            </div>
          </div>

          <div className="prose mt-10">
            <h2>If you&apos;re hiring</h2>
            <p>
              The role, the team and the stack are plenty to start with. If you&apos;d like to see the code behind
              OpsPilot or Mentrex, both private, say so and I&apos;ll walk you through it.
            </p>
          </div>
        </div>

        <aside className="self-start lg:mt-[4.5rem]">
          <dl className="divide-y divide-rule border-y border-rule text-[0.9375rem]">
            <div className="grid grid-cols-[6rem_1fr] gap-3 py-3">
              <dt className="text-ink-3">Based in</dt>
              <dd className="text-ink">
                {site.location.city}, {site.location.country}
              </dd>
            </div>
            <div className="grid grid-cols-[6rem_1fr] gap-3 py-3">
              <dt className="text-ink-3">Time zone</dt>
              <dd className="text-ink">{site.location.timezone}</dd>
            </div>
            <div className="grid grid-cols-[6rem_1fr] gap-3 py-3">
              <dt className="text-ink-3">Open to</dt>
              <dd className="text-ink">{site.availability.detail}</dd>
            </div>
          </dl>

          <ul className="mt-6 space-y-1">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  className="group flex items-center justify-between gap-3 rounded-md px-2 py-2.5 -mx-2 transition-colors hover:bg-paper-2"
                  {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <span className="inline-flex items-center gap-3 text-ink">
                    <c.icon className="text-ink-3" />
                    {c.label}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm text-ink-3">
                    {c.detail}
                    <ArrowUpRight className="opacity-0 transition-opacity group-hover:opacity-100" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
