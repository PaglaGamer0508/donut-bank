import CopyText from "@/components/CopyText";
import { Icons } from "@/components/Icons";
import SubAccountTokenItem from "@/components/SubAccountTokenItem";
import { buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { getBankAccount } from "@/lib/getBankAccount";
import { getSubAccount } from "@/lib/getSubAccount";
import { getAllSubAccountTokens } from "@/lib/getAllSubAccountTokens";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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

  const tokens = await getAllSubAccountTokens(subAccount.id);

  return (
    <div>
      <div className="w-[90%] md:w-[60%] lg:w-[40%] mx-auto mt-4 md:mt-6">
        {tokens.length === 0 ? (
          <div className="mb-4">
            <h1 className="text-center text-2xl text-red-500 font-semibold">
              No tokens found
            </h1>
          </div>
        ) : null}

        <div className="grid place-items-center">
          <Link
            className={buttonVariants({ variant: "primary" })}
            href={`/dashboard/sub-account/${subAccountId}/token/create`}
          >
            <span>Create a new token</span>
            <Plus />
          </Link>
        </div>

        <div className="flex flex-col gap-2 mt-2">
          {tokens.map((token) => (
            <SubAccountTokenItem key={token.id} token={token} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
