"use client";

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
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";
import { buttonVariants } from "./ui/Button";
import { useSlideMenuState } from "@/lib/global-state-store/slideMenuState";

const SignOutModal: React.FC = () => {
  const { closeSlider } = useSlideMenuState();

  return (
    <AlertDialog>
      <AlertDialogTrigger className="p-3  hover:bg-green-600 rounded-full active:scale-90 transition-all duration-75">
        <LogOut className="w-6 text-white" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-green-500">
            Are you sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-600">
            Continuing will Sign you Out.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-black active:scale-95 transition-transform duration-75">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className={cn(
              buttonVariants({ variant: "primary" }),
              "flex items-center gap-x-1 w-full sm:w-fit active:scale-95 transition-transform duration-75"
            )}
            onClick={() => {
              closeSlider();
              signOut();
            }}
          >
            <span>Sign Out</span>
            <LogOut className="w-5 h-5" />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SignOutModal;
