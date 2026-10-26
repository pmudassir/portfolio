import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };

// Same paper and ink as the site's receipt (globals.css, .paper).
const walnut = "#100904";
const paper = "#f2eee5";
const ink = "#171513";
const ink3 = "#655e55";
const stamp = "#c2331c";

const TOOTH = 22;
const RECEIPT_W = 820;

// The site's typeface, as static files: the image renderer can't read variable or woff2 fonts.
// Schibsted Grotesk, SIL Open Font License, via Fontsource.
const font = (weight: 400 | 800) => readFile(join(process.cwd(), `src/lib/fonts/schibsted-grotesk-${weight}.woff`));

// Shared OpenGraph card: a thermal receipt on the dark counter, with a label, a big title,
// a supporting line and a footer, and the stamp the site ends on.
export async function ogImage({ label, title, subtitle, footer }: { label: string; title: string; subtitle: string; footer: string }) {
  const [regular, bold] = await Promise.all([font(400), font(800)]);
  const dashed = `3px dashed ${ink}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", background: walnut }}>
        <div
          style={{
            position: "relative",
            marginTop: 56,
            width: RECEIPT_W,
            height: 640,
            display: "flex",
            flexDirection: "column",
            background: paper,
            padding: "52px 56px 0",
            color: ink,
            fontFamily: "Schibsted Grotesk",
          }}
        >
          {/* Torn top edge: a row of walnut diamonds biting into the paper. */}
          <div style={{ position: "absolute", top: -TOOTH / 2, left: 0, display: "flex" }}>
            {Array.from({ length: Math.ceil(RECEIPT_W / TOOTH) }, (_, i) => (
              <div key={i} style={{ width: TOOTH, height: TOOTH, background: walnut, transform: "rotate(45deg) scale(0.72)" }} />
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: ink3, textTransform: "uppercase" }}>
            <span>{label}</span>
            <span>{site.url.replace(/^https?:\/\//, "")}</span>
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: title.length > 40 ? 58 : 78,
              lineHeight: 1,
              fontWeight: 800,
              letterSpacing: -2,
              textTransform: "uppercase",
            }}
          >
            {title}
          </div>
          <div style={{ marginTop: 24, fontSize: 28, lineHeight: 1.4, color: "#3b3732" }}>{subtitle}</div>
          <div
            style={{
              marginTop: 30,
              paddingTop: 16,
              paddingBottom: 16,
              borderTop: dashed,
              borderBottom: dashed,
              display: "flex",
              fontSize: 22,
              fontWeight: 800,
              textTransform: "uppercase",
            }}
          >
            <span>{footer}</span>
          </div>

          {site.availability.open ? (
            <div
              style={{
                position: "absolute",
                right: -110,
                top: 476,
                display: "flex",
                padding: 4,
                border: `3px solid ${stamp}`,
                borderRadius: 10,
                color: stamp,
                transform: "rotate(-9deg)",
                opacity: 0.88,
              }}
            >
              {/* Two nested borders for the stamp's double rule; the renderer has no "double". */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "6px 20px 8px",
                  border: `2px solid ${stamp}`,
                  borderRadius: 6,
                }}
              >
                <span style={{ fontSize: 52, fontWeight: 800, lineHeight: 1, textTransform: "uppercase" }}>Approved</span>
                <span style={{ fontSize: 16, fontWeight: 700, textTransform: "uppercase" }}>Open to remote roles</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Schibsted Grotesk", data: regular, weight: 400, style: "normal" },
        { name: "Schibsted Grotesk", data: bold, weight: 800, style: "normal" },
      ],
    },
  );
}
