import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/data";
import type { LandingPage } from "@/lib/supabase";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  const lp = project.landing_page;
  const url = `https://${slug}.mudassirmhd.in`;

  return {
    title: lp?.tagline ?? project.title,
    description: lp?.hero_description ?? project.description,
    alternates: { canonical: url },
    openGraph: {
      title: project.title,
      description: lp?.hero_description ?? project.description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: lp?.hero_description ?? project.description,
      creator: "@mudassirmhd",
    },
  };
}

// Mood → background palette
const MOOD_COLORS: Record<
  string,
  { bg: string; surface: string; surfaceHover: string; border: string }
> = {
  minimal:    { bg: "#0a0a0a", surface: "#141414", surfaceHover: "#1a1a1a", border: "rgba(255,255,255,0.06)" },
  bold:       { bg: "#000000", surface: "#0c0c0c", surfaceHover: "#141414", border: "rgba(255,255,255,0.08)" },
  technical:  { bg: "#0d1117", surface: "#161b22", surfaceHover: "#1c2128", border: "rgba(48,54,61,0.9)" },
  playful:    { bg: "#0f0f1a", surface: "#1a1a2e", surfaceHover: "#1f1f38", border: "rgba(255,255,255,0.08)" },
  enterprise: { bg: "#0f172a", surface: "#1e293b", surfaceHover: "#243447", border: "rgba(51,65,85,0.6)" },
  dark:       { bg: "#030303", surface: "#0c0c0c", surfaceHover: "#111111", border: "rgba(255,255,255,0.05)" },
  vibrant:    { bg: "#09090b", surface: "#18181b", surfaceHover: "#1f1f23", border: "rgba(255,255,255,0.07)" },
};

// Font style → CSS font-family stack
const FONT_STACKS: Record<string, string> = {
  geometric:    "'Futura', 'Century Gothic', 'Trebuchet MS', sans-serif",
  humanist:     "'Gill Sans', 'Optima', 'Segoe UI', sans-serif",
  monospace:    "'SF Mono', 'Cascadia Code', 'Consolas', 'Courier New', monospace",
  serif:        "'Georgia', 'Cambria', 'Times New Roman', serif",
  "modern-sans": "'Inter', 'system-ui', '-apple-system', sans-serif",
};

function hex(color: string, opacity: number): string {
  // Returns rgba-style string from a hex color + 0-1 opacity
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${opacity})`;
}

export default async function ProjectLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  // If no landing page data yet, send to the portfolio case study
  if (!project.landing_page) {
    redirect(`https://mudassirmhd.in/projects/${slug}`);
  }

  const lp = project.landing_page as LandingPage;
  const { theme, tagline, hero_description, features, problem_statement, solution_statement, target_audience } = lp;
  const { primary_color, mood, font_style } = theme;

  const colors = MOOD_COLORS[mood] ?? MOOD_COLORS.dark;
  const font = FONT_STACKS[font_style] ?? FONT_STACKS["modern-sans"];

  const impactMetrics = project.impact_metrics as { metric: string; label: string }[];

  const p = primary_color; // shorthand

  const cssVars = {
    "--lp-primary": p,
    "--lp-bg": colors.bg,
    "--lp-surface": colors.surface,
    "--lp-border": colors.border,
    background: colors.bg,
    color: "#f1f5f9",
    fontFamily: font,
    minHeight: "100vh",
  } as React.CSSProperties;

  return (
    <div style={cssVars}>

      {/* ───────────── NAVIGATION ───────────── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: `${colors.bg}e0`,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <span style={{ color: p, fontWeight: 700, fontSize: "18px", letterSpacing: "-0.01em" }}>
            {project.title}
          </span>

          {/* Anchor links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "32px",
              fontSize: "14px",
              color: "#64748b",
            }}
            className="hidden md:flex"
          >
            {features.length > 0 && <a href="#features" style={{ textDecoration: "none", color: "inherit" }}>Features</a>}
            <a href="#stack" style={{ textDecoration: "none", color: "inherit" }}>Stack</a>
            {impactMetrics.length > 0 && <a href="#impact" style={{ textDecoration: "none", color: "inherit" }}>Impact</a>}
            <a
              href="https://mudassirmhd.in"
              style={{ textDecoration: "none", color: "#475569", fontSize: "13px" }}
            >
              by Mudassir ↗
            </a>
          </div>

          {/* CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: p,
                  color: "#000",
                  padding: "8px 18px",
                  borderRadius: "8px",
                  fontWeight: 700,
                  fontSize: "13px",
                  textDecoration: "none",
                }}
              >
                Live Site ↗
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* ───────────── HERO ───────────── */}
      <section
        style={{
          position: "relative",
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Background radial glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${hex(p, 0.07)} 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
        {/* Subtle dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(circle, ${hex(p, 0.06)} 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px", position: "relative", zIndex: 1 }}>
          {/* Role badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "999px",
              border: `1px solid ${hex(p, 0.25)}`,
              background: hex(p, 0.07),
              color: p,
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
              marginBottom: "36px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: p,
                display: "inline-block",
              }}
            />
            {project.role} · {project.timeline}
          </div>

          {/* Tagline */}
          <h1
            style={{
              fontSize: "clamp(40px, 8vw, 96px)",
              fontWeight: 800,
              lineHeight: 1.03,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              maxWidth: "900px",
              marginBottom: "28px",
            }}
          >
            {tagline}
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: "20px",
              color: "#94a3b8",
              maxWidth: "600px",
              lineHeight: 1.65,
              marginBottom: "48px",
            }}
          >
            {hero_description}
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "16px" }}>
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: p,
                  color: "#000",
                  padding: "16px 32px",
                  borderRadius: "12px",
                  fontWeight: 700,
                  fontSize: "15px",
                  textDecoration: "none",
                  letterSpacing: "-0.01em",
                }}
              >
                View Live Product ↗
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  border: `1px solid ${colors.border}`,
                  color: "#94a3b8",
                  padding: "16px 32px",
                  borderRadius: "12px",
                  fontWeight: 600,
                  fontSize: "15px",
                  textDecoration: "none",
                }}
              >
                GitHub ↗
              </a>
            )}
            <a
              href={`https://mudassirmhd.in/projects/${slug}`}
              style={{
                border: `1px solid ${colors.border}`,
                color: "#64748b",
                padding: "16px 32px",
                borderRadius: "12px",
                fontWeight: 600,
                fontSize: "15px",
                textDecoration: "none",
              }}
            >
              Case Study →
            </a>
          </div>

          {/* Target audience tag */}
          {target_audience && (
            <p
              style={{
                marginTop: "48px",
                fontSize: "13px",
                color: "#475569",
                fontStyle: "italic",
              }}
            >
              Built for: {target_audience}
            </p>
          )}
        </div>
      </section>

      {/* ───────────── PROBLEM / SOLUTION ───────────── */}
      <section
        style={{
          borderTop: `1px solid ${colors.border}`,
          padding: "96px 0",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <p
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
              color: "#475569",
              marginBottom: "48px",
            }}
          >
            The Why
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {/* Problem */}
            <div
              style={{
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: "20px",
                padding: "40px",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase" as const,
                  color: "#64748b",
                  marginBottom: "20px",
                }}
              >
                The Problem
              </div>
              <p style={{ fontSize: "17px", color: "#cbd5e1", lineHeight: 1.7 }}>
                {problem_statement}
              </p>
            </div>

            {/* Solution */}
            <div
              style={{
                background: hex(p, 0.05),
                border: `1px solid ${hex(p, 0.18)}`,
                borderRadius: "20px",
                padding: "40px",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase" as const,
                  color: p,
                  marginBottom: "20px",
                }}
              >
                The Solution
              </div>
              <p style={{ fontSize: "17px", color: "#cbd5e1", lineHeight: 1.7 }}>
                {solution_statement}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── FEATURES ───────────── */}
      {features.length > 0 && (
        <section
          id="features"
          style={{
            borderTop: `1px solid ${colors.border}`,
            padding: "96px 0",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
            <div style={{ marginBottom: "64px" }}>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase" as const,
                  color: p,
                  marginBottom: "16px",
                }}
              >
                What it does
              </p>
              <h2
                style={{
                  fontSize: "clamp(32px, 5vw, 52px)",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.1,
                }}
              >
                Key Features
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "20px",
              }}
            >
              {features.map((feature, i) => (
                <div
                  key={i}
                  style={{
                    background: colors.surface,
                    border: `1px solid ${colors.border}`,
                    borderRadius: "16px",
                    padding: "28px",
                    transition: "border-color 0.2s",
                  }}
                >
                  <div style={{ fontSize: "32px", marginBottom: "16px" }}>
                    {feature.icon}
                  </div>
                  <h3
                    style={{
                      fontWeight: 700,
                      color: "#f1f5f9",
                      fontSize: "17px",
                      marginBottom: "10px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    style={{
                      color: "#64748b",
                      fontSize: "14px",
                      lineHeight: 1.65,
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───────────── TECH STACK ───────────── */}
      <section
        id="stack"
        style={{
          borderTop: `1px solid ${colors.border}`,
          padding: "96px 0",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <p
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
              color: p,
              marginBottom: "16px",
            }}
          >
            Technology
          </p>
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.025em",
              marginBottom: "48px",
              lineHeight: 1.1,
            }}
          >
            Built with
          </h2>

          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "12px" }}>
            {project.stack.map((tech) => (
              <span
                key={tech}
                style={{
                  background: colors.surface,
                  border: `1px solid ${colors.border}`,
                  color: "#94a3b8",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  fontFamily: "'SF Mono', 'Consolas', monospace",
                  fontSize: "13px",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── IMPACT METRICS ───────────── */}
      {impactMetrics.length > 0 && (
        <section
          id="impact"
          style={{
            borderTop: `1px solid ${colors.border}`,
            padding: "96px 0",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                color: p,
                marginBottom: "16px",
              }}
            >
              Results
            </p>
            <h2
              style={{
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "-0.025em",
                marginBottom: "64px",
                lineHeight: 1.1,
              }}
            >
              Impact
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${Math.min(impactMetrics.length, 4)}, 1fr)`,
                gap: "20px",
              }}
            >
              {impactMetrics.map((item) => (
                <div
                  key={item.label}
                  style={{
                    background: colors.surface,
                    border: `1px solid ${colors.border}`,
                    borderRadius: "20px",
                    padding: "40px 24px",
                    textAlign: "center" as const,
                  }}
                >
                  <div
                    style={{
                      fontSize: "clamp(36px, 5vw, 56px)",
                      fontWeight: 800,
                      color: p,
                      letterSpacing: "-0.03em",
                      marginBottom: "10px",
                      lineHeight: 1,
                    }}
                  >
                    {item.metric}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase" as const,
                      color: "#475569",
                    }}
                  >
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───────────── FOOTER CTA ───────────── */}
      <section
        style={{
          borderTop: `1px solid ${colors.border}`,
          padding: "96px 0",
          textAlign: "center" as const,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse 60% 80% at 50% 100%, ${hex(p, 0.06)} 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.025em",
              marginBottom: "20px",
              lineHeight: 1.1,
            }}
          >
            Interested in working together?
          </h2>
          <p style={{ fontSize: "17px", color: "#64748b", marginBottom: "40px", lineHeight: 1.6 }}>
            This is one of many projects by Mudassir Mohammed. See the full portfolio or get in touch.
          </p>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" as const, gap: "16px" }}>
            <a
              href="https://mudassirmhd.in"
              style={{
                background: p,
                color: "#000",
                padding: "14px 28px",
                borderRadius: "10px",
                fontWeight: 700,
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              View Portfolio ↗
            </a>
            <a
              href="https://mudassirmhd.in/contact"
              style={{
                border: `1px solid ${colors.border}`,
                color: "#94a3b8",
                padding: "14px 28px",
                borderRadius: "10px",
                fontWeight: 600,
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              Get in Touch →
            </a>
          </div>
        </div>
      </section>

      {/* ───────────── FOOTER ───────────── */}
      <footer
        style={{
          borderTop: `1px solid ${colors.border}`,
          padding: "28px 0",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            flexWrap: "wrap" as const,
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <p style={{ fontSize: "13px", color: "#334155" }}>
            Built by{" "}
            <a
              href="https://mudassirmhd.in"
              style={{ color: p, textDecoration: "none", fontWeight: 600 }}
            >
              Mudassir Mohammed
            </a>{" "}
            · Full Stack Engineer
          </p>
          <div style={{ display: "flex", gap: "24px", fontSize: "13px", color: "#334155" }}>
            <a href="https://mudassirmhd.in/projects" style={{ textDecoration: "none", color: "inherit" }}>
              All Projects
            </a>
            <a href={`https://mudassirmhd.in/projects/${slug}`} style={{ textDecoration: "none", color: "inherit" }}>
              Case Study
            </a>
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
                GitHub ↗
              </a>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
