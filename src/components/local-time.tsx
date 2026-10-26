"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

const format = new Intl.DateTimeFormat("en-IN", {
  timeZone: site.location.timeZone,
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

// Live local time where I am. Rendered empty on the server so the markup never disagrees with the client.
export function LocalTime({ className = "" }: { className?: string }) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(format.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className={className}>
      {site.location.city} <time className="tabular-nums">{now ?? " "}</time>
    </p>
  );
}
