// ************************ THIS file has 2 APIs ****************************

import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { CreateSubAccountTokenValidator } from "@/lib/validators/CreateSubAccountTokenValidator";
import { generateString } from "@/lib/generateString";
import { z } from "zod";

// ************ GET all the token of a subAccount *************
export const GET = async (req: Request, res: NextResponse) => {
  try {
    const { searchParams } = new URL(req.url);
    const subAccountId = searchParams.get("subAccountId");

    if (!subAccountId) {
      return new NextResponse("Sub Account ID is required", { status: 400 });
    }

    const subAccount = await db.subAccount.findUnique({
      where: {
        id: subAccountId,
      },
    });

    if (!subAccount) {
      return new NextResponse("Sub Account not found", { status: 404 });
    }

    const tokens = await db.subAccountToken.findMany({
      where: {
        subAccountId: subAccountId,
      },
      include: {
        application: {
          select: {
            id: true,
            name: true,
            applicationId: true,
            logo: true,
            websiteUrl: true,
          },
        },
      },
    });

    if (!tokens) {
      return new NextResponse("Token not found", { status: 404 });
    }

    return NextResponse.json(
      { message: "Token found", tokens },
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

// ************ Create a new token for a subAccount *************
export const POST = async (req: Request, res: NextResponse) => {
  try {
    const body = await req.json();
    const { applicationId, limit, subAccountId } =
      CreateSubAccountTokenValidator.parse(body);

    const subAccountToken = await db.subAccountToken.findFirst({
      where: {
        subAccountId,
        applicationId,
      },
    });

    if (subAccountToken) {
      return new NextResponse("Token already exists", { status: 400 });
    }

    const token = generateString(20);
    await db.subAccountToken.create({
      data: {
        limit,
        applicationId,
        subAccountId,
        token,
      },
    });

    return new NextResponse(`SubAccount Token Created`, {
      status: 200,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(error.message, {
        status: 422,
      });
    }

    return new NextResponse(`Error processing the request: ` + error, {
      status: 500,
    });
  } finally {
    await db.$disconnect();
  }
};
