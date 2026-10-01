import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/content/site";
import "./globals.css";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-sans",
  display: "swap",
});

// Only used for small labels and code, so it isn't preloaded.
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-plex-mono",
  display: "swap",
  preload: false,
});

const serif = Newsreader({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-newsreader",
  display: "swap",
});

const title = `${site.name} · ${site.headline}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    site.name,
    "Software Engineer",
    "Full Stack Engineer",
    "Lead Software Engineer",
    "Backend Engineer",
    "Product Engineer",
    "LLM applications",
    "TypeScript",
    "React",
    "Next.js",
    "Vue",
    "Nuxt",
    "Node.js",
    "Python",
    "FastAPI",
    "PostgreSQL",
    "Remote",
    "Kerala",
    "India",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title, description: site.description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#121210" },
  ],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: site.currently.title,
  description: site.description,
  worksFor: {
    "@type": "Organization",
    name: site.currently.company,
    url: site.currently.companyUrl,
  },
  address: {
    "@type": "PostalAddress",
    addressRegion: site.location.city,
    addressCountry: site.location.countryCode,
  },
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of Calicut" },
  sameAs: [site.links.github, site.links.linkedin],
  knowsAbout: [
    "Full-stack web development",
    "Multi-tenant SaaS architecture",
    "Workflow and approval systems",
    "Role-based access control",
    "PostgreSQL",
    "TypeScript",
    "React",
    "Next.js",
    "Vue.js",
    "Nuxt",
    "Node.js",
    "Python",
    "FastAPI",
    "React Native",
    "LLM tool calling",
    "LLM evaluation",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  name: site.name,
  url: site.url,
  inLanguage: "en",
  publisher: { "@id": `${site.url}/#person` },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <JsonLd data={[personSchema, websiteSchema]} />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
