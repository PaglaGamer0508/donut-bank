import { Application } from "./application";
import { BankAccount } from "./bank-account";
import { SubAccount } from "./sub-account";

export enum TransactionType {
  DEPOSIT = "DEPOSIT",
  WITHDRAW = "WITHDRAW",
  SPEND = "SPEND",
  SEND = "SEND",
  ADD = "ADD",
  TAKE = "TAKE",
  RECEIVED = "RECEIVED",
}

export type Transaction = {
  id: string;
  amount: number;
  bankAccountId: string;
  bankAccount: Pick<BankAccount, "id" | "accountName" | "image">;
  transactionType: TransactionType;
  createdAt: Date;

  subAccountId: string | null;
  subAccount: Pick<SubAccount, "id" | "name"> | null;

  applicationId: string | null;
  application: Pick<Application, "id" | "name" | "logo"> | null;
  productName: string | null;
  productId: string | null;

  receiverBankAccountId: string | null;
  receiverBankAccount: Pick<BankAccount, "id" | "accountName" | "image"> | null;
};
