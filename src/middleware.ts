import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://donutbank.vercel.app"]
    : ["http://localhost:3000"];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin");

  // Allow requests to the "/api/application/spend" route from any origin
  if (request.nextUrl.pathname === "/api/application/spend") {
    return NextResponse.next();
  }

  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 400,
      statusText: "Bad Request",
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  // For all other requests, check if the request is coming from a browser
  if (!request.headers.get("user-agent")) {
    return new NextResponse(null, {
      status: 400,
      statusText: "Bad Request",
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}
export const config = {
  matcher: "/api/:path*",
};
