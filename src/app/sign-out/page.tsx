import Logo from "@/../public/donut.png";
import SignOut from "@/components/SignOut";
import { buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = async ({}) => {
  const session = await getAuthSession();

  return (
    <>
      {session ? (
        <div className="md:flex md:flex-row-reverse justify-center md:justify-normal min-h-[80dvh] pt-3 md:p-0 mt-[74px]">
          {/* right */}
          <div className="flex justify-center md:justify-start md:items-center w-full md:w-[40%]">
            <div className="flex items-center w-fit">
              <Image
                src={Logo}
                alt="logo"
                width={64}
                height={64}
                className="w-12 md:w-16"
              />
              <h1
                className={`font-bold text-3xl md:text-4xl bg-green-500 text-white px-2 md:px-4 py-1 md:py-2 rounded-lg`}
              >
                DonutBank
              </h1>
            </div>
          </div>
          {/* left */}
          <div className="flex md:items-center justify-end w-fit md:w-[60%] pt-4 mx-auto">
            <SignOut />
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-2 min-h-[80dvh]">
          <h1 className="text-2xl text-red-500 font-semibold">
            You are not signed in
          </h1>
          <Link
            href="/sign-in"
            className={buttonVariants({ variant: "primary" })}
          >
            Sing In
          </Link>
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
      )}
    </>
  );
};

export default page;
