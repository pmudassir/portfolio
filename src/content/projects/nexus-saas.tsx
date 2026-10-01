import { Decisions, Points } from "@/components/case-study";
import type { Project } from "./types";

export const nexusSaas: Project = {
  slug: "nexus-saas",
  name: "Nexus SaaS",
  tagline:
    "A multi-tenant business platform: one codebase serving many organisations, each with its own subdomain, features, roles and billing.",
  summary:
    "A study in what multi-tenant SaaS needs underneath the features: tenant resolution from the hostname, per-tenant feature flags, granular permissions, and Stripe billing that survives webhook retries. Website-builder, finance, HR, inventory and CRM modules sit on top.",
  highlight:
    "Stripe webhooks are signature-verified, then claimed in a WebhookEvent table before processing, so Stripe's retries can't apply the same event twice.",
  kind: "Personal project",
  role: "Sole engineer",
  period: "Nov 2025 – Mar 2026",
  status: "In progress",
  stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "NextAuth", "Stripe"],
  links: [],
  repoUrl: "https://github.com/pmudassir/nexus-saas",
  featured: false,
  sections: [
    {
      id: "overview",
      title: "Overview",
      body: (
        <>
          <p>
            Nexus is a business-management platform for agencies and small companies that want separate, branded
            workspaces from a single deployment. Each tenant gets a subdomain or a custom domain. Each tenant also gets
            its own set of enabled modules, roles and permissions, and a subscription.
          </p>
          <p>
            The modules are deliberately broad. The interesting work is the layer underneath them that every module
            relies on.
          </p>
        </>
      ),
    },
    {
      id: "architecture",
      title: "The platform layer",
      body: (
        <Points
          items={[
            <>
              <strong>Tenant resolution.</strong> The request host is normalised, then matched to a tenant by
              subdomain or by a mapped custom domain.
            </>,
            <>
              <strong>Shared schema.</strong> Tenant-owned tables carry a tenant id, and queries are scoped to it.
            </>,
            <>
              <strong>Permissions.</strong> Around 40 seeded permission keys such as{" "}
              <code>finance.invoice.create</code>, attached to roles per tenant and checked in server actions.
            </>,
            <>
              <strong>Feature flags.</strong> Per-tenant flags decide which modules a tenant has, and the navigation
              follows them.
            </>,
            <>
              <strong>Billing.</strong> Stripe Checkout and subscriptions. Webhooks are verified, deduplicated and
              update the tenant&apos;s plan.
            </>,
            <>
              <strong>Operations.</strong> A super-admin panel for provisioning tenants, toggling features and
              reviewing usage, plus an audit log for sensitive changes.
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
              title: "Idempotent webhook handling",
              why: (
                <>
                  Stripe retries webhooks, and a retried <code>checkout.session.completed</code> must not provision
                  twice. Each event is claimed by id in a <code>WebhookEvent</code> row before it&apos;s handled. A
                  duplicate returns 200 so Stripe stops retrying. A failure releases the claim so the retry can run.
                </>
              ),
            },
            {
              title: "One guard for super-admin actions",
              why: "Admin checks used to be mixed across actions. I replaced them with a single super-admin guard and applied it to every cross-tenant action, including usage reporting, which had been missing a check.",
            },
            {
              title: "Tenant deletion in a transaction",
              why: "Deleting a tenant removes its dependent records in one transaction, so a failure part-way can't leave orphaned data behind.",
            },
          ]}
        />
      ),
    },
    {
      id: "gaps",
      title: "Known gaps",
      body: (
        <>
          <p>Nexus isn&apos;t finished, and the backlog says so:</p>
          <Points
            items={[
              "Many module actions check tenant membership but not the specific permission. Enforcing per-action permissions everywhere is the top item, ahead of any new feature.",
              "Read and write permission semantics need tightening, so that every mutation maps to one stable key and the UI hides exactly what the backend forbids.",
            ]}
          />
        </>
      ),
    },
  ],
};
