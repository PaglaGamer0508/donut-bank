import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface paramProps {
  bankAccountNumber: string;
}

export const GET = async (req: Request, { params }: { params: paramProps }) => {
  try {
    const { bankAccountNumber } = params;
    const bankAccount = await db.bankAccount.findFirst({
      where: {
        bankAccountNumber,
      },
      select: {
        id: true,
        accountName: true,
        bankAccountNumber: true,
        image: true,
      },
    });

    if (!bankAccount) {
      return new NextResponse("Bank account not found", {
        status: 404,
      });
    }

    return NextResponse.json(
      { message: "Bank account found successfully", bankAccount },
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
