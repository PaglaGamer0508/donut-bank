import CreateBankAccountForm from "@/components/CreateBankAccountForm";
import { getAuthSession } from "@/lib/auth";
import { hasBankAccount } from "@/lib/hasBankAccount";
import { redirect } from "next/navigation";
import React from "react";

const page: React.FC = async ({}) => {
  const session = await getAuthSession();

  const bankAccountExist = await hasBankAccount();

  if (bankAccountExist === true) {
    redirect("/dashboard");
  }

  return (
    <div>
      <div className="grid place-items-center min-h-screen mx-1">
        <CreateBankAccountForm
          userId={session?.user?.id!}
          email={session?.user?.email!}
          image={session?.user?.image!}
        />
      </div>
    </div>
  );
};

export default page;
