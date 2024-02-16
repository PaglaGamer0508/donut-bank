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
import { Loader2Icon, Trash2 } from "lucide-react";
import { buttonVariants } from "./ui/Button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import { DeleteAPIKeyValidatorType } from "@/lib/validators/DeleteAPIKeyValidator";

interface DeleteAPIKeyButtonProps {
  apiKeyId: string;
  applicationId: string;
}

const DeleteAPIKeyButton: React.FC<DeleteAPIKeyButtonProps> = ({
  apiKeyId,
  applicationId,
}) => {
  const router = useRouter();

  const DeleteAPIkeyData: DeleteAPIKeyValidatorType = {
    apiKeyId,
    applicationId,
  };

  const { mutate: deleteAPIKey, isPending } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/application/api-key`, {
        data: DeleteAPIkeyData,
      });
    },
    onError: (error: any) => {
      console.log(error);
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
        title: "Success",
        description: "API Key Deleted Successfully",
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
        <span>Delete</span>
        <Trash2 className="h-4 w-4" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your API
            Key and make it Unusable.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={`${buttonVariants({
              variant: "destructive",
            })}`}
            disabled={isPending}
            onClick={() => deleteAPIKey()}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAPIKeyButton;
