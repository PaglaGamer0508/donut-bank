"use client";

import { SubAccountTransaction } from "@/lib/types/sub-account-transaction";
import { Lato } from "next/font/google";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSpinner from "./LoadingSpinner";
import SubAccountTransactionItem from "./SubAccountTransactionItem";
import styles from "./style/Dashboard.module.css";

const lato = Lato({ weight: ["900"], subsets: ["latin"] });

interface SubAccountTransactionsProps {
  subAccountId: string;
}

const SubAccountTransactions: React.FC<SubAccountTransactionsProps> = ({
  subAccountId,
}) => {
  const pageSize = 10;
  const [transactions, setTransactions] = useState<SubAccountTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // initialise transactions
  const getSubAccountTransactions = async () => {
    setIsLoading(true);
    const transactionsResponse = await fetch(
      `/api/sub-account/transaction?subAccountId=${subAccountId}&page=${page}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const transactionsData = await transactionsResponse.json();

    const { transactions, totalTransactions } = transactionsData;
    setTransactions(transactions);
    setTotalResults(totalTransactions);
    setIsLoading(false);
  };

  // get more transactions
  const getMoreSubAccountTransactions = async () => {
    const transactionsResponse = await fetch(
      `/api/sub-account/transaction?subAccountId=${subAccountId}&page=${
        page + 1
      }&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const transactionsData = await transactionsResponse.json();

    const { transactions: newTransactions, totalTransactions } =
      transactionsData;
    setTotalResults(totalTransactions);
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      ...newTransactions,
    ]);
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    getSubAccountTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-[98%] md:w-[60%] lg:w-[50%] mx-auto mt-4 md:mt-6 mb-4">
      <h1
        className={`${lato.className} text-green-500 text-2xl text-center mb-6`}
      >
        Sub Account Transactions
      </h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <InfiniteScroll
          dataLength={transactions.length}
          next={getMoreSubAccountTransactions}
          hasMore={transactions.length < totalResults}
          loader={<LoadingSpinner />}
          className={`${styles.shadow_box} flex flex-col gap-y-3 bg-white p-3 overflow-auto rounded-lg`}
        >
          {transactions.map((transaction) => (
            <SubAccountTransactionItem
              key={transaction.id}
              transaction={transaction}
            />
          ))}
          {transactions.length >= totalResults && (
            <h1 className="text-red-500 text-center font-medium">
              End of List
            </h1>
          )}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default SubAccountTransactions;
