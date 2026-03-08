-- ============================================================
-- Seed: VoiceInk project
-- Run in Supabase dashboard → SQL Editor
-- ============================================================

DELETE FROM projects WHERE slug = 'voiceink';

INSERT INTO projects (
  id, slug, title, subtitle, description, role, timeline, stack,
  challenge, architectural_decisions, code_snippet, code_language,
  impact_metrics, live_url, github_url, featured, status, landing_page,
  created_at, updated_at
) VALUES (
  gen_random_uuid(),
  'voiceink',
  'VoiceInk',
  'A native macOS dictation app that turns your voice into polished text using local AI and cloud transcription.',
  $$VoiceInk is a native macOS menubar app that lets you dictate into any text field using a global Fn-key shortcut. It captures audio, transcribes via Deepgram or Whisper, then optionally polishes the output with a Groq LLM — transforming raw speech into clean, formatted prose in under two seconds. Built with Tauri v2 and Rust for a native feel with web-tech UI, it runs entirely in the background with zero friction between thought and text.$$,
  'Solo Developer',
  'Early 2025',
  ARRAY[
    'Tauri v2','Rust','React 19','TypeScript','Deepgram API',
    'OpenAI Whisper','Groq SDK','Web Audio API','cpal (Rust audio)',
    'Tokio async runtime','Tailwind CSS','Vite'
  ],
  $$The core challenge was bridging two worlds: a Rust backend capturing system-level audio with CPAL and a React frontend rendering the UI — all inside a single Tauri application that feels like a native macOS app, not a wrapped browser. The naive approach would have been an Electron app, which ships 200MB of Chromium and consumes significant RAM just idling in the menubar. Tauri v2 gives a WebView-based UI with a Rust core, but the integration layer — passing binary audio buffers from Rust to JavaScript and back — required careful design of the Tauri command and event API to avoid blocking the main thread.

The second challenge was latency. Voice dictation only feels magical when transcription is near-instant. The pipeline had to be: record → encode → transmit to API → receive text → optionally rewrite with LLM → paste — all in under two seconds on average. This meant streaming audio to Deepgram in real-time rather than waiting for the full recording, and running Groq's LLM polish as an optional async step that did not gate the base transcription result.

A third challenge was global hotkey registration on macOS. System-level Fn-key interception requires accessibility permissions and careful event loop management to avoid conflicts with other apps. Tauri's plugin ecosystem handles this, but wiring it to the recording state machine — start on press, stop on release, cancel on escape — required building a state machine in Rust that coordinates across threads without deadlocks.$$,
  '[
    {
      "title": "Tauri v2 over Electron for native menubar footprint",
      "description": "Electron bundles Chromium and Node.js, resulting in a 150–300MB app that idles at 200MB RAM — unacceptable for a background menubar utility. Tauri v2 uses the system WebView (WKWebView on macOS) and a Rust backend, producing a sub-5MB binary that idles under 20MB RAM. The tradeoff is a more complex build pipeline (Cargo + Vite) and a steeper learning curve for Rust IPC, but for a tool users leave running permanently, the resource footprint is non-negotiable.",
      "icon": "memory"
    },
    {
      "title": "Streaming audio to Deepgram over batch upload",
      "description": "Rather than recording a full audio buffer and POSTing it to a transcription API, audio is streamed to Deepgram via WebSocket as it is captured. This lets Deepgram begin transcribing mid-sentence, returning interim results that the UI displays in real time. The batch alternative would add 1–3 seconds of round-trip latency after recording ends — killing the instant-feedback feel. The tradeoff is WebSocket connection management and handling interim vs. final transcript events.",
      "icon": "stream"
    },
    {
      "title": "CPAL for cross-platform audio capture in Rust",
      "description": "Audio capture uses the cpal crate (Cross-Platform Audio Library) rather than calling macOS CoreAudio bindings directly. CPAL abstracts the host audio API while still exposing low-level buffer access, and it runs audio callbacks on a dedicated real-time thread. This keeps audio capture off the Tokio async runtime — mixing real-time audio and async I/O on the same thread causes buffer underruns and glitches. The audio thread pushes samples into a bounded channel that the async transcription task drains.",
      "icon": "mic"
    },
    {
      "title": "Groq for sub-second LLM polishing",
      "description": "After transcription, an optional LLM pass rewrites the raw transcript into clean prose — fixing filler words, correcting punctuation, and restructuring run-on sentences. Groq was chosen over OpenAI for this step because its LPU inference delivers 300+ tokens/second, making a 100-word rewrite take under 400ms. At that latency the LLM polish feels instantaneous rather than a noticeable delay. The feature is opt-in per dictation session via a keyboard modifier held during the Fn key.",
      "icon": "auto_fix_high"
    },
    {
      "title": "Global Fn-key hotkey via Tauri plugin-global-shortcut",
      "description": "Registering a global hotkey that fires even when the app has no focused window requires macOS accessibility permissions. Tauri v2 plugin-global-shortcut wraps the platform API cleanly, but Fn-key specifically is not a standard modifier — it required listening for the raw keycode rather than a symbolic key name, with a press/release event pair to start and stop recording respectively. The state machine (idle → recording → transcribing → pasting) lives in Rust to prevent race conditions from rapid key presses.",
      "icon": "keyboard"
    },
    {
      "title": "Pasteboard injection via AppleScript for universal paste",
      "description": "After transcription, the result must appear in whatever text field the user was focused on — a browser, a code editor, a chat app. Rather than relying on accessibility APIs (which require broad permissions and behave inconsistently across apps), VoiceInk writes the transcribed text to the system pasteboard and then simulates Cmd+V via AppleScript. This universally works in any app with a text cursor, with no per-app integration needed. The tradeoff is briefly overwriting clipboard contents, which is mitigated by restoring the previous clipboard item after the paste.",
      "icon": "content_paste"
    },
    {
      "title": "Whisper local fallback for offline use",
      "description": "When Deepgram is unavailable or the user is offline, VoiceInk falls back to a local Whisper model running via whisper.cpp bindings. The local model is downloaded once on first use and runs fully on-device — no network required. Accuracy is slightly lower than Deepgram for accented speech, but the fallback keeps the app functional on flights, in low-connectivity environments, and for users who prefer on-device processing for privacy reasons. The provider selection is automatic based on network reachability.",
      "icon": "wifi_off"
    }
  ]'::jsonb,
  '',
  '',
  '[
    {"metric": "<2s",   "label": "average voice-to-text latency with Deepgram"},
    {"metric": "< 5MB", "label": "binary size vs 150MB+ for Electron alternatives"},
    {"metric": "2",     "label": "transcription providers with automatic failover"},
    {"metric": "100%",  "label": "universal paste — works in any macOS text field"}
  ]'::jsonb,
  null,
  null,
  true,
  'published',
  '{
    "tagline": "Speak. Polish. Paste.",
    "hero_description": "VoiceInk turns your voice into clean, polished text in under two seconds — and pastes it wherever your cursor is. No switching apps, no typing, no friction.",
    "theme": {
      "primary_color": "#FF4F00",
      "mood": "dark",
      "font_style": "monospace"
    },
    "features": [
      {
        "title": "Global Fn-Key Dictation",
        "description": "Hold Fn to record, release to transcribe. Works system-wide in any app — browser, editor, Slack, email — with no window focus required.",
        "icon": "🎙️"
      },
      {
        "title": "Real-Time Transcription",
        "description": "Audio streams to Deepgram as you speak, returning live interim results. No waiting for the recording to finish — transcription starts mid-sentence.",
        "icon": "⚡"
      },
      {
        "title": "AI Polish with Groq",
        "description": "Hold Shift+Fn to activate AI rewriting — Groq rewrites your raw speech into clean prose in under 400ms, fixing filler words and run-ons automatically.",
        "icon": "✨"
      },
      {
        "title": "Universal Paste",
        "description": "Transcribed text is injected directly into whatever text field you were using. No clipboard conflicts, no switching focus — it just appears.",
        "icon": "📋"
      },
      {
        "title": "Offline Whisper Fallback",
        "description": "No internet? VoiceInk falls back to a local Whisper model, running entirely on-device. Full dictation functionality with zero network dependency.",
        "icon": "🔒"
      },
      {
        "title": "Native Menubar App",
        "description": "Built with Tauri v2 and Rust — idles under 20MB RAM with a sub-5MB binary. Lives quietly in your menubar until you need it.",
        "icon": "🖥️"
      }
    ],
    "problem_statement": "Typing is a bottleneck. You think faster than you type, and every time you context-switch to write something — a Slack message, a code comment, an email — you lose momentum. Existing dictation tools either require a specific app, produce messy unformatted transcripts, or run as heavy background services consuming RAM even when idle. The Fn key on your Mac keyboard is sitting there doing nothing.",
    "solution_statement": "VoiceInk hijacks the Fn key system-wide and turns it into a dictation trigger. Hold to record, release to transcribe — your words appear in whatever field you were focused on, already cleaned up by AI. The entire tool fits in 5MB, idles invisibly, and works in every app on your Mac without configuration.",
    "target_audience": "Developers, writers, and knowledge workers on macOS who produce large volumes of text and want to remove typing as a bottleneck — particularly those who think in spoken language, work across many apps simultaneously, or want to capture ideas faster than their fingers allow.",
    "screenshots_description": "Menubar icon with recording indicator pulse. Floating transcription overlay showing live interim text. Settings panel with provider toggle (Deepgram / Whisper), AI polish toggle, and hotkey customization. History popover with recent dictations and copy buttons. Permission setup screen for accessibility and microphone access."
  }'::jsonb,
  now(),
  now()
);

-- Verify
SELECT slug, title, status, featured, (landing_page IS NOT NULL) AS has_landing_page
FROM projects
WHERE slug = 'voiceink';
