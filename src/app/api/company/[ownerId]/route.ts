import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface paramProps {
  ownerId: string;
}

export const GET = async (req: Request, { params }: { params: paramProps }) => {
  try {
    const { ownerId } = params;

    const company = await db.company.findFirst({
      where: {
        ownerId,
      },
    });

    if (!company) {
      return new NextResponse("Company not found", {
        status: 404,
      });
    }

    return NextResponse.json(
      { message: "Company found", company },
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
