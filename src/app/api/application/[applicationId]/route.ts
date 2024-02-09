import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface paramProps {
  applicationId: string;
}

export const GET = async (req: Request, { params }: { params: paramProps }) => {
  try {
    const { applicationId } = params;

    const application = await db.application.findFirst({
      where: {
        applicationId,
      },
    });

    if (!application) {
      return new NextResponse("Application not found", {
        status: 404,
      });
    }

    return NextResponse.json(
      { message: "Application found", application },
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
