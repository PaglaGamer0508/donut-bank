import BankAccountSearchResult from "@/components/BankAccountSearchResult";
import { getAuthSession } from "@/lib/auth";
import { getBankAccount } from "@/lib/getBankAccount";
import { getBankAccountWithNumber } from "@/lib/getBankAccountWithNumber";
import { getQuickSendMoneyAccounts } from "@/lib/getQuickSendMoneyAccounts";
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
  const bankAccount = await getBankAccount(session?.user?.id!);

  // Checking the format of the bank account number
  const bankAccountNumberFormater = (bankAccountNumber: string) => {
    const parrent = /^\d{10}$/;
    return parrent.test(bankAccountNumber);
  };
  const isBankAccountNumberFormated =
    bankAccountNumberFormater(bankAccountNumber);

  // Quick send money accounts
  const quickSendMoneyAccounts = await getQuickSendMoneyAccounts(
    bankAccount.id
  );

  // Searched bank account
  const searchedBankAccount = await getBankAccountWithNumber(bankAccountNumber);

  return (
    <div className="w-[90%] md:w-[60%] lg:w-[40%] mx-auto mt-4 md:mt-10">
      {isBankAccountNumberFormated ? (
        <div>
          {searchedBankAccount ? (
            <div>
              <div className="mb-4">
                <h1 className="text-2xl font-semibold text-green-500">
                  Search Result
                </h1>
              </div>

              <BankAccountSearchResult
                quickSendMoneyAccounts={quickSendMoneyAccounts}
                bankAccount={bankAccount}
                accountName={searchedBankAccount.accountName}
                bankAccountNumber={searchedBankAccount.bankAccountNumber}
                imageUrl={searchedBankAccount.image}
                id={searchedBankAccount.id}
              />
            </div>
          ) : (
            <h1>Bank Account Not Found</h1>
          )}
        </div>
      ) : (
        <div>
          <h1>Bank Account Number is not valid</h1>
        </div>
      )}
    </div>
  );
};

export default page;
