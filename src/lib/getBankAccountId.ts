import { db } from "./db";

export const getBankAccountId = async (userId: string) => {
  try {
    const bankAccount = await db.bankAccount.findFirst({
      where: {
        ownerId: userId,
      },
      select: {
        id: true,
      },
    });

    const bankAccountId = bankAccount?.id;

    return bankAccountId;
  } catch (error) {
    console.error(error);
  } finally {
    db.$disconnect();
  }
};
