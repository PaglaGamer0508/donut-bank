// app/api/application/spend/route.ts
import { db } from "@/lib/db";
import { SpendMoneyValidator } from "@/lib/validators/SpendMoneyValidator";
import { NextResponse } from "next/server";
import { z } from "zod";
import { limiter } from "./limiter";

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

// Handle preflight
export const OPTIONS = async (req: Request) => {
  const origin = req.headers.get("origin");
  return new NextResponse(null, {
    status: 204,
    headers: makeCorsHeaders(origin),
  });
};

export const POST = async (req: Request) => {
  const origin = req.headers.get("origin");

  try {
    // Rate limiting logic
    const remaining = await limiter.removeTokens(1);
    if (remaining < 0) {
      return NextResponse.json(
        { message: "Too many requests" },
        { status: 429, headers: makeCorsHeaders(origin) },
      );
    }

    const body = await req.json();
    const { amount, apiKey, subAccountToken, productName, productId } =
      SpendMoneyValidator.parse(body);

    if (!Number.isInteger(amount)) {
      return NextResponse.json(
        { message: "Amount must be an integer" },
        { status: 422, headers: makeCorsHeaders(origin) },
      );
    }

    if (productName.length < 3) {
      return NextResponse.json(
        { message: "Product name must be more than 3 characters" },
        { status: 422, headers: makeCorsHeaders(origin) },
      );
    }

    if (productName.length > 30) {
      return NextResponse.json(
        { message: "Product name must be less than 30 characters" },
        { status: 422, headers: makeCorsHeaders(origin) },
      );
    }

    const ApplicationAPIKey = await db.aPIKey.findFirst({
      where: { key: apiKey },
    });

    if (!ApplicationAPIKey) {
      return NextResponse.json(
        { message: "Invalid API Key" },
        { status: 401, headers: makeCorsHeaders(origin) },
      );
    }

    const application = await db.application.findFirst({
      where: { id: ApplicationAPIKey.applicationId },
      select: { id: true },
    });

    if (!application) {
      return NextResponse.json(
        { message: "Application not found" },
        { status: 404, headers: makeCorsHeaders(origin) },
      );
    }

    const token = await db.subAccountToken.findFirst({
      where: { token: subAccountToken },
    });

    if (!token) {
      return NextResponse.json(
        { message: "Invalid Sub Account Token" },
        { status: 401, headers: makeCorsHeaders(origin) },
      );
    }

    const subAccount = await db.subAccount.findFirst({
      where: { id: token.subAccountId },
      select: { id: true, balance: true, bankAccountId: true },
    });

    if (!subAccount) {
      return NextResponse.json(
        { message: "Sub Account not found" },
        { status: 404, headers: makeCorsHeaders(origin) },
      );
    }

    if (token.applicationId !== application.id) {
      return NextResponse.json(
        { message: "This token is not for this application" },
        { status: 403, headers: makeCorsHeaders(origin) },
      );
    }

    if (amount > token.limit) {
      return NextResponse.json(
        { message: "Amount is greater than the Token limit" },
        { status: 422, headers: makeCorsHeaders(origin) },
      );
    }

    if (amount <= 0) {
      return NextResponse.json(
        { message: "Amount must be greater than 0" },
        { status: 422, headers: makeCorsHeaders(origin) },
      );
    }

    if (amount > subAccount.balance) {
      return NextResponse.json(
        { message: "Insufficient Sub Account balance" },
        { status: 403, headers: makeCorsHeaders(origin) },
      );
    }

    await db.subAccount.update({
      where: { id: subAccount.id },
      data: { balance: { decrement: amount } },
    });

    await db.application.update({
      where: { id: application.id },
      data: { balance: { increment: amount } },
    });

    await db.transaction.create({
      data: {
        amount,
        transactionType: "SPEND",
        applicationId: application.id,
        bankAccountId: subAccount.bankAccountId,
        subAccountId: subAccount.id,
        productName: productName,
        productId: productId,
      },
    });

    return NextResponse.json(
      { message: "Transaction successful" },
      { status: 200, headers: makeCorsHeaders(origin) },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.issues[0].message },
        { status: 422, headers: makeCorsHeaders(origin) },
      );
    }

    return NextResponse.json(
      { message: `Error processing the request: ${String(error)}` },
      { status: 500, headers: makeCorsHeaders(origin) },
    );
  } finally {
    await db.$disconnect();
  }
};
