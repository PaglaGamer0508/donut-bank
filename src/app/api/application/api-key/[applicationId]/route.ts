import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface paramProps {
  applicationId: string;
}

export const GET = async (req: Request, { params }: { params: paramProps }) => {
  try {
    const { applicationId } = params;
    const apiKey = await db.aPIKey.findFirst({
      where: {
        applicationId,
      },
    });

    if (!apiKey) {
      return new NextResponse("API Key found", {
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
