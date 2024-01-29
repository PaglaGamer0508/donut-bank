import { formatAmountWithCommas } from "@/lib/formatAmountWithCommas ";
import { Minus, Plus } from "lucide-react";
import { Lato } from "next/font/google";
import Link from "next/link";
import React, { HTMLAttributes } from "react";
import { Icons } from "./Icons";

const lato = Lato({ weight: ["900"], subsets: ["latin"] });

interface ShowBalanceProps extends HTMLAttributes<HTMLDivElement> {
  balance: number;
}

const ShowBalance: React.FC<ShowBalanceProps> = ({ balance, ...props }) => {
  return (
    <div {...props} className="w-fit bg-green-200/75 px-3 py-2 rounded-lg">
      <div className="flex justify-between items-center gap-x-3">
        <p className="text-sm font-medium text-emerald-500">Current Balance</p>
        {/* deposit button */}
        <div className="flex items-center gap-x-2">
          <Link
            href="/dashboard/deposit"
            title="Deposit"
            className="group grid place-items-center bg-emerald-500 hover:bg-emerald-600 active:scale-90 transition-all duration-75 w-4 h-4 rounded-full"
          >
            <Plus className="text-green-900 w-4 h-4 group-active:scale-90 group-hover:text-white" />
          </Link>
          <Link
            href="/dashboard/withdraw"
            title="Deposit"
            className="group grid place-items-center bg-emerald-500 hover:bg-emerald-600 active:scale-90 transition-all duration-75 w-4 h-4 rounded-full"
          >
            <Minus className="text-green-900 w-4 h-4 group-active:scale-90 group-hover:text-white" />
          </Link>
        </div>
      </div>

      <h1
        className={`flex items-center ${lato.className} text-3xl text-green-900`}
      >
        <Icons.donutCoin className="w-8" fill="#14532d" />
        <span>{formatAmountWithCommas(balance)}</span>
      </h1>
    </div>
  );
};

export default ShowBalance;
