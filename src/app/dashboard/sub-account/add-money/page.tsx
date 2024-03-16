import Logo from "@/../public/donut.png";
import { Icons } from "@/components/Icons";
import { buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { getAllSubAccount } from "@/lib/getAllSubAccounts";
import { getBankAccountId } from "@/lib/getBankAccountId";
import { getCreditCardColor_small } from "@/lib/getCreditCardColor_small";
import { Lato } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface pageProps {}

const lato = Lato({ weight: ["900"], subsets: ["latin"] });

const page: React.FC<pageProps> = async ({}) => {
  const session = await getAuthSession();
  const bankAccountId = await getBankAccountId(session?.user?.id!);
  const subAccounts = await getAllSubAccount(bankAccountId!);

  if (subAccounts.length === 0) {
    return (
      <div>
        <h1 className="text-2xl text-red-500 text-center">
          You does not have a sub account
        </h1>
        <div className="flex justify-center mt-2">
          <Link
            className={`${buttonVariants({ variant: "primary" })}`}
            href="/dashboard/sub-account/create"
          >
            Create a Sub Account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-y-3 mt-4 md:mt-6">
      <div className="flex justify-center pb-2">
        <Image alt="Logo" src={Logo} className="w-14" />
      </div>
      <h1 className={`${lato.className} text-3xl text-green-500`}>
        Select a Sub Account
      </h1>
      <div className="flex flex-col gap-y-2 w-[95%] md:w-[60%] lg:w-[40%] mx-auto">
        {subAccounts.map((subAccount) => (
          <Link
            key={subAccount.id}
            href={`/dashboard/sub-account/add-money/${subAccount.id}`}
          >
            <div
              key={subAccount.id}
              className="group flex items-center justify-between bg-green-100/70 p-2 rounded-md"
            >
              <Image
                title="Preview"
                alt="credit card"
                src={getCreditCardColor_small(subAccount.creditCard_color)}
                className="w-[56px] h-[33px]"
                width={56}
                height={33}
                quality={100}
              />
              <p className={`${lato.className} text-green-500 text-2xl`}>
                {subAccount.name}
              </p>
              <Icons.downIcon
                fill="#22c55e"
                className="text-gray-400 -rotate-90 -translate-x-1 group-hover:-translate-x-0 transition-all duration-75"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
