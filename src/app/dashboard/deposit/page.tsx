import DepositCoins from "@/components/DepositCoins";
import { getAuthSession } from "@/lib/auth";
import { getBankAccount } from "@/lib/getBankAccount";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = async ({}) => {
  const session = await getAuthSession();
  const bankAccount = await getBankAccount(session?.user?.id!);
  return (
    <div>
      <div className="w-[90%] md:w-[60%] lg:w-[40%] mx-auto mt-4 md:mt-10">
        <DepositCoins
          balance={bankAccount.balance}
          bankAccountId={bankAccount.id}
          userId={session?.user?.id!}
        />
      </div>
    </div>
  );
};

export default page;
