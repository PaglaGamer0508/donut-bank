import SubAccountDashboard from "@/components/SubAccountDashboard";
import { getAuthSession } from "@/lib/auth";
import { getBankAccount } from "@/lib/getBankAccount";
import { getSubAccount } from "@/lib/getSubAccount";
import React from "react";

interface pageProps {
  params: {
    subAccountId: string;
  };
}

const page: React.FC<pageProps> = async ({ params }) => {
  const { subAccountId } = params;

  const session = await getAuthSession();
  const bankAccount = await getBankAccount(session?.user?.id!);
  const subAccount = await getSubAccount(subAccountId);

  if (!subAccount) {
    return (
      <div>
        <h1>Sub Account not found</h1>
      </div>
    );
  }

  if (subAccount.bankAccountId !== bankAccount.id) {
    return (
      <div>
        <h1>You do not have access to this sub account</h1>
      </div>
    );
  }

  return (
    <>
      <SubAccountDashboard subAccount={subAccount} />
    </>
  );
};

export default page;
