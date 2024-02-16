import { SubAccount } from "@/lib/types/sub-account";
import Link from "next/link";
import React from "react";

interface SubAccountDashboardProps {
  subAccount: SubAccount;
}

const SubAccountDashboard: React.FC<SubAccountDashboardProps> = ({
  subAccount,
}) => {
  return (
    <div className="px-1 md:px-3 lg:px-6 pt-3 mb-2 md:mb-0">
      <h1 className="text-2xl font-bold mb-2">Sub Account Dashboard</h1>
      <p>Sub Account: {subAccount.name}</p>
      <p>Sub Account Number: {subAccount.creditCard_number}</p>
      <p>Sub Account Balance: {subAccount.balance}</p>
      <p>Credit Card Color: {subAccount.creditCard_color}</p>

      <Link
        href={`/dashboard/sub-account/${subAccount.id}/token`}
        className="text-red-500"
      >
        Tokens
      </Link>
    </div>
  );
};

export default SubAccountDashboard;
