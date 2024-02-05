import { db } from "./db";

export const hasCompany = async (userId: string) => {
  try {
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
  } catch (error) {
    console.error("There was a error checking for Sub Account", error);
  } finally {
    await db.$disconnect();
  }
};
