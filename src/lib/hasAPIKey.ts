import { db } from "./db";

export const hasAPIKey = async (applicationId: string) => {
  const apiKeyExist = await db.aPIKey.findFirst({
    where: {
      applicationId,
    },
    select: {
      id: true,
    },
  });

  return apiKeyExist ? true : false;
};
