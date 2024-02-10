"use client";

import React from "react";
import { Button } from "./ui/Button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/hooks/useToast";
import { CreateAPIKeyValidatorType } from "@/lib/validators/CreateAPIKeyValidator";
import { useRouter } from "next/navigation";

interface CreateAPIKeyButtonProps {
  applicationId: string;
}

const CreateAPIKeyButton: React.FC<CreateAPIKeyButtonProps> = ({
  applicationId,
}) => {
  const router = useRouter();

  const createAPIKeyData: CreateAPIKeyValidatorType = {
    applicationId,
  };

  const { mutate: createAPIKey, isPending } = useMutation({
    mutationFn: async () => {
      await axios.post("/api/application/api-key/create", createAPIKeyData);
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
        title: "Success",
        description: "API Key created",
        duration: 5000,
      });
    },
  });

  return (
    <Button
      onClick={() => createAPIKey()}
      disabled={isPending}
      isLoading={isPending}
      variant={"primary"}
    >
      Create API Key
    </Button>
  );
};

export default CreateAPIKeyButton;
