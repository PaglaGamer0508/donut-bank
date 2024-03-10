import { Application } from "./application";
import { BankAccount } from "./bank-account";
import { SubAccount } from "./sub-account";

export enum SubAccountTransactionType {
  SPEND = "SPEND",
  ADD = "ADD",
}

export type SubAccountTransaction = {
  id: string;
  amount: number;
  bankAccountId: string;
  transactionType: SubAccountTransactionType;
  createdAt: Date;

  subAccountId: string | null;

  applicationId: string | null;
  application: Pick<Application, "id" | "name" | "logo"> | null;
  productName: string | null;
  productId: string | null;
};
