// ************ THIS FILE HAS 3 APIs *************

import { RemoveQuickSendMoneyAccountValidator } from "@/lib/validators/RemoveQuickSendMoneyAccountValidator";
import { db } from "@/lib/db";
import { getBankAccount } from "@/lib/getBankAccount";
import { NextResponse } from "next/server";
import { AddQuickSendMoneyAccountValidator } from "@/lib/validators/AddQuickSendMoneyAccountValidator";
import { z } from "zod";

//************************** This API is for returning all the quick-send-money-accounts of the bankAccount
export const GET = async (req: Request, res: NextResponse) => {
  try {
    const { searchParams } = new URL(req.url);

    const bankAccountId = searchParams.get("bankAccountId");

    if (!bankAccountId) {
      return new NextResponse("Bank account id is required", {
        status: 400,
      });
    }

    const quickSendMoneyAccounts = await db.quickSendMoney.findMany({
      where: {
        bankAccountId: bankAccountId,
      },
      include: {
        savedBankAccount: {
          select: {
            id: true,
            accountName: true,
            image: true,
            bankAccountNumber: true,
          },
        },
      },
    });

    if (quickSendMoneyAccounts.length === 0) {
      return new NextResponse("No quick send money accounts found", {
        status: 404,
      });
    }

    return NextResponse.json(
      {
        message: "Quick send money accounts found",
        quickSendMoneyAccounts,
      },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(`Error processing the request: ` + error, {
      status: 500,
    });
  } finally {
    await db.$disconnect();
  }
};

//********************** This API is for adding a new quick-send-money account
export const POST = async (req: Request, res: NextResponse) => {
  try {
    const body = await req.json();
    const { bankAccountId, savedBankAccountId } =
      AddQuickSendMoneyAccountValidator.parse(body);

    const quickSendMoneyAccountAlreadyExists =
      await db.quickSendMoney.findFirst({
        where: {
          bankAccountId,
          savedBankAccountId,
        },
      });

    if (quickSendMoneyAccountAlreadyExists) {
      return new NextResponse("Quick send money account already exists", {
        status: 400,
      });
    }

    await db.quickSendMoney.create({
      data: {
        bankAccountId,
        savedBankAccountId,
      },
    });

    return new NextResponse("Quick send money account added successfully", {
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

//! ******************* Delete quick-send-money-account API ************************
export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    const body = await req.json();
    const { quickSendMoneyId, bankAccountId } =
      RemoveQuickSendMoneyAccountValidator.parse(body);

    const quickSendMoney = await db.quickSendMoney.findUnique({
      where: {
        id: quickSendMoneyId,
      },
    });

    if (!quickSendMoney) {
      return new NextResponse(`Quick Send Money record not found`, {
        status: 404,
      });
    }

    // check if the quickSendMoney record actually belong to the user
    if (quickSendMoney.bankAccountId !== bankAccountId) {
      return new NextResponse(
        `Quick Send Money record does not belong to the user`,
        {
          status: 403,
        }
      );
    }

    //* delete the quickSendMoney record
    await db.quickSendMoney.delete({
      where: {
        id: quickSendMoneyId,
      },
    });

    return new NextResponse("Quick Send Money record deleted successfully", {
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
