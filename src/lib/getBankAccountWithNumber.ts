import { hostName } from "./hostName";
import { BankAccount } from "./types/bank-account";

export const getBankAccountWithNumber = async (
  bankAccountNumber: string
): Promise<BankAccount> => {
  const bankAccountResponse = await fetch(
    `${hostName}/api/quick-send-money-account/${bankAccountNumber}`,
    {
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
