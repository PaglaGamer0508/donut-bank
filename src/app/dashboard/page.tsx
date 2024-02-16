import CreateBankAccountForm from "@/components/CreateBankAccountForm";
import Dashboard from "@/components/Dashboard";
import { getAuthSession } from "@/lib/auth";
import { getBankAccount } from "@/lib/getBankAccount";
import { hasBankAccount } from "@/lib/hasBankAccount";
import React from "react";

const page: React.FC = async () => {
  const session = await getAuthSession();

  const bankAccountExist = await hasBankAccount();

  if (bankAccountExist === false) {
    return (
      <div className="grid place-items-center min-h-screen mx-1">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl text-slate-500 font-semibold text-center pb-3 hover:cursor-default">
            You Does Not Have A DonutBank Account
          </h1>
          <CreateBankAccountForm
            userId={session?.user?.id!}
            email={session?.user?.email!}
            image={session?.user?.image!}
          />
        </div>
      </div>
    );
  } else {
    const bankAccount = await getBankAccount(session?.user?.id!);
    return (
      <>
        <Dashboard session={session!} bankAccount={bankAccount} />
      </>
    );
  }
};

export default page;
