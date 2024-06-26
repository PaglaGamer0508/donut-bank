import { Application } from "./application";
import { BankAccount } from "./bank-account";
import { SubAccount } from "./sub-account";

export enum TransactionType {
  DEPOSIT = "DEPOSIT",
  WITHDRAW = "WITHDRAW",
  SEND = "SEND",
  SPEND = "SPEND",
  ADD = "ADD",
  TAKE = "TAKE",
  RECEIVED = "RECEIVED",
}

export type Transaction = {
  id: string;
  amount: number;
  bankAccountId: string;
  bankAccount: Pick<
    BankAccount,
    "id" | "accountName" | "image" | "bankAccountNumber"
  >;
  transactionType: TransactionType;
  createdAt: Date;

  subAccountId: string | null;
  subAccount: Pick<
    SubAccount,
    "id" | "name" | "creditCard_number" | "creditCard_color"
  > | null;

  applicationId: string | null;
  application: Pick<
    Application,
    "id" | "name" | "logo" | "applicationId"
  > | null;
  productName: string | null;
  productId: string | null;

  receiverBankAccountId: string | null;
  receiverBankAccount: Pick<
    BankAccount,
    "id" | "accountName" | "image" | "bankAccountNumber"
  > | null;
};
