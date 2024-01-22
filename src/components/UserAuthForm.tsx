"use client";

import { Button } from "@/components/ui/Button";
import { toast } from "@/hooks/useToast";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import React from "react";
import { Icons } from "./Icons";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: React.FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error logging in with Google",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn("flex flex-col space-y-2 justify-center", className)}
      {...props}
    >
      <Button
        variant={"outline"}
        isLoading={isLoading}
        type="button"
        size="sm"
        className="w-full"
        onClick={loginWithGoogle}
        disabled={isLoading}
      >
        <Icons.google className="h-4 w-4 mr-2" />
        Sign in with Google
      </Button>
    </div>
  );
};

export default UserAuthForm;
