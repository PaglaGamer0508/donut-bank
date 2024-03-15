"use client";

import { toast } from "@/hooks/useToast";
import { Application } from "@/lib/types/application";
import { Token } from "@/lib/types/token";
import { CreateSubAccountTokenValidatorType } from "@/lib/validators/CreateSubAccountTokenValidator";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Check, Plus } from "lucide-react";
import { Lato } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Icons } from "./Icons";
import styles from "./style/WithdrawCoins.module.css";
import { Button } from "./ui/Button";

const lato = Lato({ weight: ["900"], subsets: ["latin"] });

interface ApplicationSeachResultProps {
  application: Application;
  subAccountId: string;
  tokens: Token[];
}

const ApplicationSeachResult: React.FC<ApplicationSeachResultProps> = ({
  application,
  subAccountId,
  tokens,
}) => {
  const router = useRouter();
  const tokenLimitMax = 100000;
  const tokenLimitMin = 100;

  const [setshowCreateTokenForm, setSetshowCreateTokenForm] = useState(false);
  const [tokenLimit, setTokenLimit] = useState(1000);
  const [errorMessage, setErrorMessage] = useState("");

  // new array of application IDs
  const applicationIds: string[] = tokens.map((token) => token.applicationId);

  const handleUpClick = () => {
    const newAmount = tokenLimit + 1000;
    if (newAmount > tokenLimitMax) {
      setTokenLimit(tokenLimitMax);
      return;
    }

    setTokenLimit((prevAmount) => (prevAmount += 1000));
    setErrorMessage("");
  };

  const handleDownClick = () => {
    const newAmount = tokenLimit - 1000;
    if (tokenLimit === 0) return;
    if (newAmount < 0) {
      return setTokenLimit(0);
    }

    setTokenLimit((prevAmount) => (prevAmount -= 1000));
    setErrorMessage("");
  };

  const onLimitAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    const isInt = Number.isInteger(value);

    if (isNaN(value)) {
      setTokenLimit(0);
      setErrorMessage("It's not a number");
      return;
    }

    if (!isInt) {
      setErrorMessage("value is not an integer");
      return;
    }

    if (value > tokenLimitMax) {
      setErrorMessage(`value is greater than ${tokenLimitMax}`);
      return;
    }

    setTokenLimit(value);
    setErrorMessage("");
  };

  const createSubAccountTokenData: CreateSubAccountTokenValidatorType = {
    applicationId: application.id,
    subAccountId: subAccountId,
    limit: tokenLimit,
  };

  const { mutate: CreateToken, isPending } = useMutation({
    mutationFn: async () => {
      await axios.post(
        `/api/sub-account/token?apiKey=${process.env.API_KEY}`,
        createSubAccountTokenData
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
      setTokenLimit(1000);
      setErrorMessage("");
      setSetshowCreateTokenForm(false);
      router.push(`/dashboard/sub-account/${subAccountId}/token`);
      router.refresh();
      return toast({
        title: "Success",
        description: "Token Created",
        duration: 5000,
      });
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tokenLimit < tokenLimitMin) {
      setErrorMessage("Minimum Token amount is 50");
      return;
    }
    setErrorMessage("");
    CreateToken();
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-x-2 border-2 border-green-500 rounded-xl p-2 md:px-6">
        <div className="flex items-center gap-x-1">
          <Image
            alt="Logo"
            className="w-12 h-12 rounded-lg"
            src={application.logo}
            width={128}
            height={128}
          />

          <div>
            <h1 className="text-xl font-semibold text-green-500">
              {application.name}
            </h1>
            <p className="text-slate-400 text-sm font-medium">
              {application.applicationId}
            </p>
          </div>
        </div>

        <div>
          {applicationIds.includes(application.id) ? (
            <div title="Account Already Added">
              <Check className="w-10 h-10 bg-green-500 text-white rounded-full p-1" />
            </div>
          ) : (
            <button
              onClick={() => setSetshowCreateTokenForm(!setshowCreateTokenForm)}
              title="Create a new Token"
              className="bg-green-500 hover:bg-green-600 active:scale-90 transition-all duration-75 grid place-items-center w-10 h-10 rounded-full focus:outline-none"
            >
              <Plus className="text-white w-10 h-10" />
            </button>
          )}
        </div>
      </div>

      {/* Create Token Form */}
      {setshowCreateTokenForm && (
        <div className="mt-4">
          <h1 className="text-2xl font-semibold text-green-500">
            Create Token
          </h1>
          <div className="border-2 border-green-500 rounded-lg p-3">
            <form onSubmit={onSubmit}>
              <p className="text-lg font-semibold text-green-500">
                Select Token Limit
              </p>
              <div className="flex items-center gap-x-2">
                <Icons.donutCoin className="w-12 h-12" fill="#22c55e" />
                <input
                  onChange={onLimitAmountChange}
                  value={tokenLimit}
                  id="amount"
                  name="token-limit"
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
                    <Icons.arrow
                      fill="#ffffff"
                      className="w-4 h-4 rotate-180"
                    />
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
                Create Token
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationSeachResult;
