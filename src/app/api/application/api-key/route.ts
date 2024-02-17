// ************ THIS FILE HAS 3 APIs *************

import { db } from "@/lib/db";
import { generateString } from "@/lib/generateString";
import { CreateAPIKeyValidator } from "@/lib/validators/CreateAPIKeyValidator";
import { DeleteAPIKeyValidator } from "@/lib/validators/DeleteAPIKeyValidator";
import { NextResponse } from "next/server";
import { z } from "zod";

// ****************** GET the API Key *******************
export const GET = async (req: Request, res: NextResponse) => {
  try {
    const { searchParams } = new URL(req.url);
    const applicationId = searchParams.get("applicationId");

    if (!applicationId) {
      return new NextResponse("application ID is required", {
        status: 400,
      });
    }

    const apiKey = await db.aPIKey.findFirst({
      where: {
        applicationId,
      },
    });

    if (!apiKey) {
      return new NextResponse("API Key not found", {
        status: 404,
      });
    }

    return NextResponse.json(
      { message: "API Key found", apiKey },
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

//* ************ Create a New API key ***************
export const POST = async (req: Request, res: NextResponse) => {
  try {
    const body = await req.json();
    const { applicationId } = CreateAPIKeyValidator.parse(body);

    const application = await db.aPIKey.findFirst({
      where: {
        id: applicationId,
      },
    });

    if (application) {
      return new NextResponse(`API key already exists`, {
        status: 400,
      });
    }

    // Generate API key
    const generatedAPIKey = generateString(40);

    //* Creating the API key
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

//* ************ Delete an API key ***************
export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    const body = await req.json();
    const { applicationId, apiKeyId } = DeleteAPIKeyValidator.parse(body);

    const apiKey = await db.aPIKey.findFirst({
      where: {
        id: apiKeyId,
      },
    });

    if (!apiKey) {
      return new NextResponse("API Key not found", {
        status: 404,
      });
    }

    if (apiKey?.applicationId !== applicationId) {
      return new NextResponse(
        "This API Key does not belong to this application",
        { status: 403 }
      );
    }

    //! Delete the API Key
    await db.aPIKey.delete({
      where: {
        id: apiKeyId,
      },
    });

    return NextResponse.json({ message: "API Key deleted" }, { status: 200 });
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
