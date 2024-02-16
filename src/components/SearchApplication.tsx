"use client";

import Logo from "@/../public/donut.png";
import { Search, User2Icon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./style/WithdrawCoins.module.css";
import { Lato } from "next/font/google";

const lato = Lato({ weight: ["900"], subsets: ["latin"] });

interface SearchApplicationProps {
  subAccountId: string;
}

const SearchApplication: React.FC<SearchApplicationProps> = ({
  subAccountId,
}) => {
  const [applicationId, setApplicationId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (applicationId.length !== 16) {
      return setErrorMessage("Application ID must be 16 characters");
    }

    setErrorMessage("");
    router.push(
      `/dashboard/sub-account/${subAccountId}/token/create/${applicationId}`
    );
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
          Create Token
        </h1>
        <form onSubmit={onSubmit} autoComplete="off">
          <div className="flex flex-col">
            <label
              className="text-lg font-semibold text-green-500"
              htmlFor="search-bank-account"
            >
              Search Application
            </label>
            <div className="h-10 flex gap-x-1">
              <div className="grid place-items-center h-full">
                <User2Icon className="w-9 h-9 text-green-500" />
              </div>
              <input
                type="text"
                name="search-bank-account"
                id="search-bank-account"
                placeholder="Search Application With ID"
                value={applicationId}
                onChange={(e) => {
                  setApplicationId(e.target.value);
                }}
                minLength={16}
                maxLength={16}
                required
                className={`w-[85%] md:w-[90%] text-lg font-medium border border-green-500 rounded focus:outline-none py-1 px-3`}
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

export default SearchApplication;
