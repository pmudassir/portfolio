import { NextRequest, NextResponse } from "next/server";

const MAIN_DOMAIN = "mudassirmhd.in";
const IGNORED_SUBDOMAINS = new Set(["www", "admin"]);

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;

  // Never rewrite calls that are already under /projects-landing (avoids infinite loop)
  if (pathname.startsWith("/projects-landing")) {
    return NextResponse.next();
  }

  // Only act on subdomains of the main domain
  if (!hostname.endsWith(`.${MAIN_DOMAIN}`)) {
    return NextResponse.next();
  }

  const subdomain = hostname.slice(0, -(`.${MAIN_DOMAIN}`.length));

  if (!subdomain || IGNORED_SUBDOMAINS.has(subdomain)) {
    return NextResponse.next();
  }

  // Rewrite to the internal projects-landing route, preserving any path/query
  const url = request.nextUrl.clone();
  url.pathname = `/projects-landing/${subdomain}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    // Skip Next.js internals and static assets; run on everything else
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|woff2?|ttf|otf)).*)",
  ],
};
