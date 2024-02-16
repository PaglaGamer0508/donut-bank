import { getAllSubAccount } from "@/lib/getAllSubAccounts";
import { Plus } from "lucide-react";
import React from "react";
import CreditCard from "./CreditCard";
import styles from "./style/Dashboard.module.css";
import Link from "next/link";

interface SubAccountSectionProps {
  bankAccountId: string;
}

const SubAccountSection: React.FC<SubAccountSectionProps> = async ({
  bankAccountId,
}) => {
  const subAccounts = await getAllSubAccount(bankAccountId);

  return (
    <div>
      <div className="flex gap-x-2">
        <h1 className="text-xl font-bold text-green-500">
          Your Sub Accounts ({subAccounts.length})
        </h1>
        {subAccounts.length < 3 ? (
          <Link
            href={`/dashboard/sub-account/create`}
            className="flex items-center gap-x-1 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded px-1 active:scale-90 transition-all duration-75 focus:outline-none"
          >
            <span>New</span>
            <Plus className="w-5 h-5 text-white" />
          </Link>
        ) : null}
      </div>
      <div
        className={`${styles.scroll_container} flex ${
          subAccounts.length === 3 ? "justify-between" : ""
        } items-center gap-x-4 overflow-x-scroll whitespace-nowrap py-1`}
      >
        {subAccounts.map((subAccount) => (
          <CreditCard key={subAccount.id} subAccount={subAccount} />
        ))}
      </div>
    </div>
  );
};

export default SubAccountSection;
