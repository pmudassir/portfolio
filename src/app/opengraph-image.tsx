import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mudassir Mohammed — Full Stack Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Top right URL */}
        <div
          style={{
            position: "absolute",
            top: "80px",
            right: "80px",
            color: "#11eeee",
            fontSize: "18px",
            fontWeight: 600,
            letterSpacing: "0.05em",
          }}
        >
          mudassirmhd.in
        </div>

        {/* Accent line */}
        <div
          style={{
            width: "60px",
            height: "4px",
            background: "#11eeee",
            marginBottom: "28px",
            borderRadius: "2px",
          }}
        />

        {/* Role label */}
        <div
          style={{
            color: "#11eeee",
            fontSize: "16px",
            fontWeight: 700,
            letterSpacing: "0.25em",
            marginBottom: "20px",
            textTransform: "uppercase",
          }}
        >
          Full Stack Engineer
        </div>

        {/* Name */}
        <div
          style={{
            color: "#ffffff",
            fontSize: "72px",
            fontWeight: 800,
            lineHeight: 1.05,
            marginBottom: "28px",
          }}
        >
          Mudassir Mohammed
        </div>

        {/* Tagline */}
        <div
          style={{
            color: "#888888",
            fontSize: "22px",
            lineHeight: 1.5,
          }}
        >
          Building scalable web & mobile systems.
        </div>

        {/* Stack pills */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "36px",
          }}
        >
          {["React", "Next.js", "TypeScript", "Node.js", "React Native"].map(
            (tech) => (
              <div
                key={tech}
                style={{
                  padding: "6px 16px",
                  background: "rgba(17, 238, 238, 0.08)",
                  border: "1px solid rgba(17, 238, 238, 0.2)",
                  borderRadius: "6px",
                  color: "#11eeee",
                  fontSize: "14px",
                  fontWeight: 600,
                  fontFamily: "monospace",
                }}
              >
                {tech}
              </div>
            )
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
