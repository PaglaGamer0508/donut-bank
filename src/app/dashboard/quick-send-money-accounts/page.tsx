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

  // if (!bankAccountId) {
  //   return (
  //     <div>
  //       <div className="w-[90%] md:w-[60%] lg:w-[40%] mx-auto mt-4 md:mt-10">
  //         <h1 className="text-center text-2xl text-red-500 font-semibold">
  //           Some Error Occured
  //         </h1>
  //         <div className="grid place-items-center">
  //           <Link
  //             className={`${buttonVariants({
  //               variant: "primary",
  //             })} mt-2 mx-auto`}
  //             href={`/dashboard`}
  //           >
  //             <ArrowLeft />
  //           </Link>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  const quickSendMoneyAccounts = await getQuickSendMoneyAccounts(
    bankAccountId!
  );

  return (
    <div>
      <div className="w-[90%] md:w-[60%] lg:w-[40%] mx-auto mt-4 md:mt-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className={`${lato.className} text-xl text-green-500`}>
            Quick Send Money Accounts
          </h1>
          <Link
            href="/dashboard/quick-send-money-accounts/add"
            title="Add Quick Send Money Account"
            className="group grid place-items-center bg-emerald-500 hover:bg-emerald-600 active:scale-90 transition-all duration-75 w-4 h-4 rounded-full"
          >
            <Plus className="text-green-900 w-4 h-4 group-active:scale-90 group-hover:text-white" />
          </Link>
        </div>
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
