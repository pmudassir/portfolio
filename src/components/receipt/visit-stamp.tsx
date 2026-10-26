"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/content/site";

const date = new Intl.DateTimeFormat("en-IN", {
  timeZone: site.location.timeZone,
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

type Stamp = { number: string; when: string };

const parts = new Intl.DateTimeFormat("en-GB", {
  timeZone: site.location.timeZone,
  year: "2-digit",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

function stampFor(now: Date): Stamp {
  const p = Object.fromEntries(parts.formatToParts(now).map((x) => [x.type, x.value]));
  return { number: `${p.year}${p.month}${p.day}-${p.hour}${p.minute}`, when: `${date.format(now)} IST` };
}

// Fixed for the whole visit, so read once and never notify.
let visit: Stamp | null = null;
const getStamp = () => (visit ??= stampFor(new Date()));
const subscribe = () => () => {};

// The receipt number and time are this visit's, so every visitor gets their own receipt.
// Rendered as placeholders on the server so the markup never disagrees with the client.
export function VisitStamp() {
  const stamp = useSyncExternalStore(subscribe, getStamp, () => null);

  return (
    <dl className="receipt-kv">
      <dt>Receipt</dt>
      <dd className="tabular-nums">#{stamp?.number ?? "——————-————"}</dd>
      <dt>Printed for</dt>
      <dd>You (hiring team)</dd>
      <dt>Printed at</dt>
      <dd className="tabular-nums">{stamp?.when ?? " "}</dd>
    </dl>
  );
}
