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
  const [confirmPassword, setConfirmPassword] = useState("");

  // for error messages
  const [errorMassage, setErrorMassage] = useState("");

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
      await axios.post(
        `/api/bank-account?apiKey=${process.env.API_KEY}`,
        createBankAccountData
      );
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
      router.push("/dashboard");
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
      setErrorMassage("Account name must be at least 5 characters");
    } else if (cleanedAccountName.length > 30) {
      setErrorMassage("Account name can't be more than 30 characters");
    } else if (/^\d+$/.test(cleanedAccountName)) {
      setErrorMassage("Bank Account name cannot contain only numbers");
    } else if (password.length !== 8) {
      setErrorMassage("Password has be 8 characters");
    } else if (password !== confirmPassword) {
      setErrorMassage("Passwords do not match");
    } else {
      setErrorMassage("");
      createBankAccount();
    }
  };

  return (
    <div
      className={cn(
        "shadow-lg rounded-lg w-fit bg-white border-2 border-green-500 p-5 pt-0"
      )}
    >
      <div className="flex justify-center py-2">
        <Image
          alt="Logo"
          src={Logo}
          className="w-14"
          width={256}
          height={256}
        />
      </div>
      <h1
        className={`${lato.className} text-green-500 text-2xl text-center hover:cursor-default`}
      >
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
            {errorMassage}
          </p>
        </div>
        <div className="mt-2">
          <Button
            isLoading={isPending}
            disabled={isPending}
            type="submit"
            className="w-full text-xl font-semibold rounded p-2 text-green-500 hover:text-white border border-green-500 bg-white hover:bg-green-500 transition-all duration-75 active:scale-95 focus:outline-transparent"
          >
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateBankAccountForm;
