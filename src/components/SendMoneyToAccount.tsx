"use client";

import Logo from "@/../public/donut.png";
import { toast } from "@/hooks/useToast";
import { formatAmountWithCommas } from "@/lib/formatAmountWithCommas ";
import { SendMoneyValidatorType } from "@/lib/validators/SendMoneyValidator";
import { BankAccount } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Lato } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Icons } from "./Icons";
import styles from "./style/WithdrawCoins.module.css";
import { Button } from "./ui/Button";

const lato = Lato({ weight: ["900"], subsets: ["latin"] });

interface SendMoneyToAccountProps {
  userBankAccount: BankAccount;
  searchedBankAccount: BankAccount;
}

const SendMoneyToAccount: React.FC<SendMoneyToAccountProps> = ({
  userBankAccount,
  searchedBankAccount,
}) => {
  const sendMoneyLimit = 50000;

  const [amount, setAmount] = useState<number>(0);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleUpClick = () => {
    const newAmount = amount + 1000;
    if (newAmount > sendMoneyLimit) {
      setAmount(sendMoneyLimit);
      return;
    }

    setAmount((prevAmount) => (prevAmount += 1000));
    setErrorMessage("");
  };

  const handleDownClick = () => {
    const newAmount = amount - 1000;
    if (amount === 0) return;
    if (newAmount < 0) {
      return setAmount(0);
    }

    setAmount((prevAmount) => (prevAmount -= 1000));
    setErrorMessage("");
  };

  const SendMoneyData: SendMoneyValidatorType = {
    amount,
    bankAccountId: userBankAccount.id,
    receiverBankAccountId: searchedBankAccount.id,
    password,
  };

  const { mutate: SendMoney, isPending } = useMutation({
    mutationFn: async () => {
      await axios.post(
        `/api/send-money?apiKey=${process.env.API_KEY}`,
        SendMoneyData
      );
    },
    onError: (error: any) => {
      return toast({
        title: "Error",
        description: error.response.data,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      setAmount(0);
      setPassword("");
      setErrorMessage("");
      router.refresh();
      return toast({
        title: "Success",
        description: "Money sent successfully",
        action: (
          <Button
            className="active:scale-95 transition-all duration-75"
            onClick={() => router.push("/dashboard/sub-account")}
            variant={"secondary"}
          >
            Sub Accounts
          </Button>
        ),
        duration: 5000,
      });
    },
  });

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    const isInt = Number.isInteger(value);

    if (isNaN(value)) {
      setAmount(0);
      setErrorMessage("It's not a number");
      return;
    }

    if (!isInt) {
      setErrorMessage("value is not an integer");
      return;
    }

    if (value > sendMoneyLimit) {
      setErrorMessage(`value is greater than ${sendMoneyLimit}`);
      return;
    }

    setAmount(value);
    setErrorMessage("");
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (amount < 100) {
      setErrorMessage("Minimum add money amount is 100");
      return;
    }
    if (amount > userBankAccount.balance) {
      setErrorMessage("Insufficient balance");
      return;
    }
    setErrorMessage("");
    SendMoney();
  };

  return (
    <div>
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

      <p className={`${lato.className} text-xl text-green-900 text-center`}>
        Balance: {formatAmountWithCommas(userBankAccount.balance)}
      </p>

      {/* searched bank account Profile  */}
      <div className="grid place-items-center">
        <div className="flex items-center gap-x-1">
          <Image
            alt="Profile Picture"
            className="w-12 h-12 rounded-full"
            src={searchedBankAccount.image}
            width={128}
            height={128}
          />

          <div>
            <h1 className="text-xl font-semibold text-green-500">
              {searchedBankAccount.accountName}
            </h1>
            <p className="text-slate-400 text-sm font-medium">
              {searchedBankAccount.bankAccountNumber}
            </p>
          </div>
        </div>
      </div>

      <form
        autoComplete="off"
        method="post"
        id="send-money-form"
        onSubmit={onSubmit}
      >
        <label
          htmlFor="amount"
          className="text-lg font-semibold text-green-500 p-0 space-x-2"
        >
          Amount (Limit {sendMoneyLimit})
        </label>

        <div className="flex items-center gap-x-1 h-12">
          <Icons.donutCoin className="w-12 h-12" fill="#22c55e" />
          <input
            onChange={handleAmountChange}
            value={amount}
            id="amount"
            name="send-money-amount"
            type="number"
            placeholder="Enter the Amount"
            autoComplete="off"
            className={`${styles.amount_input} w-[90%] text-3xl text-center font-medium border border-green-500 rounded focus:outline-none py-1 px-3`}
          />
          <div className="h-full flex flex-col items-center w-[10%] space-y-1">
            <button
              onClick={handleUpClick}
              type="button"
              className="h-[50%] grid place-items-center w-full bg-green-500 hover:bg-green-600 active:scale-95 transition-all duration-75 rounded-t-md rounded-b-sm"
            >
              {/* up arrow */}
              <Icons.arrow fill="#ffffff" className="w-4 h-4 rotate-180" />
            </button>
            <button
              onClick={handleDownClick}
              type="button"
              className="h-[50%] grid place-items-center w-full bg-green-500 hover:bg-green-600 active:scale-95 transition-all duration-75 rounded-t-sm rounded-b-md"
            >
              {/* down arrow */}
              <Icons.arrow fill="#ffffff" className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <label
            htmlFor="send-money-password"
            className="text-lg font-semibold text-green-500"
          >
            Password
          </label>
          <input
            id="send-money-password"
            type="password"
            minLength={8}
            maxLength={8}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password (8 Characters)"
            className="text-lg font-medium border border-green-500 rounded focus:outline-none py-1 px-3"
          />
        </div>
        <p className="h-4 text-sm text-red-500 font-medium text-center">
          {errorMessage}
        </p>
        <Button
          isLoading={isPending}
          disabled={isPending}
          variant={"primary"}
          className="w-full mt-1"
          type="submit"
        >
          Send Money
        </Button>
      </form>
    </div>
  );
};

export default SendMoneyToAccount;
