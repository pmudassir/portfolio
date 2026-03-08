-- ============================================================
-- Seed: Nexus SaaS project
-- Run in Supabase dashboard → SQL Editor
-- ============================================================

DELETE FROM projects WHERE slug = 'nexus-saas';

INSERT INTO projects (
  id, slug, title, subtitle, description, role, timeline, stack,
  challenge, architectural_decisions, code_snippet, code_language,
  impact_metrics, live_url, github_url, featured, status, landing_page,
  created_at, updated_at
) VALUES (
  gen_random_uuid(),
  'nexus-saas',
  'Nexus SaaS',
  'All-in-one multi-tenant business management platform for teams who need more than spreadsheets.',
  $$Nexus SaaS is a production-ready, multi-tenant business operations platform that unifies project management, CRM, finance, HR, and inventory into a single workspace. Built for agencies and SMBs that need isolated, branded environments for multiple clients or business units from a single codebase. It eliminates the operational fragmentation of juggling five separate SaaS tools with one cohesive, permission-gated system.$$,
  'Solo Full-Stack Architect',
  'Jan 2025 — Mar 2025',
  ARRAY[
    'Next.js 16','React 19','TypeScript','PostgreSQL','Prisma ORM',
    'NextAuth v5','Stripe','Resend','TanStack Query','Zustand',
    'Tailwind CSS v4','Shadcn UI','Radix UI','Framer Motion',
    'Recharts','Zod','jsPDF','DOMPurify','Docker'
  ],
  $$The core challenge was implementing true multi-tenancy without the cost and complexity of a database-per-tenant model. The naive approach — spinning up a separate schema or database per customer — would have made infrastructure costs prohibitive at early stage and turned routine migrations into orchestration nightmares. Instead, I designed a shared-database, shared-schema architecture with row-level tenant isolation enforced at the query layer via Prisma. Every tenant-scoped model carries a tenantId foreign key, and all server actions resolve the current tenant before any data operation, making cross-tenant data leakage structurally impossible rather than relying on application-level discipline.

The second major challenge was the authorization model. A flat role system (admin/member) would have been insufficient for the diverse permission needs across six distinct modules — a finance manager should not approve leave requests, and a CRM user should not see payroll data. Building a 50+ permission RBAC system with custom role definitions, per-tenant feature flags, and middleware-enforced route protection required careful schema design (Permission, RolePermission, CustomRole models) and a centralized permission-key convention using module.entity.action dot notation.

Webhook reliability was the third tricky area. Stripe webhooks can deliver the same event multiple times, and double-processing a subscription activation or invoice payment is a serious billing bug. Rather than relying on idempotency at the Stripe level, I introduced a WebhookEvent deduplication table that records every processed event ID before any business logic runs, turning an at-least-once delivery guarantee into an exactly-once processing guarantee.$$,
  '[
    {
      "title": "Shared-schema multi-tenancy with Prisma row-level isolation",
      "description": "Chose shared database over database-per-tenant to avoid infrastructure overhead and migration complexity. All 20+ tenant-scoped models carry a tenantId foreign key, and a centralized tenant resolution utility (lib/tenant.ts) injects the tenant context into every query. This enables a single Next.js deployment and a single PostgreSQL instance to serve an unlimited number of isolated tenants at a fraction of the cost of siloed infrastructure.",
      "icon": "hub"
    },
    {
      "title": "Next.js Server Actions as the primary data mutation layer",
      "description": "Instead of building a REST or tRPC API layer, all client-to-server mutations use Next.js 16 Server Actions. This eliminates an entire network layer, removes serialization boilerplate, and co-locates authorization guards directly alongside the mutation logic. Each action calls requireTenantPermission() before touching the database, making it impossible to bypass auth by hitting an unprotected endpoint.",
      "icon": "bolt"
    },
    {
      "title": "Webhook idempotency via WebhookEvent deduplication table",
      "description": "Stripe webhooks deliver events at-least-once. To prevent double-processing billing events (subscription activations, invoice payments), every incoming webhook is first checked against a WebhookEvent table keyed on the Stripe event ID. Only new, unseen events are processed. This converts an unreliable external trigger into a safe, exactly-once operation without requiring distributed locks or queues.",
      "icon": "verified"
    },
    {
      "title": "Granular RBAC with custom role definitions",
      "description": "A flat admin/member split was insufficient for the six-module scope of the platform. Designed a three-tier authorization model: super-admin (platform owner), tenant-admin (full tenant access), and tenant-user (RBAC via 50+ permissions in module.entity.action format). Tenants can define custom roles with allowlists of features and permissions, enabling organizations to grant a finance manager invoice access without exposing HR payroll data.",
      "icon": "admin_panel_settings"
    },
    {
      "title": "Per-tenant feature flags for module gating",
      "description": "Rather than coupling module availability to subscription tiers at the code level, each tenant has a TenantFeature join table that enables or disables modules independently. This decouples billing logic from feature access, allows the super-admin to grant early access to specific tenants, and keeps the tenant-facing UI clean by hiding disabled modules entirely — no dead UI, no upsell nags inside the product.",
      "icon": "toggle_on"
    },
    {
      "title": "Subdomain-based tenant routing at the middleware layer",
      "description": "Tenants are resolved by extracting the subdomain from the incoming request hostname inside Next.js middleware, before any React rendering occurs. This enables a single deployment to serve tenant.domain.com and custom domains alike without per-tenant deployments. The resolved tenant is passed into the request context, making it available to all Server Components and Server Actions in the request chain without prop drilling.",
      "icon": "dns"
    }
  ]'::jsonb,
  '',
  '',
  '[
    {"metric": "6",   "label": "business modules in one platform"},
    {"metric": "50+", "label": "granular RBAC permissions"},
    {"metric": "34+", "label": "database models with tenant isolation"},
    {"metric": "∞",   "label": "tenants from a single deployment"}
  ]'::jsonb,
  null,
  null,
  true,
  'published',
  '{
    "tagline": "One platform. Every team. Zero silos.",
    "hero_description": "Nexus gives your business a single workspace for projects, clients, finances, HR, and inventory — with full isolation between teams and clients.",
    "theme": {
      "primary_color": "#6366f1",
      "mood": "enterprise",
      "font_style": "modern-sans"
    },
    "features": [
      {
        "title": "Multi-Tenant Workspaces",
        "description": "Each client or business unit gets a fully isolated workspace with its own data, roles, and branding — all from one deployment.",
        "icon": "🏢"
      },
      {
        "title": "Project & Task Management",
        "description": "Track projects from kickoff to delivery with priority levels, assignees, and status pipelines that keep every team aligned.",
        "icon": "✅"
      },
      {
        "title": "CRM & Lead Pipeline",
        "description": "Manage leads through a scored pipeline from first contact to close, with activity tracking and follow-up scheduling built in.",
        "icon": "📈"
      },
      {
        "title": "Finance & Invoicing",
        "description": "Create invoices, track expenses, generate PDFs, and get a real-time revenue vs. expense view — no accountant required.",
        "icon": "💰"
      },
      {
        "title": "HR & Payroll",
        "description": "Manage employees, approve leave requests, track attendance with clock in/out, and run payroll — all in one place.",
        "icon": "👥"
      },
      {
        "title": "Inventory Management",
        "description": "Track products, suppliers, and purchase orders with real-time stock level alerts before you run out.",
        "icon": "📦"
      },
      {
        "title": "Website Builder",
        "description": "Publish a branded website for each tenant with customizable content blocks, SEO fields, and multi-page support.",
        "icon": "🌐"
      },
      {
        "title": "Granular Permissions",
        "description": "Create custom roles with exactly the right access — a finance manager can see invoices without seeing payroll.",
        "icon": "🔐"
      }
    ],
    "problem_statement": "Running a business means juggling five or more SaaS tools that do not talk to each other — a project tracker here, a CRM there, invoicing somewhere else, HR in a spreadsheet. Every tool has its own login, its own export format, and its own monthly fee. When you manage multiple clients or business units, the sprawl gets exponential.",
    "solution_statement": "Nexus replaces the patchwork with a single platform where every module shares the same data model, the same team roster, and the same login. Client A data never touches Client B. Roles are as granular as you need. And because it is built on your own infrastructure, you pay once — not per seat per tool.",
    "target_audience": "Agencies managing multiple client accounts, growing SMBs with 10–200 employees who have outgrown spreadsheets but cannot justify five separate SaaS subscriptions, and SaaS founders who need a white-label business operations platform.",
    "screenshots_description": "Workspace dashboard with summary cards and activity feed. Finance module with revenue chart and invoice list. CRM Kanban pipeline. HR module with employee table and leave approvals. Admin panel with tenant management and feature flag toggles. Settings with role permission matrix."
  }'::jsonb,
  now(),
  now()
);

-- Verify
SELECT slug, title, status, featured, (landing_page IS NOT NULL) AS has_landing_page
FROM projects
WHERE slug = 'nexus-saas';
