import { Transaction } from "./transaction";

export type BankAccount = {
  id: string;
  ownerId: string;
  accountName: string;
  password: string;
  image: string;
  bankAccountNumber: string;
  email: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
  transactions: Transaction[];
};
