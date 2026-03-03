export interface JournalArticle {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  content: string;
}

export const articles: JournalArticle[] = [
  {
    slug: "why-i-chose-next-for-everything",
    title: "Why I Chose Next.js for (Almost) Everything",
    excerpt: "A pragmatic breakdown of when Next.js is the right choice and when it's not — from someone who ships production apps with it daily.",
    date: "FEB 28, 2026",
    category: "Architecture",
    readTime: "8 min read",
    content: `Next.js has become my default framework for web applications. Not because it's trendy, but because it solves real problems I face in every project.

## The Server-First Mental Model

The App Router fundamentally changed how I think about data fetching. Instead of useEffect chains and loading states, I write async components that fetch data where they need it.

\`\`\`typescript
// Before: Client-side fetching
const [projects, setProjects] = useState([]);
useEffect(() => {
  fetch('/api/projects').then(r => r.json()).then(setProjects);
}, []);

// After: Server component
const projects = await db.projects.findMany();
\`\`\`

> "The best loading state is no loading state. Server components let you eliminate entire categories of UX problems."

## When I Don't Use Next.js

- **Mobile apps** — React Native with Expo is my go-to
- **Simple static sites** — Plain HTML/CSS is often enough
- **Real-time heavy apps** — Sometimes a SPA with WebSocket makes more sense

## The Pragmatic Middle Ground

I don't use every Next.js feature. I skip Middleware for most projects. I avoid over-caching. I keep my route handlers simple. The goal is shipping, not framework mastery.`,
  },
  {
    slug: "building-offline-first-mobile-apps",
    title: "Building Offline-First Mobile Apps with Expo",
    excerpt: "How I handle data persistence, sync conflicts, and connectivity states in React Native applications.",
    date: "FEB 15, 2026",
    category: "Mobile",
    readTime: "10 min read",
    content: `Mobile apps live in unreliable network environments. Here's how I build apps that work regardless of connectivity.

## The Core Pattern

Every data operation goes through a local-first pipeline:
1. Write to local SQLite immediately
2. Queue the operation for sync
3. Background sync when connectivity returns
4. Handle conflicts with last-write-wins or custom resolution

\`\`\`typescript
async function saveTransaction(tx: Transaction) {
  // 1. Save locally first
  await localDB.transactions.insert(tx);
  
  // 2. Queue for sync
  await syncQueue.push({
    type: 'CREATE',
    table: 'transactions',
    data: tx,
    timestamp: Date.now()
  });
  
  // 3. Trigger sync if online
  if (navigator.onLine) {
    syncManager.flush();
  }
}
\`\`\`

> "Users don't care about your server's uptime. They care that the app works when they open it."

## Conflict Resolution

For my finance tracker Koin, I use timestamp-based last-write-wins. It's simple and works for 99% of cases. For the remaining 1%, I show a merge dialog.`,
  },
  {
    slug: "type-safety-across-the-stack",
    title: "Type Safety Across the Full Stack",
    excerpt: "Sharing types between frontend and backend, from API contracts to database schemas — a practical guide.",
    date: "JAN 30, 2026",
    category: "TypeScript",
    readTime: "7 min read",
    content: `Type safety isn't just about catching bugs. It's about confidence. When your types flow from database to API to UI, you can refactor fearlessly.

## The Type Pipeline

\`\`\`
Database Schema → Prisma Types → API Response Types → Frontend Components
\`\`\`

Every layer shares the same type definitions. Change a field name in Prisma, and TypeScript immediately shows you every component that needs updating.

## Practical Example

\`\`\`typescript
// Shared type definition
interface Student {
  id: string;
  name: string;
  enrolledCourses: Course[];
  performance: {
    avgScore: number;
    attendance: number;
  };
}

// API route uses the same type
export async function GET(): Promise<Student[]> {
  return prisma.student.findMany({
    include: { enrolledCourses: true }
  });
}
\`\`\`

> "TypeScript is not overhead. It's insurance. The time you spend writing types is always less than the time you'd spend debugging runtime errors."`,
  },
  {
    slug: "real-time-systems-with-websockets",
    title: "Real-Time Systems with WebSockets in Production",
    excerpt: "Lessons learned building a real-time order management system handling 1000+ daily orders.",
    date: "JAN 12, 2026",
    category: "Infrastructure",
    readTime: "12 min read",
    content: `When orders need to flow from customer to kitchen in under a second, REST APIs aren't enough. Here's how I built real-time order tracking for a cloud kitchen platform.

## Architecture Overview

\`\`\`
Client → Socket.io → Redis Pub/Sub → Kitchen Display
                  ↓
            PostgreSQL (persistence)
\`\`\`

## The Challenge: State Consistency

The hardest part wasn't WebSockets — it was keeping order state consistent across multiple kitchen stations viewing the same queue.

\`\`\`typescript
// Order state machine
const orderStates = {
  PLACED: ['ACCEPTED', 'REJECTED'],
  ACCEPTED: ['PREPARING'],
  PREPARING: ['READY'],
  READY: ['PICKED_UP'],
} as const;

function canTransition(current: OrderState, next: OrderState): boolean {
  return orderStates[current]?.includes(next) ?? false;
}
\`\`\`

> "In real-time systems, the bug isn't usually in the WebSocket layer. It's in the state management."`,
  },
  {
    slug: "lessons-from-building-mentrex",
    title: "Lessons from Building Mentrex from Scratch",
    excerpt: "What I learned building a full LMS for my coding institute — from architecture decisions to user feedback loops.",
    date: "DEC 20, 2025",
    category: "Product",
    readTime: "9 min read",
    content: `Building Mentrex wasn't just a technical project — it was a product journey. I was simultaneously the developer, the product owner, and the first user.

## Lesson 1: Start with the Admin

I built the student-facing app first. Mistake. The admin dashboard should come first because that's where you understand your data model.

## Lesson 2: Don't Abstract Too Early

My first version had a pluggable course engine, configurable grading systems, and a theme editor. Nobody needed any of that. What they needed was a reliable attendance tracker.

\`\`\`typescript
// What I built first (wrong):
class ConfigurableGradingEngine<T extends GradeSchema> { ... }

// What users actually needed (right):
function markAttendance(studentId: string, date: Date): Promise<void>
\`\`\`

> "The best architecture is the one that serves your users, not the one that impresses other engineers."

## Lesson 3: Feedback Loops Matter

I sit in the same room as my users (students). When something breaks, I know within minutes. This tight feedback loop is worth more than any monitoring tool.`,
  },
];

export const categories = [...new Set(articles.map(a => a.category))];

export const getArticleBySlug = (slug: string) => articles.find(a => a.slug === slug);
