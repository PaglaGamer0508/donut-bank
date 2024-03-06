import { getAllTransactions } from "@/lib/getAllTransactions";
import { getQuickSendMoneyAccounts } from "@/lib/getQuickSendMoneyAccounts";
import { hasSubAccount } from "@/lib/hasSubAccount";
import { BankAccount } from "@/lib/types/bank-account";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import type { Session } from "next-auth";
import { Lato } from "next/font/google";
import Link from "next/link";
import React from "react";
import QuickTransferAavtar from "./QuickTransferAvatar";
import ShowBalance from "./ShowBalance";
import SubAccountSection from "./SubAccountSection";
import TransactionItem from "./TransactionItem";
import UserAccountNav from "./UserAccountNav";
import styles from "./style/Dashboard.module.css";
import { buttonVariants } from "./ui/Button";

interface DashboardProps {
  session: Session;
  bankAccount: BankAccount;
}

const lato = Lato({ weight: ["900"], subsets: ["latin"] });

const Dashboard: React.FC<DashboardProps> = async ({
  session,
  bankAccount,
}) => {
  const { balance, id: bankAccountId, accountName } = bankAccount;
  const hasSubAccounts = await hasSubAccount(bankAccountId);
  const quickSendMoneyAccounts = await getQuickSendMoneyAccounts(bankAccountId);
  const transactions = await getAllTransactions(bankAccountId);

  return (
    <div className="px-1 md:px-3 lg:px-6 pt-3 mb-2 md:mb-0">
      {/* upper section */}
      <div className="flex justify-between items-start">
        <div>
          {/* header and name */}
          <div>
            <h1
              className={`${lato.className} text-3xl sm:text-4xl text-green-500`}
            >
              Dashboard
            </h1>
            <p className="text-slate-500 font-medium">
              Welcome back, {accountName}
            </p>
          </div>
        </div>
        {/* balance */}
        <div className="hidden sm:block">
          <ShowBalance balance={balance} />
        </div>
        {/* Account */}
        <div>
          {session?.user ? <UserAccountNav user={session.user} /> : null}
        </div>
      </div>

      <div className="sm:hidden mt-2">
        <ShowBalance className="w-full" balance={balance} />
      </div>

      {/* sub-accounts section */}
      <div className="mt-1">
        {hasSubAccounts ? (
          <SubAccountSection bankAccountId={bankAccountId} />
        ) : (
          <div className="flex flex-col items-center justify-center gap-y-1 h-48 border-2 border-green-500 rounded-lg">
            <h1 className="text-2xl text-red-500 text-center">
              You does not have a sub account
            </h1>
            <Link
              className={cn(buttonVariants({ variant: "primary" }))}
              href="dashboard/sub-accounts/create"
            >
              Create Sub Account
            </Link>
          </div>
        )}

        {/* LOWER SECTION */}
        <div className="flex flex-col-reverse md:flex md:flex-row md:gap-x-2">
          {/* Transactions section */}
          <div className="md:w-[60%] lg:w-[65%]">
            <div className="flex justify-between items-center px-2">
              <h1 className={`${lato.className} text-xl text-green-500`}>
                Transactions
              </h1>
              <Link
                href="/dashboard/transactions"
                className="text-slate-500 hover:text-green-500 text-sm font-medium font-serif"
              >
                See All
              </Link>
            </div>
            <div
              className={`${styles.transactions_scroll_container} flex flex-col gap-y-4 md:h-[275px] md:overflow-y-scroll bg-white p-3 rounded-lg`}
            >
              {transactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                  bankAccountId={bankAccountId}
                />
              ))}
            </div>
          </div>

          {/* Others section */}
          <div className="gap-x-2 w-full md:w-[40%] lg:w-[35%] h-[18rem] md:h-auto">
            {/* send money */}
            <div className="flex flex-col h-1/2">
              <h1 className={`${lato.className} text-xl text-green-500`}>
                Send Money
              </h1>
              <div className="flex-1 flex flex-col justify-between border border-green-500 rounded-lg bg-green-100/60 p-1 pt-0">
                <div className="flex items-center justify-between">
                  <p className="text-slate-500 text-sm font-medium">
                    Quick Transfer
                  </p>

                  <Link
                    href="/dashboard/quick-send-money-accounts"
                    className="text-slate-500 hover:text-green-500 text-sm font-medium"
                  >
                    See All
                  </Link>
                </div>

                {/* quick send money accounts */}
                <div className="flex gap-x-1">
                  {quickSendMoneyAccounts.length > 0 ? (
                    <div className="flex items-center gap-x-1">
                      {quickSendMoneyAccounts.map((quickSendMoneyAccount) => (
                        <QuickTransferAavtar
                          key={quickSendMoneyAccount.id}
                          quickSendMoneyAccount={quickSendMoneyAccount}
                        />
                      ))}
                    </div>
                  ) : null}
                  <Link
                    href="/dashboard/quick-send-money-accounts/add"
                    title="Add Quick Transfer Account"
                    className="bg-green-500 hover:bg-green-600 active:scale-90 transition-all duration-75 grid place-items-center w-10 h-10 rounded-full"
                  >
                    <Plus className="text-white w-10 h-10" />
                  </Link>
                </div>
                <Link
                  className={`${buttonVariants({
                    variant: "primary",
                  })} active:scale-95 w-full`}
                  href="/dashboard/send-money"
                >
                  Send Money
                </Link>
              </div>
            </div>
            {/* comapies */}
            <div className="flex flex-col h-1/2">
              <h1 className={`${lato.className} text-xl text-green-500`}>
                Companies
              </h1>
              <div className="flex-1 border border-green-500 rounded-lg bg-green-100/60"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
