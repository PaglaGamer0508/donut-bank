import { db } from "@/lib/db";
import { generateString } from "@/lib/generateString";
import { CreateAPIKeyValidator } from "@/lib/validators/CreateAPIKeyValidator";
import { NextResponse } from "next/server";
import { z } from "zod";

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const body = await req.json();
    const { applicationId } = CreateAPIKeyValidator.parse(body);

    const application = await db.aPIKey.findFirst({
      where: {
        applicationId,
      },
    });

    if (application) {
      return new NextResponse(`API key already exists`, {
        status: 400,
      });
    }

    // Generate API key
    const generatedAPIKey = generateString(40);

    //* ************ Creating the API key ***************
    await db.aPIKey.create({
      data: {
        applicationId,
        key: generatedAPIKey,
      },
    });

    return new NextResponse(`API key created successfully`, {
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
