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
  amount: number;
  bankAccountId: string;
  transactionType: TransactionType;
  createdAt: Date;
  receiverBankAccountId: string | null;
  registeredapplicationId: string | null;
  product: string | null;
  subAccountId: string | null;
};
