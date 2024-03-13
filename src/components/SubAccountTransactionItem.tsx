import CreditCard from "@/../public/credit-card.svg";
import AddMoneyIcon from "@/../public/transaction-icons/add-money.svg";
import SpendMoneyIcon from "@/../public/transaction-icons/spend-money.svg";
import { formatDate } from "@/lib/formatDate";
import {
  SubAccountTransaction,
  SubAccountTransactionType,
} from "@/lib/types/sub-account-transaction";
import { Lato } from "next/font/google";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import TransactionImage from "./TransactionImage";

const lato2 = Lato({ weight: ["700"], subsets: ["latin"] });

interface SubAccountTransactionItemProps {
  transaction: SubAccountTransaction;
}

const SubAccountTransactionItem: React.FC<SubAccountTransactionItemProps> = ({
  transaction,
}) => {
  const { transactionType } = transaction;

  const getTransactionStyle = (transactionType: SubAccountTransactionType) => {
    switch (transactionType) {
      case SubAccountTransactionType.ADD: {
        return {
          color: "text-[#0000ff]",
          bg: "bg-[#dae9ff]",
        };
      }
      case SubAccountTransactionType.SPEND: {
        return {
          color: "text-[#ffa500]",
          bg: "bg-[#fefde0]",
        };
      }
      default: {
        return {
          color: "text-[#616161]",
        };
      }
    }
  };

  const getTransactionTypeIcon = (
    transactionType: SubAccountTransactionType
  ): StaticImageData | undefined => {
    if (transactionType === SubAccountTransactionType.ADD) {
      return AddMoneyIcon;
    }
    if (transactionType === SubAccountTransactionType.SPEND) {
      return SpendMoneyIcon;
    } else {
      return undefined;
    }
  };

  const transactionTypeIcon = getTransactionTypeIcon(transactionType);

  const getAmmountChange = (transactionType: SubAccountTransactionType) => {
    if (transactionType === SubAccountTransactionType.ADD) {
      return "+";
    }
    if (transactionType === SubAccountTransactionType.SPEND) {
      return "-";
    }
  };

  const ammountChange = getAmmountChange(transactionType);

  return (
    <Link
      href={`/dashboard/transactions/${transaction.id}`}
      className="p-2 border border-transparent hover:border-green-200 rounded-lg"
    >
      <div className="flex justify-between items-center gap-x-4">
        {/* transaction info */}
        <div>
          <div className="flex gap-2">
            {/* Transaction Image */}
            <div className="bg-green-100/70 p-2 rounded-lg">
              {transactionType === SubAccountTransactionType.SPEND && (
                <TransactionImage
                  alt="Logo"
                  src={transaction.application?.logo!}
                />
              )}
              {transactionType === SubAccountTransactionType.ADD && (
                <TransactionImage alt="Logo" src={CreditCard} />
              )}
            </div>
            <div>
              {transactionType === SubAccountTransactionType.SPEND && (
                <h1 className="text-green-500 text-lg font-semibold">
                  {transaction.application?.name}
                </h1>
              )}
              {transactionType === SubAccountTransactionType.ADD && (
                <h1 className="text-green-500 text-lg font-semibold">
                  Add Money
                </h1>
              )}

              <p className="text-gray-500 text-sm font-medium">
                {formatDate(transaction.createdAt)}
              </p>
            </div>
          </div>
        </div>

        <div className="sm:flex  sm:items-center sm:justify-between sm:gap-1 sm:w-1/2">
          <div
            className={`${
              getTransactionStyle(transactionType).bg
            } flex items-center w-fit gap-2 py-1 px-2 rounded-md`}
          >
            {transactionTypeIcon && (
              <Image
                title={transactionType}
                src={transactionTypeIcon}
                alt={transactionType}
                width={128}
                height={128}
                className="w-8 h-8"
              />
            )}
            <p
              className={`${lato2.className} ${
                getTransactionStyle(transactionType).color
              }`}
            >
              {transactionType}
            </p>
          </div>

          <p
            className={`${
              transactionType === SubAccountTransactionType.ADD &&
              "text-green-600"
            } ${
              transactionType === SubAccountTransactionType.SPEND &&
              "text-red-500"
            } font-semibold text-right sm:w-fit`}
          >
            {`${ammountChange}` + `${transaction.amount}`}
          </p>
        </div>
      </div>

      {transactionType === SubAccountTransactionType.SPEND && (
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

export default SubAccountTransactionItem;
