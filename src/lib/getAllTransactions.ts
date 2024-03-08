import { hostName } from "./hostName";
import { Transaction } from "./types/transaction";

export const getAllTransactions = async (
  bankAccountId: string,
  page: number = 1,
  pageSize: number = 10
): Promise<Transaction[]> => {
  const transactionsResponse = await fetch(
    `${hostName}/api/bank-account/transaction?apiKey=${process.env.API_KEY}&bankAccountId=${bankAccountId}&page=${page}&pageSize=${pageSize}`,
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
