// ************************ This file has 2 APIs  ****************************
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { generateCreditCardNumber } from "@/lib/generateCreditCardNumber";
import { CreateSubAccountValidator } from "@/lib/validators/CreateSubAccountValidator";
import bcrypt from "bcrypt";
import { z } from "zod";

// *********** GET all Sub Accounts ***********
export const GET = async (req: Request, res: NextResponse) => {
  try {
    const { searchParams } = new URL(req.url);
    const bankAccountId = searchParams.get("bankAccountId");

    if (!bankAccountId) {
      return new NextResponse("Bank account id is required", {
        status: 400,
      });
    }

    const subAccounts = await db.subAccount.findMany({
      where: {
        bankAccountId: bankAccountId,
      },
      select: {
        id: true,
        name: true,
        balance: true,
        creditCard_color: true,
        creditCard_number: true,
      },
    });

    if (!subAccounts) {
      return new NextResponse("Sub accounts not found", {
        status: 404,
      });
    }

    return NextResponse.json({
      message: "Sub accounts retrieved successfully",
      status: 200,
      subAccounts,
    });
  } catch (error) {
    return new NextResponse(`Error processing the request: ${error}`, {
      status: 500,
    });
  } finally {
    await db.$disconnect();
  }
};

// *********** Create a Sub Account ***********
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

    //? this section is for generating a secure password with bcrypt
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    // Create the sub-account
    await db.subAccount.create({
      data: {
        name,
        bankAccountId,
        creditCard_color,
        creditCard_number: creditCardNumber,
        balance: 0,
        // password: hashedPassword,
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
