import { BankAccount } from "./bank-account";

export type QuickSendMoneyAccounts = {
  id: string;
  bankAccountId: string;
  savedBankAccountId: string;
  savedBankAccount: Pick<
    BankAccount,
    "id" | "accountName" | "image" | "bankAccountNumber"
  >;
};
