import SubAccountSelection from "@/components/SubAccountSelection";
import { buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { getAllSubAccount } from "@/lib/getAllSubAccounts";
import { getBankAccount } from "@/lib/getBankAccount";
import { hasSubAccount } from "@/lib/hasSubAccount";
import { Lato } from "next/font/google";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const lato = Lato({ weight: ["900"], subsets: ["latin"] });

interface pageProps {}

const page: React.FC<pageProps> = async ({}) => {
  const session = await getAuthSession();
  const bankAccount = await getBankAccount(session?.user?.id!);
  const hasSubAccounts = await hasSubAccount(bankAccount.id);

  if (!hasSubAccounts) {
    redirect("/dashboard/sub-account/create");
  }

  const subAccounts = await getAllSubAccount(bankAccount.id);

  return (
    <div>
      <div className="flex justify-between items-center bg-blue-100/70 p-3 md:px-8">
        <h1
          className={`${lato.className} text-xl sm:text-2xl font-bold text-green-500`}
        >
          Sub Accounts
        </h1>
        <div className="flex items-center gap-x-2">
          {subAccounts.length < 3 && (
            <Link
              href={`/dashboard/sub-account/create`}
              className={`${buttonVariants({ variant: "primary" })}`}
            >
              <span>New</span>
            </Link>
          )}
          <Link
            href={`/dashboard/sub-account/add-money`}
            className={`${buttonVariants({ variant: "primary" })}`}
          >
            <span>Add Money</span>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-y-2 w-[95%] md:w-[60%] lg:w-[40%] mx-auto mt-3">
        {subAccounts.map((subAccount) => (
          <SubAccountSelection key={subAccount.id} subAccount={subAccount} />
        ))}
      </div>
    </div>
  );
};

export default page;
