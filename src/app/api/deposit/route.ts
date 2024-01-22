import { db } from "@/lib/db";
import { isInteger } from "@/lib/isInteger";
import { DepositValidator } from "@/lib/validators/DepositValidator";
import { NextResponse } from "next/server";
import { z } from "zod";

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const body = await req.json();
    const { amount, bankAccountId, userId } = DepositValidator.parse(body);

    if (isInteger(amount) === false) {
      return new NextResponse("Invalid amount, amount must be an integer", {
        status: 400,
      });
    }

    // check if the bankAccount is user's
    const bankAccount = await db.bankAccount.findFirst({
      where: {
        id: bankAccountId,
        ownerId: userId,
      },
    });

    if (!bankAccount) {
      return new NextResponse("Bank account not found", { status: 404 });
    }

    // update the balance
    await db.bankAccount.update({
      where: {
        id: bankAccountId,
      },
      data: {
        balance: {
          increment: amount,
        },
      },
    });

    // create a transaction
    await db.transaction.create({
      data: {
        bankAccountId,
        amount,
        transactionType: "DEPOSIT",
      },
    });
    return new NextResponse("Deposit successful", { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(error.issues[0].message, {
        status: 422,
      });
    }

    return new NextResponse("Error processing the request", {
      status: 500,
    });
  } finally {
    await db.$disconnect();
  }
};
