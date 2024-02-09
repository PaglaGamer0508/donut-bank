import { db } from "@/lib/db";
import { generateapplicationId } from "@/lib/generateCompanyId";
import { CreateApplicationValidator } from "@/lib/validators/CreateApplicationValidator";
import { NextResponse } from "next/server";
import { z } from "zod";

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

    const applicationId = generateapplicationId();

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
