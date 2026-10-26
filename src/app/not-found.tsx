import Link from "next/link";
import { Paper, PaperRule, PaperTitle } from "@/components/receipt/paper";

export default function NotFound() {
  return (
    <Paper>
      <p className="receipt-kicker">
        <span>Error</span>
        <span>404</span>
      </p>
      <PaperTitle>Item not found</PaperTitle>
      <p className="receipt-lede">That page doesn&apos;t exist. It may have moved when I rebuilt this site.</p>

      <PaperRule label="Try instead" />
      <ul className="receipt-items">
        {[
          { href: "/", label: "Home" },
          { href: "/projects", label: "Projects" },
          { href: "/work", label: "Work history" },
        ].map((l, i) => (
          <li key={l.href}>
            <span className="receipt-qty">{String(i + 1).padStart(2, "0")}</span>
            <Link href={l.href} className="underline underline-offset-2">
              {l.label}
            </Link>
            <span />
          </li>
        ))}
      </ul>

      <p className="receipt-stamp receipt-stamp-void" aria-hidden>
        <span>Void</span>
        <small>No charge</small>
      </p>
    </Paper>
  );
}
