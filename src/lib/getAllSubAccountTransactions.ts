import { hostName } from "./hostName";
import { SubAccountTransaction } from "./types/sub-account-transaction";

export const getAllSubAccountTransactions = async (
  subAccountId: string,
  page: number = 1,
  pageSize: number = 10
): Promise<SubAccountTransaction[]> => {
  const transactionsResponse = await fetch(
    `${hostName}/api/sub-account/transaction?subAccountId=${subAccountId}&page=${page}&pageSize=${pageSize}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const transactionsData = await transactionsResponse.json();

  const { transactions } = transactionsData;
  return transactions;
};
