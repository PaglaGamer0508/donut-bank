"use client";

import { Transaction } from "@/lib/types/transaction";
import { Lato } from "next/font/google";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSpinner from "./LoadingSpinner";
import TransactionItem from "./TransactionItem";
import styles from "./style/Dashboard.module.css";

const lato = Lato({ weight: ["900"], subsets: ["latin"] });

interface TransactionsProps {
  bankAccountId: string;
}

const Transactions: React.FC<TransactionsProps> = ({ bankAccountId }) => {
  const pageSize = 10;
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // initialise transactions
  const getTransactions = async () => {
    setIsLoading(true);
    const transactionsResponse = await fetch(
      `/api/bank-account/transaction?bankAccountId=${bankAccountId}&page=${page}&pageSize=${pageSize}`,
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
  const getMoreTransactions = async () => {
    const transactionsResponse = await fetch(
      `/api/bank-account/transaction?bankAccountId=${bankAccountId}&page=${
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
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-[98%] md:w-[60%] lg:w-[50%] mx-auto mt-4 md:mt-6 mb-4">
      <h1
        className={`${lato.className} text-green-500 text-2xl text-center mb-6`}
      >
        Transactions
      </h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <InfiniteScroll
          dataLength={transactions.length}
          next={getMoreTransactions}
          hasMore={transactions.length < totalResults}
          loader={<LoadingSpinner />}
          className={`${styles.shadow_box} flex flex-col gap-y-3 bg-white p-3 overflow-auto rounded-lg`}
        >
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              bankAccountId={bankAccountId}
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

export default Transactions;
