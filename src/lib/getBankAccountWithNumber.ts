import { hostName } from "./hostName";
import { BankAccount } from "./types/bank-account";

export const getBankAccountWithNumber = async (
  bankAccountNumber: string
): Promise<BankAccount | null> => {
  const bankAccountResponse = await fetch(
    `${hostName}/api/bank-account/${bankAccountNumber}?apiKey=${process.env.API_KEY}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (bankAccountResponse.status === 404) {
    return null;
  }

  const bankAccountData = await bankAccountResponse.json();
  const { bankAccount } = bankAccountData;
  return bankAccount;
};
