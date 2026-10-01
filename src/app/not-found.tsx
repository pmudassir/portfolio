import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap pt-16 sm:pt-24">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-serif text-[2.5rem] leading-tight tracking-tight text-ink">That page doesn&apos;t exist.</h1>
      <p className="mt-4 max-w-[36rem] text-ink-2">
        It may have moved when I rebuilt this site. Try the{" "}
        <Link href="/projects" className="link">
          projects
        </Link>
        , my{" "}
        <Link href="/work" className="link">
          work history
        </Link>
        , or the{" "}
        <Link href="/" className="link">
          home page
        </Link>
        .
      </p>
    </div>
  );
}
