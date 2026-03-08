-- ============================================================
-- Seed: PRO Hub Abu Dhabi project
-- Run in Supabase dashboard → SQL Editor
-- ============================================================

DELETE FROM projects WHERE slug = 'pro-hub-abu-dhabi';

INSERT INTO projects (
  id, slug, title, subtitle, description, role, timeline, stack,
  challenge, architectural_decisions, code_snippet, code_language,
  impact_metrics, live_url, github_url, featured, status, landing_page,
  created_at, updated_at
) VALUES (
  gen_random_uuid(),
  'pro-hub-abu-dhabi',
  'PRO Hub Abu Dhabi',
  'UAE business setup and PRO services platform for international entrepreneurs launching in the Gulf.',
  $$PRO Hub Abu Dhabi is a full-service business consultancy platform helping entrepreneurs, SMEs, and investors establish and maintain legal business presence in the UAE. It streamlines the complex, documentation-heavy process of company formation across Mainland, Free Zone, and Offshore jurisdictions — covering everything from trade license applications to visa processing. Built as a modern web platform with a CMS-backed blog, multi-channel lead capture, and a Google-integrated review system.$$,
  'Solo Full Stack Developer',
  'Late 2024 — Early 2025',
  ARRAY[
    'Next.js 15 (App Router)','React 19','TypeScript','Tailwind CSS 4',
    'Neon PostgreSQL','Framer Motion','GSAP','Three.js','Radix UI',
    'React Hook Form','Zod','Nodemailer','Resend','ImageKit',
    'Google Places API','JWT (jose)','bcryptjs','Vercel'
  ],
  $$The core challenge was building a platform that functions simultaneously as a marketing website, a CMS, a lead generation machine, and a compliance-sensitive content system — all with zero backend server (serverless-only). Every form submission needed to reliably reach a human via email, even when primary SMTP providers failed, which led to a dual-provider email architecture with automatic failover between Hostinger SMTP and Resend.

Content compliance added a layer of real-world complexity. Google Ads policies restrict advertising alongside certain visa-related content, so Golden Visa pages had to be surgically hidden from navigation and review snippets without removing the underlying pages entirely — a nuanced content governance challenge that required controlled exposure at the routing and data layer rather than deletion.

The naive approach would have been a static site or a WordPress install — both insufficient for the dynamic review aggregation, admin-managed blog publishing, and real-time lead routing that the business required. Instead, the architecture uses Next.js App Router with serverless PostgreSQL (Neon) to support CMS-grade content management, a secure JWT admin panel, and ISR-cached Google Places reviews — all without managing any persistent infrastructure.$$,
  '[
    {
      "title": "Serverless PostgreSQL with Neon for CMS-grade blog management",
      "description": "Rather than using a headless CMS or static MDX files, blogs are stored in a Neon serverless PostgreSQL database with a custom admin panel. This enabled draft/publish workflows, slug-based routing, category filtering, and tag management — all without paying for a third-party CMS. The tradeoff was building the admin interface from scratch, but it gave complete control over schema, queries, and content shape.",
      "icon": "storage"
    },
    {
      "title": "Dual-provider email failover (SMTP + Resend)",
      "description": "Lead forms and contact submissions are business-critical — a missed inquiry is lost revenue. A single SMTP provider introduces a single point of failure. The solution was an environment-variable-driven provider switcher that routes through Hostinger SMTP as primary and Resend as fallback, with a shared template system. This pattern was cheaper than managed transactional email at scale and more resilient than either provider alone.",
      "icon": "alternate_email"
    },
    {
      "title": "JWT authentication with Edge Middleware for admin protection",
      "description": "The admin panel is protected via Next.js middleware running at the edge, verifying JWT tokens from HTTP-only secure cookies before any admin route resolves. This eliminates client-side auth logic entirely — the server rejects unauthenticated requests before rendering, making the protection impossible to bypass via JavaScript. Bcrypt handles password hashing with timing-attack resistance.",
      "icon": "lock"
    },
    {
      "title": "Three-tier review fallback (Google Places API → Legacy API → hardcoded)",
      "description": "Google reviews are a trust signal critical to conversion. But the Places API can fail or rate-limit. The implementation cascades through: Google Places v1 API → legacy Maps API → curated hardcoded testimonials — with ISR caching (1-hour revalidation) to minimize live API calls. This kept the reviews section always populated regardless of API availability.",
      "icon": "star"
    },
    {
      "title": "Compliance-aware content governance without page deletion",
      "description": "Google Ads policy restricts advertising alongside Golden Visa content. The business needed to keep the pages indexed for SEO while preventing them from appearing in navigation or ad-serving contexts. The solution was removing Golden Visa from the navigation data structure and filtering related keywords from dynamically-fetched review text — surgical content governance at the data layer rather than destroying the content entirely.",
      "icon": "policy"
    },
    {
      "title": "ImageKit for admin-managed media with direct upload API",
      "description": "Blog featured images are uploaded directly to ImageKit via a dedicated /api/upload route, which authenticates with server-side credentials before returning a signed upload token. This keeps private API keys off the client while enabling the admin panel to provide a seamless drag-and-drop image workflow. ImageKit handles transformation, optimization, and CDN delivery automatically.",
      "icon": "image"
    }
  ]'::jsonb,
  '',
  '',
  '[
    {"metric": "6+",  "label": "UAE jurisdictions covered"},
    {"metric": "3",   "label": "email providers with auto-failover"},
    {"metric": "10+", "label": "API integrations"},
    {"metric": "2014","label": "client operations since"}
  ]'::jsonb,
  null,
  'https://github.com/Mushirif/PRO-Hub-Abu-Dhabi',
  true,
  'published',
  '{
    "tagline": "Your UAE business, set up right.",
    "hero_description": "PRO Hub handles all the paperwork, government liaisons, and legal setup so you can launch your business in the UAE without the bureaucratic headache.",
    "theme": {
      "primary_color": "#c9a84c",
      "mood": "enterprise",
      "font_style": "modern-sans"
    },
    "features": [
      {
        "title": "Company Formation",
        "description": "Mainland, Free Zone, and Offshore company setup across Abu Dhabi, Dubai, Sharjah, Ajman, and RAK — with full documentation handled end-to-end.",
        "icon": "🏢"
      },
      {
        "title": "Virtual PRO Packages",
        "description": "Monthly PRO service subscriptions (from AED 299/month) covering visa processing, license renewals, and government attestations without needing an on-site PRO.",
        "icon": "📋"
      },
      {
        "title": "Immigration & Visa Processing",
        "description": "Full-service immigration support including employment visas, family visas, and residency processing across all Emirates.",
        "icon": "✈️"
      },
      {
        "title": "Admin-Managed Blog CMS",
        "description": "A private admin panel lets the PRO Hub team publish compliance updates, tax guides, and business insights directly — no developer needed.",
        "icon": "✍️"
      },
      {
        "title": "Smart Lead Routing",
        "description": "Multi-step lead capture forms with service selection, auto-reply emails to inquiries, and dual-provider email failover so no lead ever goes unanswered.",
        "icon": "📨"
      },
      {
        "title": "Google Reviews Integration",
        "description": "Live Google Places reviews displayed on the site, with automatic fallback to curated testimonials if the API is unavailable — trust signals always present.",
        "icon": "⭐"
      }
    ],
    "problem_statement": "Setting up a business in the UAE means dealing with multiple government departments, Arabic documentation, free zone authorities, and PRO liaisons — all while trying to actually run your business. Most founders waste weeks navigating bureaucracy they do not understand, in a country where the rules change frequently and the cost of mistakes is high.",
    "solution_statement": "PRO Hub provides a single point of contact for the entire UAE business setup process. The platform presents clear service options across all jurisdictions, captures detailed requirements through structured lead forms, and routes enquiries to the right specialist immediately — with auto-confirmation emails and transparent pricing packages starting at AED 5,750.",
    "target_audience": "International entrepreneurs, GCC-based SMEs, and multinational companies looking to establish or expand legal business presence in the UAE — particularly those unfamiliar with UAE administrative and legal processes.",
    "screenshots_description": "Hero page with AED 5,750 package offer and jurisdiction selector. Business setup hub with three-column jurisdiction comparison. PRO Services pricing tiers with feature comparison table. Admin dashboard with blog stats and post list. Blog listing with category filters. Multi-step lead capture form with service type selector."
  }'::jsonb,
  now(),
  now()
);

-- Verify
SELECT slug, title, status, featured, github_url, (landing_page IS NOT NULL) AS has_landing_page
FROM projects
WHERE slug = 'pro-hub-abu-dhabi';
