import ApplicationSeachResult from "@/components/ApplicationSeachResult";
import GoBackButton from "@/components/GoBackButton";
import { buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { getAllSubAccountTokens } from "@/lib/getAllSubAccountTokens";
import { getBankAccount } from "@/lib/getBankAccount";
import { getPublicApplication } from "@/lib/getPublicApplication";
import { getSubAccount } from "@/lib/getSubAccount";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

interface pageProps {
  params: {
    applicationId: string;
    subAccountId: string;
  };
}

const page: React.FC<pageProps> = async ({ params }) => {
  const { subAccountId, applicationId } = params;
  const session = await getAuthSession();

  const bankAccount = await getBankAccount(session?.user?.id!);
  const subAccount = await getSubAccount(subAccountId);
  const application = await getPublicApplication(applicationId);

  if (!subAccount) {
    return (
      <div>
        <h1 className="text-center text-2xl text-red-500 font-semibold">
          Sub Account not found
        </h1>
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

  const subAccountTokens = await getAllSubAccountTokens(subAccount?.id);

  if (!application) {
    return (
      <div>
        <h1 className="text-center text-2xl text-red-500 font-semibold">
          Application not found
        </h1>
      </div>
    );
  }

  return (
    <div className="w-[90%] md:w-[60%] lg:w-[40%] mx-auto mt-4 md:mt-6">
      <div>
        <h1 className="text-2xl font-semibold text-green-500 mb-4">
          Search Result
        </h1>
        <ApplicationSeachResult
          application={application}
          subAccountId={subAccount.id}
          tokens={subAccountTokens}
        />

        <div className="grid place-content-center mt-3">
          <GoBackButton />
        </div>
      </div>
    </div>
  );
};

export default page;
