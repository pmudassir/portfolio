export interface ExperienceEntry {
  period: string;
  title: string;
  company: string;
  description: string[];
  current?: boolean;
}

export const experience: ExperienceEntry[] = [
  {
    period: "Nov 2024 — Present",
    title: "Lead Frontend Developer",
    company: "BestDoc Technology",
    current: true,
    description: [
      "Led the frontend development of BestDoc Concierge using Vue, Nuxt, and Vuetify, streamlining request workflows for hospital staff to manage food, diet, and porter services — boosting operational efficiency by 35%.",
      "Redesigned the request dashboard with real-time updates, filters, and role-based views, reducing service response times by 40% and improving staff coordination across departments.",
      "Built modular, reusable UI components aligned with Vuetify's design system, accelerating feature delivery by 50% and ensuring consistent user experience across multiple hospital deployments.",
    ],
  },
  {
    period: "Sep 2023 — Mar 2024",
    title: "React Native Developer",
    company: "App Stone",
    description: [
      "Engineered a cross-platform mobile app using React Native, ensuring a flawless UI/UX by adhering to Figma designs — achieved 98% user satisfaction and reduced development time by 25% across iOS and Android.",
      "Boosted user interaction by rolling out premium bar discovery, filtered event listings, and personalized bar details — achieved a 30% rise in event attendance and a 20% increase in app sessions within 3 months.",
      "Implemented personalized user profiles to streamline the booking process, leading to a 20% reduction in drop-off rates.",
    ],
  },
  {
    period: "Oct 2022 — Sep 2023",
    title: "Full Stack Developer",
    company: "Eclidse Technologies",
    description: [
      "Developed innovative web applications using the MERN stack, achieving a 40% improvement in user engagement and a 20% decrease in page load times.",
      "Engaged in daily team discussions to troubleshoot complex coding issues and brainstorm innovative solutions, leading to a 20% decrease in bug resolution time.",
      "Developed detailed technical documentation for all projects, including code, technical specifications, and user guides, resulting in a 20% decrease in onboarding time for new team members.",
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
