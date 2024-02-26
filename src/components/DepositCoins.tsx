"use client";

import Logo from "@/../public/donut.png";
import { toast } from "@/hooks/useToast";
import { formatAmountWithCommas } from "@/lib/formatAmountWithCommas ";
import { DepositValidatorType } from "@/lib/validators/DepositValidator";
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

interface DepositCoinsProps {
  bankAccountId: string;
  userId: string;
  balance: number;
}

const DepositCoins: React.FC<DepositCoinsProps> = ({
  bankAccountId,
  userId,
  balance,
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState("");
  const depositLimit = 100000;

  const router = useRouter();

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

    if (value > depositLimit) {
      setErrorMessage(`value is greater than ${depositLimit}`);
      return;
    }

    setAmount(value);
    setErrorMessage("");
  };

  const handleUpClick = () => {
    const newAmount = amount + 1000;
    if (newAmount > depositLimit) {
      setAmount(depositLimit);
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

  const depositData: DepositValidatorType = {
    amount,
    bankAccountId,
    userId,
  };

  const { mutate: depositMoney, isPending } = useMutation({
    mutationFn: async () => {
      await axios.post(
        `/api/deposit?apiKey=${process.env.API_KEY}`,
        depositData
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
      setErrorMessage("");
      router.refresh();
      return toast({
        title: "Success",
        description: "Deposit Money Successfully",
        action: (
          <Button
            className="active:scale-95 transition-all duration-75"
            onClick={() => router.push("/dashboard")}
            variant={"secondary"}
          >
            Dashboard
          </Button>
        ),
        duration: 5000,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (amount < 100) {
      setErrorMessage("Minimum Deposit amount is 100");
      return;
    }
    setErrorMessage("");
    depositMoney();
  };

  return (
    <div>
      <form
        autoComplete="off"
        method="post"
        id="deposit-form"
        onSubmit={handleSubmit}
      >
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
          <h1
            className={`${lato.className} text-2xl text-green-500 text-center`}
          >
            Deposit Coins
          </h1>

          <p className={`${lato.className} text-xl text-green-900 text-center`}>
            Balance: {formatAmountWithCommas(balance)}
          </p>
        </div>

        <label
          htmlFor="amount"
          className="text-lg font-semibold text-green-500 p-0 space-x-2"
        >
          Amount (Limit {depositLimit})
        </label>

        <div className="flex items-center gap-x-1 h-12">
          <Icons.donutCoin className="w-12 h-12" fill="#22c55e" />
          <input
            onChange={handleAmountChange}
            value={amount}
            id="amount"
            name="deposit-amount"
            type="number"
            placeholder="Enter the Amount"
            autoComplete="false"
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
          Deposit
        </Button>
      </form>
    </div>
  );
};

export default DepositCoins;
