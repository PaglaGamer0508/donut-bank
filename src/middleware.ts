import { NextRequest, NextResponse } from "next/server";

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://donutbank.vercel.app"]
    : ["http://localhost:3000"];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.url.includes("/auth")) {
    return NextResponse.next();
  }
  if (request.url.includes("/uploadthing")) {
    return NextResponse.next();
  }

  if (request.url.includes("/application/spend")) {
    return NextResponse.next();
  }

  if (
    request.method === "POST" ||
    request.method === "PUT" ||
    request.method === "DELETE"
  ) {
    const origin = request.headers.get("origin");

    if (!origin) {
      return new NextResponse(null, {
        status: 401,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
        },
      });
    }

    if (origin && allowedOrigins.includes(origin)) {
      return NextResponse.next();
    }
  }

  const { searchParams } = new URL(request.url);

  const apiKey = searchParams.get("apiKey");

  if (!apiKey) {
    return new NextResponse(null, {
      status: 401,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
      },
    });
  }

  if (apiKey !== process.env.API_KEY) {
    return new NextResponse("Invalid API Key", {
      status: 401,
    });
  }

  if (apiKey === process.env.API_KEY) {
    return NextResponse.next();
  }
}
export const config = {
  matcher: ["/api/:path*"],
};
