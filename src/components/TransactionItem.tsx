import { formatDate } from "@/lib/formatDate";
import { Transaction } from "@/lib/types/transaction";
import { TransactionType } from "@prisma/client";
import React from "react";

interface TransactionItemProps {
  transaction: Transaction;
  bankAccountId: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  bankAccountId,
}) => {
  const showTransactionType = (transactionType: TransactionType) => {
    if (transactionType === TransactionType.SEND) {
      if (transaction.bankAccountId === bankAccountId) {
        return "SEND";
      } else {
        return "RECEIVE";
      }
    } else {
      return transactionType;
    }
  };

  const showAmountChange = (transactionType: TransactionType) => {
    if (
      transactionType === "DEPOSIT" ||
      transaction.receiverBankAccountId === bankAccountId
    ) {
      return "+";
    } else {
      return "-";
    }
  };

  return (
    <div>
      <div
        key={transaction.id}
        className="flex justify-between items-center gap-x-4"
      >
        <p>{formatDate(transaction.createdAt)}</p>
        <p>{showTransactionType(transaction.transactionType)}</p>
        <p>
          {`${showAmountChange(transaction.transactionType)}` +
            `${transaction.amount}`}
        </p>
      </div>
    </div>
  );
};

export default TransactionItem;
