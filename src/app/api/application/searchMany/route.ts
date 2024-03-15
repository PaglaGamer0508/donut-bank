import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: NextResponse) => {
  try {
    const { searchParams } = new URL(req.url);
    const searchString = searchParams.get("searchString");

    if (!searchString) {
      return new NextResponse("Search string is required", {
        status: 400,
      });
    }

    const applications = await db.application.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchString,
            },
          },
          {
            id: {
              contains: searchString,
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        applicationId: true,
        logo: true,
        websiteUrl: true,
      },
    });

    return NextResponse.json(
      { message: "Application Seach Results", applications },
      {
        status: 200,
      }
    );
  } catch (error) {
    return new NextResponse(`Error processing the request: ` + error, {
      status: 500,
    });
  } finally {
    await db.$disconnect();
  }
};
