import Logo from "@/../public/donut.png";
import SignIn from "@/components/SignIn";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import Image from "next/image";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = async ({}) => {
  const session = await getAuthSession();

  if (session) {
    redirect("/dashboard");
  } else {
    return (
      <div className="md:flex md:flex-row-reverse justify-center md:justify-normal min-h-screen pt-3 md:p-0">
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
          <SignIn />
        </div>
      </div>
    );
  }
};

export default page;
