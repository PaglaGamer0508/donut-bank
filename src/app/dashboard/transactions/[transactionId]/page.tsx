import TransactionPage from "@/components/TransactionPage";
import { getAuthSession } from "@/lib/auth";
import { getBankAccountId } from "@/lib/getBankAccountId";
import { getTransaction } from "@/lib/getTransaction";
import React from "react";

interface pageProps {
  params: {
    transactionId: string;
  };
}

const page: React.FC<pageProps> = async ({ params }) => {
  const session = await getAuthSession();
  const bankAccountId = await getBankAccountId(session?.user?.id!);
  const { transactionId } = params;

  const transaction = await getTransaction(transactionId);

  if (!transaction) {
    return (
      <div>
        <h1 className="text-center text-2xl text-red-500 font-semibold">
          Transaction not found
        </h1>
      </div>
    );
  }

  if (
    transaction.bankAccountId !== bankAccountId &&
    transaction.receiverBankAccountId !== bankAccountId
  ) {
    return (
      <div>
        <h1 className="text-center text-2xl text-red-500 font-semibold">
          You are not authorized to view this transaction
        </h1>
      </div>
    );
  }

  return (
    <div>
      <TransactionPage
        transaction={transaction}
        bankAccountId={bankAccountId}
      />
    </div>
  );
};

export default page;
