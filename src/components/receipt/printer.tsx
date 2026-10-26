"use client";

import { useEffect, useRef } from "react";

// The thermal printer the receipt feeds out of. It sticks to the bottom of the screen while the
// receipt prints, then stays behind at the torn end. Its little display tracks the print.
export function Printer() {
  const status = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const receipt = document.querySelector<HTMLElement>("[data-receipt]");
    const el = status.current;
    if (!receipt || !el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = receipt.getBoundingClientRect();
      const printed = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / rect.height));
      el.textContent = printed >= 0.995 ? "Done · tear here" : `Printing · ${Math.round(printed * 100)}%`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    // The paper slides in on load; measure again once it has settled.
    const feed = receipt.closest(".receipt-feed");
    feed?.addEventListener("animationend", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      feed?.removeEventListener("animationend", onScroll);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="printer" aria-hidden>
      <div className="printer-slot" />
      <div className="printer-body">
        <span className="printer-led" />
        <span ref={status} className="printer-display">
          Printing
        </span>
        <span className="printer-model">MM-80</span>
      </div>
    </div>
  );
}
