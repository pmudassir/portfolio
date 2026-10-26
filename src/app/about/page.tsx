import Link from "next/link";
import { ButtonLink } from "@/components/buttons";
import { Paper, PaperRule, PaperTitle } from "@/components/receipt/paper";
import { PrintedPhoto } from "@/components/receipt/printed-photo";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About",
  description: `About ${site.name}: a software engineer from ${site.location.city}, ${site.location.country}, who builds workflow-heavy product software and applied LLM features. Open to remote roles.`,
  path: "/about",
  type: "profile",
});

export default function AboutPage() {
  return (
    <Paper>
      <p className="receipt-kicker">
        <span>A note from</span>
        <span>
          {site.location.city}, {site.location.country}
        </span>
      </p>
      <PaperTitle>Hi, I&apos;m {site.shortName}</PaperTitle>
      <PrintedPhoto />

      <div className="prose mt-8">
        <p className="text-[1.125rem] text-ink">
          I&apos;m a software engineer from {site.location.city}, India. I&apos;ve been building production software
          since {site.startedYear}. Since November 2024 I&apos;ve led full-stack work on hospital workflow products at{" "}
          {site.currently.company}.
        </p>
        <p>
          I didn&apos;t come through computer science. My degree is in English literature from the University of
          Calicut. I was already building MERN apps for clients at Eclidse before I finished it. After that I spent a
          year on a consumer React Native app at App Stone. Then I moved to BestDoc, where the work is about hospitals:
          requests that have to reach the right person, approvals that have to be auditable, and roles that decide who
          sees what.
        </p>
        <p>
          That&apos;s the kind of software I like most. It isn&apos;t flashy, but it&apos;s where engineering decisions
          show. A shortcut in the data model or the permission checks turns up later as a support ticket, or worse, as
          a data leak. I like getting those parts right, and writing down why, so the next person can change them
          safely.
        </p>
        <p>
          Lately I&apos;ve been going deeper on the backend and on applied AI: Python and FastAPI, PostgreSQL features
          like constraints, locking and percentiles, and LLM features that can be measured rather than demoed.{" "}
          <Link href="/projects/opspilot">OpsPilot</Link> is where that comes together. I&apos;m also learning Rust;{" "}
          <Link href="/projects#also">VoiceInk</Link>, a small macOS dictation app, has a Rust core.
        </p>
      </div>

      <PaperRule as="h2" label="What I'm looking for" />
      <p className="mt-4 leading-relaxed">
        A remote full-stack, backend or product engineering role on a team that ships real workflows to real users.
        I&apos;m especially interested in teams adding LLM features to an existing product and wanting them done
        carefully. I work from {site.location.timezone}.
      </p>

      <PaperRule as="h2" label="Outside work" />
      <p className="mt-4">Trekking and travel, whenever I can get away.</p>

      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/contact">Get in touch</ButtonLink>
        <ButtonLink href={site.links.resume} variant="secondary">
          Résumé (PDF)
        </ButtonLink>
      </div>
    </Paper>
  );
}
