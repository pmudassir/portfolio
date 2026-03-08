-- ============================================================
-- Seed: MacSweep project
-- Run in Supabase dashboard → SQL Editor
-- ============================================================

DELETE FROM projects WHERE slug = 'macsweep';

INSERT INTO projects (
  id, slug, title, subtitle, description, role, timeline, stack,
  challenge, architectural_decisions, code_snippet, code_language,
  impact_metrics, live_url, github_url, featured, status, landing_page,
  created_at, updated_at
) VALUES (
  gen_random_uuid(),
  'macsweep',
  'MacSweep',
  'A smart macOS disk cleaner that safely reclaims storage — especially for developers.',
  $$MacSweep is a native macOS utility that helps users identify and remove unnecessary files consuming disk space, from system caches and browser data to deep developer artifacts like node_modules, Xcode DerivedData, and Docker volumes. It solves the recurring frustration of opaque storage usage on macOS by giving developers and power users a fast, categorized view of what's safe to delete. The core value is its safety-first approach: every file is validated against protected path lists and assessed for impact before any deletion occurs.$$,
  'Solo Developer',
  '2024',
  ARRAY['Swift','SwiftUI','AppKit','Foundation','macOS 14+','MVVM','async/await','XcodeGen'],
  $$The central engineering challenge was building a file system scanner that is both fast and safe. The naive approach — recursively walking the entire file system — would either take minutes to complete or delete something critical. MacSweep solves this with bounded recursion (capped at 4 levels deep for developer artifact searches), async/await parallelism for concurrent category scans, and a multi-tier safety validator that maintains whitelists of 26+ protected system and home paths before any file is touched.

A second hard problem was impact scoring: not all files are equal. Deleting Xcode DerivedData means a long rebuild; deleting node_modules just means running npm install; deleting a log file has near-zero cost. The app classifies every file into Low, Medium, or Critical impact tiers so users can make informed decisions rather than blindly selecting everything. This required understanding the semantics of each artifact type, not just its file extension or location.

Reversibility was a third constraint that shaped the entire deletion pipeline. Rather than calling FileManager.removeItem directly, the app defaults to trashing files (FileManager.trashItem), making all cleanup reversible by default. Permanent deletion is a secondary, explicit action — and for files that are actively in use, a flock()-based file lock check prevents deletion entirely. This layered approach means the app can be aggressive about finding junk while remaining conservative about actually removing it.$$,
  '[
    {
      "title": "MVVM with @Published ViewModels and @MainActor isolation",
      "description": "Each major screen (Dashboard, ScanResults, CleanupManager, DeveloperTools, Settings) has its own ViewModel holding @Published state. All ViewModels are annotated with @MainActor to ensure UI updates happen on the main thread, eliminating a whole class of SwiftUI concurrency bugs. This cleanly separates scanning logic from rendering and makes each screen independently testable.",
      "icon": "account_tree"
    },
    {
      "title": "Singleton Services with async/await concurrency",
      "description": "CleanupService, DeveloperToolsService, and SafetyValidator are all shared singletons accessed via static let shared. Long-running file system operations are async functions, allowing ViewModels to launch them with async let for parallel execution. This avoids blocking the UI thread during expensive directory traversals while keeping call sites clean.",
      "icon": "cloud_sync"
    },
    {
      "title": "Safety-first two-stage deletion pipeline",
      "description": "Rather than deleting files directly, every removal goes through SafetyValidator first (checking against 26+ protected path patterns and running a flock()-based in-use check), then routes to moveToTrash() by default (reversible via Finder). Permanent deletion is a separate, explicit code path. This separation prevents accidental data loss and makes the app viable for non-technical users alongside developers.",
      "icon": "security"
    },
    {
      "title": "Centralized design system via Theme.swift",
      "description": "All colors, typography sizes, spacing values, and corner radii are defined in a single Theme.swift file with static constants. This ensures visual consistency across 17+ view components without scattering magic numbers throughout the codebase. The dark-mode-only palette was defined upfront, enabling the entire UI to be built against a single coherent system.",
      "icon": "palette"
    },
    {
      "title": "Struct-based immutable models with value semantics",
      "description": "All domain models (ScanCategory, ScannedFile, DiskUsage, CleanupResult) are Swift structs, not classes. This gives value semantics throughout the app — ViewModels hold arrays of immutable structs, SwiftUI diffs them efficiently, and there are no shared-mutable-state bugs to chase. Selection state (which files to delete) is tracked separately in the ViewModel, not embedded in the model structs.",
      "icon": "data_object"
    },
    {
      "title": "Category-scoped scanning with impact classification",
      "description": "Instead of one monolithic file scan, the app defines 9 scan categories (UserCaches, SystemLogs, BrowserCaches, DeveloperFiles, Downloads, TrashBin, AppSupport, MailAttachments, iOSBackups) each with its own target paths and expected file patterns. Each file gets an ImpactScore (Low/Medium/Critical) based on its category and type. This lets users focus cleanup effort where it matters and understand consequences before deleting.",
      "icon": "category"
    }
  ]'::jsonb,
  '',
  '',
  '[
    {"metric": "9",        "label": "scan categories covering system, browser, and developer artifacts"},
    {"metric": "26+",      "label": "protected paths guarded against accidental deletion"},
    {"metric": "6+",       "label": "package manager caches detected (npm, pnpm, Yarn, CocoaPods, Homebrew, Expo)"},
    {"metric": "macOS 14+","label": "native app, zero external dependencies"}
  ]'::jsonb,
  null,
  'https://github.com/pmudassir/macsweep',
  true,
  'published',
  '{
    "tagline": "Reclaim your Mac. Stay in control.",
    "hero_description": "MacSweep scans your Mac for junk files, developer artifacts, and hidden caches — then safely removes what you do not need, so your machine runs lean.",
    "theme": {
      "primary_color": "#3C83F6",
      "mood": "dark",
      "font_style": "geometric"
    },
    "features": [
      {
        "title": "Developer-Aware Scanning",
        "description": "Detects node_modules, Xcode DerivedData, Docker volumes, and package manager caches across npm, pnpm, Yarn, CocoaPods, Homebrew, and Expo. Finds gigabytes that generic cleaners miss.",
        "icon": "🧑‍💻"
      },
      {
        "title": "Impact-Scored Results",
        "description": "Every file is classified as Low, Medium, or Critical impact before you delete anything. Know exactly what you are removing and how long it would take to rebuild.",
        "icon": "⚖️"
      },
      {
        "title": "Safety-First Deletion",
        "description": "Files go to Trash by default — fully reversible. A built-in safety validator blocks deletion of active system files and critical OS paths, so you cannot break your Mac.",
        "icon": "🛡️"
      },
      {
        "title": "9 Cleanup Categories",
        "description": "System caches, browser data, app logs, developer files, downloads, trash, app support, mail attachments, and iOS backups — all organized for targeted or one-click cleaning.",
        "icon": "🗂️"
      },
      {
        "title": "Real-Time Disk Insights",
        "description": "The dashboard shows a live breakdown of your storage: total, used, and free space with a visual usage ring. See where your gigabytes actually went.",
        "icon": "📊"
      },
      {
        "title": "Native macOS Performance",
        "description": "Built entirely in Swift and SwiftUI with async/await parallelism. Scans run concurrently without blocking the UI. No Electron, no web views — just fast native code.",
        "icon": "⚡"
      }
    ],
    "problem_statement": "My Mac has 8GB free and I have no idea where my storage went. I have tried emptying the Trash, deleting old downloads — nothing makes a dent. Meanwhile, somewhere on my drive there are probably 20GB of Xcode build artifacts and node_modules from projects I finished two years ago. Every cleaner I have tried either finds nothing useful or scares me into thinking I will break something if I delete it.",
    "solution_statement": "MacSweep scans the specific locations where junk actually accumulates — developer caches, Xcode artifacts, browser data, package manager directories — and shows you exactly what each file is and what happens if you delete it. Nothing is removed without your confirmation, and by default everything goes to Trash so you can undo any mistake.",
    "target_audience": "macOS developers and power users who regularly work with Xcode, Node.js, Docker, or multiple package managers and find their storage slowly disappearing to build artifacts and caches.",
    "screenshots_description": "Main dashboard with circular disk usage gauge, category cards grid showing reclaimable space. Scan Results with file table and impact badges. Cleanup Manager with tabbed categories. Developer Tools with per-tool scan and clean actions. All on #0D1117 background."
  }'::jsonb,
  now(),
  now()
);

-- Verify
SELECT slug, title, status, featured, github_url, (landing_page IS NOT NULL) AS has_landing_page
FROM projects
WHERE slug = 'macsweep';
