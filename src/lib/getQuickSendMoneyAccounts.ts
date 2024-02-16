import { hostName } from "./hostName";
import { QuickSendMoneyAccount } from "./types/quick-send-money-account";

export const getQuickSendMoneyAccounts = async (
  bankAccountId: string
): Promise<QuickSendMoneyAccount[]> => {
  const quickSendMoneyAccountsResponse = await fetch(
    `${hostName}/api/quick-send-money-account?bankAccountId=${bankAccountId}`
  );

  if (quickSendMoneyAccountsResponse.status === 404) {
    return [];
  }

  const quickSendMoneyAccountsData =
    await quickSendMoneyAccountsResponse.json();

  const { quickSendMoneyAccounts } = quickSendMoneyAccountsData;

  return quickSendMoneyAccounts;
};
