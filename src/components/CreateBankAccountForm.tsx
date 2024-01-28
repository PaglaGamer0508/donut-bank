"use client";

import Logo from "@/../public/donut.png";
import { toast } from "@/hooks/useToast";
import { cn } from "@/lib/utils";
import { CreateBankAccountValidatorType } from "@/lib/validators/CreateBankAccountValidator";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Lato } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "./ui/Button";

const lato = Lato({ weight: ["900"], subsets: ["latin"] });
interface CreateBankAccountFormProps {
  userId: string;
  email: string;
  image: string;
}

const CreateBankAccountForm: React.FC<CreateBankAccountFormProps> = ({
  userId,
  email,
  image,
}) => {
  const router = useRouter();

  const [accountName, setAccountName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state variable

  // for error messages
  const [message, setMessage] = useState("");

  const clearData = () => {
    setAccountName("");
    setPassword("");
    setConfirmPassword("");
  };

  const createBankAccountData: CreateBankAccountValidatorType = {
    accountName,
    ownerId: userId,
    password,
    email,
    image,
  };

  const { mutate: createBankAccount, isPending } = useMutation({
    mutationFn: async () => {
      await axios.post("/api/bank-account/create", createBankAccountData);
    },
    onError: () => {
      return toast({
        title: "Error",
        description: "Error Occurred Creating Bank Account, Try Again Later",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      clearData();
      router.refresh();
      return toast({
        title: "Success",
        description: "Your DonutBank Account has been Created",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleanedAccountName = accountName.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
    setAccountName(cleanedAccountName);

    if (cleanedAccountName.length < 5) {
      setMessage("Account name must be at least 5 characters");
    } else if (cleanedAccountName.length > 30) {
      setMessage("Account name can't be more than 30 characters");
    } else if (password.length < 8) {
      setMessage("Password must be 8 characters");
    } else if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      setMessage("");
      createBankAccount();
    }
  };
  return (
    <div
      className={cn(
        "shadow-lg rounded-lg w-fit border-2 border-green-500 p-5 pt-0"
      )}
    >
      <div className="flex justify-center py-2">
        <Image alt="Logo" src={Logo} className="w-14" />
      </div>
      <h1 className={`${lato} text-green-500 text-2xl hover:cursor-default`}>
        Create a{" "}
        <span className="text-white bg-green-500 px-1 rounded">DonutBank</span>{" "}
        account
      </h1>
      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="space-y-2">
          <div className="flex flex-col">
            <label
              htmlFor="account-name"
              className="text-lg font-semibold text-green-500"
            >
              Account Name
            </label>
            <input
              type="text"
              spellCheck="false"
              id="account-name"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="Enter Account Name"
              minLength={5}
              maxLength={30}
              required
              className="text-lg font-medium border border-green-500 rounded focus:outline-none py-1 px-3"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-lg font-semibold text-green-500"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password (8 Characters)"
              minLength={8}
              maxLength={8}
              required
              className="text-lg font-medium border border-green-500 rounded focus:outline-none py-1 px-3"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="confirm-password"
              className="text-lg font-semibold text-green-500"
            >
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password (8 Characters)"
              minLength={8}
              maxLength={8}
              required
              className="text-lg font-medium border border-green-500 rounded focus:outline-none py-1 px-3"
            />
          </div>
        </div>
        <div className="my-1">
          <p className="h-5 text-center text-sm text-red-500 font-medium">
            {message}
          </p>
        </div>
        <div className="mt-2">
          <Button
            isLoading={isPending}
            disabled={isPending}
            type="submit"
            className="w-full text-xl font-semibold rounded p-2 text-green-500 hover:text-white border border-green-500 bg-white hover:bg-green-500 transition-all duration-75 active:scale-95"
          >
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateBankAccountForm;
