import { formatAmountWithCommas } from "@/lib/formatAmountWithCommas ";
import { getAllSubAccountTokens } from "@/lib/getAllSubAccountTokens";
import { getAllSubAccountTransactions } from "@/lib/getAllSubAccountTransactions";
import { SubAccount } from "@/lib/types/sub-account";
import { Lato } from "next/font/google";
import Link from "next/link";
import React from "react";
import CreditCard from "./CreditCard";
import { Icons } from "./Icons";
import SubAccountTokenItem from "./SubAccountTokenItem";
import SubAccountTransactionItem from "./SubAccountTransactionItem";
import styles from "./style/Dashboard.module.css";

const lato = Lato({ weight: ["900"], subsets: ["latin"] });
interface SubAccountDashboardProps {
  subAccount: SubAccount;
}

const SubAccountDashboard: React.FC<SubAccountDashboardProps> = async ({
  subAccount,
}) => {
  const { id: subAccountId, name, balance } = subAccount;
  const tokens = await getAllSubAccountTokens(subAccountId);
  const subAccountTransactions = await getAllSubAccountTransactions(
    subAccountId
  );
  const fewTokens = tokens.slice(0, 3);

  return (
    <div className="lg:flex lg:gap-2 px-1 lg:px-3 pt-3 mb-2 lg:mb-0">
      <div className="flex flex-col lg:w-1/2">
        <div className="lg:flex lg:justify-between lg:items-start">
          <div>
            <h1
              className={`${lato.className} text-3xl sm:text-4xl text-green-500`}
            >
              Sub Account
            </h1>
            <p className="text-slate-500 font-medium">Welcome back, {name}</p>
          </div>
          {/* balance */}
          <div className="sm:w-fit bg-green-200/75 px-3 py-2 rounded-lg">
            <p className="text-sm font-medium text-emerald-500">
              Current Balance
            </p>
            <h1
              className={`flex items-center ${lato.className} text-3xl text-green-900`}
            >
              <Icons.donutCoin className="w-8" fill="#14532d" />
              <span>{formatAmountWithCommas(balance)}</span>
            </h1>
          </div>
        </div>

        <div className="grid place-items-center mt-3">
          <CreditCard subAccount={subAccount} />
        </div>

        {/* Tokens section */}
        <div className="mt-3 mb-3 lg:mb-0">
          <div className="flex justify-between items-center px-2">
            <h1 className={`${lato.className} text-xl text-green-500`}>
              Tokens
            </h1>

            <Link
              href={`/dashboard/sub-account/${subAccountId}/token/create`}
              className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-1 rounded-sm"
            >
              Create New
            </Link>

            <Link
              href={`/dashboard/sub-account/${subAccountId}/token`}
              className="text-slate-500 hover:text-green-500 text-sm font-medium font-serif"
            >
              See All
            </Link>
          </div>
          <div>
            <div
              className={`${styles.transactions_scroll_container} ${styles.shadow_box} flex flex-col gap-y-3 lg:h-[298px] lg:overflow-y-scroll bg-white p-3 rounded-lg min-h-[200px]`}
            >
              {/* No tokens found */}
              {tokens.length === 0 && (
                <div className="flex-1 grid place-items-center h-full">
                  <h1 className="text-center text-2xl text-red-500 font-semibold">
                    No tokens found
                  </h1>
                </div>
              )}

              {fewTokens.map((token) => (
                <SubAccountTokenItem key={token.id} token={token} />
              ))}
              {tokens.length >= 3 && (
                <Link
                  href={`/dashboard/sub-account/${subAccountId}/token`}
                  className="text-slate-500 hover:text-green-500 text-center font-medium"
                >
                  More...
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Trnsactions section */}
      <div className="lg:flex lg:flex-col lg:w-1/2 h-[611px]">
        <div className="flex justify-between items-center px-2">
          <h1 className={`${lato.className} text-xl text-green-500`}>
            Transactions
          </h1>
          <Link
            href={`/dashboard/sub-account/${subAccountId}/transactions`}
            className="text-slate-500 hover:text-green-500 text-sm font-medium font-serif"
          >
            See All
          </Link>
        </div>
        <div
          className={`${styles.transactions_scroll_container} ${styles.shadow_box} flex-1 flex flex-col gap-y-3 md:overflow-y-scroll bg-white p-3 rounded-lg min-h-[200px]`}
        >
          {/* No transactions found */}
          {subAccountTransactions.length === 0 && (
            <div className="flex-1 grid place-items-center">
              <h1 className="text-center text-2xl text-red-500 font-semibold">
                No transactions found
              </h1>
            </div>
          )}

          {subAccountTransactions.map((transaction) => (
            <SubAccountTransactionItem
              key={transaction.id}
              transaction={transaction}
            />
          ))}
          {subAccountTransactions.length >= 10 && (
            <Link
              href={`/dashboard/sub-account/${subAccountId}/transactions`}
              className="text-slate-500 hover:text-green-500 text-center font-medium"
            >
              More...
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubAccountDashboard;
