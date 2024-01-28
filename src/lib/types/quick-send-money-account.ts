import { BankAccount } from "./bank-account";

export type QuickSendMoneyAccount = {
  id: string;
  bankAccountId: string;
  savedBankAccountId: string;
  savedBankAccount: Pick<
    BankAccount,
    "id" | "accountName" | "image" | "bankAccountNumber"
  >;
};
