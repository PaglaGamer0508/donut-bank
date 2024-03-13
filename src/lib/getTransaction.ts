import { hostName } from "./hostName";
import { Transaction } from "./types/transaction";

export const getTransaction = async (
  transactionId: string
): Promise<Transaction | null> => {
  const transactionResponse = await fetch(
    `${hostName}/api/bank-account/transaction/${transactionId}?apiKey=${process.env.API_KEY}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (transactionResponse.status === 404) {
    return null;
  }

  const transactionData = await transactionResponse.json();
  const { transaction } = transactionData;
  return transaction;
};
