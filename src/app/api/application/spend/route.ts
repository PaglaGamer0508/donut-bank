import { db } from "@/lib/db";
import { SpendMoneyValidator } from "@/lib/validators/SpendMoneyValidator";
import { NextResponse } from "next/server";
import { z } from "zod";
import { limiter } from "./limiter";

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const origin = req.headers.get("origin");
    // Rate limiting logic 100 tokens per minute, fire immediately if there are tokens available.
    const remaining = await limiter.removeTokens(1);
    if (remaining < 0) {
      return new NextResponse("Too many requests", {
        status: 429,
        headers: {
          "Access-Control-Allow-Origin": origin || "*",
          "Content-Type": "text/plain",
        },
      });
    }

    const body = await req.json();
    const { amount, apiKey, subAccountToken, productName, productId } =
      SpendMoneyValidator.parse(body);

    const isInt = Number.isInteger(amount);

    if (!isInt) {
      return new NextResponse("Amount must be an integer", {
        status: 422,
      });
    }

    const ApplicationAPIKey = await db.aPIKey.findFirst({
      where: {
        key: apiKey,
      },
    });

    if (!ApplicationAPIKey) {
      return new NextResponse("Invalid API Key", {
        status: 401,
      });
    }

    const application = await db.application.findFirst({
      where: {
        id: ApplicationAPIKey.applicationId,
      },
      select: {
        id: true,
      },
    });

    if (!application) {
      return new NextResponse("Application not found", {
        status: 401,
      });
    }

    const token = await db.subAccountToken.findFirst({
      where: {
        token: subAccountToken,
      },
    });

    if (!token) {
      return new NextResponse("Invalid Sub Account Token", {
        status: 401,
      });
    }

    const subAccount = await db.subAccount.findFirst({
      where: {
        id: token.subAccountId,
      },
      select: {
        id: true,
        balance: true,
        bankAccountId: true,
      },
    });

    if (!subAccount) {
      return new NextResponse("Sub Account not found", {
        status: 401,
      });
    }

    if (token.applicationId !== application.id) {
      return new NextResponse("This token is not for this application", {
        status: 401,
      });
    }

    if (amount > token.limit) {
      return new NextResponse("Amount is greater than the Token limit", {
        status: 422,
      });
    }

    if (amount <= 0) {
      return new NextResponse("Amount must be greater than 0", {
        status: 422,
      });
    }

    if (amount > subAccount.balance) {
      return new NextResponse("Insufficient Sub Account balance", {
        status: 422,
      });
    }

    // updating the balance of the Sub-Account
    await db.subAccount.update({
      where: {
        id: subAccount.id,
      },
      data: {
        balance: {
          decrement: amount,
        },
      },
    });

    // updating the balance of the Application
    await db.application.update({
      where: {
        id: application.id,
      },
      data: {
        balance: {
          increment: amount,
        },
      },
    });

    // creating the transaction
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

    return new NextResponse("Transaction successful", {
      status: 200,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(error.issues[0].message, {
        status: 422,
      });
    }

    return new NextResponse(`Error processing the request: ` + error, {
      status: 500,
    });
  } finally {
    await db.$disconnect();
  }
};
