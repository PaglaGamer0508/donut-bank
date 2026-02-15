import { db } from "@/lib/db";
import { NextResponse } from "next/server";

const makeCorsHeaders = () => {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
};

export const OPTIONS = async (req: Request) => {
  return new NextResponse(null, {
    status: 204,
    headers: makeCorsHeaders(),
  });
};

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const subAccountToken = searchParams.get("subAccountToken");
    const ApplicationAPIKey = searchParams.get("ApplicationAPIKey");

    if (!subAccountToken || !ApplicationAPIKey) {
      return NextResponse.json(
        {
          message:
            "Both subAccountToken and ApplicationAPIKey are required query parameters",
        },
        { status: 400, headers: makeCorsHeaders() },
      );
    }

    const apiKey = await db.aPIKey.findFirst({
      where: { key: ApplicationAPIKey },
      select: { applicationId: true },
    });

    if (!apiKey) {
      return NextResponse.json(
        { message: "Invalid Application API Key", isValid: false },
        { status: 401, headers: makeCorsHeaders() },
      );
    }

    const token = await db.subAccountToken.findFirst({
      where: { token: subAccountToken },
      select: { applicationId: true, subAccountId: true },
    });

    if (!token) {
      return NextResponse.json(
        { message: "Invalid Sub Account Token", isValid: false },
        { status: 401, headers: makeCorsHeaders() },
      );
    }

    const belongsToApplication = token.applicationId === apiKey.applicationId;

    if (!belongsToApplication) {
      return NextResponse.json(
        {
          message: "This token is not for this application",
          isValid: false,
        },
        { status: 403, headers: makeCorsHeaders() },
      );
    }

    return NextResponse.json(
      {
        message: "Token belongs to the application",
        isValid: true,
      },
      { status: 200, headers: makeCorsHeaders() },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Error processing the request: ${String(error)}` },
      { status: 500, headers: makeCorsHeaders() },
    );
  } finally {
    await db.$disconnect();
  }
};
