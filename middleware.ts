import { NextResponse, type NextRequest } from "next/server";

const protectedPathPrefix = "/app";

function hasSupabaseEnv() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith(protectedPathPrefix)) {
    return NextResponse.next();
  }

  if (!hasSupabaseEnv()) {
    return NextResponse.next();
  }

  const hasAccessToken = request.cookies.get("sb-access-token")?.value;
  const hasRefreshToken = request.cookies.get("sb-refresh-token")?.value;

  if (hasAccessToken || hasRefreshToken) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("redirectedFrom", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/app/:path*"],
};
