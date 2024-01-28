import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface paramProps {
  bankAccountId: string;
}

export const GET = async (req: Request, { params }: { params: paramProps }) => {
  try {
    const { bankAccountId } = params;
    const quickSendMoneyAccounts = await db.quickSendMoney.findMany({
      where: {
        bankAccountId,
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
