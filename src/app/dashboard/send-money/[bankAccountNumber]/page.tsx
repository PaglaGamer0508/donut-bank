import SendMoneyToAccount from "@/components/SendMoneyToAccount";
import { buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { getBankAccount } from "@/lib/getBankAccount";
import { getBankAccountWithNumber } from "@/lib/getBankAccountWithNumber";
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
  const userBankAccount = await getBankAccount(session?.user?.id!);
  // Searched bank account
  const searchedBankAccount = await getBankAccountWithNumber(bankAccountNumber);

  if (searchedBankAccount === null) {
    return (
      <div>
        <h1 className="text-center text-2xl text-red-500 font-semibold">
          Bank Account Not Found
        </h1>
      </div>
    );
  }

  // Checking the format of the bank account number
  const bankAccountNumberFormater = (bankAccountNumber: string) => {
    const parrent = /^\d{10}$/;
    return parrent.test(bankAccountNumber);
  };
  const isBankAccountNumberFormated =
    bankAccountNumberFormater(bankAccountNumber);

  if (userBankAccount.id === searchedBankAccount.id) {
    return (
      <div className="w-[90%] md:w-[60%] lg:w-[40%] mx-auto mt-4 md:mt-6">
        <div>
          <h1 className="text-center text-2xl text-red-500 font-semibold">
            Bank Account is your own
          </h1>

          <div className="grid place-items-center">
            <Link
              className={`${buttonVariants({
                variant: "primary",
              })} mt-2`}
              href={`/dashboard/send-money`}
            >
              <ArrowLeft />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[90%] md:w-[60%] lg:w-[40%] mx-auto mt-4 md:mt-6">
      {isBankAccountNumberFormated ? (
        <div>
          {searchedBankAccount ? (
            <div>
              <SendMoneyToAccount
                searchedBankAccount={searchedBankAccount}
                userBankAccount={userBankAccount}
              />
            </div>
          ) : (
            <div>
              <h1 className="text-center text-2xl text-red-500 font-semibold">
                Bank Account Not Found
              </h1>

              <div className="grid place-items-center">
                <Link
                  className={`${buttonVariants({
                    variant: "primary",
                  })} mt-2`}
                  href={`/dashboard/send-money`}
                >
                  <ArrowLeft />
                </Link>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h1 className="text-center text-2xl text-red-500 font-semibold">
            Bank Account Number is not valid
          </h1>

          <div className="grid place-items-center">
            <Link
              className={`${buttonVariants({
                variant: "primary",
              })} mt-2`}
              href={`/dashboard/send-money`}
            >
              <ArrowLeft />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
