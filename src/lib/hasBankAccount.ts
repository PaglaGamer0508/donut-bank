import { db } from "./db";

export const hasBankAccount = async (userId: string) => {
  try {
    const hasBankAccount = await db.bankAccount.findFirst({
      where: {
        ownerId: userId,
      },
      select: {
        id: true,
      },
    });
    if (!hasBankAccount) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error("There was a error checking for Bank Account", error);
  } finally {
    await db.$disconnect();
  }
};
