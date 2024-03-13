import CreditCard from "@/../public/credit-card.svg";
import DonutCoin from "@/../public/donut-coin.svg";
import { getFullDateTime } from "@/lib/getFullDateTime";
import { Transaction, TransactionType } from "@/lib/types/transaction";
import { Lato } from "next/font/google";
import Image from "next/image";
import React from "react";
import CopyText from "./CopyText";
import ShowTransactionType from "./ShowTransactionType";
import { formatAmountWithCommas } from "@/lib/formatAmountWithCommas ";

const lato = Lato({ weight: ["900"], subsets: ["latin"] });

interface TransactionPageProps {
  transaction: Transaction;
  bankAccountId: string;
}

const TransactionPage: React.FC<TransactionPageProps> = ({
  transaction,
  bankAccountId,
}) => {
  const {
    id: transactionId,
    amount,
    application,
    bankAccount,
    productName,
    receiverBankAccount,
    subAccount,
    createdAt,
  } = transaction;

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

  const ammountChange = getAmmountChange(getTransactionType(transactionType));

  const internalTransaction =
    transactionType !== TransactionType.SEND &&
    transactionType !== TransactionType.RECEIVED &&
    transactionType !== TransactionType.SPEND &&
    transactionType !== TransactionType.ADD;

  return (
    <div className="px-1 md:px-3 lg:px-6 pt-3 mb-2 md:mb-0">
      <div className="w-fit mx-auto bg-white rounded-lg shadow-sm py-3 px-5">
        <h1
          className={`${lato.className} text-center text-3xl sm:text-4xl text-green-500`}
        >
          Transaction
        </h1>

        <div className="flex flex-col items-center gap-y-3 mt-3">
          <p className="text-slate-500 font-medium">
            {getFullDateTime(createdAt)}
          </p>

          <p
            className={`${
              ammountChange === "+" ? "text-green-600" : "text-red-500"
            } text-3xl font-bold text-center sm:w-fit`}
          >
            {`${ammountChange}` + `${formatAmountWithCommas(amount)}`}
          </p>

          <ShowTransactionType
            transactionType={getTransactionType(transactionType)}
          />

          <div>
            {/* Spend transaction */}
            {transactionType === TransactionType.SPEND && (
              <div>
                <div className="flex items-center gap-x-1">
                  <Image
                    alt="Logo"
                    className="w-12 h-12 rounded-lg"
                    src={application?.logo!}
                    width={128}
                    height={128}
                  />

                  <div>
                    <h1 className="text-2xl font-bold text-green-500">
                      {application?.name}
                    </h1>
                    <div className="flex items-center gap-x-2">
                      <p
                        title="application ID"
                        className="text-slate-500 font-medium"
                      >
                        {application?.applicationId}
                      </p>
                      <CopyText
                        title="Copy application ID"
                        text={application?.applicationId!}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-gray-500 text-lg font-semibold">
                    Product:{" "}
                    <span className="text-amber-500">{productName}</span>
                  </p>
                </div>
              </div>
            )}

            {/* Received Transaction */}
            {transactionType === TransactionType.RECEIVED && (
              <div>
                <p className="text-center text-slate-500 font-medium">
                  Received from
                </p>
                <div className="flex items-center gap-x-1">
                  <Image
                    alt="Profile Picture"
                    className="w-12 h-12 rounded-lg"
                    src={bankAccount.image}
                    width={128}
                    height={128}
                  />

                  <div>
                    <h1 className="text-2xl font-bold text-green-500">
                      {bankAccount.accountName}
                    </h1>
                    <div className="flex items-center gap-x-2">
                      <p
                        title="application ID"
                        className="text-slate-500 font-medium"
                      >
                        {bankAccount.bankAccountNumber}
                      </p>
                      <CopyText
                        title="Copy bank account number"
                        text={bankAccount.bankAccountNumber}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Send Trasaction */}
            {transactionType === TransactionType.SEND && (
              <div>
                <p className="text-center text-slate-500 font-medium">
                  Sent to
                </p>
                <div className="flex items-center gap-x-1">
                  <Image
                    alt="Profile Picture"
                    className="w-12 h-12 rounded-lg"
                    src={receiverBankAccount?.image!}
                    width={128}
                    height={128}
                  />

                  <div>
                    <h1 className="text-2xl font-bold text-green-500">
                      {receiverBankAccount?.accountName}
                    </h1>
                    <div className="flex items-center gap-x-2">
                      <p
                        title="application ID"
                        className="text-slate-500 font-medium"
                      >
                        {receiverBankAccount?.bankAccountNumber}
                      </p>
                      <CopyText
                        title="Copy bank account number"
                        text={receiverBankAccount?.bankAccountNumber!}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Added Transaction */}
            {transactionType === TransactionType.ADD && (
              <div>
                <p className="text-center text-slate-500 font-medium">
                  Added to
                </p>
                <div className="flex items-center gap-x-1">
                  <Image
                    alt="Credit Card"
                    className="w-12 h-12 rounded-lg"
                    src={CreditCard}
                    width={128}
                    height={128}
                  />

                  <div>
                    <h1 className="text-2xl font-bold text-green-500">
                      {subAccount?.name}
                    </h1>
                    <div className="flex items-center gap-x-2">
                      <p
                        title="application ID"
                        className="text-slate-500 font-medium"
                      >
                        {subAccount?.creditCard_number}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {internalTransaction && (
              <div className="flex items-center gap-x-1">
                <Image
                  alt="Donut Coin"
                  className="w-12 h-12 rounded-lg"
                  src={DonutCoin}
                  width={128}
                  height={128}
                />

                <div>
                  <h1 className="text-2xl font-bold text-green-500">
                    Inter Transaction
                  </h1>
                  <div className="flex items-center gap-x-2">
                    <p
                      title="application ID"
                      className="text-slate-500 font-medium"
                    >
                      {transactionType[0] +
                        transactionType.slice(1).toLowerCase()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
