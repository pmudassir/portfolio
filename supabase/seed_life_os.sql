-- ============================================================
-- Seed: Life OS project
-- Run in Supabase dashboard → SQL Editor
-- ============================================================

DELETE FROM projects WHERE slug = 'life-os';

INSERT INTO projects (
  id, slug, title, subtitle, description, role, timeline, stack,
  challenge, architectural_decisions, code_snippet, code_language,
  impact_metrics, live_url, github_url, featured, status, landing_page,
  created_at, updated_at
) VALUES (
  gen_random_uuid(),
  'life-os',
  'Life OS',
  'A personal productivity command center that unifies habits, learning, projects, goals, and career growth into one intelligent system.',
  $$Life OS is a full-stack personal productivity platform built for ambitious professionals who manage multiple work streams — employment, freelancing, and personal growth — simultaneously. It solves the fragmentation problem: instead of juggling Notion, Todoist, a habit tracker, and a learning log, everything lives in one relational system. The core value is cross-domain intelligence — your habit streaks inform your weekly reflection, your learning hours feed your skill progression, and an AI coach draws on all of it.$$,
  'Solo Developer',
  'Early 2025 — Ongoing',
  ARRAY[
    'Next.js 15','React 19','TypeScript','PostgreSQL','Prisma ORM',
    'Tailwind CSS 4','Radix UI','Framer Motion','Vercel AI SDK',
    'OpenAI GPT-4o','Anthropic Claude','React Hook Form',
    'Zod','Recharts','NextAuth v5','Node.js'
  ],
  $$The core engineering challenge was designing a relational schema that spans 10 distinct life domains — learning, projects, goals, content, habits, networking, scheduling, reflections, skills, and analytics — without becoming a tangled mess of nullable foreign keys and god tables. The naive approach would have been a flat key-value store or a JSON blob per user per day, which would have made querying and cross-domain insights nearly impossible. Instead, the schema uses domain-bounded models with a user-centric ownership pattern and indexed junction tables, enabling performant queries like what is my average learning session duration in weeks where I hit 80% or more of my habits.

The second major challenge was keeping the UI instantly responsive despite heavy server-side data fetching. Every page fetches real data from PostgreSQL on each request (force-dynamic), which risks noticeable load times. The solution was React 19 useOptimistic hook for immediate local feedback on habit toggles and completions, combined with Next.js Server Actions for mutations that automatically invalidate the relevant cache paths — giving the feel of a local app while maintaining a single source of truth.

Building the AI coaching layer required a careful context-construction strategy. An LLM given no context produces generic advice; one given 50 tables of raw SQL dumps would hallucinate or exceed context limits. The architecture compresses user state into a structured context object — active resources, current projects, upcoming goals, recent streaks — and passes only the relevant slice to the model based on which domain the user is chatting from. This keeps token usage predictable and responses actionable rather than generic.$$,
  '[
    {
      "title": "Domain-bounded Prisma schema with 50+ models",
      "description": "Rather than a generic key-value or JSON-blob approach, each life domain (learning, projects, goals, habits, network, etc.) has its own set of strongly-typed Prisma models with proper relationships, enums, and indexes. This enables relational queries across domains for the insights dashboard — e.g., correlating habit streaks with learning output — while keeping data integrity enforced at the database level. The tradeoff is schema complexity and more involved migrations, but the query flexibility and type safety make cross-domain analytics tractable.",
      "icon": "schema"
    },
    {
      "title": "Next.js Server Actions over REST API",
      "description": "All mutations use Next.js Server Actions with revalidatePath() rather than a traditional REST API layer. This eliminates the boilerplate of API route handlers, client-side fetch wrappers, and loading state management for mutations. Each action runs server-side with direct Prisma access, validates input with Zod, and invalidates only the affected cache paths. The tradeoff is coupling the mutation logic to the Next.js runtime, but for a single-user personal app this is the right call — it dramatically reduces surface area and makes the codebase significantly leaner.",
      "icon": "bolt"
    },
    {
      "title": "useOptimistic for instant habit feedback",
      "description": "Habit completion is the most frequent interaction in the app, happening dozens of times per day. Using React 19 useOptimistic hook, toggling a habit updates the UI instantly before the server action resolves, then reconciles with the actual server state. This was chosen over client-side state management libraries like Zustand or Jotai because the optimistic pattern is localized to the component and does not require a global store — keeping state collocated and the component self-contained.",
      "icon": "sync"
    },
    {
      "title": "Compressed context injection for AI coaching",
      "description": "The AI chat widget uses a context-type routing system: when the user opens the chat from the Learning page, the context object injected into the system prompt contains active resources, recent sessions, and skill gaps — not project timelines or content ideas. Each contextType maps to a specific Prisma query that fetches only the relevant slice of the user data. This keeps prompts focused, token costs predictable, and model responses specific enough to be actionable rather than generic productivity platitudes.",
      "icon": "psychology"
    },
    {
      "title": "Kawkab custom design system over off-the-shelf UI kits",
      "description": "Rather than using a component library like shadcn/ui or Chakra end-to-end, the project implements a custom design language (Kawkab) built on Radix UI primitives. The system defines precise typographic scales (88px hero down to 12px meta), a minimal palette anchored by lime (#C4F041) as the accent, and glass morphism for the mobile nav dock. Radix handles accessibility primitives (dialog, checkbox, scroll-area) while Tailwind and Framer Motion handle visual polish and staggered animation. The result is a distinctive, high-quality UI that does not look like every other Next.js dashboard.",
      "icon": "palette"
    },
    {
      "title": "HMAC-SHA256 custom session auth for solo-user context",
      "description": "Instead of configuring a full OAuth provider or relying on NextAuth database adapter in early development, the auth layer uses custom HMAC-SHA256 signed session tokens with expiration checks. A dev-mode fallback auto-authenticates as a default user, eliminating login friction during rapid iteration. NextAuth v5 is configured as the framework scaffold but the token validation is custom — this keeps the option open to plug in OAuth providers while keeping local development frictionless.",
      "icon": "lock"
    }
  ]'::jsonb,
  '',
  '',
  '[
    {"metric": "10+",       "label": "life domains unified in one system"},
    {"metric": "50+",       "label": "database models across all domains"},
    {"metric": "<100ms",    "label": "optimistic UI feedback on habit interactions"},
    {"metric": "3 AI models","label": "GPT-4o, GPT-4o-mini, Claude 3.5 Sonnet integrated"}
  ]'::jsonb,
  null,
  null,
  true,
  'published',
  '{
    "tagline": "Your entire life, one command center",
    "hero_description": "Life OS brings your habits, learning, projects, goals, and career growth into a single intelligent dashboard — so nothing falls through the cracks.",
    "theme": {
      "primary_color": "#C4F041",
      "mood": "minimal",
      "font_style": "geometric"
    },
    "features": [
      {
        "title": "Daily Habit Command Center",
        "description": "Track habits across morning, deep work, and evening blocks with streak intelligence and one-tap completion. Miss a day — the system shows you exactly where and why.",
        "icon": "✅"
      },
      {
        "title": "Learning Progress Engine",
        "description": "Log books, courses, and videos with session tracking, notes, and skill proficiency mapping. See your learning hours compound over time.",
        "icon": "📚"
      },
      {
        "title": "Multi-Stream Project Tracker",
        "description": "Manage job, freelance, business, and personal projects in parallel — with time entries, goals, and metrics per project so you always know where your hours went.",
        "icon": "🗂️"
      },
      {
        "title": "Goal Hierarchy",
        "description": "Set weekly, monthly, 6-month, and 12-month goals with checkpoints. Watch long-term ambitions break down into daily actions automatically.",
        "icon": "🎯"
      },
      {
        "title": "Content Pipeline",
        "description": "Capture ideas, schedule posts across LinkedIn, Twitter, YouTube, and your blog, and track engagement — all without leaving your productivity system.",
        "icon": "✍️"
      },
      {
        "title": "AI Coaching, In Context",
        "description": "An AI assistant that knows your actual data — your active projects, habit streaks, and learning gaps — and gives advice specific to your situation, not generic productivity tips.",
        "icon": "🤖"
      },
      {
        "title": "Insights Dashboard",
        "description": "Cross-domain analytics: see how your habit consistency correlates with your learning output, where your time actually goes, and which projects are moving the needle.",
        "icon": "📊"
      },
      {
        "title": "Network & Relationship Tracker",
        "description": "Track key contacts using the 10-conversation framework, log outreach, and manage opportunities — so your network grows intentionally, not by accident.",
        "icon": "🤝"
      }
    ],
    "problem_statement": "You are tracking habits in one app, books in another, work projects in Notion, goals in a journal, and content ideas in your notes app. Every Sunday planning session starts with hunting down what happened last week across five different tools. Things get missed. Progress feels invisible. You know you are doing a lot but cannot see it adding up.",
    "solution_statement": "Life OS stores everything in one relational system — so your habit streaks, learning sessions, project time, and goals all live together and inform each other. The insights dashboard shows you the actual picture of your week. The AI coach knows your context and gives specific advice. The mobile-first design means you can log a habit or a learning session in seconds, not minutes.",
    "target_audience": "Ambitious professionals managing multiple work streams — a day job, side projects or freelancing, active learning, and content creation — who want a single system they control rather than a patchwork of SaaS subscriptions.",
    "screenshots_description": "Today view with habit sections and progress ring. Learning page with resource cards, session timer, and skill tree. Projects page with kanban cards and time distribution chart. Insights dashboard with cross-domain Recharts graphs. AI chat widget floating panel with context-type badge."
  }'::jsonb,
  now(),
  now()
);

-- Verify
SELECT slug, title, status, featured, (landing_page IS NOT NULL) AS has_landing_page
FROM projects
WHERE slug = 'life-os';
