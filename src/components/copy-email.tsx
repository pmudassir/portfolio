"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "./icons";

type Props = {
  email: string;
  className?: string;
  label?: string;
};

// Copies the address to the clipboard. Falls back to selecting the text
// when the Clipboard API isn't available (older browsers, insecure origins).
export function CopyEmail({ email, className = "", label = "Copy email" }: Props) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      window.prompt("Copy this address:", email);
      return;
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button type="button" onClick={copy} className={className}>
      {copied ? <Check className="text-ok" /> : <Copy />}
      <span>{copied ? "Copied" : label}</span>
      <span className="sr-only" aria-live="polite">
        {copied ? `${email} copied to clipboard` : ""}
      </span>
    </button>
  );
}
