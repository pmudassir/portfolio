import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };

const paper = "#fbfaf7";
const ink = "#1b1a17";
const ink2 = "#4a4843";
const ink3 = "#6b6860";
const rule = "#e5e2da";
const accent = "#b4410f";

// Shared OpenGraph card: a label, a big title, a supporting line and a footer.
export function ogImage({ label, title, subtitle, footer }: { label: string; title: string; subtitle: string; footer: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: paper,
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, color: ink3, fontSize: 24, letterSpacing: 1 }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: accent }} />
          {label}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: title.length > 48 ? 60 : 76, lineHeight: 1.08, color: ink, fontWeight: 600, letterSpacing: -1.5 }}>
            {title}
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.4, color: ink2, maxWidth: 980 }}>{subtitle}</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: `2px solid ${rule}`,
            paddingTop: 24,
            fontSize: 24,
            color: ink3,
          }}
        >
          <span>{footer}</span>
          <span>{site.url.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
