import { db } from "./db";

export const hasSubAccount = async (bankAccountId: string) => {
  try {
    const subAccountExist = await db.subAccount.findFirst({
      where: {
        bankAccountId,
      },
      select: {
        id: true,
      },
    });

    return subAccountExist ? true : false;
  } catch (error) {
    console.error("There was a error checking for Sub Account", error);
  } finally {
    await db.$disconnect();
  }
};
