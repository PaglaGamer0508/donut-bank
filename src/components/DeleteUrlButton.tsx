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
import { DeleteURLValidatorType } from "@/lib/validators/DeleteURLValidator";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { buttonVariants } from "./ui/Button";

interface DeleteUrlButtonProps {
  application_id: string;
  clearUrl: () => void;
}

const DeleteUrlButton: React.FC<DeleteUrlButtonProps> = ({
  application_id,
  clearUrl,
}) => {
  const router = useRouter();

  const DeleteURLData: DeleteURLValidatorType = {
    application_id,
  };

  const { mutate: deleteAPIKey, isPending } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/application/website-url`, {
        data: DeleteURLData,
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
      clearUrl();
      router.refresh();
      return toast({
        title: "Url Deleted",
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
            Are you sure, this will remove your url from your application.
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

export default DeleteUrlButton;
