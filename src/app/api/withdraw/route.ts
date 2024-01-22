import { db } from "@/lib/db";
import { isInteger } from "@/lib/isInteger";
import { WithdrawValidator } from "@/lib/validators/withdrawValidator";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const body = await req.json();
    const { userId, amount, bankAccountId, password } =
      WithdrawValidator.parse(body);

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

    // check if the user has enough balance
    if (bankAccount.balance < amount) {
      return new NextResponse("Insufficient balance", { status: 400 });
    }

    // check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      bankAccount.password
    );

    if (!isPasswordCorrect) {
      return new NextResponse("Incorrect password", { status: 400 });
    }

    // update the balance
    await db.bankAccount.update({
      where: {
        id: bankAccountId,
      },
      data: {
        balance: {
          decrement: amount,
        },
      },
    });

    // create a transaction
    await db.transaction.create({
      data: {
        bankAccountId,
        amount,
        transactionType: "WITHDRAW",
      },
    });

    return new NextResponse("Withdraw successful", { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(error.issues[0].message, {
        status: 422,
      });
    }

    return new NextResponse(`Error processing the request: ${error}`, {
      status: 500,
    });
  } finally {
    await db.$disconnect();
  }
};
