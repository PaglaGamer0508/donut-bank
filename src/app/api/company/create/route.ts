import { db } from "@/lib/db";
import { CreateCompanyValidator } from "@/lib/validators/CreateCompanyValidator";
import { NextResponse } from "next/server";
import { z } from "zod";

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const body = await req.json();
    const { companyLogo, companyName, email, userId } =
      CreateCompanyValidator.parse(body);

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

    const companyExists = await db.company.findFirst({
      where: { ownerId: userId },
      select: {
        id: true,
      },
    });

    if (companyExists) {
      return new NextResponse(`Company already exists`, {
        status: 400,
      });
    }

    // creating the company
    await db.company.create({
      data: {
        logo: companyLogo,
        name: companyName,
        email,
        ownerId: userId,
        balance: 1_000_000,
      },
    });

    return new NextResponse(`Company created successfully`, {
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
