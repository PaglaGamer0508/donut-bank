import { db } from "@/lib/db";
import { AddMoneyValidator } from "@/lib/validators/AddMoneyValidator";
import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const body = await req.json();
    const { amount, subAccountId, bankAccountId, password } =
      AddMoneyValidator.parse(body);

    const subAccount = await db.subAccount.findFirst({
      where: {
        id: subAccountId,
      },
    });

    if (!subAccount) {
      return new NextResponse("Sub account not found", {
        status: 404,
      });
    }

    if ((subAccount.bankAccountId === bankAccountId) === false) {
      return new NextResponse(
        "Sub account does not belong to the bank account",
        {
          status: 400,
        }
      );
    }

    // get the bank account password
    const bankAccount = await db.bankAccount.findFirst({
      where: {
        id: bankAccountId,
      },
      select: {
        password: true,
      },
    });

    if (!bankAccount) {
      return new NextResponse("Bank account not found", {
        status: 404,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      bankAccount?.password
    );

    if (!isPasswordCorrect) {
      return new NextResponse("Incorrect password", {
        status: 401,
      });
    }

    // remove ammount from the bank account
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

    // add ammount to the sub account
    await db.subAccount.update({
      where: {
        id: subAccountId,
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
        amount,
        transactionType: "ADD",
        bankAccountId,
        subAccountId,
      },
    });

    return new NextResponse("Add Money to Sub Account Successful", {
      status: 200,
    });
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
