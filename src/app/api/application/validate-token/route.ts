import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { limiter } from "@/lib/limiter";
const makeCorsHeaders = (origin: string | null) => {
  // In dev you can use origin || "*" — in prod prefer explicit origin checks
  const allowedOrigin = origin ?? "*";
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    // "Access-Control-Allow-Credentials": "true", // enable only if you use cookies/auth
  };
};

export const OPTIONS = async (req: Request) => {
  const origin = req.headers.get("origin");
  return new NextResponse(null, {
    status: 204,
    headers: makeCorsHeaders(origin),
  });
};

export const GET = async (req: Request) => {
  const origin = req.headers.get("origin");
  try {
    const remaining = await limiter.removeTokens(1);
    if (remaining < 0) {
      return NextResponse.json(
        { message: "Too many requests" },
        { status: 429, headers: makeCorsHeaders(origin) },
      );
    }

    const { searchParams } = new URL(req.url);
    const subAccountToken = searchParams.get("subAccountToken");
    const ApplicationAPIKey = searchParams.get("ApplicationAPIKey");

    if (!subAccountToken || !ApplicationAPIKey) {
      return NextResponse.json(
        {
          message:
            "Both subAccountToken and ApplicationAPIKey are required query parameters",
        },
        { status: 400, headers: makeCorsHeaders(origin) },
      );
    }

    const apiKey = await db.aPIKey.findFirst({
      where: { key: ApplicationAPIKey },
      select: { applicationId: true },
    });

    if (!apiKey) {
      return NextResponse.json(
        { message: "Invalid Application API Key", isValid: false },
        { status: 401, headers: makeCorsHeaders(origin) },
      );
    }

    const token = await db.subAccountToken.findFirst({
      where: { token: subAccountToken },
      select: { applicationId: true, subAccountId: true },
    });

    if (!token) {
      return NextResponse.json(
        { message: "Invalid Sub Account Token", isValid: false },
        { status: 401, headers: makeCorsHeaders(origin) },
      );
    }

    const belongsToApplication = token.applicationId === apiKey.applicationId;

    if (!belongsToApplication) {
      return NextResponse.json(
        {
          message: "This token is not for this application",
          isValid: false,
        },
        { status: 403, headers: makeCorsHeaders(origin) },
      );
    }

    return NextResponse.json(
      {
        message: "Token belongs to the application",
        isValid: true,
      },
      { status: 200, headers: makeCorsHeaders(origin) },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Error processing the request: ${String(error)}` },
      { status: 500, headers: makeCorsHeaders(origin) },
    );
  } finally {
    await db.$disconnect();
  }
};
