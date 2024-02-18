import SubAccountDashboard from "@/components/SubAccountDashboard";
import { getAuthSession } from "@/lib/auth";
import { getBankAccount } from "@/lib/getBankAccount";
import { getSubAccount } from "@/lib/getSubAccount";
import { getSubAccountTokens } from "@/lib/getSubAccountTokens";
import { getToken } from "next-auth/jwt";
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

  const tokens = await getSubAccountTokens(subAccount.id);

  return (
    <div>
      <div className="w-[90%] md:w-[60%] lg:w-[40%] mx-auto mt-4 md:mt-6">
        {tokens.length === 0 ? (
          <div>
            <h1>No tokens found</h1>
          </div>
        ) : null}

        <Link
          className="text-red-500"
          href={`/dashboard/sub-account/${subAccountId}/token/create`}
        >
          Create a new token
        </Link>

        {tokens.map((token) => (
          <div key={token.id}>
            <Image
              alt="Profile Picture"
              className="w-12 h-12 rounded-lg"
              src={token.application.logo}
              width={128}
              height={128}
            />
            <div>
              <h1>{token.token}</h1>
              <p>Limit: {token.limit}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
