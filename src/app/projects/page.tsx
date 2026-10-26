import { Paper, PaperRule, PaperTitle, Stub } from "@/components/receipt/paper";
import { otherBuilds, projects } from "@/content/projects";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Engineering case studies by Mudassir Mohammed: OpsPilot (multi-tenant FastAPI platform with LLM tool calling and evals), Mentrex (production LMS), Koin (React Native + Kotlin expense tracker) and Nexus SaaS.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <Paper>
      <p className="receipt-kicker">
        <span>Order summary</span>
        <span>{projects.length} case studies</span>
      </p>
      <PaperTitle>Projects</PaperTitle>
      <p className="receipt-lede">
        Strongest first. Each case study covers the problem, what I personally built, how it&apos;s put together, the
        decisions behind it, and what&apos;s still missing.
      </p>

      <PaperRule label="# Case studies" right="Tear to open" />
      <ul className="receipt-stubs">
        {projects.map((p, i) => (
          <Stub key={p.slug} project={p} item={i + 1} headingLevel={2} />
        ))}
      </ul>

      <PaperRule as="h2" id="also" label="# Also built" />
      <ul className="receipt-items">
        {otherBuilds.map((b, i) => (
          <li key={b.name}>
            <span className="receipt-qty">{String(i + 1).padStart(2, "0")}</span>
            <span>
              {"href" in b ? (
                <a href={b.href} className="underline underline-offset-2" target="_blank" rel="noopener noreferrer">
                  {b.name} ↗
                </a>
              ) : (
                b.name
              )}
              <small>{b.description}</small>
              <small>
                {b.stack.join(", ")}
                {"note" in b ? ` · ${b.note}` : ""}
              </small>
            </span>
            <span />
          </li>
        ))}
      </ul>

      <p className="receipt-foot">
        Everything else, including older experiments, is on{" "}
        <a href={site.links.github} className="underline underline-offset-2" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        .
      </p>
    </Paper>
  );
}
