-- ============================================================
-- Seed: Madrasa Manager project
-- Run in Supabase dashboard → SQL Editor
-- ============================================================

DELETE FROM projects WHERE slug = 'madrasa-manager';

INSERT INTO projects (
  id, slug, title, subtitle, description, role, timeline, stack,
  challenge, architectural_decisions, code_snippet, code_language,
  impact_metrics, live_url, github_url, featured, status, landing_page,
  created_at, updated_at
) VALUES (
  gen_random_uuid(),
  'madrasa-manager',
  'Madrasa Manager',
  'An all-in-one administrative platform built for Islamic schools to manage students, finances, and staff.',
  $$Madrasa Manager solves the operational chaos faced by Islamic school administrators who juggle student records, fee collection, staff payroll, event planning, and expense tracking across disconnected spreadsheets. Built as a multi-tenant SaaS platform, each madrasa gets an isolated workspace with full CRUD across every module. The core value is replacing manual paperwork with a single source of truth — complete with financial reports, audit trails, and real-time dashboards.$$,
  'Solo Full Stack Developer',
  'Early 2025 — 2 months',
  ARRAY[
    'Next.js 16','React 19','TypeScript','Tailwind CSS 4',
    'Supabase','PostgreSQL','Supabase Auth','Supabase SSR',
    'Recharts','Lucide React'
  ],
  $$The core engineering challenge was designing a multi-tenant architecture that feels single-tenant to each user. Every query must be scoped to the correct madrasa_id without placing that burden on the developer at every call site — a mistake here would leak one school's data to another. The naive approach would be filtering in the UI, which is trivially bypassable; instead, the solution pushes tenancy enforcement down to Supabase Row Level Security policies at the database layer, so unauthorized access is structurally impossible.

A second challenge was building a financial system that remains auditable. Fee payments, salary disbursements, donations, and expenses all interact — a student's outstanding balance depends on all prior fee_payment rows, and generating accurate reports requires aggregating across multiple tables without a dedicated reporting service. The solution uses parallel Promise.all() fetches on the client and a custom activity_log table that records every mutation, giving administrators a tamper-evident audit trail without a separate event-sourcing infrastructure.

Finally, authentication needed to work seamlessly across server components, client components, and Next.js middleware simultaneously. Using Supabase SSR cookie-based session approach — with separate server and browser clients — allowed the middleware to gate every protected route at the edge before any page component even renders, rather than relying on client-side redirects that flash unauthorized content.$$,
  '[
    {
      "title": "Multi-tenancy via Supabase RLS, not application-layer filtering",
      "description": "All data is scoped to a madrasa_id foreign key. Rather than filtering in every query, Supabase Row Level Security policies enforce isolation at the database level. This means even a miscoded query cannot return another school data, and adding new tables automatically inherits the tenancy model as long as the policy is applied. The tradeoff is that schema changes require updating both the table and its RLS policy, but the security guarantee is worth it.",
      "icon": "shield"
    },
    {
      "title": "Direct client-side Supabase queries over a custom API layer",
      "description": "Instead of building a REST or tRPC API, pages query Supabase directly from the browser using the typed JS client. This eliminates an entire server layer for CRUD operations, cuts latency, and lets Supabase handle connection pooling and query optimization. The risk — exposing the anon key — is mitigated by RLS; the anon key cannot read data the policies deny. This tradeoff made sense for a solo project where development velocity mattered more than having an internal API to version.",
      "icon": "bolt"
    },
    {
      "title": "Next.js App Router with route groups for protected layout",
      "description": "All authenticated pages live inside a (dashboard) route group sharing a single layout with the sidebar and header. Public routes (login, auth/callback) sit outside this group and render no chrome. Middleware validates the Supabase session cookie on every request to the (dashboard) group and redirects unauthenticated users before any React component is evaluated, preventing content flash and reducing client-side auth logic to zero.",
      "icon": "lock"
    },
    {
      "title": "Activity log as a first-class audit table",
      "description": "Every write operation — creating a student, recording a fee payment, logging a salary disbursement — inserts a row into an activity_log table with the actor, entity type, action category, and a human-readable description. This was prioritized early because madrasas are accountable to donors and parents; having a built-in audit trail meant the reports page could show who did what and when without retrofitting event sourcing later. The tradeoff is slightly more code at each mutation site, but the consistency it enforces is valuable.",
      "icon": "history"
    },
    {
      "title": "Parallel data fetching with Promise.all on dashboard and reports",
      "description": "The dashboard and reports pages need 4–6 independent data sets simultaneously (students, teachers, fee payments, expenses, donations, events). Sequential awaits would stack latencies; instead, all queries fire in parallel via Promise.all(). This keeps page load times flat regardless of how many modules exist, and the pattern is consistent enough that future modules slot in without rethinking the fetching strategy.",
      "icon": "sync"
    }
  ]'::jsonb,
  '',
  '',
  '[
    {"metric": "10+",         "label": "modules managed in one platform"},
    {"metric": "0",           "label": "separate tools needed"},
    {"metric": "100%",        "label": "actions audit-logged"},
    {"metric": "Multi-tenant","label": "data isolation by design"}
  ]'::jsonb,
  null,
  null,
  true,
  'published',
  '{
    "tagline": "Run your madrasa. Not spreadsheets.",
    "hero_description": "Madrasa Manager gives your school one place to track students, collect fees, pay teachers, plan events, and see your finances — all in real time.",
    "theme": {
      "primary_color": "#00c853",
      "mood": "minimal",
      "font_style": "geometric"
    },
    "features": [
      {
        "title": "Student Management",
        "description": "Register students, track class assignments, monitor fee balances, and view full payment history per student — all searchable and filterable.",
        "icon": "🎓"
      },
      {
        "title": "Fee & Payment Tracking",
        "description": "Mark fees as paid or pending, see outstanding balances at a glance, and never lose track of who owes what.",
        "icon": "💳"
      },
      {
        "title": "Teacher Payroll",
        "description": "Maintain teacher profiles, log salary disbursements, and keep a clear record of every payment made to every staff member.",
        "icon": "👨‍🏫"
      },
      {
        "title": "Events & Donations",
        "description": "Create school events, record donations received per event, and see exactly how much was raised and from whom.",
        "icon": "📅"
      },
      {
        "title": "Expense Tracking",
        "description": "Log operational costs by category (maintenance, electricity, supplies, and more) so you always know where money is going.",
        "icon": "📊"
      },
      {
        "title": "Financial Reports & Export",
        "description": "Visual charts across income and expenditure, with one-click CSV export for sharing with trustees or donors.",
        "icon": "📈"
      },
      {
        "title": "Full Audit Trail",
        "description": "Every action taken in the system is logged — who did it, when, and what changed — so your records are always accountable.",
        "icon": "🔍"
      }
    ],
    "problem_statement": "Running a madrasa means juggling student enrollment lists in one spreadsheet, fee collections in another, teacher salaries in a third, and event donations in a notebook. Nothing talks to anything else. At the end of the month, producing a financial summary for the board takes hours — and it is still wrong.",
    "solution_statement": "Madrasa Manager puts every module — students, fees, teachers, events, expenses — into one system backed by a real database. The dashboard shows your financial position in seconds. Reports generate in one click. Every action is logged automatically.",
    "target_audience": "Administrators and principals of small to medium Islamic schools (madrasas) who currently manage operations manually or across disconnected spreadsheets, and need an affordable, focused tool built for their specific workflow.",
    "screenshots_description": "Dashboard with KPI cards and recent transactions table. Student list with searchable table and status badges. Student detail with fee payment history and running balance. Reports with income vs expense charts and CSV export. Activity log with full audit timeline."
  }'::jsonb,
  now(),
  now()
);

-- Verify
SELECT slug, title, status, featured, (landing_page IS NOT NULL) AS has_landing_page
FROM projects
WHERE slug = 'madrasa-manager';
