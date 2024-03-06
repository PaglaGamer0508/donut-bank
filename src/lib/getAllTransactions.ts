import { hostName } from "./hostName";
import { Transaction } from "./types/transaction";

export const getAllTransactions = async (
  bankAccountId: string
): Promise<Transaction[]> => {
  const transactionsResponse = await fetch(
    `${hostName}/api/transaction?apiKey=${process.env.API_KEY}&bankAccountId=${bankAccountId}`,
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
