import { formatDate } from "@/lib/formatDate";
import { getQuickSendMoneyAccounts } from "@/lib/getQuickSendMoneyAccounts";
import { hasSubAccount } from "@/lib/hasSubAccount";
import { BankAccount } from "@/lib/types/bank-account";
import { TransactionType } from "@/lib/types/transaction";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import type { Session } from "next-auth";
import { Lato } from "next/font/google";
import Link from "next/link";
import React from "react";
import CreditCardSection from "./CreditCardSection";
import QuickTransferAvtar from "./QuickTransferAvtar";
import ShowBalance from "./ShowBalance";
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
  const { balance, id: bankAccountId, accountName, transactions } = bankAccount;
  const hasSubAccounts = await hasSubAccount(bankAccountId);
  const quickSendMoneyAccounts = await getQuickSendMoneyAccounts(bankAccountId);

  const hasQuickSendMoneyAccounts = quickSendMoneyAccounts.length > 0;

  return (
    <div className="px-1 md:px-4 lg:px-8 pt-3">
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
        <ShowBalance balance={balance} />
      </div>

      {/* sub-accounts section */}
      <div className="mt-1">
        {hasSubAccounts ? (
          <CreditCardSection bankAccountId={bankAccountId} />
        ) : (
          <div className="flex flex-col items-center justify-center gap-y-1 h-48 border-2 border-green-500 rounded-lg">
            <h1 className="text-2xl text-red-500">
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
          <div className="md:w-[60%]">
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
              className={`${styles.transactions_scroll_container} flex flex-col gap-y-4 md:h-[280px] md:overflow-y-scroll bg-green-100/60 border border-green-300 p-3 rounded-lg`}
            >
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex justify-between items-center gap-x-4"
                >
                  <p>{formatDate(transaction.createdAt)}</p>
                  <p>{transaction.transactionType}</p>
                  <p>{`${
                    transaction.transactionType === TransactionType.DEPOSIT
                      ? "+"
                      : "-"
                  }${transaction.amount}`}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Others section */}
          <div className="flex flex-col md:flex-row gap-x-2 w-full md:w-[40%] h-[15rem] md:h-auto border">
            <div className="flex flex-col md:w-1/2 h-full border">
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
                    {/* <span className="group grid place-items-center bg-emerald-500 hover:bg-emerald-600 active:scale-90 transition-all duration-75 w-4 h-4 rounded-full">
                      <Plus className="text-green-900 w-4 h-4 group-active:scale-90 group-hover:text-white" />
                    </span> */}
                  </div>

                  {/* quick send money accounts */}
                  <div className="flex gap-x-2">
                    {quickSendMoneyAccounts.length > 0 ? (
                      <div className="flex gap-x-2">
                        {quickSendMoneyAccounts.map((account) => (
                          <QuickTransferAvtar
                            key={account.id}
                            id={account.savedBankAccount.id}
                            image={account.savedBankAccount.image}
                            name={account.savedBankAccount.accountName}
                            className="w-10 h-10"
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
                    href=""
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
            {/* side section */}
            <div className="border border-blue-500 md:w-1/2">Hello</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
