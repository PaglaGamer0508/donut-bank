// *************** this file has 2 APIs ****************

import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { generateApplicationId } from "@/lib/generateApplicationId";
import { CreateApplicationValidator } from "@/lib/validators/CreateApplicationValidator";
import { z } from "zod";

// ********************  This API is for Getting All Applications  *********************
export const GET = async (req: Request, res: NextResponse) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const applications = await db.application.findMany({
      where: {
        ownerId: userId,
      },
    });

    return NextResponse.json(
      { message: "Applications Fetched", applications },
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

// ********************  This API is for Creating a new Application  *********************
export const POST = async (req: Request, res: NextResponse) => {
  try {
    const body = await req.json();
    const { applicationLogo, applicationName, email, userId } =
      CreateApplicationValidator.parse(body);

    const userExist = await db.user.findFirst({
      where: { id: userId },
      select: {
        id: true,
      },
    });

    if (!userExist) {
      return new NextResponse(`User does not exist`, {
        status: 400,
      });
    }

    const applicationId = generateApplicationId();

    // creating the application
    await db.application.create({
      data: {
        logo: applicationLogo,
        name: applicationName,
        email,
        ownerId: userId,
        balance: 1_00_000,
        applicationId,
      },
    });

    return new NextResponse(`application created successfully`, {
      status: 200,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(error.issues[0].message, {
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
