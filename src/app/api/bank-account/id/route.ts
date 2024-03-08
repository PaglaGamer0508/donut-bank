import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: NextResponse) => {
  try {
    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("userId");
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const bankAccount = await db.bankAccount.findFirst({
      where: {
        ownerId: userId,
      },
      select: {
        id: true,
      },
    });

    if (!bankAccount) {
      return new NextResponse("Bank Account not found", { status: 401 });
    }

    return NextResponse.json(
      { message: "Bank Account found", bankAccountId: bankAccount.id },
      {
        status: 200,
      }
    );
  } catch (error) {
    return new NextResponse(`Error processing the request: ` + error, {
      status: 500,
    });
  } finally {
    await db.$disconnect();
  }
};
