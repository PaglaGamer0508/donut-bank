import Transactions from "@/components/Transactions";
import { getAuthSession } from "@/lib/auth";
import { getBankAccountId } from "@/lib/getBankAccountId";
import React from "react";

const page: React.FC = async () => {
  const session = await getAuthSession();

  const bankAccountId = await getBankAccountId(session?.user?.id!);

  if (!bankAccountId) {
    return <div>No bank account Id found</div>;
  }

  return (
    <div>
      <Transactions bankAccountId={bankAccountId} />
    </div>
  );
};

export default page;
