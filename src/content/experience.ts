// Professional experience. Source of truth: the latest résumé.
// No metrics here unless they can be backed up.

export type Role = {
  company: string;
  companyUrl?: string;
  title: string;
  start: string; // ISO yyyy-mm
  end?: string; // ISO yyyy-mm, undefined = present
  period: string; // human-readable
  summary: string; // one line, used on the home page
  context: string; // what the product/company is
  built: string[]; // what I owned and shipped
  stack: string[];
};

export const roles: Role[] = [
  {
    company: "BestDoc Technology",
    companyUrl: "https://www.bestdoc.in",
    title: "Lead Software Engineer",
    start: "2024-11",
    period: "Nov 2024 – Present",
    summary:
      "Leading full-stack development of hospital workflow products: service requests, approvals, homecare, notifications and access control.",
    context:
      "BestDoc builds healthcare workflow software for hospital operations. I lead full-stack development across the Vue/Nuxt front end, Node.js services and the integrations between them.",
    built: [
      "Built the Homecare module end to end: patient workflows, service requests, approvals, operational dashboards and workflow automation.",
      "Architected and streamlined the notification infrastructure for admins, hospital staff and end users, with the focus on reliable delivery.",
      "Designed and implemented the security-sensitive parts of request workflows: OTP verification, request completion flows, approval pipelines and role-based access control.",
      "Led front-end work on BestDoc Concierge, where hospital staff manage food, diet and porter requests, including a request dashboard with live updates, filters and role-based views.",
      "Built a shared component layer on Vuetify so features ship consistently across hospital deployments.",
    ],
    stack: ["Vue.js", "Nuxt", "Vuetify", "Node.js", "REST APIs"],
  },
  {
    company: "App Stone",
    title: "React Native Developer",
    start: "2023-09",
    end: "2024-11",
    period: "Sep 2023 – Nov 2024",
    summary:
      "Shipped a cross-platform iOS and Android app in React Native: venue discovery, event listings, profiles and booking flows.",
    context:
      "A consumer app for discovering venues and events, built for both iOS and Android from production Figma designs.",
    built: [
      "Built discovery features: personalised listings, venue discovery and filtered event listings.",
      "Implemented user profile management and reworked the booking journey to remove friction from conversion-critical screens.",
      "Integrated the REST APIs and worked on app performance and responsiveness.",
    ],
    stack: ["React Native", "iOS", "Android", "REST APIs"],
  },
  {
    company: "Eclidse Technologies",
    title: "Full Stack Developer",
    start: "2022-10",
    end: "2023-09",
    period: "Oct 2022 – Sep 2023",
    summary:
      "Built MERN applications for client projects: front ends, REST APIs and database-backed workflows.",
    context: "A software services company delivering web applications for multiple clients.",
    built: [
      "Built front-end interfaces, backend APIs and MongoDB-backed workflows across several client projects.",
      "Took part in architecture discussions and wrote technical documentation that the team used for onboarding.",
    ],
    stack: ["MongoDB", "Express", "React", "Node.js", "JavaScript"],
  },
];

export const education = {
  school: "University of Calicut",
  degree: "Bachelor of Arts in English",
  period: "2020 – 2023",
};
