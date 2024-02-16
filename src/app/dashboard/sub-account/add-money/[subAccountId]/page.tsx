import AddMoney from "@/components/AddMoney";
import { getAuthSession } from "@/lib/auth";
import { getBankAccount } from "@/lib/getBankAccount";
import { getSubAccount } from "@/lib/getSubAccount";
import React from "react";

interface pageProps {
  params: {
    subAccountId: string;
  };
}

const page: React.FC<pageProps> = async ({ params }) => {
  const { subAccountId } = params;
  const session = await getAuthSession();
  const bankAccount = await getBankAccount(session?.user?.id!);
  const subAccount = await getSubAccount(subAccountId);

  if (!subAccount) {
    return <div>Sub Account not found</div>;
  }

  if (subAccount.bankAccountId !== bankAccount.id) {
    return (
      <div>
        <h1>You do not have access to this sub account</h1>
      </div>
    );
  }

  return (
    <div className="w-[90%] md:w-[60%] lg:w-[40%] mx-auto mt-4 md:mt-6">
      <AddMoney
        subAccount={subAccount}
        balance={bankAccount.balance}
        bankAccountId={bankAccount.id}
      />
    </div>
  );
};

export default page;
