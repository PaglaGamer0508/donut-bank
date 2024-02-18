import { NextResponse } from "next/server";
import { hostName } from "./lib/hostName";

const isProduction = process.env.NODE_ENV === "production";

// This function can be marked `async` if using `await` inside
export function middleware(request: Request) {
  const origin = request.headers.get("origin");

  if (isProduction) {
    if (origin === "https://donutbank.vercel.app") {
      console.log(origin);
      return NextResponse.next();
    } else {
      if (request.url.includes("/api/application/spend")) {
        console.log(origin);
        return NextResponse.next();
      } else {
        console.log(origin);
        return new NextResponse();
      }
    }
  }

  console.log(origin);
  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
