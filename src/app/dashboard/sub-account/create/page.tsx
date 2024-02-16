import CreateSubAccountForm from "@/components/CreateSubAccountForm";
import { getAuthSession } from "@/lib/auth";
import { getBankAccount } from "@/lib/getBankAccount";
import { getSubAccountCount } from "@/lib/getSubAccountCount";
import React from "react";

const page: React.FC = async () => {
  const session = await getAuthSession();
  const bankAccount = await getBankAccount(session?.user?.id!);
  const subAccountCount = await getSubAccountCount(bankAccount.id);

  if (subAccountCount === undefined) {
    return (
      <div>
        <h1>Error getting Sub Account count</h1>
      </div>
    );
  }

  return (
    <div className="grid place-items-center min-h-[90dvh]">
      {subAccountCount < 3 ? (
        <CreateSubAccountForm bankAccountId={bankAccount.id} />
      ) : (
        <div className="shadow-lg rounded-lg w-[98%] md:w-[60%] lg:w-[40%] border-2 border-green-500 p-2">
          <h1 className="text-green-500 text-2xl text-center font-medium">
            You already have 3 Sub Accounts, You cannot create more
          </h1>
        </div>
      )}
    </div>
  );
};

export default page;
