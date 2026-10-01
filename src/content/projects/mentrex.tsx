import { Decisions, FlowDiagram, Points } from "@/components/case-study";
import type { Project } from "./types";

export const mentrex: Project = {
  slug: "mentrex",
  name: "Mentrex",
  tagline:
    "The learning platform Mentrex Academy runs on: courses, enrolments, fees, assessments and student progress in one system.",
  summary:
    "A tech-course institute needed one place for course content, student progress, fees and day-to-day accountability. I built Mentrex as the academy's LMS and keep extending it: an admin and instructor portal, a student portal, and the progression and assessment engines underneath.",
  highlight:
    "Modules unlock in order as students finish content, and assessments are scored on the server. Answer keys never reach the browser.",
  kind: "In production",
  role: "Lead engineer: design, data model, backend and front end",
  period: "Apr 2025 – present",
  status: "In production at Mentrex Academy",
  stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "TanStack Query", "Zod", "Tailwind CSS", "Resend"],
  links: [{ label: "Mentrex Academy", href: "https://www.mentrexacademy.com" }],
  sourceNote: "Private repository (client code). Happy to walk through it.",
  featured: true,
  sections: [
    {
      id: "overview",
      title: "Overview",
      body: (
        <>
          <p>
            Mentrex is the learning management system behind Mentrex Academy, a tech-course institute in Kerala. One
            Next.js app serves two portals:
          </p>
          <Points
            items={[
              "Admins and instructors manage courses, modules, students, fees, assessments and feedback.",
              "Students work through their courses, take assessments, practise weak topics and log daily check-ins.",
            ]}
          />
          <p>
            I&apos;ve built and maintained it since April 2025. It grew with the academy, from course content to
            assessments, payments, stand-ups, leave requests and events. Each step meant schema migrations on a live
            database with real student data in it.
          </p>
        </>
      ),
    },
    {
      id: "problem",
      title: "The problem",
      body: (
        <>
          <p>
            A small institute runs on a lot of moving parts. Course material lives in one place, fee tracking in
            another, and who&apos;s stuck on which module mostly lives in instructors&apos; heads.
          </p>
          <p>Three groups need different answers from the same data:</p>
          <Points
            items={[
              "Instructors need to know who's falling behind.",
              "Admins need to know who owes what.",
              "Students need a clear next step.",
            ]}
          />
          <p>The goal was one system where all three come from the same records.</p>
        </>
      ),
    },
    {
      id: "role",
      title: "My role",
      body: (
        <Points
          items={[
            "The data model and its migrations: Prisma on PostgreSQL (Neon), now 39 models.",
            "Authentication, sessions, password reset and role-based access for admins, instructors and students.",
            "The module-progression and assessment engines.",
            "The admin, instructor and student interfaces.",
            "Deployment, plus ongoing changes as the academy's needs change.",
          ]}
        />
      ),
    },
    {
      id: "architecture",
      title: "Architecture",
      body: (
        <>
          <p>
            A single Next.js App Router application with separate route groups and layouts for each portal. Route
            handlers validate input with Zod and call domain modules. The domain modules own the rules for progress,
            assessments and activity logging.
          </p>
          <FlowDiagram
            caption="Request path. Middleware rejects unauthenticated or out-of-role requests before any route handler runs."
            layers={[
              {
                label: "Portals",
                nodes: [
                  { title: "Admin & instructor", detail: "(admin) route group" },
                  { title: "Student", detail: "(student) route group" },
                ],
                edge: "HttpOnly session cookie",
              },
              {
                label: "Middleware",
                nodes: [{ title: "Session · RBAC · CSRF origin check · rate limit", accent: true }],
              },
              {
                label: "Server",
                nodes: [
                  { title: "Route handlers", detail: "Zod validation, ownership checks" },
                  { title: "Domain modules", detail: "progression, assessments, activity log" },
                ],
                edge: "Prisma",
              },
              {
                label: "Services",
                nodes: [
                  { title: "PostgreSQL (Neon)", detail: "39 models" },
                  { title: "Resend", detail: "transactional email" },
                  { title: "ImageKit", detail: "profile images" },
                ],
              },
            ]}
          />
        </>
      ),
    },
    {
      id: "features",
      title: "What it does",
      body: (
        <Points
          items={[
            <>
              <strong>Reusable curriculum.</strong> A module can belong to several courses through an ordered join
              table, so content isn&apos;t duplicated when a new course reuses it.
            </>,
            <>
              <strong>Mixed content.</strong> Video, PDF, quiz, assignment, link, image and note items, with
              drag-and-drop ordering.
            </>,
            <>
              <strong>Assessments and practice.</strong> Question banks are tagged by topic and difficulty. Graded
              attempts can be resumed. Practice mode doesn&apos;t touch grades. After each attempt, a report breaks
              results down by topic and difficulty.
            </>,
            <>
              <strong>Fees.</strong> Enrolments carry fee schedules, payments are recorded across methods, and
              invoices are generated as PDFs.
            </>,
            <>
              <strong>Day-to-day accountability.</strong> Learning sessions close automatically. There&apos;s an
              activity log, daily check-ins and stand-ups, a personal Kanban board, leave requests, and events with
              teams.
            </>,
            <>
              <strong>Instructor tools.</strong> Typed, prioritised feedback to students, plus analytics on
              enrolments, revenue and performance.
            </>,
          ]}
        />
      ),
    },
    {
      id: "decisions",
      title: "Engineering decisions",
      body: (
        <Decisions
          items={[
            {
              title: "Progression as an explicit state machine",
              why: (
                <>
                  Each enrolment has one progress row per course module. Its status moves from <code>LOCKED</code>{" "}
                  through <code>IN_PROGRESS</code>, <code>CONTENT_COMPLETED</code> and <code>ASSESSMENT_READY</code> to{" "}
                  <code>PASSED</code> or <code>COMPLETED</code>. Finishing a module&apos;s content unlocks the next one.
                  Passing its assessment isn&apos;t required to move on, which matches how the academy teaches. Admins
                  can unlock a module by hand. Recalculation functions rebuild progress when a course&apos;s modules
                  change, and a module is re-locked only if the student hasn&apos;t started it.
                </>
              ),
              instead: "computing progress on the fly from content completions, which makes manual overrides and history hard to express.",
            },
            {
              title: "Grade on the server, sanitise what the client sees",
              why: (
                <>
                  Questions are stripped down before they&apos;re sent: text, type, difficulty, points, tags and
                  (optionally shuffled) options. Correct answers and explanations stay on the server. Answers are saved
                  one at a time and scored on submit.
                </>
              ),
            },
            {
              title: "Revocable sessions behind signed cookies",
              why: (
                <>
                  Tokens are signed with <code>jose</code> and set as HttpOnly cookies. Each token also maps to a
                  session row, so it can be revoked before it expires. Password reset uses a separate one-hour token
                  and returns the same response whether or not the account exists.
                </>
              ),
            },
          ]}
        />
      ),
    },
    {
      id: "gaps",
      title: "Known gaps",
      body: (
        <Points
          items={[
            "It's single-tenant by design. Serving a second institute means scoping the schema by tenant, and I've written up what that would take.",
            "Rate limiting is in memory. That's fine on one instance and wrong on several; it would move to the database or Redis.",
            "Automated tests are thin. The progression engine is the first thing I'd cover, since it holds the most rules.",
          ]}
        />
      ),
    },
  ],
};
