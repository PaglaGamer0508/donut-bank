"use client";

import Logo from "@/../public/donut.png";
import QuickTransferAavtar from "@/components/QuickTransferAvatar";
import { QuickSendMoneyAccount } from "@/lib/types/quick-send-money-account";
import { Search, User2Icon } from "lucide-react";
import { Lato } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "./style/WithdrawCoins.module.css";
import { Button } from "./ui/Button";

const lato = Lato({ weight: ["900"], subsets: ["latin"] });

interface SendMoneySectionProps {
  quickSendMoneyAccounts: QuickSendMoneyAccount[];
}

const SendMoneySection: React.FC<SendMoneySectionProps> = ({
  quickSendMoneyAccounts,
}) => {
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const onBankAccountNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.value.length > 10) {
      e.target.value = e.target.value.slice(0, 10);
    }

    setBankAccountNumber(e.target.value);
  };

  // OnSubmit
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (bankAccountNumber.length !== 10) {
      return setErrorMessage("Bank account number must be 10 digits");
    }

    setErrorMessage("");
    router.push(`/dashboard/send-money/${bankAccountNumber}`);
  };

  return (
    <div>
      <div className="mb-5">
        <div className="flex justify-center pb-2">
          <Image
            alt="Logo"
            src={Logo}
            className="w-14"
            width={256}
            height={256}
          />
        </div>
        <h1 className={`${lato.className} text-2xl text-green-500 text-center`}>
          Send Money
        </h1>

        <div className="mb-1">
          <h1 className={`${lato.className} text-lg text-green-500`}>
            Quick Send Money Accounts
          </h1>

          <div className="flex gap-x-1">
            {quickSendMoneyAccounts.map((quickSendMoneyAccount) => (
              <QuickTransferAavtar
                key={quickSendMoneyAccount.id}
                quickSendMoneyAccount={quickSendMoneyAccount}
              />
            ))}
          </div>
        </div>

        <form onSubmit={onSubmit} autoComplete="off">
          <div className="flex flex-col">
            <label
              className="text-lg font-semibold text-green-500"
              htmlFor="search-bank-account"
            >
              Bank Account Number
            </label>
            <div className="h-10 flex gap-x-1">
              <div className="grid place-items-center h-full">
                <User2Icon className="w-9 h-9 text-green-500" />
              </div>
              <input
                type="number"
                name="search-bank-account"
                id="search-bank-account"
                placeholder="Enter bank account number"
                value={bankAccountNumber}
                onChange={onBankAccountNumberChange}
                minLength={10}
                maxLength={10}
                required
                className={`${styles.amount_input} w-[85%] md:w-[90%] text-lg font-medium border border-green-500 rounded focus:outline-none py-1 px-3`}
              />
              <Button
                className="w-[15%] md:w-[10%]"
                type="submit"
                variant={"primary"}
              >
                <Search className="w-8 h-8" />
              </Button>
            </div>
            <p className="h-4 text-sm text-red-500 font-medium text-center">
              {errorMessage}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendMoneySection;
