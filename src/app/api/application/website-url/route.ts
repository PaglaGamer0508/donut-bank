// ************************ this file has 2 APIs ****************************

import { db } from "@/lib/db";
import { AddEditApplicationURLValidator } from "@/lib/validators/AddEditApplicationURLValidator";
import { DeleteURLValidator } from "@/lib/validators/DeleteURLValidator";
import { NextResponse } from "next/server";
import { z } from "zod";

// ************************ API 1: Add/Edit Application URL ****************************
export const POST = async (req: Request, res: NextResponse) => {
  try {
    const body = await req.json();
    const { url, application_id } = AddEditApplicationURLValidator.parse(body);

    const application = await db.application.findFirst({
      where: { id: application_id },
      select: {
        id: true,
      },
    });

    if (!application) {
      return new NextResponse(`Application not found`, {
        status: 404,
      });
    }

    await db.application.update({
      where: {
        id: application_id,
      },
      data: {
        websiteUrl: url,
      },
    });

    return new NextResponse("Application URL updated successfully", {
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

//! ************************ API 2: Remove Application URL ****************************
export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    const body = await req.json();
    const { application_id } = DeleteURLValidator.parse(body);

    const application = await db.application.findFirst({
      where: { id: application_id },
      select: {
        id: true,
      },
    });

    if (!application) {
      return new NextResponse(`Application not found`, {
        status: 404,
      });
    }

    await db.application.update({
      where: {
        id: application_id,
      },
      data: {
        websiteUrl: null,
      },
    });

    return new NextResponse("Application URL deleted successfully", {
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
