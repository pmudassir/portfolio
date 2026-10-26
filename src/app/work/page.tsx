import { Paper, PaperRule, PaperTitle } from "@/components/receipt/paper";
import { education, roles } from "@/content/experience";
import { site, yearsShipping } from "@/content/site";
import { alsoUsed } from "@/content/skills";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Work",
  description: `${site.name}'s experience: Lead Software Engineer at BestDoc Technology (hospital workflow software), React Native Developer at App Stone, Full Stack Developer at Eclidse Technologies.`,
  path: "/work",
  type: "profile",
});

export default function WorkPage() {
  return (
    <Paper>
      <p className="receipt-kicker">
        <span>Employment record</span>
        <span>Since {site.startedYear}</span>
      </p>
      <PaperTitle>Work</PaperTitle>
      <p className="receipt-lede">
        {yearsShipping} years of shipping product software. I started on client web apps, spent a year on a consumer mobile app,
        and now lead full-stack work on hospital workflow products.
      </p>
      <p className="mt-4">
        <a href={site.links.resume} className="underline underline-offset-2">
          Download résumé (PDF)
        </a>
      </p>

      {roles.map((role, i) => (
        <section key={role.company} aria-labelledby={`role-${i}`}>
          <PaperRule label={role.period} right={role.end ? `Line ${String(i + 1).padStart(2, "0")}` : "Current"} />
          <h2 id={`role-${i}`} className="receipt-role">
            {role.title}
          </h2>
          <p className="mt-1 uppercase">
            {role.companyUrl ? (
              <a href={role.companyUrl} className="underline underline-offset-2" target="_blank" rel="noopener noreferrer">
                {role.company} ↗
              </a>
            ) : (
              role.company
            )}
          </p>
          <p className="mt-4 leading-relaxed">{role.context}</p>
          <h3 className="mt-5 font-semibold uppercase">What I built</h3>
          <ul className="receipt-dashes">
            {role.built.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-[0.875rem] text-ink-3 uppercase">{role.stack.join(" · ")}</p>
        </section>
      ))}

      <section aria-labelledby="education">
        <PaperRule label={education.period} right="Education" />
        <h2 id="education" className="receipt-role">
          {education.degree}
        </h2>
        <p className="mt-1 uppercase">{education.school}</p>
        <p className="mt-4 leading-relaxed">
          Not a computer science degree. I was already shipping client projects at Eclidse before I graduated. The
          degree shows up mostly in how much I write things down.
        </p>
      </section>

      <PaperRule label="Also used" />
      <p className="mt-3 text-[0.9375rem]">{alsoUsed.join(", ")}.</p>
    </Paper>
  );
}
