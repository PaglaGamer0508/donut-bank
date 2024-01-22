import { getAuthSession } from "@/lib/auth";
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
    redirect("/dashboard/sub-accounts/create");
  }

  return (
    <div>
      <h1>Sub Accounts</h1>
      <Link href="/dashboard/sub-accounts/add-money">Add Money</Link>
    </div>
  );
};

export default page;
