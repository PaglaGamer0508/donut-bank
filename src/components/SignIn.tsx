import React from "react";
import UserAuthForm from "./UserAuthForm";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/Button";

const SignIn: React.FC = () => {
  return (
    <div className="container mx-auto flex flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="w-fit text-xl sm:text-2xl font-semibold mx-auto px-4 py-1 rounded-lg bg-green-500 text-white">
          Sign In
        </h1>
        <p className="text-sm max-w-xs mx-auto">
          By continuing, you are setting up a DonutBank account and agree to our
          User Agreement and Privacy Policy.
        </p>

        {/* Sing in form */}
        <UserAuthForm />

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

export default SignIn;
