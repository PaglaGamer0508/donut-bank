import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface paramProps {
  transactionId: string;
}

export const GET = async (req: Request, { params }: { params: paramProps }) => {
  try {
    const { transactionId } = params;

    const transaction = await db.transaction.findFirst({
      where: {
        id: transactionId,
      },
      include: {
        application: {
          select: {
            id: true,
            name: true,
            logo: true,
            applicationId: true,
          },
        },
        bankAccount: {
          select: {
            id: true,
            accountName: true,
            bankAccountNumber: true,
            image: true,
          },
        },
        receiverBankAccount: {
          select: {
            id: true,
            accountName: true,
            bankAccountNumber: true,
            image: true,
          },
        },
        subAccount: {
          select: {
            id: true,
            name: true,
            creditCard_number: true,
            creditCard_color: true,
          },
        },
      },
    });

    if (!transaction) {
      return new NextResponse("Transaction not found", {
        status: 404,
      });
    }

    return NextResponse.json(
      { message: "Transaction Found", transaction },
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
