import SubAccountTransactions from "@/components/SubAccountTransactions";
import Transactions from "@/components/Transactions";
import { getAuthSession } from "@/lib/auth";
import { getBankAccountId } from "@/lib/getBankAccountId";
import { getSubAccount } from "@/lib/getSubAccount";
import React from "react";

interface pageProps {
  params: {
    subAccountId: string;
  };
}

const page: React.FC<pageProps> = async ({ params }) => {
  const { subAccountId } = params;

  const subAccount = await getSubAccount(subAccountId);

  if (!subAccount) {
    return <div>No Sub account found</div>;
  }

  return (
    <div>
      <SubAccountTransactions subAccountId={subAccountId} />
    </div>
  );
};

export default page;
