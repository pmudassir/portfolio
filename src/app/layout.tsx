import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://mudassirmhd.in"),
  title: {
    default: "Mudassir Mohammed — Full Stack Engineer",
    template: "%s | Mudassir Mohammed",
  },
  description:
    "Full Stack Engineer building scalable web & mobile systems. Specializing in React, Next.js, TypeScript, Node.js, and React Native.",
  keywords: [
    "Full Stack Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "React Native",
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
      "Full Stack Engineer building scalable web & mobile systems. Product-minded. Architecture-driven.",
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
                "https://github.com/mudassir-mohammed",
                "https://linkedin.com/in/mudassir-mohammed",
                "https://x.com/mudassirmhd",
              ],
              knowsAbout: [
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "React Native",
                "MongoDB",
                "PostgreSQL",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
