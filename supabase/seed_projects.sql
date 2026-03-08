-- ============================================================
-- Seed: Koin + SubPilot projects
-- Run in Supabase dashboard → SQL Editor
-- ============================================================

-- Remove any stale rows with these slugs first
DELETE FROM projects WHERE slug IN ('koin', 'subpilot');

-- ── KOIN ─────────────────────────────────────────────────────────────────────
INSERT INTO projects (
  id, slug, title, subtitle, description, role, timeline, stack,
  challenge, architectural_decisions, code_snippet, code_language,
  impact_metrics, live_url, github_url, featured, status, landing_page,
  created_at, updated_at
) VALUES (
  gen_random_uuid(),
  'koin',
  'Koin',
  'A smart expense tracker that auto-detects and categorizes Indian transactions in real time.',
  $$Koin solves the friction of manual expense logging for Indian users by automatically detecting transactions from SMS, notifications, and share intents — then categorizing them using a 7-tier AI pipeline. Built for the India-first UPI ecosystem, it supports Paytm, GPay, PhonePe, and 9+ major payment apps out of the box. Users get instant spending insights, budget tracking, and biometric security without ever needing to sign up.$$,
  'Solo Developer',
  'Jan 2025 — Mar 2025',
  ARRAY[
    'React Native','Expo','TypeScript','React Navigation','MMKV',
    'Firebase Firestore','Firebase Auth','expo-local-authentication',
    'EAS Build','Android Native Modules','expo-clipboard','expo-crypto'
  ],
  $$The core challenge was building a zero-friction expense detection system that works across Android and iOS without any server infrastructure. The naive approach would have been a simple form-based logger — but users abandon those within days. The real problem was intercepting transactions the moment they happen, whether from an SMS, a push notification, or an image shared from a banking app.

On Android, this required writing custom native modules in Java to tap into SMS broadcasts and notification listeners — two separate permission-gated channels that each needed their own bridge to React Native's JS layer. Synchronizing these async native events with the app's local-first MMKV state without creating race conditions or duplicate entries was a non-trivial concurrency problem.

The second hard problem was categorization accuracy. A naive keyword lookup would misfire constantly — 'Amazon' could be shopping, groceries (Amazon Fresh), or streaming (Prime). The solution was a 7-tier priority pipeline: user corrections (learned overrides) → app source detection → UPI VPA analysis → context-weighted regex → keyword matching → transfer detection via Indian name patterns → fallback. Each tier gates the next, ensuring the system learns from corrections and respects intent signals over surface-level text.$$,
  '[
    {
      "title": "MMKV over AsyncStorage for local-first persistence",
      "description": "React Native''s default AsyncStorage is async and JS-thread-bound, creating lag on every read during app startup and list rendering. MMKV provides synchronous reads via a C++ JSI bridge, making it 10-30x faster. This enabled a local-first architecture where the app renders instantly from local data, then optionally syncs to Firebase in the background — no loading spinners on the critical path.",
      "icon": "storage"
    },
    {
      "title": "7-tier smart categorization pipeline",
      "description": "A flat keyword lookup fails on ambiguous merchants like Amazon or Reliance. The pipeline was designed with explicit priority ordering: learned user overrides always win, followed by app-source detection (Swiggy → Food), UPI VPA string analysis, context-weighted regex on full transaction text, merchant keyword map, Indian name pattern detection for personal transfers, and finally a safe fallback. This allowed progressive improvement as users interact without touching a model API.",
      "icon": "category"
    },
    {
      "title": "Android native modules for dual-channel transaction detection",
      "description": "Two separate native Java modules were written — one for SMS broadcast receivers and one for notification listeners — because no single cross-platform library handled both reliably. Using Expo''s bare workflow allowed mixing managed Expo APIs with custom native code. This dual-channel approach means the app catches transactions from banking apps that send SMS AND from UPI apps that only show notifications.",
      "icon": "sensors"
    },
    {
      "title": "Firebase anonymous authentication for cloud sync",
      "description": "Requiring user sign-up creates abandonment friction in a personal finance app. Firebase''s anonymous auth was chosen to give every device a persistent, unique identity without email/password — enabling full cloud sync across reinstalls. The anonymous ID is stored in MMKV and reused, so users retain their transaction history even after reinstalling, with a remote-timestamp-wins conflict resolution strategy.",
      "icon": "cloud_sync"
    },
    {
      "title": "Share intent bridge for cross-app transaction capture",
      "description": "iOS does not allow background SMS access, so an alternate capture path was needed. The share intent bridge lets users share bank notification screenshots or transaction texts directly to Koin from any app. On iOS this uses clipboard polling after a URL scheme handoff; on Android it hooks into the system share sheet. A unified parseKoinURL() function normalizes both paths, keeping the downstream categorization logic identical.",
      "icon": "share"
    }
  ]'::jsonb,
  '',
  '',
  '[
    {"metric": "7-tier", "label": "categorization pipeline"},
    {"metric": "9+",    "label": "Indian payment apps auto-detected"},
    {"metric": "500+",  "label": "merchant keywords mapped"},
    {"metric": "3",     "label": "transaction detection channels"}
  ]'::jsonb,
  null,
  null,
  true,
  'published',
  '{
    "tagline": "Track spending. Zero effort.",
    "hero_description": "Koin automatically detects your UPI and bank transactions the moment they happen — no manual entry, no sign-up required.",
    "theme": {
      "primary_color": "#137fec",
      "mood": "dark",
      "font_style": "geometric"
    },
    "features": [
      {
        "title": "Auto transaction detection",
        "description": "Koin reads your bank SMS and payment app notifications in real time, logging transactions the instant they occur — no copy-pasting required.",
        "icon": "⚡"
      },
      {
        "title": "Smart categorization",
        "description": "A 7-tier AI pipeline figures out whether that Swiggy charge is food delivery, not just shopping — and it learns your corrections over time.",
        "icon": "🧠"
      },
      {
        "title": "Budget tracking",
        "description": "Set a daily, weekly, or monthly budget. Koin shows you exactly how much you have spent and how much is left — updated with every transaction.",
        "icon": "📊"
      },
      {
        "title": "Analytics & insights",
        "description": "See 6-month spending trends, category breakdowns, and month-over-month comparisons. Koin surfaces anomalies and pattern shifts automatically.",
        "icon": "📈"
      },
      {
        "title": "Biometric security",
        "description": "Your financial data stays locked behind Face ID or fingerprint. The app locks automatically when you leave and unlocks with a glance.",
        "icon": "🔒"
      },
      {
        "title": "Works offline, syncs silently",
        "description": "All data lives on your device first. Firebase sync happens in the background — so the app is always fast and works without a connection.",
        "icon": "☁️"
      }
    ],
    "problem_statement": "You open your banking app to check how much you spent this month. You cannot tell — it is a wall of raw transactions with no categories, no totals, no context. You try a budgeting app, but it wants you to log every expense manually. You do it for three days, then forget. By the end of the month, you have no idea where your money went.",
    "solution_statement": "Koin hooks into your SMS inbox and payment app notifications to log transactions automatically the moment they happen. It categorizes them using Indian payment context — it knows that a Zomato charge is food, not other. You open the app and your spending is already there, organized, with a clear budget breakdown.",
    "target_audience": "Indian smartphone users aged 22–35 who use UPI apps (GPay, PhonePe, Paytm) daily and want to understand their spending without the discipline overhead of manual tracking.",
    "screenshots_description": "Home screen with budget progress card, transaction list with category chips and amounts. Add Expense screen with numeric keypad and category selector. Analytics screen with bar chart and category donut. Settings with biometric and sync toggles."
  }'::jsonb,
  now(),
  now()
);


-- ── SUBPILOT ─────────────────────────────────────────────────────────────────
INSERT INTO projects (
  id, slug, title, subtitle, description, role, timeline, stack,
  challenge, architectural_decisions, code_snippet, code_language,
  impact_metrics, live_url, github_url, featured, status, landing_page,
  created_at, updated_at
) VALUES (
  gen_random_uuid(),
  'subpilot',
  'SubPilot',
  'A SaaS subscription management dashboard for indie founders tracking MRR, churn, and customer health across multiple products.',
  $$SubPilot solves the fragmented visibility problem indie SaaS founders face when managing multiple products across different payment providers. It provides a unified dashboard to monitor MRR, subscriber counts, churn rates, and customer lifecycle stages in real time. The core value is replacing spreadsheet-based revenue tracking with a purpose-built analytics surface that surfaces what matters — growth trends, at-risk subscribers, and integration health.$$,
  'Solo Developer',
  'Early 2025',
  ARRAY[
    'Next.js 16','React 19','TypeScript','Tailwind CSS 4',
    'Lucide React','Recharts','Google Fonts (Inter)','Material Symbols'
  ],
  $$The core challenge was designing a dashboard information architecture that communicates revenue health at a glance without overwhelming the user. Most analytics tools either show too much (enterprise BI tools) or too little (payment provider dashboards). The naive approach — just listing raw numbers — fails because founders need to understand trends, not snapshots. This required carefully curating which metrics to surface per page and how to visually encode change (growth vs. decline) using color, sparklines, and progress indicators.

Building a convincing, fully-typed mock data layer that behaves like a real backend was a deliberate tradeoff. Rather than wiring up a database prematurely, the project defines strict TypeScript interfaces for every domain object (Product, Customer, Subscription, Integration), which means the API contract is established before the backend exists. This keeps the UI development fast and the data shape locked in for future integration.

The visual design challenge was creating a dark-mode-only UI that feels premium rather than gloomy. This required a purposeful palette — deep navy backgrounds (#0F1115), purple accents (#895af6), cyan highlights (#22D3EE), and emerald/red semantics for positive/negative signals — layered with glassmorphism panels and subtle animation utilities. Getting consistent visual hierarchy across six distinct page contexts without a component library required building a lean, reusable UI kit from scratch.$$,
  '[
    {
      "title": "Mock-first data layer with strict TypeScript interfaces",
      "description": "All data is served from a single src/lib/mock-data.ts file rather than a live API. This was a deliberate choice to decouple UI development from backend readiness. By defining TypeScript interfaces first (DashboardMetrics, Product, Customer, Subscription), the data contract is established upfront, making future API integration a drop-in replacement. The alternative — building against a real DB from day one — would have slowed UI iteration significantly.",
      "icon": "database"
    },
    {
      "title": "Next.js App Router with server components by default",
      "description": "The project uses Next.js 16 App Router, with pages rendered server-side by default. Client components are applied only where interactivity is needed — specifically the three pages with tab-based filtering (Customers, Subscriptions, Integrations). This keeps the bundle lean and avoids hydration overhead on purely presentational pages like the main dashboard.",
      "icon": "route"
    },
    {
      "title": "Single shared DashboardLayout with slot-based content",
      "description": "Rather than repeating sidebar and header markup across six pages, a single DashboardLayout component wraps all routes and renders page-specific content via React children. The sidebar uses usePathname() to highlight the active route without prop drilling. This pattern keeps each page file focused on data display and eliminates layout drift between sections.",
      "icon": "view_sidebar"
    },
    {
      "title": "Custom SVG chart primitives over heavy charting libraries",
      "description": "The revenue chart and MRR bar chart are implemented as hand-authored SVG with gradient fills rather than pulling in Recharts (which is installed but unused). This avoids 50–80KB of JavaScript for charts that do not require interactivity or dynamic axes. The tradeoff is more upfront SVG authoring, but the result is faster load times and pixel-perfect visual control.",
      "icon": "bar_chart"
    },
    {
      "title": "Tailwind CSS 4 with semantic CSS custom properties",
      "description": "Rather than using Tailwind default color palette directly, the project defines a semantic token layer via CSS custom properties scoped to the dark theme in globals.css. This means color changes propagate from one source of truth and utility classes reference named intents rather than raw hex values. Tailwind v4 PostCSS-first architecture removes the need for a separate config file.",
      "icon": "palette"
    }
  ]'::jsonb,
  '',
  '',
  '[
    {"metric": "$42.5k", "label": "MRR tracked across 4 products in demo"},
    {"metric": "41%",    "label": "revenue growth shown Jan–Jul in demo data"},
    {"metric": "6",      "label": "fully functional dashboard pages built"},
    {"metric": "4",      "label": "payment provider integrations designed"}
  ]'::jsonb,
  null,
  null,
  true,
  'published',
  '{
    "tagline": "One dashboard for all your SaaS revenue",
    "hero_description": "SubPilot gives indie founders a single place to track subscribers, revenue, and churn across every product they sell — no spreadsheets, no switching between payment dashboards.",
    "theme": {
      "primary_color": "#895af6",
      "mood": "dark",
      "font_style": "geometric"
    },
    "features": [
      {
        "title": "Unified MRR Dashboard",
        "description": "See total MRR, subscriber count, and churn rate at a glance — updated across all your products in one view.",
        "icon": "📊"
      },
      {
        "title": "Multi-Product Portfolio",
        "description": "Manage CloudSync, DataPulse, or a dozen other products from a single sidebar. Each product shows its own MRR, growth trend, and subscriber sparkline.",
        "icon": "🗂️"
      },
      {
        "title": "Customer Lifecycle Tracking",
        "description": "Filter customers by Active, Trialing, Past Due, or Canceled status and see their MRR contribution at a glance — before problems become churn.",
        "icon": "👥"
      },
      {
        "title": "Payment Provider Integrations",
        "description": "Connect Stripe, Paddle, LemonSqueezy, and Braintree to pull subscription data automatically — no manual CSV imports.",
        "icon": "🔌"
      },
      {
        "title": "Revenue Analytics",
        "description": "7-month MRR growth charts, plan distribution breakdowns, and churn trend sparklines give you the context behind the numbers.",
        "icon": "📈"
      },
      {
        "title": "Real-Time Activity Feed",
        "description": "A live stream of subscription events — upgrades, cancellations, new trials — so nothing slips through unnoticed.",
        "icon": "⚡"
      }
    ],
    "problem_statement": "You are running multiple SaaS products, but your revenue data is scattered across Stripe, Paddle, and a LemonSqueezy account you set up last year. Every Monday you are copy-pasting numbers into a spreadsheet just to know if you are growing. You have no idea which customers are about to churn until they already have.",
    "solution_statement": "SubPilot pulls your subscription data from every payment provider into one dark, fast dashboard. You open it and immediately know your MRR, your growth rate, which customers are at risk, and which products are carrying the portfolio. No setup ritual, no spreadsheet, no guessing.",
    "target_audience": "Indie hackers and solo founders running 1–5 SaaS products who need revenue clarity without the overhead of enterprise analytics tools.",
    "screenshots_description": "Main dashboard: 4 metric cards at top (MRR, Subscribers, Revenue, Churn) with a large SVG line chart showing 7-month revenue trend and a bar chart for MRR growth. Products page: table listing each product with a sparkline column, MRR, subscriber count, growth percentage badge, and status pill. Customers page: filterable table with tabs (All / Active / Past Due / Trialing / Canceled). Analytics page: donut chart for plan distribution, churn sparkline, and a live activity feed. All screens use a near-black (#0F1115) background with purple-accented UI elements and a fixed dark sidebar."
  }'::jsonb,
  now(),
  now()
);

-- Verify:
SELECT slug, title, status, featured, (landing_page IS NOT NULL) AS has_landing_page
FROM projects
WHERE slug IN ('koin', 'subpilot');
