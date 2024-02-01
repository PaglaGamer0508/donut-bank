"use client";

import Logo from "@/../public/donut.png";
import { toast } from "@/hooks/useToast";
import { formatAmountWithCommas } from "@/lib/formatAmountWithCommas ";
import { WithdrawValidatorType } from "@/lib/validators/withdrawValidator";
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

interface WithdrawCoinsProps {
  bankAccountId: string;
  userId: string;
  balance: number;
}

const WithdrawCoins: React.FC<WithdrawCoinsProps> = ({
  bankAccountId,
  userId,
  balance,
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const withdrawLimit = 25000;
  const router = useRouter();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    const isInt = Number.isInteger(value);

    if (isNaN(value)) {
      setAmount(0);
      setErrorMessage("");
      return;
    }

    if (!isInt) {
      setErrorMessage("value is not an integer");
      return;
    }

    if (value > withdrawLimit) {
      setErrorMessage(`value is greater than ${withdrawLimit}`);
      return;
    }

    setAmount(value);
    setErrorMessage("");
  };

  const handleUpClick = () => {
    const newAmount = amount + 1000;
    if (newAmount > withdrawLimit) {
      setAmount(withdrawLimit);
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

  const withdrawData: WithdrawValidatorType = {
    amount,
    bankAccountId,
    password,
    userId,
  };

  const { mutate: withdrawMoney, isPending } = useMutation({
    mutationFn: async () => {
      await axios.post("/api/withdraw", withdrawData);
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
        description: "Withdraw Money Successfully",
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (amount < 50) {
      setErrorMessage("Minimum withdraw amount is 50");
      return;
    }
    if (amount > balance) {
      setErrorMessage("Insufficient balance");
      return;
    }
    setErrorMessage("");
    withdrawMoney();
  };

  return (
    <div>
      <form
        autoComplete="off"
        method="post"
        id="withdraw-form"
        onSubmit={onSubmit}
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
            Withdraw Coins
          </h1>
          <p className={`${lato.className} text-xl text-green-900 text-center`}>
            Balance: {formatAmountWithCommas(balance)}
          </p>
        </div>

        <label
          htmlFor="amount"
          className="text-lg font-semibold text-green-500 p-0 space-x-2"
        >
          Amount (Limit {withdrawLimit})
        </label>

        <div className="flex items-center gap-x-1 h-12">
          <Icons.donutCoin className="w-12 h-12" fill="#22c55e" />
          <input
            onChange={handleAmountChange}
            value={amount}
            id="amount"
            name="withdraw-amount"
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
        <div className="flex flex-col gap-y-2">
          <label
            htmlFor="withdraw-password"
            className="text-lg font-semibold text-green-500"
          >
            Password
          </label>
          <input
            id="withdraw-password"
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
          Withdraw
        </Button>
      </form>
    </div>
  );
};

export default WithdrawCoins;
