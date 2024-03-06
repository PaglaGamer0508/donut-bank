import { getTransactionTypeIcon } from "@/lib/getTransactionTypeIcon";
import { TransactionType } from "@/lib/types/transaction";
import { Lato } from "next/font/google";
import Image from "next/image";
import React from "react";

const lato2 = Lato({ weight: ["700"], subsets: ["latin"] });

interface ShowTransactionTypeProps {
  transactionType: TransactionType;
}

const ShowTransactionType: React.FC<ShowTransactionTypeProps> = ({
  transactionType,
}) => {
  const transactionTypeIcon = getTransactionTypeIcon(transactionType);

  const getTransactionStyle = (transactionType: TransactionType) => {
    switch (transactionType) {
      case TransactionType.DEPOSIT: {
        return {
          color: "text-[#008000]",
          bg: "bg-[#dbffd7]",
        };
      }
      case TransactionType.WITHDRAW: {
        return {
          color: "text-[#ff1d1d]",
          bg: "bg-[#ffeeee]",
        };
      }
      case TransactionType.ADD: {
        return {
          color: "text-[#0000ff]",
          bg: "bg-[#dae9ff]",
        };
      }
      case TransactionType.SEND: {
        return {
          color: "text-[#ffa500]",
          bg: "bg-[#fefde0]",
        };
      }
      case TransactionType.SPEND: {
        return {
          color: "text-[#ffa500]",
          bg: "bg-[#fefde0]",
        };
      }
      case TransactionType.RECEIVED: {
        return {
          color: "text-[#008000]",
          bg: "bg-[#dbffd7]",
        };
      }
      default: {
        return {
          color: "text-[#616161]",
        };
      }
    }
  };

  return (
    <div
      className={`${
        getTransactionStyle(transactionType).bg
      } flex items-center gap-2 py-1 px-2 rounded-md`}
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
  );
};

export default ShowTransactionType;
