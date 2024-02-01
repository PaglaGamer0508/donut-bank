import { hostName } from "./hostName";
import { QuickSendMoneyAccount } from "./types/quick-send-money-account";

export const getQuickSendMoneyAccounts = async (
  bankAccountId: string
): Promise<QuickSendMoneyAccount[]> => {
  // try {
  const quickSendMoneyAccountsResponse = await fetch(
    `${hostName}/api/quick-send-money-account/all/${bankAccountId}`
  );

  if (quickSendMoneyAccountsResponse.status === 404) {
    return [];
  }

  const quickSendMoneyAccountsData =
    await quickSendMoneyAccountsResponse.json();

  const { quickSendMoneyAccounts } = quickSendMoneyAccountsData;

  return quickSendMoneyAccounts;
  // } catch (error) {
  //   throw new Error(`Error getting quick send money accounts: ${error}`);
  // }
};
