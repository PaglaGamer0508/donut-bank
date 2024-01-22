import { hostName } from "./hostName";
import { BankAccount } from "./types/bank-account";

export const getBankAccount = async (userId: string): Promise<BankAccount> => {
  const bankAccountResponse = await fetch(
    `${hostName}/api/bank-account/${userId}`,
    {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const bankAccountData = await bankAccountResponse.json();
  const { bankAccount } = bankAccountData;
  return bankAccount;
};
