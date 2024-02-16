import { Icons } from "@/components/Icons";
import WithdrawCoins from "@/components/WithdrawCoins";
import { getAuthSession } from "@/lib/auth";
import { getBankAccount } from "@/lib/getBankAccount";
import { Lato } from "next/font/google";
import React from "react";

const lato = Lato({ weight: ["900"], subsets: ["latin"] });

interface pageProps {}

const page: React.FC<pageProps> = async ({}) => {
  const session = await getAuthSession();
  const bankAccount = await getBankAccount(session?.user?.id!);

  return (
    <div>
      <div className="w-[90%] md:w-[60%] lg:w-[40%] mx-auto mt-4 md:mt-6">
        <WithdrawCoins
          balance={bankAccount.balance}
          bankAccountId={bankAccount.id}
          userId={session?.user?.id!}
        />
      </div>
    </div>
  );
};

export default page;
