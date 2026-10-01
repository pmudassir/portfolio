import { Decisions, FlowDiagram, Points } from "@/components/case-study";
import type { Project } from "./types";

export const koin: Project = {
  slug: "koin",
  name: "Koin",
  tagline:
    "An Android-first expense tracker that logs UPI and bank transactions on its own, from SMS and payment-app notifications.",
  summary:
    "Manual expense trackers get abandoned within days. Koin listens for transactions instead: Kotlin native modules catch bank SMS and payment-app notifications, and an on-device categoriser that learns from corrections files them. It's local-first, with optional cloud sync.",
  highlight:
    "Two Kotlin listeners, an SMS BroadcastReceiver and a NotificationListenerService, bridged into React Native and feeding a seven-step categoriser.",
  kind: "Personal project",
  role: "Sole engineer",
  period: "2026",
  status: "Android app, built with EAS",
  stack: ["React Native", "Expo", "TypeScript", "Kotlin", "MMKV", "Firebase"],
  links: [],
  repoUrl: "https://github.com/pmudassir/koin",
  featured: true,
  sections: [
    {
      id: "overview",
      title: "Overview",
      body: (
        <>
          <p>
            In India, most everyday spending goes through UPI apps and bank cards, and every transaction already
            produces a message: an SMS from the bank, or a notification from GPay, PhonePe or Paytm. Koin reads those
            signals instead of asking people to type their expenses in.
          </p>
          <p>
            Captured transactions are parsed, categorised and stored on the device. Budgets, analytics, a spending
            heatmap and home-screen widgets sit on top. Biometric lock and anonymous cloud sync are optional.
          </p>
        </>
      ),
    },
    {
      id: "architecture",
      title: "How it works",
      body: (
        <>
          <FlowDiagram
            caption="Capture pipeline. The native layer only parses and forwards; everything after that is shared TypeScript."
            layers={[
              {
                label: "Signals",
                nodes: [
                  { title: "Bank SMS", detail: "SmsBroadcastReceiver (Kotlin)" },
                  { title: "Payment-app notifications", detail: "NotificationListener (Kotlin)" },
                  { title: "Shared text", detail: "share intent" },
                ],
                edge: "TransactionBridgeModule → JS events",
              },
              {
                label: "Parse",
                nodes: [{ title: "SMS + UPI parsers", detail: "amount, merchant, debit or credit, UPI VPA" }],
              },
              {
                label: "Categorise",
                nodes: [{ title: "Seven-step categoriser", detail: "user corrections always win", accent: true }],
              },
              {
                label: "Store",
                nodes: [
                  { title: "MMKV", detail: "synchronous, local-first" },
                  { title: "Firebase", detail: "optional sync, anonymous auth" },
                ],
              },
            ]}
          />
          <p>
            Android only exposes SMS broadcasts and other apps&apos; notifications to native code. So two Kotlin
            components do the capturing. Multi-part SMS are reassembled per sender, non-banking messages and credits
            are dropped, and parsed debits go to JavaScript through a bridge module. Everything downstream is shared
            TypeScript.
          </p>
        </>
      ),
    },
    {
      id: "categorisation",
      title: "Categorisation without a model",
      body: (
        <>
          <p>A merchant name alone is ambiguous: “Amazon” can be shopping, groceries or a subscription. The categoriser runs ordered steps and stops at the first confident answer:</p>
          <ol>
            <li>A correction the user made for this merchant before.</li>
            <li>The source app: a Swiggy or Zomato payment is Food.</li>
            <li>The UPI VPA in the message.</li>
            <li>Context clues in the surrounding text.</li>
            <li>Merchant and keyword matching.</li>
            <li>Categorising from the full text when the merchant didn&apos;t match.</li>
            <li>A payment app with no other context is most likely a personal transfer.</li>
          </ol>
          <p>
            It&apos;s deterministic on purpose. It runs on the device with no API cost, every decision can be
            explained, and corrections feed step 1, so it improves for each user without a model.
          </p>
        </>
      ),
    },
    {
      id: "decisions",
      title: "Engineering decisions",
      body: (
        <Decisions
          items={[
            {
              title: "Local-first storage with MMKV",
              why: "MMKV reads are synchronous through JSI, so screens render from local data immediately and sync runs in the background.",
              instead: "AsyncStorage, which is asynchronous on every read.",
            },
            {
              title: "Native code only where the platform demands it",
              why: "The Kotlin layer does as little as possible: receive, filter, parse and forward. Keeping categorisation and storage in TypeScript means one implementation covers SMS, notifications and the share flow.",
            },
            {
              title: "Anonymous auth for sync",
              why: "Requiring sign-up is a fast way to lose people in a finance app. Firebase anonymous auth gives each device a stable identity for cloud backup without asking for an email.",
            },
          ]}
        />
      ),
    },
    {
      id: "gaps",
      title: "Known gaps",
      body: (
        <Points
          items={[
            "It's Android-first. iOS doesn't let apps read SMS or other apps' notifications, so on iOS only the share flow works.",
            "Bank SMS formats vary, and each new bank can mean new parsing patterns.",
            "The repository needs a README and tests. The parsers and the categoriser are the obvious first candidates for unit tests.",
          ]}
        />
      ),
    },
  ],
};
