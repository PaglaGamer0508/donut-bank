import SendMoneySection from "@/components/SendMoneySection";
import { getAuthSession } from "@/lib/auth";
import { getBankAccountId } from "@/lib/getBankAccountId";
import { getQuickSendMoneyAccounts } from "@/lib/getQuickSendMoneyAccounts";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = async ({}) => {
  const session = await getAuthSession();
  const bankAccountId = await getBankAccountId(session?.user?.id!);
  const quickSendMoneyAccounts = await getQuickSendMoneyAccounts(
    bankAccountId!
  );

  return (
    <div>
      <div className="w-[90%] md:w-[60%] lg:w-[40%] mx-auto mt-4 md:mt-6">
        <SendMoneySection quickSendMoneyAccounts={quickSendMoneyAccounts} />
      </div>
    </div>
  );
};

export default page;
