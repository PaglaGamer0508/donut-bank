import AddQuickSendMoneyAccount from "@/components/AddQuickSendMoneyAccount";
import { getAuthSession } from "@/lib/auth";
import { getBankAccount } from "@/lib/getBankAccount";
import { getQuickSendMoneyAccounts } from "@/lib/getQuickSendMoneyAccounts";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = async ({}) => {
  const session = await getAuthSession();
  const bankAccount = await getBankAccount(session?.user?.id!);
  const quickSendMoneyAccounts = await getQuickSendMoneyAccounts(
    bankAccount.id
  );

  return (
    <div>
      <div className="w-[90%] md:w-[60%] lg:w-[40%] mx-auto mt-4 md:mt-10">
        <AddQuickSendMoneyAccount />
      </div>
    </div>
  );
};

export default page;
