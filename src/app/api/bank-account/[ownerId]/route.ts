import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface paramProps {
  ownerId: string;
}

export const GET = async (req: Request, { params }: { params: paramProps }) => {
  try {
    const { ownerId } = params;

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

    const bankAccountData = await db.bankAccount.findFirst({
      where: {
        ownerId,
      },
      select: {
        id: true,
        accountName: true,
        bankAccountNumber: true,
        balance: true,
        image: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        ownerId: true,
      },
    });

    if (!bankAccountData) {
      return new NextResponse("Bank Account Not Found", { status: 404 });
    }

    // getting the transactions
    const transactions = await db.transaction.findMany({
      where: {
        OR: [
          {
            receiverBankAccountId: bankAccountData.id,
          },
          {
            bankAccountId: bankAccountData.id,
          },
        ],
      },
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });

    const bankAccount = {
      ...bankAccountData,
      transactions,
    };

    return NextResponse.json(
      { message: "Bank Account found Successful!", bankAccount },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(`Error processing the request: ${error}`, {
      status: 500,
    });
  } finally {
    await db.$disconnect();
  }
};
