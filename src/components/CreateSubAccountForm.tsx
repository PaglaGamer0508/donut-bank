"use client";

import Logo from "@/../public/donut.png";
import { toast } from "@/hooks/useToast";
import { useSelectCreditCardColorState } from "@/lib/global-state-store/selectCreditCardColorState";
import { CreateSubAccountValidatorType } from "@/lib/validators/CreateSubAccountValidator";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Lato } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import PreviewCreditCard from "./PreviewCreditCard";
import SelectCreditCardColor from "./SelectCreditCardColor";
import { Button } from "./ui/Button";

const lato = Lato({ weight: ["900"], subsets: ["latin"] });

interface CreateSubAccountFormProps {
  bankAccountId: string;
}

const CreateSubAccountForm: React.FC<CreateSubAccountFormProps> = ({
  bankAccountId,
}) => {
  const router = useRouter();
  const { creditCardColor } = useSelectCreditCardColorState();

  const [subAccountName, setSubAccountName] = useState("");
  // const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const CreateSubAccountData: CreateSubAccountValidatorType = {
    bankAccountId,
    creditCard_color: creditCardColor,
    name: subAccountName,
    // password: password,
  };

  const { mutate: createSubAccount, isPending } = useMutation({
    mutationFn: async () => {
      await axios.post(
        `/api/sub-account?apiKey=${process.env.API_KEY}`,
        CreateSubAccountData
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
      setSubAccountName("");
      router.refresh();
      router.push("/dashboard/sub-account");
      return toast({
        title: "Success",
        description: "Sub account created successfully",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleanedSubAccountName = subAccountName.replace(
      /^\s+|\s+$|\s+(?=\s)/g,
      ""
    );
    setSubAccountName(cleanedSubAccountName);

    if (cleanedSubAccountName.length < 5) {
      setErrorMessage("Sub Account name must be at least 5 characters");
    } else if (/^\d+$/.test(cleanedSubAccountName)) {
      setErrorMessage("Sub Account name cannot contain only numbers");
    }
    // else if (password.length !== 8) {
    //   setErrorMessage("Password has be 8 characters");
    // }
    else if (cleanedSubAccountName.length > 30) {
      setErrorMessage("Sub Account name can't be more than 30 characters");
    } else {
      setErrorMessage("");
      createSubAccount();
    }
  };

  return (
    <div className="shadow-lg rounded-lg w-[98%] md:w-[60%] lg:w-[40%] bg-white border-2 border-green-500 p-2 sm:px-5 pt-0 pb-5">
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
        className={`${lato.className} space-x-1 text-green-500 text-2xl text-center hover:cursor-default`}
      >
        <span>Create a</span>
        <span className="text-white bg-green-500 px-1 rounded">
          Sub-Account
        </span>
      </h1>
      <form
        autoComplete="off"
        method="post"
        id="create-sub-account-form"
        onSubmit={handleSubmit}
        className="mt-3"
      >
        <div className="flex flex-col">
          <label
            htmlFor="sub-account-name"
            className="text-lg font-semibold text-green-500"
          >
            Sub Account Name
          </label>
          <input
            type="text"
            spellCheck="false"
            id="sub-account-name"
            value={subAccountName}
            onChange={(e) => setSubAccountName(e.target.value)}
            placeholder="Enter Account Name"
            minLength={5}
            maxLength={30}
            required
            className="text-lg font-medium border border-green-500 rounded focus:outline-none py-1 px-3"
          />
          {/* <div className="flex flex-col">
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
          </div> */}

          {/* Select Credit Card Color */}
          <div className="mt-2">
            <p className="text-lg font-semibold text-green-500">
              Select Credit Card Color
            </p>
            <div className="w-full flex items-center justify-between gap-x-1 text-lg font-semibold bg-green-500 text-white p-1 sm:px-10 rounded">
              <p>Color</p>
              <PreviewCreditCard creditCardColor={creditCardColor} />
              <SelectCreditCardColor />
            </div>
          </div>

          {/* error Message */}
          <p className="h-4 text-sm text-red-500 font-medium text-center">
            {errorMessage}
          </p>
          <Button
            isLoading={isPending}
            disabled={isPending}
            type="submit"
            className="w-full text-xl font-semibold rounded p-2 text-green-500 hover:text-white border border-green-500 bg-white hover:bg-green-500 transition-all duration-75 active:scale-95 mt-1"
          >
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateSubAccountForm;
