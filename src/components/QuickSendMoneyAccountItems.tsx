import { QuickSendMoneyAccount } from "@/lib/types/quick-send-money-account";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import QuickSendMoneyAccountsOptionDropdown from "./QuickSendMoneyAccountsOptionDropdown";
import Link from "next/link";

interface QuickSendMoneyAccountItemsProps {
  quickSendMoneyAccount: QuickSendMoneyAccount;
}

const QuickSendMoneyAccountItems: React.FC<QuickSendMoneyAccountItemsProps> = ({
  quickSendMoneyAccount,
}) => {
  const { image, accountName, bankAccountNumber } =
    quickSendMoneyAccount.savedBankAccount;
  return (
    <div className="flex items-center justify-between border-2 border-green-500 rounded-xl p-2 md:px-4 md:pl-2">
      <div className="flex items-center gap-x-1">
        <QuickSendMoneyAccountsOptionDropdown
          bankAccountId={quickSendMoneyAccount.bankAccountId}
          quickSendMoneyId={quickSendMoneyAccount.id}
        />
        <Image
          alt="Profile Picture"
          className="w-12 h-12 rounded-full"
          src={image}
          width={128}
          height={128}
        />

        <div>
          <h1 className="text-xl font-semibold text-green-500">
            {accountName}
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            {bankAccountNumber}
          </p>
        </div>
      </div>

      <div className="flex gap-x-1">
        <Link
          href={`/dashboard/send-money/${quickSendMoneyAccount.savedBankAccount.bankAccountNumber}`}
          title="Send Money"
          className="group bg-green-500 hover:bg-green-600 transition-all duration-75 rounded-full p-1 focus:outline-transparent"
        >
          <ArrowRight className="w-8 h-8 group-hover:translate-x-[2px] transition-all duration-75 text-white" />
        </Link>
      </div>
    </div>
  );
};

export default QuickSendMoneyAccountItems;
