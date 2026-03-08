-- ============================================================
-- Seed: IDC Hajj & Umrah Guide project
-- Run in Supabase dashboard → SQL Editor
-- ============================================================

DELETE FROM projects WHERE slug = 'idc-hajj-umrah-guide';

INSERT INTO projects (
  id, slug, title, subtitle, description, role, timeline, stack,
  challenge, architectural_decisions, code_snippet, code_language,
  impact_metrics, live_url, github_url, featured, status, landing_page,
  created_at, updated_at
) VALUES (
  gen_random_uuid(),
  'idc-hajj-umrah-guide',
  'IDC Hajj & Umrah Guide',
  'A full-stack Islamic pilgrimage companion app giving pilgrims offline-first access to Hajj, Umrah, and Madina ritual guides.',
  $$Millions of Muslims perform Hajj and Umrah each year with limited access to reliable, structured guidance — especially when connectivity is unreliable in the holy cities. IDC is a React Native mobile app paired with a Next.js admin CMS that gives pilgrims step-by-step ritual guides, prayer times, a Qibla direction finder, historic place discovery, and a Dhikr counter. Content teams manage everything through a dedicated admin dashboard that handles rich media uploads, live travel advisories, and event announcements.$$,
  'Solo Full Stack Developer',
  '2025',
  ARRAY[
    'React Native 0.81.5','Expo 54','TypeScript','Next.js 15',
    'Firebase Firestore','Firebase Storage','Firebase Auth (Anonymous)',
    'NativeWind (Tailwind CSS for React Native)','Tailwind CSS v4',
    'Expo Router','React Navigation','i18next','moment-hijri',
    'React Native Reanimated','expo-sensors (Magnetometer)',
    'expo-av / expo-audio','Firebase Admin SDK','EAS (Expo Application Services)'
  ],
  $$The central engineering challenge was building a content-heavy pilgrimage app that remains fully usable in poor network conditions — Makkah and Madina during Hajj season are among the most network-congested environments on earth, with millions of simultaneous users straining cell towers. A naive approach would be to simply fetch from Firestore on demand and show a spinner, which fails completely offline. Instead, the app implements a stale-while-revalidate offline-first architecture: every Firestore collection is cached to AsyncStorage with configurable TTLs, the app renders cached data immediately on load, and silently revalidates in the background when connectivity returns. The useFirestoreData hook abstracts this pattern — cache-check → render → network-fetch → cache-update — so all screens get offline resilience for free.

A second challenge was managing a live schema migration without downtime. The original data lived in separate Firestore collections per ritual type (hajj_uploads, umrah_uploads, madina_uploads). Unifying these into a single typed rituals collection required: a TypeScript migration script using Firebase Admin SDK, a dual-write strategy where the admin CMS writes to both legacy and new schema simultaneously (bridged by _legacyFolderId and _newSchemaId cross-references), and Firestore security rules that enforce schemaVersion validation on writes. Legacy collections remain readable during the transition period as a safety net.

The admin CMS presented its own complexity: upload order conflicts had to be detected and resolved (replacing an existing ritual at a given order index meant clearing its Firebase Storage folder, resolving its new-schema document ID via legacy cross-references, and then doing an update rather than a create). This conflict resolution logic runs before any file upload begins, keeping the content ordering consistent across a distributed content team without any locking mechanism.$$,
  '[
    {
      "title": "Offline-first with stale-while-revalidate",
      "description": "Rather than optimistic UI or simple error states, a dedicated useFirestoreData hook implements a three-phase strategy: immediately serve from AsyncStorage cache, flag data as potentially stale, then fetch from Firestore and silently update. This means pilgrims see content instantly even with no signal, and data refreshes automatically when connectivity returns. Alternative (real-time Firestore listeners) was rejected because persistent listeners are expensive and unreliable on intermittent connections.",
      "icon": "cloud_off"
    },
    {
      "title": "Anonymous Firebase Auth as access gate",
      "description": "All users — mobile and admin — authenticate via Firebase Anonymous Auth on app start. This enables Firestore security rules (isAuthenticated() checks) without requiring user registration, which would create friction for pilgrims who just want ritual guidance. The tradeoff is that the admin CMS relies on the same anonymous auth rather than role-based access, meaning Firestore rules must be tightened for production to add proper admin role checks.",
      "icon": "person_off"
    },
    {
      "title": "Versioned Firestore schema with typed migration",
      "description": "Every document carries a schemaVersion field enforced at the Firestore rules layer. When the data model evolved from three separate type collections into one unified rituals collection, a TypeScript migration script (using Firebase Admin SDK) handled the transformation — normalizing description fields from string|string[] to string[], restructuring paragraphs, and preserving legacy folderId references needed for Firebase Storage path resolution. This approach allowed zero-downtime migration: the mobile app was updated to read from the new collection first, falling back to legacy, before migration ran.",
      "icon": "schema"
    },
    {
      "title": "Dual-write bridge during CMS transition",
      "description": "The admin CMS writes ritual content to both the legacy {type}_uploads collections and the new rituals collection simultaneously, using _legacyFolderId and _newSchemaId as cross-references. This bridges the schema transition period: old app versions reading legacy collections still see updates, while new app versions reading rituals also see updates. The alternative (big-bang cutover) risked data loss if the migration script had gaps.",
      "icon": "sync_alt"
    },
    {
      "title": "File-based routing with Expo Router",
      "description": "Dynamic routes (/hajj-rituals/[id], /makkah-historic-places/[id]) are defined via Expo Router file-system convention, matching Next.js App Router semantics. This gives typed route parameters via experiments.typedRoutes in app.json, enables deep-linking, and keeps navigation logic co-located with screen files. React Navigation with bottom tabs handles the main shell, while Expo Router Stack manages modal-style detail screens.",
      "icon": "folder_open"
    },
    {
      "title": "NativeWind for cross-platform styling",
      "description": "Rather than maintaining separate StyleSheet objects per component, NativeWind brings Tailwind CSS utility classes to React Native. This means the same mental model and class names work across the mobile app (NativeWind v4) and the web admin (Tailwind v4), significantly reducing context-switching when working across both apps. The tradeoff is that NativeWind adds a build-time compilation step and some Tailwind features do not map to React Native layout primitives.",
      "icon": "style"
    },
    {
      "title": "Magnetometer-based Qibla compass",
      "description": "The Qibla direction finder uses expo-sensors to subscribe to the device magnetometer and computes the heading via Math.atan2(y, x). This works entirely on-device with no API call, which is critical when connectivity is poor. The heading is computed in real-time at magnetometer update frequency and displayed as a rotating compass needle via React Native Reanimated for smooth animation.",
      "icon": "explore"
    },
    {
      "title": "Hijri calendar integration",
      "description": "Prayer times and date displays use moment-hijri alongside moment to show Islamic calendar dates natively. This is essential for the target audience — pilgrims track ritual timing by Hijri date, not Gregorian. The library extends moment.js with Hijri-aware date parsing and formatting, avoiding the need to implement calendar conversion logic from scratch.",
      "icon": "calendar_month"
    }
  ]'::jsonb,
  '',
  '',
  '[
    {"metric": "100%",        "label": "offline access to ritual guides"},
    {"metric": "3",           "label": "pilgrimage types covered (Hajj, Umrah, Madina)"},
    {"metric": "V1→V2",       "label": "zero-downtime schema migration"},
    {"metric": "iOS + Android","label": "cross-platform from single codebase"}
  ]'::jsonb,
  null,
  null,
  true,
  'published',
  '{
    "tagline": "Your complete Hajj & Umrah companion",
    "hero_description": "Step-by-step ritual guides, prayer times, and a Qibla compass — all available offline, right when you need them most.",
    "theme": {
      "primary_color": "#059669",
      "mood": "minimal",
      "font_style": "humanist"
    },
    "features": [
      {
        "title": "Offline-First Ritual Guides",
        "description": "Complete step-by-step guides for Hajj, Umrah, and Madina rituals — cached locally so they work even without internet in the holy cities.",
        "icon": "📖"
      },
      {
        "title": "Prayer Times by Location",
        "description": "Accurate prayer times based on your current GPS location, displayed with a scrollable date slider for planning ahead.",
        "icon": "🕌"
      },
      {
        "title": "Qibla Direction Finder",
        "description": "Uses your phone magnetometer to show a real-time compass pointing toward Makkah, no internet required.",
        "icon": "🧭"
      },
      {
        "title": "Dhikr Counter",
        "description": "A digital counter for tracking your invocations (dhikr), replacing the traditional tasbih beads with a quiet, focused tool.",
        "icon": "📿"
      },
      {
        "title": "Historic Places",
        "description": "Browse and learn about significant historic sites in Makkah and Madina with photos and detailed descriptions.",
        "icon": "🕋"
      },
      {
        "title": "Live Updates & Travel Advisories",
        "description": "Real-time announcements, upcoming events, and travel advisories pushed directly to pilgrims by the organizing team.",
        "icon": "📢"
      }
    ],
    "problem_statement": "When you finally arrive in Makkah or Madina, your phone struggles to connect. Millions of pilgrims are all doing the same thing — searching for the same information, on the same overloaded networks. You are standing at a ritual site with no idea what to do next, and every app you try just spins. Your printed guidebook is back at the hotel. You are lost at one of the most important moments of your life.",
    "solution_statement": "IDC downloads your ritual guides, prayer times, and historic place information the moment you open the app — before you ever need it. By the time your network drops, everything is already on your phone. The Qibla compass works from your device built-in sensors, not the internet. And when your organizing team posts a last-minute advisory, it syncs the moment you get one bar of signal.",
    "target_audience": "Muslim pilgrims performing Hajj or Umrah, particularly those traveling with organized groups from India and South Asia, who need structured guidance through complex multi-day rituals in a foreign country with unreliable mobile connectivity.",
    "screenshots_description": "Home screen: 2x2 grid of cards for Hajj, Umrah, Madina Ziyara, and Historic Places — each with an illustration, then a prayer time section showing current city name and a horizontal date-scroll strip, followed by quick-link buttons for Qibla and Dhikr Counter. Makkah screen: tab bar switching between Hajj and Umrah ritual lists, each item showing a card with ritual name, order number, and thumbnail. Ritual detail screen: hero image at top, ritual name in bold, multi-paragraph structured content with titled sections, embedded video link button, and downloadable file attachments. Historic places screen: grid of location cards with photos, name, and a short description. Qibla screen: dark background with an animated compass needle and degree reading. Dhikr counter screen: large centered counter number with a tap-to-increment button and reset option."
  }'::jsonb,
  now(),
  now()
);

-- Verify
SELECT slug, title, status, featured, (landing_page IS NOT NULL) AS has_landing_page
FROM projects
WHERE slug = 'idc-hajj-umrah-guide';
