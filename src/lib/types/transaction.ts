export enum TransactionType {
  DEPOSIT = "DEPOSIT",
  WITHDRAW = "WITHDRAW",
  SPEND = "SPEND",
  SEND = "SEND",
  ADD = "ADD",
  TAKE = "TAKE",
}

export type Transaction = {
  id: string;
  bankAccountId: string;
  amount: number;
  transactionType: TransactionType;
  createdAt: Date;
  registeredCompanyId: string | null;
  product: string | null;
  subAccountId: string | null;
};
