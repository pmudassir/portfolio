// Grouped by what each group is evidence of, not by logo.
// "proof" points at where a reviewer can see it in use.

export type SkillGroup = {
  label: string;
  items: string[];
  proof: string;
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Product front end",
    items: ["TypeScript", "React", "Next.js (App Router)", "Vue 3", "Nuxt", "TanStack Query", "Tailwind CSS"],
    proof: "BestDoc (Vue/Nuxt), Mentrex, OpsPilot, Nexus",
  },
  {
    label: "Backend & APIs",
    items: ["Node.js", "Python", "FastAPI", "REST", "Pydantic", "Zod", "Auth, sessions & RBAC", "Stripe webhooks"],
    proof: "OpsPilot (FastAPI), Mentrex & Nexus (Next.js route handlers / server actions)",
  },
  {
    label: "Data",
    items: ["PostgreSQL", "SQLAlchemy 2 (async)", "Prisma", "Alembic", "MongoDB", "Firebase"],
    proof: "Constraints, triggers, keyset pagination and percentile metrics in OpsPilot; a 39-model schema in Mentrex",
  },
  {
    label: "Applied LLM",
    items: ["Structured outputs", "Tool calling", "Prompt-injection containment", "Eval harnesses", "Groq / OpenAI-compatible APIs", "Speech-to-text (Deepgram, Whisper)"],
    proof: "OpsPilot request drafts, Ask OpsPilot assistant and eval suites; VoiceInk",
  },
  {
    label: "Mobile",
    items: ["React Native", "Expo", "Kotlin native modules", "MMKV"],
    proof: "App Stone; Koin's SMS and notification listeners",
  },
  {
    label: "Testing & delivery",
    items: ["pytest", "Vitest", "Playwright", "GitHub Actions", "Docker Compose", "Vercel"],
    proof: "OpsPilot CI: backend, frontend and end-to-end jobs against real Postgres",
  },
];

// Listed on the résumé; used in past work but not showcased here.
export const alsoUsed = ["Express", "NestJS", "GraphQL", "WebSockets / Socket.io", "Redis", "MySQL", "AWS", "Nginx", "Go"];
