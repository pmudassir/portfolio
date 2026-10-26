import { koin } from "./koin";
import { mentrex } from "./mentrex";
import { nexusSaas } from "./nexus-saas";
import { opspilot } from "./opspilot";
import type { Project } from "./types";

export type { Project, ProjectMeta } from "./types";

// Order is deliberate: strongest evidence first.
export const projects: Project[] = [opspilot, mentrex, koin, nexusSaas];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

// Smaller builds that don't warrant a case study.
export const otherBuilds = [
  {
    name: "VoiceInk",
    description:
      "A macOS menu-bar dictation app. Press a global hotkey, speak, and the transcribed text is pasted into whichever app has focus. Rust core on Tauri v2 (audio capture, hotkey, paste), Deepgram or Whisper for transcription, and an optional Groq pass to tidy the text.",
    stack: ["Rust", "Tauri v2", "React", "TypeScript"],
    note: "Private repository",
  },
  {
    name: "This site",
    description:
      "A thermal receipt printed for each visitor. Static Next.js pages with content in typed TypeScript files and no CMS; the print effects are CSS and SVG filters, the barcode is a hand-written Code 128 encoder, and the paper feeds out of a printer as you scroll.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    href: "https://github.com/pmudassir/portfolio",
  },
] as const;
