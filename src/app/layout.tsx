import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mudassirmhd.in"),
  title: {
    default: "Mudassir Mohammed — Full Stack Engineer",
    template: "%s | Mudassir Mohammed",
  },
  description:
    "Lead Frontend Developer building scalable web & mobile systems. Specializing in React, Next.js, TypeScript, Node.js, Vue, and React Native.",
  keywords: [
    "Lead Frontend Developer",
    "Full Stack Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "React Native",
    "Vue.js",
    "Portfolio",
    "Mudassir Mohammed",
  ],
  authors: [{ name: "Mudassir Mohammed" }],
  creator: "Mudassir Mohammed",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mudassirmhd.in",
    siteName: "Mudassir Mohammed",
    title: "Mudassir Mohammed — Full Stack Engineer",
    description:
      "Lead Frontend Developer building scalable web & mobile systems. Product-minded. Architecture-driven.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mudassir Mohammed — Full Stack Engineer",
    description:
      "Full Stack Engineer building scalable web & mobile systems.",
    creator: "@mudassirmhd",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mudassir Mohammed",
              url: "https://mudassirmhd.in",
              jobTitle: "Full Stack Engineer",
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
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
