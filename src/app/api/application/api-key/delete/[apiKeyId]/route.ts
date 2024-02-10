import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface paramProps {
  apiKeyId: string;
}
export const DELETE = async (
  req: Request,
  { params }: { params: paramProps }
) => {
  try {
    const { apiKeyId } = params;

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

    await db.aPIKey.delete({
      where: {
        id: apiKeyId,
      },
    });

    return NextResponse.json({ message: "API Key deleted" }, { status: 200 });
  } catch (error) {
    return new NextResponse(`Error processing the request: ` + error, {
      status: 500,
    });
  } finally {
    await db.$disconnect();
  }
};
