export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  problem: string;
  description: string;
  stack: string[];
  role: string;
  timeline: string;
  focus: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  challenge: string;
  architecturalDecisions: {
    title: string;
    description: string;
    icon: string;
  }[];
  codeSnippet?: {
    filename: string;
    language: string;
    code: string;
  };
  impact: {
    metric: string;
    label: string;
  }[];
}

export const projects: Project[] = [
  {
    slug: "mentrex-lms",
    title: "Mentrex — Learning Management System",
    subtitle: "End-to-end LMS powering a coding institute with real-time dashboards, student tracking, and course management.",
    problem: "Needed a scalable LMS to manage students, courses, attendance, and performance analytics for a growing coding institute.",
    description: "Full-stack learning management platform built from scratch for Mentrex coding institute. Features include student enrollment, course management, attendance tracking, performance dashboards, and admin controls.",
    stack: ["Next.js", "TypeScript", "MongoDB", "Node.js", "Express", "Tailwind CSS"],
    role: "Founder & Lead Engineer",
    timeline: "Ongoing",
    focus: "Full-Stack Architecture",
    image: "/images/mentrex.jpg",
    liveUrl: "https://mentrex.in",
    featured: true,
    challenge: "Building a comprehensive LMS from the ground up that handles student lifecycle management, real-time attendance tracking, course content delivery, and performance analytics — all while maintaining a clean, intuitive interface for both administrators and students.",
    architecturalDecisions: [
      {
        title: "Role-Based Access Control",
        description: "Implemented granular RBAC with admin, instructor, and student roles — each with scoped permissions across the entire platform.",
        icon: "shield",
      },
      {
        title: "Real-Time Dashboards",
        description: "Server-side rendered dashboards with incremental data fetching for instant insights on student performance and attendance trends.",
        icon: "analytics",
      },
      {
        title: "Modular Course Engine",
        description: "Designed a flexible course creation system supporting multiple content types, scheduling, and progress tracking per student.",
        icon: "school",
      },
      {
        title: "Scalable Data Layer",
        description: "MongoDB with indexed queries and aggregation pipelines for fast analytics across thousands of student records.",
        icon: "storage",
      },
    ],
    codeSnippet: {
      filename: "api/students/performance.ts",
      language: "typescript",
      code: `export async function getStudentPerformance(studentId: string) {
  const pipeline = [
    { $match: { studentId: new ObjectId(studentId) } },
    { $lookup: {
        from: "courses",
        localField: "courseId",
        foreignField: "_id",
        as: "course"
    }},
    { $unwind: "$course" },
    { $group: {
        _id: "$studentId",
        avgScore: { $avg: "$score" },
        totalAssignments: { $sum: 1 },
        completedCourses: { $sum: { $cond: ["$completed", 1, 0] } }
    }}
  ];
  return StudentProgress.aggregate(pipeline);
}`,
    },
    impact: [
      { metric: "500+", label: "Students Managed" },
      { metric: "98%", label: "Uptime" },
      { metric: "50+", label: "Courses Delivered" },
    ],
  },
  {
    slug: "koin-finance",
    title: "Koin — Personal Finance Tracker",
    subtitle: "Mobile-first expense tracking app with SMS auto-parsing, budget analytics, and intelligent categorization.",
    problem: "People struggle to track daily expenses manually. Needed an automated solution that reads transaction SMSes and categorizes spending.",
    description: "A React Native (Expo) finance tracking app that auto-reads bank transaction SMSes, categorizes expenses using pattern matching, and provides visual spending analytics with budget tracking.",
    stack: ["React Native", "Expo", "TypeScript", "Node.js", "MongoDB"],
    role: "Solo Developer",
    timeline: "3 Months",
    focus: "Mobile Architecture",
    image: "/images/koin.jpg",
    githubUrl: "https://github.com/mudassir",
    featured: true,
    challenge: "Parsing diverse SMS formats from multiple banks, implementing reliable pattern matching for transaction categorization, and building a performant mobile UI that handles thousands of transactions without lag.",
    architecturalDecisions: [
      {
        title: "SMS Parsing Engine",
        description: "Built a regex-based parsing engine that handles 20+ bank SMS formats, extracting amount, merchant, and transaction type automatically.",
        icon: "sms",
      },
      {
        title: "Offline-First Design",
        description: "Local SQLite storage with background sync ensures the app works seamlessly without network connectivity.",
        icon: "cloud_off",
      },
      {
        title: "Smart Categorization",
        description: "Pattern-matching algorithm that learns from user corrections and auto-categorizes recurring transactions.",
        icon: "category",
      },
      {
        title: "Performance Optimized",
        description: "Virtualized lists with lazy loading and memoized chart components for buttery-smooth scrolling through thousands of entries.",
        icon: "speed",
      },
    ],
    impact: [
      { metric: "10K+", label: "Transactions Tracked" },
      { metric: "20+", label: "Bank Formats Parsed" },
      { metric: "<2s", label: "App Load Time" },
    ],
  },
  {
    slug: "portfolio-v3",
    title: "Portfolio v3 — This Website",
    subtitle: "Premium dark-themed portfolio built with Next.js, showcasing architecture-level thinking through case studies.",
    problem: "Needed a portfolio that goes beyond listing projects — one that demonstrates system design thinking and engineering depth.",
    description: "The very site you are browsing. A dark-first, performance-optimized portfolio with case study deep-dives, a technical journal, and a CMS-ready architecture.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    role: "Designer & Developer",
    timeline: "2 Weeks",
    focus: "Frontend Excellence",
    image: "/images/portfolio.jpg",
    liveUrl: "https://mudassirmhd.in",
    githubUrl: "https://github.com/mudassir/portfolio",
    featured: true,
    challenge: "Designing a portfolio that positions me as a senior-level engineer without the typical generic template feel. Every section needed to communicate technical depth and product thinking.",
    architecturalDecisions: [
      {
        title: "Static Generation",
        description: "All pages are statically generated at build time for sub-100ms load times and perfect Lighthouse scores.",
        icon: "bolt",
      },
      {
        title: "Design System",
        description: "Custom Tailwind theme tokens extracted from Stitch UI designs, ensuring pixel-perfect consistency across all pages.",
        icon: "palette",
      },
      {
        title: "SEO Architecture",
        description: "Dynamic metadata, OpenGraph images, JSON-LD structured data, and semantic HTML for maximum discoverability.",
        icon: "search",
      },
      {
        title: "Component-Driven",
        description: "Reusable, composable components with TypeScript interfaces for type safety across the entire UI layer.",
        icon: "widgets",
      },
    ],
    impact: [
      { metric: "100", label: "Lighthouse Score" },
      { metric: "<1s", label: "First Paint" },
      { metric: "A+", label: "SEO Grade" },
    ],
  },
  {
    slug: "cloud-kitchen-platform",
    title: "Cloud Kitchen — Order Management",
    subtitle: "Real-time order management system for cloud kitchens with multi-vendor support and live tracking.",
    problem: "Cloud kitchens needed a unified order management system handling multiple vendors, real-time order tracking, and kitchen display integration.",
    description: "Enterprise-grade order management platform for cloud kitchens. Features multi-vendor support, real-time order lifecycle management, kitchen display system integration, and analytics dashboards.",
    stack: ["Vue.js", "Nuxt", "Node.js", "PostgreSQL", "Redis", "Socket.io"],
    role: "Lead Frontend Engineer",
    timeline: "6 Months",
    focus: "Real-Time Systems",
    image: "/images/cloud-kitchen.jpg",
    featured: true,
    challenge: "Managing real-time order state across multiple kitchen stations, handling concurrent order modifications, and building a responsive kitchen display system that works reliably under high-volume conditions.",
    architecturalDecisions: [
      {
        title: "Event-Driven Orders",
        description: "WebSocket-based real-time order updates with optimistic UI patterns for instant feedback across all connected stations.",
        icon: "sync",
      },
      {
        title: "State Machine",
        description: "Finite state machine for order lifecycle management, preventing invalid state transitions and ensuring data consistency.",
        icon: "account_tree",
      },
      {
        title: "Multi-Vendor Auth",
        description: "Scoped authentication with vendor-specific views, ensuring data isolation while maintaining a unified admin experience.",
        icon: "storefront",
      },
      {
        title: "Queue Management",
        description: "Redis-backed queue with priority ordering for kitchen display, ensuring orders are processed in the correct sequence.",
        icon: "queue",
      },
    ],
    impact: [
      { metric: "1000+", label: "Daily Orders" },
      { metric: "99.5%", label: "Uptime" },
      { metric: "3x", label: "Faster Processing" },
    ],
  },
  {
    slug: "transcription-app",
    title: "Voice Notes — AI Transcription",
    subtitle: "Desktop transcription app with AI-powered speech-to-text, hotkey recording, and real-time processing.",
    problem: "Needed a fast, private, desktop-native transcription tool that works offline with low latency for quick voice notes.",
    description: "A Tauri-based desktop application for real-time voice transcription using Deepgram API. Features global hotkey recording, clipboard integration, and multi-language support.",
    stack: ["Tauri", "React", "TypeScript", "Rust", "Deepgram API"],
    role: "Solo Developer",
    timeline: "1 Month",
    focus: "Desktop Engineering",
    image: "/images/transcription.jpg",
    featured: false,
    challenge: "Building a native desktop app with web technologies that feels truly native — handling system-level audio capture, global hotkeys, and real-time streaming transcription with minimal latency.",
    architecturalDecisions: [
      {
        title: "Rust Backend",
        description: "Tauri + Rust for native performance, small binary size, and direct access to system audio APIs.",
        icon: "memory",
      },
      {
        title: "Streaming Pipeline",
        description: "Real-time audio streaming to Deepgram with chunked processing for instant transcription feedback.",
        icon: "stream",
      },
      {
        title: "Global Hotkeys",
        description: "System-wide keyboard shortcuts for start/stop recording without switching window focus.",
        icon: "keyboard",
      },
      {
        title: "Clipboard Integration",
        description: "One-click copy of transcribed text directly to system clipboard for seamless workflow integration.",
        icon: "content_paste",
      },
    ],
    impact: [
      { metric: "<500ms", label: "Transcription Latency" },
      { metric: "15MB", label: "App Size" },
      { metric: "12+", label: "Languages Supported" },
    ],
  },
];

export const featuredProjects = projects.filter(p => p.featured);
export const getProjectBySlug = (slug: string) => projects.find(p => p.slug === slug);
