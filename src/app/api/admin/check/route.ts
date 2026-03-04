import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get("admin_auth");
  const isAuthenticated = cookie?.value === "authenticated";
  return NextResponse.json({ authenticated: isAuthenticated });
}
