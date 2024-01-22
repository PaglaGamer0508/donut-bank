import { db } from "./db";

export const getSubAccountCount = async (bankAccountId: string) => {
  try {
    const subAccount = await db.subAccount.count({
      where: {
        bankAccountId,
      },
    });

    return subAccount;
  } catch (error) {
    console.error("There was a error checking for Bank Account", error);
  } finally {
    await db.$disconnect();
  }
};
