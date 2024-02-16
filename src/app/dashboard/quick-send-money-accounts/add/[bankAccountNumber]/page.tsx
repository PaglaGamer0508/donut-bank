import BankAccountSearchResult from "@/components/BankAccountSearchResult";
import { Button, buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { getBankAccount } from "@/lib/getBankAccount";
import { getBankAccountId } from "@/lib/getBankAccountId";
import { getBankAccountWithNumber } from "@/lib/getBankAccountWithNumber";
import { getQuickSendMoneyAccounts } from "@/lib/getQuickSendMoneyAccounts";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

interface pageProps {
  params: {
    bankAccountNumber: string;
  };
}

const page: React.FC<pageProps> = async ({ params }) => {
  const { bankAccountNumber } = params;
  // My account
  const session = await getAuthSession();
  const bankAccountId = await getBankAccountId(session?.user?.id!);

  // Checking the format of the bank account number
  const bankAccountNumberFormater = (bankAccountNumber: string) => {
    const parrent = /^\d{10}$/;
    return parrent.test(bankAccountNumber);
  };
  const isBankAccountNumberFormated =
    bankAccountNumberFormater(bankAccountNumber);

  // Quick send money accounts
  const quickSendMoneyAccounts = await getQuickSendMoneyAccounts(
    bankAccountId!
  );

  // Searched bank account
  const searchedBankAccount = await getBankAccountWithNumber(bankAccountNumber);

  return (
    <div className="w-[90%] md:w-[60%] lg:w-[40%] mx-auto mt-4 md:mt-6">
      {isBankAccountNumberFormated ? (
        <div>
          {searchedBankAccount ? (
            <div>
              <h1 className="text-2xl font-semibold text-green-500 mb-4">
                Search Result
              </h1>

              <BankAccountSearchResult
                quickSendMoneyAccounts={quickSendMoneyAccounts}
                bankAccountId={bankAccountId!}
                accountName={searchedBankAccount.accountName}
                bankAccountNumber={searchedBankAccount.bankAccountNumber}
                imageUrl={searchedBankAccount.image}
                id={searchedBankAccount.id}
              />
            </div>
          ) : (
            <div>
              <h1 className="text-center text-2xl text-red-500 font-semibold">
                Bank Account Not Found
              </h1>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div>
            <h1 className="text-center text-2xl text-red-500 font-semibold">
              Bank Account Number is not valid
            </h1>
          </div>
        </div>
      )}
      <div className="grid place-items-center">
        <Link
          className={`${buttonVariants({
            variant: "primary",
          })} mt-2`}
          href={`/dashboard`}
        >
          <ArrowLeft />
        </Link>
      </div>
    </div>
  );
};

export default page;
