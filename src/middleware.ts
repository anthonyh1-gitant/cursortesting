import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { NextRequest } from "next/server";

export async function middleware() {
  // When Supabase is connected, uncomment:
  // import { updateSession } from "@/lib/supabase/middleware";
  // return await updateSession(request);

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
