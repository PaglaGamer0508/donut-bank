"use client";

import { toast } from "@/hooks/useToast";
import { formatAmountWithCommas } from "@/lib/formatAmountWithCommas ";
import { formatCreditCardNumber } from "@/lib/formatCreditCardNumber";
import { getCreditCardColor } from "@/lib/getCreditCardColor";
import { SubAccount } from "@/lib/types/sub-account";
import { Plus } from "lucide-react";
import { Lato, Roboto_Slab } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Icons } from "./Icons";

const lato2 = Lato({ weight: ["700"], subsets: ["latin"] });
interface CreditCardProps {
  subAccount: SubAccount;
}

const roboto_slab = Roboto_Slab({ weight: ["300"], subsets: ["latin"] });

const CreditCard: React.FC<CreditCardProps> = ({ subAccount }) => {
  const { id, name, balance, creditCard_color, creditCard_number } = subAccount;

  const creditCardColor = getCreditCardColor(creditCard_color);

  const handleCopyCreditCardNumber = (creditCardNumber: string) => {
    navigator.clipboard.writeText(creditCardNumber);
    toast({
      title: "Credit Card Number copied to clipboard",
      duration: 1000,
    });
  };

  return (
    <div className="relative w-80 h-[189px] flex-shrink-0 rounded-[14px] overflow-hidden">
      {/* Credit Card Image */}
      <Image
        alt="Credit_card"
        src={creditCardColor}
        className="absolute inset-0 select-none z-10"
      />
      {/* Sub-account name */}
      <p className="absolute top-4 left-5 z-20 text-white text-xl font-bold cursor-default">
        {name}
      </p>
      {/* sub-account Balance */}
      <h1 className="flex items-end gap-x-1 absolute top-20 left-5 z-20 cursor-default">
        <Icons.donutCoin className="w-9" fill="#ffffff" />{" "}
        <p
          title={balance.toString()}
          className={`${lato2.className} text-white text-4xl`}
        >
          {formatAmountWithCommas(balance)}
        </p>
      </h1>
      {/* credit card number */}
      <p
        onClick={() => handleCopyCreditCardNumber(creditCard_number)}
        className={`${roboto_slab.className} absolute bottom-5 left-5 text-[#FFD700] text-xl z-20 cursor-pointer`}
      >
        {formatCreditCardNumber(creditCard_number)}
      </p>

      {/* add money button */}
      <Link
        href={`/dashboard/sub-accounts/add-money/${id}`}
        className="group grid place-items-center absolute -top-3 -right-3 z-20 w-16 h-16 bg-[#75757569] hover:bg-green-500 transition-all duration-75 rounded-full focus:outline-none"
      >
        <Plus
          id="plus-icon"
          className="relative top-1 right-1 w-6 h-6 group-hover:w-8 group-hover:h-8 group-active:scale-75 text-white transition-all duration-75"
        />
      </Link>
    </div>
  );
};

export default CreditCard;
