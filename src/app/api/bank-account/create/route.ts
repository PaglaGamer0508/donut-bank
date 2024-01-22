import { db } from "@/lib/db";
import { generateBankAccountId } from "@/lib/generateBankAccountId";
import { CreateBankAccountValidator } from "@/lib/validators/CreateBankAccountValidator";
import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const body = await req.json();
    const { ownerId, accountName, password, email, image } =
      CreateBankAccountValidator.parse(body);

    // search for the user in the database with the ownerId
    const userExist = await db.user.findFirst({
      where: {
        id: ownerId,
      },
    });

    if (!userExist) {
      return new NextResponse("Login to create a bank account", {
        status: 401,
      });
    }

    // check if this user already have a bankAccount
    const bankAccountExist = await db.bankAccount.findFirst({
      where: {
        ownerId,
      },
    });

    if (bankAccountExist) {
      return new NextResponse(
        "You already have a bank account, you cannot create another account",
        { status: 403 }
      );
    }

    //? this section is for generating a secure password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // generating a bankAccount_id
    const bankAccount_Id = generateBankAccountId();

    // //! creating the bank account
    await db.bankAccount.create({
      data: {
        accountName,
        email,
        ownerId,
        password: hashedPassword,
        balance: 1000,
        bankAccountNumber: bankAccount_Id,
        image,
      },
    });

    return new NextResponse("Bank account created successfully", {
      status: 200,
    });
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
