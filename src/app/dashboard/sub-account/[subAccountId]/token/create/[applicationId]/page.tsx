import ApplicationSeachResult from "@/components/ApplicationSeachResult";
import SubAccountDashboard from "@/components/SubAccountDashboard";
import { buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { getApplication } from "@/lib/getApplication";
import { getBankAccount } from "@/lib/getBankAccount";
import { getSubAccount } from "@/lib/getSubAccount";
import { getAllSubAccountTokens } from "@/lib/getAllSubAccountTokens";
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
  const application = await getApplication(applicationId);

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

  const subAccountTokens = await getAllSubAccountTokens(subAccount?.id);

  if (!application) {
    return (
      <div>
        <h1>Application not found</h1>
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

        <div className="grid place-content-center">
          <Link
            className={`${buttonVariants({
              variant: "primary",
            })} mt-2`}
            href={`/dashboard/sub-account/${subAccountId}/token`}
          >
            <ArrowLeft />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
