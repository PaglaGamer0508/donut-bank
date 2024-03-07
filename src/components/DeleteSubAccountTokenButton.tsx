"use client";

import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog";
import { toast } from "@/hooks/useToast";
import { DeleteAPIKeyValidatorType } from "@/lib/validators/DeleteAPIKeyValidator";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { buttonVariants } from "./ui/Button";
import { DeleteSubAccountTokenValidatorType } from "@/lib/validators/DeleteSubAccountTokenValidator";

interface DeleteSubAccountTokenButtonProps {
  tokenId: string;
  subAccountId: string;
}

const DeleteSubAccountTokenButton: React.FC<
  DeleteSubAccountTokenButtonProps
> = ({ subAccountId, tokenId }) => {
  const router = useRouter();

  const DeleteSubAccountTokenData: DeleteSubAccountTokenValidatorType = {
    subAccountId,
    tokenId,
  };

  const { mutate: deleteSubAccountToken, isPending } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/sub-account/token`, {
        data: DeleteSubAccountTokenData,
      });
    },
    onError: (error: any) => {
      return toast({
        title: "Error",
        description: error.response.data,
        duration: 5000,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.refresh();
      return toast({
        title: "Token Deleted",
        duration: 5000,
      });
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={`${buttonVariants({
          variant: "destructive",
        })} flex items-center gap-x-1`}
        disabled={isPending}
      >
        <Trash2 className="h-4 w-4" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your Sub
            Account Token and make it Unusable.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={`${buttonVariants({
              variant: "destructive",
            })}`}
            disabled={isPending}
            onClick={() => deleteSubAccountToken()}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteSubAccountTokenButton;
