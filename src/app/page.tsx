import Link from "next/link";
import { ButtonLink, buttonClass } from "@/components/buttons";
import { CopyEmail } from "@/components/copy-email";
import { LinkedIn } from "@/components/icons";
import { Barcode } from "@/components/receipt/barcode";
import { PrintedPhoto } from "@/components/receipt/printed-photo";
import { Paper, PaperRule, Stub } from "@/components/receipt/paper";
import { Printer } from "@/components/receipt/printer";
import { VisitStamp } from "@/components/receipt/visit-stamp";
import { roles } from "@/content/experience";
import { featuredProjects } from "@/content/projects";
import { site, siteHost, yearsShipping } from "@/content/site";
import { skillGroups } from "@/content/skills";

// The home page is a receipt, printed for whoever is visiting. Everything on it is real
// content; the receipt is only the form it takes.

const terms = [
  {
    title: "Decisions are written down",
    body: "OpsPilot has 26 decision records, each naming the alternatives rejected and when to revisit.",
    href: "/projects/opspilot#decisions",
  },
  {
    title: "Rules that matter live in the database",
    body: "Append-only audit triggers, CHECK constraints, composite keys that make cross-tenant links impossible.",
    href: "/projects/opspilot#architecture",
  },
  {
    title: "Model output is untrusted input",
    body: "Strict schemas, no database ids, read-only tools, a person approves. Works with AI switched off.",
    href: "/projects/opspilot#ai",
  },
  {
    title: "Measured before trusted",
    body: "The default model was picked by an eval suite with prompt-injection cases, not by a demo.",
    href: "/projects/opspilot#evals",
  },
];

const sections = [
  { id: "experience", label: "Experience" },
  { id: "work", label: "Selected work" },
  { id: "stack", label: "Stack" },
  { id: "terms", label: "How I work" },
  { id: "total", label: "Status" },
];

export default function Home() {
  return (
    <>
      <section aria-labelledby="name" className="receipt-stage">
        <Paper thermal index={{ label: "On this receipt", items: sections }}>
            <header className="receipt-head">
              <h1 id="name" className="receipt-name">
                <span>Mudassir</span>
                <span>Mohammed</span>
              </h1>
              <p className="receipt-trio">
                <span>Full-stack</span>
                <svg viewBox="0 0 24 24" aria-hidden className="size-6">
                  <path d="M4 12.5 9.5 18 20 6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="square" />
                </svg>
                <span>LLM systems</span>
              </p>
              <p className="receipt-center">
                {site.currently.title} · {site.currently.company}
                <br />
                {site.location.city}, {site.location.country}
                <br />
                <a href={`mailto:${site.email}`} className="underline underline-offset-2">
                  {site.email}
                </a>
              </p>
            </header>

            <VisitStamp />
            <PrintedPhoto />

            <p className="receipt-lede">
              I build the software hospital staff rely on at 2 a.m.: requests, approvals, roles and audit trails, plus
              the LLM features on top, evaluated before they ship.
            </p>

            <PaperRule id="experience" label="# Experience" right="Years" />
            <ol className="receipt-items">
              {roles.map((r, i) => (
                <li key={r.company}>
                  <span className="receipt-qty">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    {r.title}, {r.company}
                    <small>{r.summary}</small>
                  </span>
                  <span className="tabular-nums">
                    {r.start.slice(0, 4)}–{r.end ? r.end.slice(2, 4) : "now"}
                  </span>
                </li>
              ))}
            </ol>

            <PaperRule id="work" label="# Selected work" right="Tear to open" />
            <ul className="receipt-stubs">
              {featuredProjects.map((p, i) => (
                <Stub key={p.slug} project={p} item={i + 1} />
              ))}
            </ul>

            <PaperRule id="stack" label="# Stack" />
            <dl className="receipt-stack">
              {skillGroups.map((g) => (
                <div key={g.label}>
                  <dt>{g.label}</dt>
                  <dd>{g.items.join(", ")}</dd>
                </div>
              ))}
            </dl>

            <PaperRule id="terms" label="Terms & conditions" right="How I work" />
            <ol className="receipt-terms">
              {terms.map((t, i) => (
                <li key={t.title}>
                  <span>{i + 1}.</span>
                  <span>
                    <strong>{t.title}.</strong> {t.body}{" "}
                    <Link href={t.href} className="underline underline-offset-2">
                      Proof
                    </Link>
                  </span>
                </li>
              ))}
            </ol>

            <div id="total" className="receipt-total scroll-mt-24">
              <p>
                <span>Shipping production software</span>
                <span className="tabular-nums">{yearsShipping} yrs</span>
              </p>
              <p>
                <span>Currently</span>
                <span>{site.currently.company.replace(" Technology", "")}</span>
              </p>
              <p className="receipt-total-big">
                <span>Status</span>
                <span>{site.availability.open ? "Open to remote" : "Not looking"}</span>
              </p>
            </div>

            {site.availability.open ? (
              <p role="img" className="receipt-stamp" aria-label="Approved: open to remote roles">
                <span>Approved</span>
                <small>Open to remote roles</small>
              </p>
            ) : null}

            <div className="receipt-foot">
              <Barcode value={siteHost} className="h-14 w-full" />
              <p>{siteHost}</p>
              <p className="receipt-thanks thermal-text">Thank you for your visit</p>
              <p>Keep this receipt. Résumé available on request, or right here:</p>
              <p>
                <a href={site.links.resume} className="underline underline-offset-2">
                  Download résumé (PDF)
                </a>
              </p>
            </div>

        </Paper>
        <Printer />
      </section>

      <section aria-labelledby="contact" className="wide-wrap pt-20 pb-10 text-center">
        <h2 id="contact" className="mx-auto max-w-[16ch] text-[clamp(2.4rem,6vw,4.75rem)] font-medium uppercase leading-[0.9] tracking-[-0.03em] text-ink">
          Hiring for a remote role?
        </h2>
        <p className="mx-auto mt-5 max-w-[38rem] leading-relaxed text-ink-2">
          Email is the quickest way to reach me. A line about the team and what you&apos;re building is plenty. If
          you&apos;d like to see the private code behind OpsPilot or Mentrex, ask and I&apos;ll walk you through it.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href={`mailto:${site.email}`}>Email {site.shortName}</ButtonLink>
          <CopyEmail email={site.email} className={buttonClass("secondary")} />
          <ButtonLink href={site.links.linkedin} variant="quiet" target="_blank" rel="noopener noreferrer">
            <LinkedIn /> LinkedIn
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
