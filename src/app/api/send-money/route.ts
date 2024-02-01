import { db } from "@/lib/db";
import { SendMoneyValidator } from "@/lib/validators/SendMoneyValidator";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const body = await req.json();
    const { amount, bankAccountId, password, receiverBankAccountId } =
      SendMoneyValidator.parse(body);

    const bankAccount = await db.bankAccount.findUnique({
      where: {
        id: bankAccountId,
      },
    });

    if (!bankAccount) {
      return new NextResponse(
        `Bank account not found, Please try again later`,
        {
          status: 404,
        }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      bankAccount?.password
    );

    if (!isPasswordCorrect) {
      return new NextResponse(`Incorrect password`, {
        status: 400,
      });
    }

    // removing money from the bank Account
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

    // adding money to the recei bank Account
    await db.bankAccount.update({
      where: {
        id: receiverBankAccountId,
      },
      data: {
        balance: {
          increment: amount,
        },
      },
    });

    // creating a transaction
    await db.transaction.create({
      data: {
        amount,
        bankAccountId,
        receiverBankAccountId,
        transactionType: "SEND",
      },
    });

    return new NextResponse("Money sent successfully", {
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
