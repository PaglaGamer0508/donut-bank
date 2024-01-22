import { db } from "@/lib/db";
import { generateCreditCardNumber } from "@/lib/generateCreditCardNumber";
import { CreateSubAccountValidator } from "@/lib/validators/CreateSubAccountValidator";
import { NextResponse } from "next/server";
import { z } from "zod";

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const body = await req.json();
    const { bankAccountId, creditCard_color, name } =
      CreateSubAccountValidator.parse(body);

    // Check if the user already has three sub-accounts
    const subAccountCount = await db.subAccount.count({
      where: {
        bankAccountId,
      },
    });

    if (subAccountCount >= 3) {
      return new NextResponse("You can only have 3 sub accounts", {
        status: 403,
      });
    }

    // Check if a sub-account with the same name already exists
    const existingSubAccount = await db.subAccount.findFirst({
      where: {
        bankAccountId,
        name,
      },
    });

    if (existingSubAccount) {
      return new NextResponse("Sub account with the same name already exists", {
        status: 422,
      });
    }

    // Generate the creditCardNumber
    const creditCardNumber = generateCreditCardNumber();

    // Create the sub-account
    await db.subAccount.create({
      data: {
        name,
        bankAccountId,
        creditCard_color,
        creditCard_number: creditCardNumber,
        balance: 0,
      },
    });

    return new NextResponse("Sub account created successfully", {
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
