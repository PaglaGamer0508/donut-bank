import CreditCard from "@/../public/credit-card.svg";
import DonutCoin from "@/../public/donut-coin.svg";
import { formatDate } from "@/lib/formatDate";
import { Transaction, TransactionType } from "@/lib/types/transaction";
import Link from "next/link";
import React from "react";
import ShowTransactionType from "./ShowTransactionType";
import TransactionImage from "./TransactionImage";

interface TransactionItemProps {
  transaction: Transaction;
  bankAccountId: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  bankAccountId,
}) => {
  const getTransactionType = (transactionType: TransactionType) => {
    if (transactionType === TransactionType.SEND) {
      if (transaction.receiverBankAccountId === bankAccountId) {
        return TransactionType.RECEIVED;
      } else {
        return TransactionType.SEND;
      }
    } else {
      return transactionType;
    }
  };

  // Transaction Type
  const transactionType = getTransactionType(transaction.transactionType);

  const getAmmountChange = (transactionType: TransactionType) => {
    if (
      transactionType === TransactionType.DEPOSIT ||
      transactionType === TransactionType.RECEIVED
    ) {
      return "+";
    } else {
      return "-";
    }
  };

  const ammountChange = getAmmountChange(transactionType);

  const internalTransaction =
    transactionType !== TransactionType.SEND &&
    transactionType !== TransactionType.RECEIVED &&
    transactionType !== TransactionType.SPEND &&
    transactionType !== TransactionType.ADD;

  return (
    <Link
      href={`/dashboard/transactions/${transaction.id}`}
      className="p-2 border border-transparent hover:border-green-200 rounded-lg"
    >
      <div className="flex justify-between items-center gap-x-4">
        {/* transaction info */}
        <div className="flex gap-2">
          {/* Transaction Image */}
          <div className="bg-green-100/70 p-2 rounded-lg">
            {transactionType === TransactionType.RECEIVED && (
              <TransactionImage
                alt="Profile Picture"
                src={transaction.bankAccount.image}
              />
            )}
            {transactionType === TransactionType.SEND && (
              <TransactionImage
                alt="Profile Picture"
                src={transaction.receiverBankAccount?.image!}
              />
            )}
            {transactionType === TransactionType.SPEND && (
              <TransactionImage
                alt="Logo"
                src={transaction.application?.logo!}
              />
            )}
            {transactionType === TransactionType.ADD && (
              <TransactionImage alt="Logo" src={CreditCard} />
            )}
            {/* Internal Transaction */}
            {internalTransaction && (
              <TransactionImage alt="Logo" src={DonutCoin} />
            )}
          </div>
          <div>
            {transactionType === TransactionType.RECEIVED && (
              <h1 className="text-green-500 text-lg font-semibold">
                {transaction.bankAccount.accountName}
              </h1>
            )}
            {transactionType === TransactionType.SEND && (
              <h1 className="text-green-500 text-lg font-semibold">
                {transaction.receiverBankAccount?.accountName}
              </h1>
            )}
            {transactionType === TransactionType.SPEND && (
              <h1 className="text-green-500 text-lg font-semibold">
                {transaction.application?.name}
              </h1>
            )}
            {transactionType === TransactionType.ADD && (
              <h1 className="text-green-500 text-lg font-semibold">
                {transaction.subAccount?.name}
              </h1>
            )}
            {internalTransaction && (
              <h1 className="text-green-500 text-lg font-semibold">Internal</h1>
            )}

            <p className="text-gray-500 text-sm font-medium">
              {formatDate(transaction.createdAt)}
            </p>
          </div>
        </div>

        <div className="sm:flex  sm:items-center sm:justify-between sm:gap-1 sm:w-1/2">
          <ShowTransactionType transactionType={transactionType} />

          <p
            className={`${
              ammountChange === "+" ? "text-green-600" : "text-red-500"
            } font-semibold text-right sm:w-fit`}
          >
            {`${ammountChange}` + `${transaction.amount}`}
          </p>
        </div>
      </div>
      {transactionType === TransactionType.SPEND && (
        <div className="mt-2">
          <p className="text-gray-500 text-lg font-semibold">
            Product:{" "}
            <span className="text-amber-500">{transaction.productName}</span>
          </p>
        </div>
      )}
    </Link>
  );
};

export default TransactionItem;
