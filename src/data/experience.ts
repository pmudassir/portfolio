export interface ExperienceEntry {
  period: string;
  title: string;
  company: string;
  description: string[];
  current?: boolean;
}

export const experience: ExperienceEntry[] = [
  {
    period: "2024 — Present",
    title: "Full Stack Engineer & Founder",
    company: "Mentrex",
    current: true,
    description: [
      "Building and running a coding institute with a custom-built LMS serving 500+ students.",
      "Architected the entire platform from scratch — student management, course delivery, attendance tracking, and performance analytics.",
      "Mentoring aspiring developers on production-grade engineering practices and system design thinking.",
    ],
  },
  {
    period: "2023 — Present",
    title: "Freelance Full Stack Engineer",
    company: "Independent",
    current: true,
    description: [
      "Delivering production-ready web and mobile applications for startups and growing businesses.",
      "Built real-time order management systems for cloud kitchens handling 1000+ daily orders.",
      "Developed cross-platform mobile apps with React Native (Expo) for fintech and healthcare clients.",
    ],
  },
  {
    period: "2022 — 2024",
    title: "Frontend Engineer",
    company: "Product Studio",
    description: [
      "Led frontend architecture for multiple client-facing SaaS products using React, Next.js, and Vue.js.",
      "Reduced core web vitals load time by 40% through code splitting, lazy loading, and image optimization.",
      "Established component library and design system standards adopted across 4 product teams.",
    ],
  },
];

export const currentlyBuilding = [
  {
    status: "IN PROGRESS",
    title: "Koin",
    description: "Personal finance tracker with SMS auto-parsing",
  },
  {
    status: "BETA",
    title: "Mentrex v2",
    description: "LMS platform rebuild with advanced analytics",
  },
  {
    status: "PLANNING",
    title: "DevBoard",
    description: "Developer productivity dashboard",
  },
];
