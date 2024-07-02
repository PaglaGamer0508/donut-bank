import Dashboard from "@/components/Dashboard";
import { getAuthSession } from "@/lib/auth";
import { getBankAccount } from "@/lib/getBankAccount";
import { hasBankAccount } from "@/lib/hasBankAccount";
import Link from "next/link";
import React from "react";

const page: React.FC = async () => {
  const session = await getAuthSession();

  const bankAccountExist = await hasBankAccount();

  if (bankAccountExist === false) {
    return (
      <div className="grid place-items-center min-h-screen mx-1">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl text-red-500 font-semibold text-center pb-3 hover:cursor-default">
            You Do Not Have A DonutBank Account
          </h1>

          <div className="flex flex-col gap-y-3">
            <Link
              href={"/dashboard/create-bank-account"}
              className="bg-green-500 hover:bg-green-600 text-white text-center px-8 py-2 text-lg font-medium rounded-md transition-all duration-75"
            >
              Create Bank Account
            </Link>

            <Link
              href={"/dashboard/application/create"}
              className="bg-green-500 hover:bg-green-600 text-white text-center px-8 py-2 text-lg font-medium rounded-md transition-all duration-75"
            >
              Resister a Application
            </Link>

            <Link
              href={"/dashboard/use-sub-account"}
              className="bg-green-500 hover:bg-green-600 text-white text-center px-8 py-2 text-lg font-medium rounded-md transition-all duration-75"
            >
              Use a Sub Account
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    const bankAccount = await getBankAccount(session?.user?.id!);
    return (
      <div>
        <Dashboard session={session!} bankAccount={bankAccount} />
      </div>
    );
  }
};

export default page;
