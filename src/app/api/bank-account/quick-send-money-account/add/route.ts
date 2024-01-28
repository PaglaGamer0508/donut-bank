import { db } from "@/lib/db";
import { AddQuickSendMoneyAccountValidator } from "@/lib/validators/AddQuickSendMoneyAccountValidator";
import { NextResponse } from "next/server";

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
    return new NextResponse(`Error processing the request: ` + error, {
      status: 500,
    });
  } finally {
    await db.$disconnect();
  }
};
