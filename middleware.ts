// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const path = req.nextUrl.pathname;

        if (path.startsWith("/admin")) {
          return (token as any)?.role === "ADMIN";
        }

        if (path.startsWith("/mon-compte")) {
          return !!token;
        }

        return true;
      },
    },
  },
);

export const config = {
  matcher: ["/mon-compte/:path*", "/admin/:path*"],
};
