import { db } from "./db";

export const hasApplication = async (userId: string) => {
  const applicationExist = await db.application.findFirst({
    where: {
      ownerId: userId,
    },
    select: {
      id: true,
    },
  });

  return applicationExist ? true : false;
};
