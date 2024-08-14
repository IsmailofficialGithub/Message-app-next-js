import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req :request,secret:process.env.NEXT_AUTH_SECRETE_SIGNIN });
  const {pathname} = request.nextUrl;

  if (token && (pathname === "/sign-in" || pathname === "/sign-up" || pathname === "/verify" || pathname==="/")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (!token && (pathname.startsWith("/dashboard") )) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  return NextResponse.next();

}

export const config = {
  matcher: ["/dashboard/:path*" , "/", "/signin", "/sign-up", "/verify"
    ],
}
