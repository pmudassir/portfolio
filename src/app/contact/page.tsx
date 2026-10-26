import { ButtonLink, buttonClass } from "@/components/buttons";
import { CopyEmail } from "@/components/copy-email";
import { Mail } from "@/components/icons";
import { LocalTime } from "@/components/local-time";
import { Paper, PaperRule, PaperTitle } from "@/components/receipt/paper";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Contact ${site.name}, Lead Software Engineer in ${site.location.city}, ${site.location.country} (${site.location.timezone}). Open to remote full-stack, backend and product engineering roles.`,
  path: "/contact",
});

const channels = [
  { label: "LinkedIn", href: site.links.linkedin, detail: "mudassir--mohammed" },
  { label: "GitHub", href: site.links.github, detail: "pmudassir" },
  { label: "Résumé", href: site.links.resume, detail: "PDF" },
];

export default function ContactPage() {
  return (
    <Paper>
      <div className="receipt-kicker">
        <span>Contact</span>
        <LocalTime />
      </div>
      <PaperTitle>Email me</PaperTitle>
      <p className="receipt-lede">The quickest way to reach me is email. I reply within a day or two.</p>

      <a href={`mailto:${site.email}`} className="receipt-email">
        {site.email}
      </a>
      <div className="mt-5 flex flex-wrap gap-3">
        <ButtonLink href={`mailto:${site.email}`}>
          <Mail /> Write an email
        </ButtonLink>
        <CopyEmail email={site.email} className={buttonClass("secondary")} />
      </div>

      <dl className="receipt-facts">
        <div>
          <dt>Based in</dt>
          <dd>
            {site.location.city}, {site.location.country}
          </dd>
        </div>
        <div>
          <dt>Time zone</dt>
          <dd>{site.location.timezone}</dd>
        </div>
        <div>
          <dt>Open to</dt>
          <dd>{site.availability.detail}</dd>
        </div>
      </dl>

      <PaperRule as="h2" label="Elsewhere" />
      <ul className="receipt-items">
        {channels.map((c, i) => (
          <li key={c.label}>
            <span className="receipt-qty">{String(i + 1).padStart(2, "0")}</span>
            <a
              href={c.href}
              className="underline underline-offset-2"
              {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {c.label} ↗
            </a>
            <span className="normal-case">{c.detail}</span>
          </li>
        ))}
      </ul>

      <PaperRule as="h2" label="If you're hiring" />
      <p className="mt-4 leading-relaxed">
        The role, the team and the stack are plenty to start with. If you&apos;d like to see the code behind OpsPilot
        or Mentrex, both private, say so and I&apos;ll walk you through it.
      </p>
    </Paper>
  );
}
