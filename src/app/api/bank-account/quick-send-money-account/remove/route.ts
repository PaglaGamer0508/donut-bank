import { db } from "@/lib/db";
import { RemoveQuickSendMoneyAccountValidator } from "@/lib/validators/RemoveQuickSendMoneyAccountValidator";
import { NextResponse } from "next/server";

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

    //! delete the quickSendMoney record
    await db.quickSendMoney.delete({
      where: {
        id: quickSendMoneyId,
      },
    });

    return new NextResponse("Quick Send Money record deleted successfully", {
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
