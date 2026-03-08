-- ============================================================
-- Seed: Foodtopia project
-- Run in Supabase dashboard → SQL Editor
-- ============================================================

DELETE FROM projects WHERE slug = 'foodtopia';

INSERT INTO projects (
  id, slug, title, subtitle, description, role, timeline, stack,
  challenge, architectural_decisions, code_snippet, code_language,
  impact_metrics, live_url, github_url, featured, status, landing_page,
  created_at, updated_at
) VALUES (
  gen_random_uuid(),
  'foodtopia',
  'Foodtopia',
  'A trust-weighted restaurant discovery app where credibility shapes what you see.',
  $$Foodtopia tackles the fake review problem by building a credibility engine directly into the platform — votes from experienced critics carry more weight, and reviewer trust scores evolve with every interaction. Food enthusiasts and traveling critics use it to discover restaurants, post photo reviews, follow trusted voices, and build their own reputation as a food critic. The result is a social discovery platform where signal cuts through the noise.$$,
  'Solo Developer',
  '2025',
  ARRAY[
    'React Native','Expo','TypeScript','Fastify','PostgreSQL',
    'Prisma','Zod','JWT','Argon2','Cloudinary',
    'Expo SecureStore','React Navigation','React Native Reanimated',
    'Expo Location','GitHub Actions'
  ],
  $$The core challenge was designing a trust system that is both mathematically meaningful and resistant to gaming. A naive approach — averaging star ratings — is trivially inflatable: create accounts, leave 5-star reviews, done. The real engineering problem was making credibility an emergent property of long-term behavior, not something you can manufacture overnight.

The credibility score (0–100) is a weighted composite of account age, review volume, upvote ratio, follower count, recent activity, and verified status. Critically, votes themselves are weighted by the voter credibility — a verified critic upvote contributes 2.5x more than a new account. This creates a self-reinforcing quality loop without requiring manual moderation, but demanded careful balancing: too aggressive and new users feel locked out; too lenient and bad actors can still inflate scores.

On the mobile side, building a real-time social feed across iOS and Android with optimistic UI updates, location-aware discovery, and multi-photo uploads via Cloudinary — while maintaining a smooth glass-morphism aesthetic with blur layers and gradients — required careful performance tradeoffs. React Native Reanimated handled the animation layer, but keeping 40+ API endpoints coherent across 13 screens without a global state manager beyond Context API meant every service call had to be designed with clear ownership boundaries to avoid cascading re-renders.$$,
  '[
    {
      "title": "Credibility-weighted voting engine",
      "description": "Instead of treating all votes equally, each vote carries a multiplier (0.5x–2.5x) based on the voter credibility score. This was implemented in a dedicated credibility.ts service that recomputes scores on vote events. The alternative — equal-weight votes — was rejected because it makes the platform trivially gameable. The tradeoff is added complexity in the vote endpoint and a need for Prisma transactions to prevent race conditions when toggling votes.",
      "icon": "verified"
    },
    {
      "title": "Fastify with Prisma over REST convention",
      "description": "Fastify was chosen over Express for its schema-based performance characteristics and native TypeScript support. Combined with Prisma type-safe query builder, every API response is validated end-to-end: Zod validates incoming payloads, Prisma enforces schema correctness, and TypeScript catches type mismatches at compile time. This eliminated an entire class of runtime bugs that plague loosely-typed Express/Mongoose setups.",
      "icon": "speed"
    },
    {
      "title": "Cloudinary for image uploads at the edge",
      "description": "Rather than routing photo uploads through the backend (adding latency, storage costs, and bandwidth), photos are uploaded directly from the mobile client to Cloudinary using a public upload preset. The backend only stores the returned URL. This decision offloaded resizing, CDN distribution, and format conversion to a specialized service, keeping the Fastify server stateless and the API fast.",
      "icon": "cloud_upload"
    },
    {
      "title": "React Context API over Redux or Zustand",
      "description": "Global state is deliberately minimal — only auth tokens and saved restaurant IDs need cross-screen access. Using Context API with hooks avoided the boilerplate overhead of Redux or Zustand for a scope that did not warrant it. SavedContext uses optimistic updates (apply immediately, revert on error) to make saves feel instant. The tradeoff is that scaling to more shared state would require refactoring, but for this feature set it keeps the codebase lean.",
      "icon": "share"
    },
    {
      "title": "Prisma migrations as living schema documentation",
      "description": "Nine incremental migrations capture the product evolution — from basic auth, through restaurant reviews and votes, to a full social graph with follows, comments, lists, and achievements. Each migration is a readable artifact of product decisions. This approach made it possible to reason about database state at any point in history and safely roll back during development without data loss.",
      "icon": "history"
    },
    {
      "title": "Achievement system with credibility thresholds",
      "description": "Achievements (First Review, Food Explorer, Trusted Voice, City Explorer, etc.) are evaluated in a dedicated achievements.ts service against the user current stats. Rather than triggering achievements via database triggers (which would couple business logic to the DB layer), they are computed server-side on relevant events. This keeps the logic testable, readable, and easy to extend with new badge types.",
      "icon": "emoji_events"
    }
  ]'::jsonb,
  '',
  '',
  '[
    {"metric": "40+",   "label": "API endpoints across 10 route modules"},
    {"metric": "13",    "label": "database models with 9 schema migrations"},
    {"metric": "5,700+","label": "lines of TypeScript across frontend and backend"},
    {"metric": "2.5x",  "label": "max vote weight for verified critics vs. new users"}
  ]'::jsonb,
  null,
  null,
  true,
  'published',
  '{
    "tagline": "Discover restaurants you can actually trust.",
    "hero_description": "Foodtopia ranks restaurants based on who is reviewing them — so experienced food critics carry more weight than anonymous first-timers.",
    "theme": {
      "primary_color": "#FF6B35",
      "mood": "vibrant",
      "font_style": "modern-sans"
    },
    "features": [
      {
        "title": "Trust-Weighted Reviews",
        "description": "Votes from established critics count more than new accounts. The platform credibility engine surfaces honest opinions and buries inflated ones automatically.",
        "icon": "⚖️"
      },
      {
        "title": "Discover by Cuisine & Location",
        "description": "Search by dish, city, cuisine, price range, or proximity. Filters for vegan, budget-friendly, and verified restaurants make it easy to find exactly what you want.",
        "icon": "🗺️"
      },
      {
        "title": "Photo Reviews with Tags",
        "description": "Post up to five photos per review with dish tags and ratings. Every review builds your credibility score — the more people trust your picks, the louder your voice.",
        "icon": "📸"
      },
      {
        "title": "Follow Food Critics You Trust",
        "description": "Build a personal feed of critics whose taste matches yours. See what they are eating, where they are going, and what they are recommending — before the crowds arrive.",
        "icon": "👤"
      },
      {
        "title": "Earn Achievements",
        "description": "Unlock badges for milestones like Food Explorer (10 reviews), City Explorer (5 cities), and Influencer (100 followers). Your profile becomes a track record.",
        "icon": "🏅"
      },
      {
        "title": "Save & Organize",
        "description": "Bookmark restaurants to personal lists — public or private. Sort by trust score, city, or the date you saved them to plan trips and share recommendations with friends.",
        "icon": "🔖"
      }
    ],
    "problem_statement": "Every restaurant app has thousands of reviews — and most of them are useless. One-star rage reviews from customers who complained about parking. Five-star bombs from friends of the owner. Aggregated ratings that tell you nothing about whether you will enjoy the food. You have stopped trusting the stars, but there is no better signal available.",
    "solution_statement": "Foodtopia makes reviewer reputation part of the ranking algorithm. A verified food critic who has posted 50 well-received reviews has a credibility score that amplifies their vote. A brand-new account vote counts for half as much. The result: restaurants rise and fall on the opinions of people who have proven they know food — not whoever campaigns hardest for five stars.",
    "target_audience": "Food-obsessed people who travel frequently or live in cities with dense dining scenes — the type who reads menus before choosing where to eat, follows food journalists, and feels personally betrayed by a restaurant that did not live up to its rating.",
    "screenshots_description": "Feed with glassmorphism cards showing trust score badge and upvote widget. Discover screen with category chips and restaurant grid. Restaurant detail with tabbed reviews showing credibility badges. Create review with multi-photo upload and star tap rating. Profile with stats row and achievement badge grid."
  }'::jsonb,
  now(),
  now()
);

-- Verify
SELECT slug, title, status, featured, (landing_page IS NOT NULL) AS has_landing_page
FROM projects
WHERE slug = 'foodtopia';
