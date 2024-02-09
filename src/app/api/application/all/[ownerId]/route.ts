import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface paramProps {
  ownerId: string;
}

export const GET = async (req: Request, { params }: { params: paramProps }) => {
  try {
    const { ownerId } = params;
    const applications = await db.application.findMany({
      where: {
        ownerId,
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
