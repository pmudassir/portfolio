-- ============================================================
-- Seed: PawSpace project
-- Run in Supabase dashboard → SQL Editor
-- ============================================================

DELETE FROM projects WHERE slug = 'pawspace';

INSERT INTO projects (
  id, slug, title, subtitle, description, role, timeline, stack,
  challenge, architectural_decisions, code_snippet, code_language,
  impact_metrics, live_url, github_url, featured, status, landing_page,
  created_at, updated_at
) VALUES (
  gen_random_uuid(),
  'pawspace',
  'PawSpace',
  'The all-in-one platform connecting pet owners with products, services, adoption, and community.',
  $$Pet owners juggle scattered apps for vet records, product shopping, grooming bookings, and adoption browsing — PawSpace collapses it all into one platform. It serves pet owners, vendors, service providers, shelters, and veterinarians through a multi-role marketplace with health tracking, e-commerce, service booking, and lost-pet reporting. The core value is eliminating context-switching across the fragmented pet care ecosystem.$$,
  'Solo Full Stack Architect',
  '2025 — ongoing',
  ARRAY[
    'TypeScript','Next.js 15','React 19','Fastify 5','PostgreSQL',
    'Prisma 6','Zod','Zustand','TanStack React Query',
    'Tailwind CSS','Framer Motion','JWT (jose)','Argon2',
    'Turborepo','pnpm'
  ],
  $$The central engineering challenge was designing a single platform that meaningfully serves six distinct user roles — pet owners, vendors, vets, service providers, shelters, and admins — without collapsing into a monolith that is impossible to maintain. The naive approach would have been a single Next.js app with a catch-all API, where every role logic bleeds into every other. That falls apart fast: role-specific validation, authorization rules, and data shapes require isolation or every change becomes a regression risk.

The tradeoff resolved by a Turborepo monorepo: shared packages (validators, utilities, database types) are consumed by both the Fastify API and the Next.js frontend, but the application layers are fully independent. This meant investing heavily in shared Zod schemas that double as runtime validators and TypeScript types — a single source of truth that keeps client and server in sync without code generation hacks.

The domain itself is genuinely complex: 33 Prisma models with multi-directional relationships, cascading deletes, transactional order creation (decrement stock + clear cart + create order atomically), availability slot computation for service providers, and snapshot pricing in order line items so historical orders do not corrupt when vendors update prices. Getting this right required thinking in terms of data integrity invariants first, then building the API around them — not the other way around.$$,
  '[
    {
      "title": "Turborepo Monorepo with Shared Package Layer",
      "description": "Rather than duplicating validation logic between client and server, a packages/shared layer houses all Zod schemas and utility functions consumed by both the Fastify API and the Next.js frontend. Alternatives like separate repos with published npm packages would have added release overhead; a flat Next.js full-stack app would have tightly coupled frontend rendering with backend logic. Turborepo provides task caching and parallel builds with zero config overhead.",
      "icon": "account_tree"
    },
    {
      "title": "Fastify Over Express for the API Layer",
      "description": "Fastify 5 was chosen over Express for its schema-based validation pipeline, native TypeScript support, and significantly higher throughput. It integrates cleanly with Zod via plugin hooks and ships with Swagger/OpenAPI generation out of the box — critical for a multi-consumer API where contract clarity matters. Express would have required more boilerplate to reach the same level of validation and documentation.",
      "icon": "bolt"
    },
    {
      "title": "Dual-Token JWT with Database Session Storage",
      "description": "Short-lived access tokens (15 min) paired with long-lived refresh tokens (7 days) stored in a Sessions table — not just in-memory or cookies alone. This enables token revocation (critical for account security), user agent and IP tracking per session, and the ability to invalidate all sessions on password change. A stateless JWT-only approach would have made revocation impossible without a blocklist.",
      "icon": "lock"
    },
    {
      "title": "Prisma with Strategic JSON Fields for Flexibility",
      "description": "The schema uses PostgreSQL natively via Prisma ORM, with JSON fields in targeted places: ProductVariant.attributes for arbitrary variant dimensions (color, size, weight) and OrderItem.variantInfo for historical price snapshots. This avoids over-normalizing data that changes meaning over time (an order line must remember the variant at time of purchase, not reflect future edits). Everywhere else, proper relational normalization with indexed foreign keys is enforced.",
      "icon": "storage"
    },
    {
      "title": "Transactional Order Checkout with Stock Decrement",
      "description": "Order creation runs inside a Prisma interactive transaction: validate cart items, check stock, create the order record, create line items with price snapshots, decrement product stock, and clear the cart — all atomically. The naive approach of sequential API calls would allow race conditions where two users purchase the last item simultaneously. Transaction isolation prevents overselling without needing a distributed lock.",
      "icon": "receipt_long"
    },
    {
      "title": "Argon2 for Password Hashing",
      "description": "Argon2id was chosen over bcrypt or PBKDF2 because it is the current OWASP recommendation and winner of the Password Hashing Competition. It is memory-hard, making GPU-accelerated brute force attacks significantly more expensive. bcrypt was the obvious default but Argon2 memory-hardness provides a meaningful security improvement at negligible runtime cost for a user-facing app.",
      "icon": "shield"
    }
  ]'::jsonb,
  '',
  '',
  '[
    {"metric": "33", "label": "database models across 9 feature domains"},
    {"metric": "32", "label": "REST API endpoints fully implemented"},
    {"metric": "6",  "label": "user roles with distinct access control"},
    {"metric": "8",  "label": "pet species supported with breed databases"}
  ]'::jsonb,
  null,
  null,
  true,
  'published',
  '{
    "tagline": "Everything your pet needs, one place",
    "hero_description": "PawSpace brings together pet health tracking, product shopping, service booking, and adoption — so you spend less time switching apps and more time with your pet.",
    "theme": {
      "primary_color": "#F97316",
      "mood": "playful",
      "font_style": "humanist"
    },
    "features": [
      {
        "title": "Pet Health Records",
        "description": "Log vaccinations, medications, vet visits, and weight history for every pet in one place. Get reminders before vaccines expire so nothing falls through the cracks.",
        "icon": "🐾"
      },
      {
        "title": "Pet Products Marketplace",
        "description": "Shop food, treats, toys, and grooming supplies from verified vendors. Filter by species, life stage, and price — with reviews from real pet owners.",
        "icon": "🛒"
      },
      {
        "title": "Service Booking",
        "description": "Find and book groomers, trainers, dog walkers, and sitters near you. See real availability, read reviews, and manage all your appointments in one dashboard.",
        "icon": "📅"
      },
      {
        "title": "Pet Adoption",
        "description": "Browse adoptable pets from verified shelters and rescues. Filter by species, breed, age, and compatibility with kids or other animals. Apply directly through the platform.",
        "icon": "🏡"
      },
      {
        "title": "Lost & Found Board",
        "description": "Report a lost pet or log a found animal with location, photos, and microchip details. Connect with your community to reunite pets with their families faster.",
        "icon": "📍"
      },
      {
        "title": "Multi-Pet Profiles",
        "description": "Manage every pet in your household — dogs, cats, birds, reptiles, and more — each with their own health history, photos, and medical records.",
        "icon": "🐕"
      }
    ],
    "problem_statement": "Caring for a pet means juggling five different apps: one for vet reminders, another for food deliveries, a third to find a groomer, and a spreadsheet just to remember vaccine dates. When your dog goes missing or you want to adopt, you are back to Google. Nothing talks to anything else, and every service starts from scratch with no context about your pet.",
    "solution_statement": "PawSpace gives every pet a profile that follows them across the platform. Your vet records, shopping history, booked appointments, and adoption applications all live in one account. Vendors, vets, and service providers each have their own verified profiles — so you are always booking from someone accountable, not a random listing.",
    "target_audience": "Pet owners managing one or more animals who want their vet records, shopping, service bookings, and community resources in a single account — and the vendors, groomers, shelters, and service providers who serve them.",
    "screenshots_description": "Pet profile with vaccination timeline and weight chart. Product marketplace with species filters and add-to-cart. Service provider detail with availability calendar and booking CTA. Adoption listings with compatibility chips. Lost and found board with location and photo. User dashboard with pet count, recent orders, and upcoming appointments."
  }'::jsonb,
  now(),
  now()
);

-- Verify
SELECT slug, title, status, featured, (landing_page IS NOT NULL) AS has_landing_page
FROM projects
WHERE slug = 'pawspace';
