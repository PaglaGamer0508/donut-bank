import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: NextResponse) => {
  // ********* PAGINATION **********
  // page number
  const { searchParams } = new URL(req.url);
  const pageQueryParam = searchParams.get("page");
  const page = pageQueryParam ? Number.parseInt(pageQueryParam) : 1;

  // page size
  const pageSizeQueryParam = searchParams.get("pageSize");
  const pageSize = pageSizeQueryParam
    ? Number.parseInt(pageSizeQueryParam)
    : 10;

  const startIndex = (page - 1) * pageSize;

  try {
    const { searchParams } = new URL(req.url);
    const subAccountId = searchParams.get("subAccountId");

    if (!subAccountId) {
      return new NextResponse(`Sub-account ID is missing`, {
        status: 400,
      });
    }

    const transactions = await db.transaction.findMany({
      where: {
        subAccountId,
      },
      include: {
        application: {
          select: {
            id: true,
            name: true,
            logo: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: startIndex,
      take: pageSize,
    });

    if (!transactions) {
      return new NextResponse(`No transactions found`, {
        status: 404,
      });
    }

    const totalTransactions = await db.transaction.count({
      where: {
        subAccountId,
      },
    });

    return NextResponse.json(
      {
        message: "Sub Account Transactions found",
        transactions,
        totalTransactions,
      },
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
