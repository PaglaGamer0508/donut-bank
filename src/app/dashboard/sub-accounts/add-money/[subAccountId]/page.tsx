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

  return (
    <div className="w-[90%] md:w-[60%] lg:w-[40%] mx-auto mt-4 md:mt-10">
      <AddMoney
        subAccount={subAccount}
        balance={bankAccount.balance}
        bankAccountId={bankAccount.id}
      />
    </div>
  );
};

export default page;
