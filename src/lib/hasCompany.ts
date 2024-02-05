import { db } from "./db";

export const hasCompany = async (userId: string) => {
  const companyExist = await db.company.findFirst({
    where: {
      ownerId: userId,
    },
    select: {
      id: true,
    },
  });

  if (companyExist) {
    return true;
  }
  return false;
};
