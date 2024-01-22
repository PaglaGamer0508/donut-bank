import { db } from "./db";
import { QuickSendMoneyAccounts } from "./types/quick-send-money-accounts";

export const getQuickSendMoneyAccounts = async (
  bankAccountId: string
): Promise<QuickSendMoneyAccounts[]> => {
  try {
    const quickSendMoneyAccounts = await db.quickSendMoney.findMany({
      where: {
        bankAccountId,
      },
      include: {
        savedBankAccount: {
          select: {
            id: true,
            accountName: true,
            image: true,
            bankAccountNumber: true,
          },
        },
      },
    });
    return quickSendMoneyAccounts;
  } catch (error) {
    throw new Error("Error getting quick send money accounts");
  } finally {
    await db.$disconnect();
  }
};
