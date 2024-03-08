"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Button, buttonVariants } from "./ui/Button";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, LucideFileSpreadsheet } from "lucide-react";
import { signOut } from "next-auth/react";
import { set } from "zod";
import { useRouter } from "next/navigation";

interface SignOutProps {}

const SignOut: React.FC<SignOutProps> = ({}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = () => {
    setIsLoading(true);
    signOut();
    setIsLoading(false);
    router.push("/sign-in");
  };

  return (
    <div className="container mx-auto flex flex-col justify-center items-center space-y-6">
      <div className="flex flex-col gap-y-2 w-fit text-center">
        <h1 className="text-xl sm:text-2xl font-semibold mx-auto px-4 py-1 rounded-lg bg-green-500 text-white">
          Sign In
        </h1>
        <p className="text-sm max-w-xs mx-auto">
          By continuing, you will signed out of your account. and you loging
          data will be deleted.
        </p>

        {/* Sing out button */}
        <Button
          isLoading={isLoading}
          onClick={handleSignOut}
          variant={"destructive"}
        >
          Sing Out
        </Button>

        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "primary" }),
            "flex text-base"
          )}
        >
          <span>Go Home</span>
          <ArrowRightIcon className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default SignOut;
