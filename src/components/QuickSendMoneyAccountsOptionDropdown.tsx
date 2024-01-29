"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/DropdownMenu";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Trash2 } from "lucide-react";
import React from "react";
import { Button } from "./ui/Button";
import { RemoveQuickSendMoneyAccountValidatorType } from "@/lib/validators/RemoveQuickSendMoneyAccountValidator";
import { toast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";

interface QuickSendMoneyAccountsOptionDropdownProps {
  bankAccountId: string;
  quickSendMoneyId: string;
}

const QuickSendMoneyAccountsOptionDropdown: React.FC<
  QuickSendMoneyAccountsOptionDropdownProps
> = ({ bankAccountId, quickSendMoneyId }) => {
  const router = useRouter();

  // payload data for the api
  const deleteQuickSendMoneyAccountData: RemoveQuickSendMoneyAccountValidatorType =
    {
      bankAccountId,
      quickSendMoneyId,
    };

  // delete quick send money account
  const { mutate: deleteQuickSendMoneyAccount, isPending } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/bank-account/quick-send-money-account/remove`, {
        data: deleteQuickSendMoneyAccountData,
      });
    },
    onError: (error: any) => {
      return toast({
        title: "Error",
        description: error.response.data,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.refresh();
      return toast({
        title: "Success",
        description: "Quick send money account deleted successfully",
        duration: 3000,
      });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-green-100/50 rounded-full p-1 focus:outline-transparent">
        <svg
          width="30px"
          height="30px"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          fill="#94a3b8"
          className="bi bi-three-dots-vertical"
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
        </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="p-0">
          <Button
            isLoading={isPending}
            onClick={() => deleteQuickSendMoneyAccount()}
            variant={"destructive"}
            className="flex items-center gap-x-2 w-full focus:outline-transparent"
          >
            <Trash2 className="w-5 h-5" />
            <span className="text-lg font-semibold">Delete</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default QuickSendMoneyAccountsOptionDropdown;
