import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface paramProps {
  bankAccountId: string;
}

export const GET = async (req: Request, { params }: { params: paramProps }) => {
  try {
    const { bankAccountId } = params;
    const subAccountsExist = await db.subAccount.findFirst({
      where: {
        bankAccountId: bankAccountId,
      },
    });
    if (!subAccountsExist) {
      return new NextResponse("Sub account does not exist", {
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
