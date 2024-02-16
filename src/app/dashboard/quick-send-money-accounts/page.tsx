import QuickSendMoneyAccountItems from "@/components/QuickSendMoneyAccountItems";
import { buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { getBankAccountId } from "@/lib/getBankAccountId";
import { getQuickSendMoneyAccounts } from "@/lib/getQuickSendMoneyAccounts";
import { ArrowLeft, Plus } from "lucide-react";
import { Lato } from "next/font/google";
import Link from "next/link";
import React from "react";

const lato = Lato({ weight: ["900"], subsets: ["latin"] });

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
        <div className="flex items-center justify-between mb-4">
          <h1 className={`${lato.className} text-xl text-green-500`}>
            Quick Send Money Accounts
          </h1>
          <Link
            href="/dashboard/quick-send-money-accounts/add"
            title="Add Quick Send Money Account"
            className="grid place-items-center bg-green-500 hover:bg-green-600 active:scale-90 transition-all duration-75 w-4 h-4 rounded-full"
          >
            <Plus className="text-white w-4 h-4 group-active:scale-90" />
          </Link>
        </div>
        {quickSendMoneyAccounts.length === 0 && (
          <div>
            <h1>No Quick Send Money Accounts Found</h1>
            <Link
              href={`/dashboard/quick-send-money-accounts/add`}
              className="text-red-500"
            >
              Add
            </Link>
          </div>
        )}
        <div className="flex flex-col gap-y-2">
          {quickSendMoneyAccounts.map((quickSendMoneyAccount) => (
            <QuickSendMoneyAccountItems
              key={quickSendMoneyAccount.savedBankAccountId}
              quickSendMoneyAccount={quickSendMoneyAccount}
            />
          ))}
        </div>
        <div className="grid place-items-center">
          <Link
            className={`${buttonVariants({
              variant: "primary",
            })} mt-2 mx-auto`}
            href={`/dashboard`}
          >
            <ArrowLeft />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
