"use client";

import { toast } from "@/hooks/useToast";
import { BankAccount } from "@/lib/types/bank-account";
import { QuickSendMoneyAccount } from "@/lib/types/quick-send-money-account";
import { AddQuickSendMoneyAccountType } from "@/lib/validators/AddQuickSendMoneyAccountValidator";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Check, Plus, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type addButtonStateType = "default" | "loading" | "added";

interface BankAccountSearchResultProps {
  id: string;
  accountName: string;
  bankAccountNumber: string;
  imageUrl: string;
  bankAccount: BankAccount;
  quickSendMoneyAccounts: QuickSendMoneyAccount[];
}

const BankAccountSearchResult: React.FC<BankAccountSearchResultProps> = ({
  id,
  accountName,
  bankAccountNumber,
  imageUrl,
  bankAccount,
  quickSendMoneyAccounts,
}) => {
  const router = useRouter();
  const [addButtonState, setAddButtonState] =
    useState<addButtonStateType>("default");

  // new array of quick send money account ids
  const quickSendMoneyAccountIds: string[] = quickSendMoneyAccounts.map(
    (account) => account.savedBankAccountId
  );

  // checking if the searched account is already added or not or user's own
  const searchedAccountNotAdded =
    id !== bankAccount.id && !quickSendMoneyAccountIds.includes(id);

  const AddQuickSendMoneyAccountData: AddQuickSendMoneyAccountType = {
    bankAccountId: bankAccount.id,
    savedBankAccountId: id,
  };

  // Add Quick Send Money Account Mutation
  const { mutate: addQuickSendMoneyAccount, isPending } = useMutation({
    mutationFn: async () => {
      await axios.post(
        `/api/bank-account/quick-send-money-account/add`,
        AddQuickSendMoneyAccountData
      );
    },
    onError: (error: any) => {
      return toast({
        title: "Error",
        description: error.response.data,
        duration: 5000,
      });
    },
    onSuccess: () => {
      setAddButtonState("added");
      router.refresh();
      return toast({
        title: "Success",
        description: "Quick Send Money Account Added",
        duration: 5000,
      });
    },
  });

  useEffect(() => {
    if (isPending === true) {
      setAddButtonState("loading");
    }
  }, [isPending]);

  return (
    <div className="flex items-center justify-between gap-x-2 border-2 border-green-500 rounded-xl p-2 md:px-6">
      <div className="flex items-center gap-x-1">
        <Image
          alt="Profile Picture"
          className="w-12 h-12 rounded-full"
          src={imageUrl}
          width={128}
          height={128}
        />

        <div>
          <h1 className="text-xl font-semibold text-green-500">
            {accountName}
          </h1>
          <p className="text-slate-400 text-sm font-medium">
            {bankAccountNumber}
          </p>
        </div>
      </div>

      {/* Seached Account State */}
      <div>
        {/* Own account */}
        {id === bankAccount.id ? (
          <div className="" title="Your Own Account">
            <User className="w-10 h-10 bg-green-500 text-white rounded-full p-1" />
          </div>
        ) : null}

        {/* added */}
        {quickSendMoneyAccountIds.includes(id) ? (
          <div title="Account Already Added">
            <Check className="w-10 h-10 bg-green-500 text-white rounded-full p-1" />
          </div>
        ) : null}

        {/* not added */}
        {searchedAccountNotAdded ? (
          <div>
            {/* Default State */}
            {addButtonState === "default" ? (
              <button
                onClick={() => addQuickSendMoneyAccount()}
                disabled={isPending}
                title="Add Quick Transfer Account"
                className="bg-green-500 hover:bg-green-600 active:scale-90 transition-all duration-75 grid place-items-center w-10 h-10 rounded-full focus:outline-none"
              >
                <Plus className="text-white w-10 h-10" />
              </button>
            ) : null}

            {/* Loading State */}
            {addButtonState === "loading" ? (
              <div className="bg-green-500 grid place-items-center w-10 h-10 rounded-full">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-white animate-spin dark:text-gray-600 fill-gray-800"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : null}

            {/* Added State */}
            {addButtonState === "added" ? (
              <div title="Account Already Added">
                <Check className="w-10 h-10 bg-green-500 text-white rounded-full p-1" />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default BankAccountSearchResult;
