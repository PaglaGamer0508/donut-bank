import { Icons } from "@/components/Icons";
import { getAuthSession } from "@/lib/auth";
import { formatAmountWithCommas } from "@/lib/formatAmountWithCommas ";
import { getBankAccount } from "@/lib/getBankAccount";
import { Lato } from "next/font/google";
import Image from "next/image";
import React from "react";

const lato = Lato({ weight: ["900"], subsets: ["latin"] });

const page: React.FC = async ({}) => {
  const session = await getAuthSession();
  const bankAccount = await getBankAccount(session?.user?.id!);

  return (
    <div className="px-2 pt-5 sm:pt-10">
      <div className="w-fit flex flex-col items-center mx-auto rounded-xl p-6 border-2 border-green-500">
        <Image
          alt="profile-picture"
          src={bankAccount.image}
          width={120}
          height={120}
          className="w-28 h-28 rounded-full outline outline-2 outline-green-500 outline-offset-4 select-none"
        />
        <p className={`${lato} text-4xl pt-4 text-green-500`}>
          {bankAccount.accountName}
        </p>
        <h1
          className={`flex items-center ${lato.className} text-4xl text-green-900 pt-2`}
        >
          <Icons.donutCoin className="w-9" fill="#14532d" />
          <span>{formatAmountWithCommas(bankAccount.balance)}</span>
        </h1>
        <div className="flex flex-col gap-y-1 items-center pt-2">
          <p>{bankAccount.bankAccountNumber}</p>
          <p>{bankAccount.email}</p>
        </div>
      </div>
    </div>
  );
};

export default page;
