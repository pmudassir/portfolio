import { ButtonLink } from "@/components/buttons";
import { Download } from "@/components/icons";
import { education, roles } from "@/content/experience";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Work",
  description: `${site.name}'s experience: Lead Software Engineer at BestDoc Technology (hospital workflow software), React Native Developer at App Stone, Full Stack Developer at Eclidse Technologies.`,
  path: "/work",
  type: "profile",
});

export default function WorkPage() {
  return (
    <div className="wrap pt-12 sm:pt-16">
      <header className="max-w-[44rem]">
        <p className="eyebrow">Experience</p>
        <h1 className="mt-3 font-serif text-[2.5rem] leading-tight tracking-tight text-ink sm:text-[3.25rem]">Work</h1>
        <p className="mt-4 text-[1.125rem] leading-relaxed text-ink-2">
          Four years of shipping product software. I started on client web apps, spent a year on a consumer mobile
          app, and now lead full-stack work on hospital workflow products.
        </p>
        <div className="mt-6">
          <ButtonLink href={site.links.resume} variant="secondary">
            <Download /> Résumé (PDF)
          </ButtonLink>
        </div>
      </header>

      <ol className="mt-12 divide-y divide-rule border-t border-rule sm:mt-16">
        {roles.map((role) => (
          <li key={role.company} className="grid gap-x-10 gap-y-4 py-10 lg:grid-cols-[15rem_1fr]">
            <div>
              <p className="font-mono text-[0.8125rem] text-ink-3">{role.period}</p>
              <p className="mt-2 text-ink">
                {role.companyUrl ? (
                  <a href={role.companyUrl} className="link" target="_blank" rel="noopener noreferrer">
                    {role.company}
                  </a>
                ) : (
                  role.company
                )}
              </p>
              {!role.end ? <p className="mt-1 text-sm text-ink-3">Current role</p> : null}
            </div>

            <div className="max-w-[42rem]">
              <h2 className="font-serif text-[1.75rem] leading-tight tracking-tight text-ink">{role.title}</h2>
              <p className="mt-3 leading-relaxed text-ink-2">{role.context}</p>

              <h3 className="eyebrow mt-6">What I built</h3>
              <ul className="mt-3 space-y-2.5">
                {role.built.map((item) => (
                  <li key={item} className="relative pl-5 leading-relaxed text-ink-2">
                    <span className="absolute left-0 top-[0.8em] h-px w-2.5 bg-ink-3" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-5 font-mono text-[0.8125rem] text-ink-3">{role.stack.join(" · ")}</p>
            </div>
          </li>
        ))}

        <li className="grid gap-x-10 gap-y-2 py-10 lg:grid-cols-[15rem_1fr]">
          <div>
            <p className="font-mono text-[0.8125rem] text-ink-3">{education.period}</p>
            <p className="mt-2 text-ink">{education.school}</p>
          </div>
          <div className="max-w-[42rem]">
            <h2 className="font-serif text-[1.75rem] leading-tight tracking-tight text-ink">{education.degree}</h2>
            <p className="mt-3 leading-relaxed text-ink-2">
              Not a computer science degree. I was already shipping client projects at Eclidse before I graduated.
              The degree shows up mostly in how much I write things down.
            </p>
          </div>
        </li>
      </ol>
    </div>
  );
}
