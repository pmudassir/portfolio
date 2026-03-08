import type { Metadata } from "next";
import "./globals.css";

const baseUrl = "https://mudassirmhd.in";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Mudassir Mohammed — Full Stack Engineer",
    template: "%s | Mudassir Mohammed",
  },
  description:
    "Lead Frontend Developer & Full Stack Engineer with 3+ years building scalable web and mobile systems. Expert in React, Next.js, TypeScript, Node.js, Vue, and React Native. Available for select projects.",
  keywords: [
    "Mudassir Mohammed",
    "Full Stack Engineer",
    "Lead Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Expert",
    "Node.js Developer",
    "React Native Developer",
    "Vue.js Developer",
    "NestJS Developer",
    "Web Developer India",
    "Software Engineer Portfolio",
    "Frontend Architect",
    "Mobile App Developer",
    "JavaScript Developer",
    "PostgreSQL Developer",
    "MongoDB Developer",
    "Docker",
    "AWS Developer",
    "GraphQL Developer",
    "Hire Frontend Developer",
    "Remote Software Engineer",
    "Full Stack Developer Portfolio",
    "React Next.js TypeScript expert",
  ],
  authors: [{ name: "Mudassir Mohammed", url: baseUrl }],
  creator: "Mudassir Mohammed",
  publisher: "Mudassir Mohammed",
  category: "Technology",
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Mudassir Mohammed",
    title: "Mudassir Mohammed — Full Stack Engineer",
    description:
      "Lead Frontend Developer building scalable web & mobile systems. Product-minded. Architecture-driven. 3+ years of production-grade engineering.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Mudassir Mohammed — Full Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mudassir Mohammed — Full Stack Engineer",
    description:
      "Full Stack Engineer building scalable web & mobile systems. React, Next.js, TypeScript, Node.js.",
    creator: "@mudassirmhd",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${baseUrl}/#person`,
  name: "Mudassir Mohammed",
  url: baseUrl,
  email: "pmudassir@gmail.com",
  jobTitle: "Lead Frontend Developer",
  description:
    "Full Stack Engineer with 3+ years of experience building scalable web and mobile systems. Specializing in React, Next.js, TypeScript, Node.js, Vue, and React Native.",
  image: `${baseUrl}/opengraph-image`,
  sameAs: [
    "https://github.com/pmudassir",
    "https://linkedin.com/in/mudassir-mohammed",
    "https://x.com/mudassirmhd",
  ],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "React Native",
    "Vue.js",
    "NestJS",
    "MongoDB",
    "PostgreSQL",
    "Docker",
    "AWS",
    "GraphQL",
    "Kubernetes",
    "Redis",
    "Socket.io",
    "Three.js",
    "Prisma",
    "Firebase",
    "Tailwind CSS",
    "Full Stack Development",
    "Mobile App Development",
    "System Architecture",
    "Frontend Engineering",
  ],
  worksFor: {
    "@type": "Organization",
    name: "BestDoc Technology",
    url: "https://bestdoc.in",
  },
  knowsLanguage: ["English", "Hindi", "Urdu"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${baseUrl}/#website`,
  name: "Mudassir Mohammed",
  url: baseUrl,
  description:
    "Portfolio and blog of Mudassir Mohammed — Full Stack Engineer specializing in React, Next.js, TypeScript, and Node.js.",
  author: { "@id": `${baseUrl}/#person` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${baseUrl}/journal?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${baseUrl}/about#profilepage`,
  url: `${baseUrl}/about`,
  name: "About Mudassir Mohammed",
  dateCreated: "2024-01-01",
  dateModified: new Date().toISOString(),
  mainEntity: { "@id": `${baseUrl}/#person` },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
