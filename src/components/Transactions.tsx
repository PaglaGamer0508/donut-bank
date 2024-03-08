"use client";

import { getAllTransactions } from "@/lib/getAllTransactions";
import { Transaction } from "@/lib/types/transaction";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import InfiniteScroll from "react-infinite-scroll-component";
import TransactionItem from "./TransactionItem";
import styles from "./style/Dashboard.module.css";
import { Lato } from "next/font/google";

const lato = Lato({ weight: ["900"], subsets: ["latin"] });

interface TransactionsProps {
  bankAccountId: string;
}

const Transactions: React.FC<TransactionsProps> = ({ bankAccountId }) => {
  const pageSize = 10;
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // initialise transactions
  const getTransactions = async () => {
    setIsLoading(true);
    const transactionsResponse = await fetch(
      `/api/bank-account/transaction?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&bankAccountId=${bankAccountId}&page=${page}&pageSize=${pageSize}`
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
      `/api/bank-account/transaction?apiKey=${
        process.env.NEXT_PUBLIC_API_KEY
      }&bankAccountId=${bankAccountId}&page=${page + 1}&pageSize=${pageSize}`
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
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Transactions;
