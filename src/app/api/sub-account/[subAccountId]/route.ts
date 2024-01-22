import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface paramProps {
  subAccountId: string;
}

export const GET = async (req: Request, { params }: { params: paramProps }) => {
  try {
    const { subAccountId } = params;

    const subAccount = await db.subAccount.findFirst({
      where: {
        id: subAccountId,
      },
    });

    if (!subAccount) {
      return new NextResponse("Sub Account not found", { status: 404 });
    }

    return NextResponse.json(
      { message: "Sub Account found Successful!", subAccount },
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
