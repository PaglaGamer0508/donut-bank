"use client";

import Logo from "@/../public/donut.png";
import { toast } from "@/hooks/useToast";
import { formatAmountWithCommas } from "@/lib/formatAmountWithCommas ";
import { SubAccount } from "@/lib/types/sub-account";
import { AddMoneyValidatorType } from "@/lib/validators/AddMoneyValidator";
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

interface AddMoneyProps {
  subAccount: SubAccount;
  balance: number;
  bankAccountId: string;
}

const AddMoney: React.FC<AddMoneyProps> = ({
  subAccount,
  balance,
  bankAccountId,
}) => {
  const addMoneyLimit = 20000;
  const [amount, setAmount] = useState<number>(0);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleUpClick = () => {
    const newAmount = amount + 1000;
    if (newAmount > addMoneyLimit) {
      setAmount(addMoneyLimit);
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

    if (value > addMoneyLimit) {
      setErrorMessage(`value is greater than ${addMoneyLimit}`);
      return;
    }

    setAmount(value);
    setErrorMessage("");
  };

  const AddMoneyData: AddMoneyValidatorType = {
    amount,
    subAccountId: subAccount.id,
    bankAccountId,
    password,
  };

  const { mutate: AddMoney, isPending } = useMutation({
    mutationFn: async () => {
      await axios.post(
        `/api/sub-account/add-money?apiKey=${process.env.API_KEY}`,
        AddMoneyData
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
        description: "Add Money Successfully",
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (amount < 50) {
      setErrorMessage("Minimum add money amount is 50");
      return;
    }
    if (amount > balance) {
      setErrorMessage("Insufficient balance");
      return;
    }
    setErrorMessage("");
    AddMoney();
  };

  return (
    <div>
      <form
        autoComplete="off"
        method="post"
        id="add-money-form"
        onSubmit={onSubmit}
      >
        <div className="mb-3">
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
            Add Money
          </h1>
          <p className={`${lato.className} text-xl text-green-900 text-center`}>
            Bank Account Balance: {formatAmountWithCommas(balance)}
          </p>
          <div className="flex flex-col gap-y-1 items-center">
            <div
              className={`${lato.className} flex w-fit border-2 border-green-500 rounded overflow-hidden text-md`}
            >
              <p className="bg-green-500 text-white px-2">Sub Account Name</p>
              <p className="text-green-500 px-2">{subAccount.name}</p>
            </div>
            <div
              className={`${lato.className} flex w-fit border-2 border-green-500 rounded overflow-hidden text-md`}
            >
              <p className="bg-green-500 text-white px-2">Credit Number</p>
              <p className="text-green-500 px-2">
                {subAccount.creditCard_number}
              </p>
            </div>
          </div>
        </div>

        <label
          htmlFor="amount"
          className="text-lg font-semibold text-green-500 p-0 space-x-2"
        >
          Amount (Limit {addMoneyLimit})
        </label>

        <div className="flex items-center gap-x-1 h-12">
          <Icons.donutCoin className="w-12 h-12" fill="#22c55e" />
          <input
            onChange={handleAmountChange}
            value={amount}
            id="amount"
            name="add-money-amount"
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
            htmlFor="add-money-password"
            className="text-lg font-semibold text-green-500"
          >
            Password
          </label>
          <input
            id="add-money-password"
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
          Deposit
        </Button>
      </form>
    </div>
  );
};

export default AddMoney;
