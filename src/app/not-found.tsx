import { buttonVariants } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import { Lato } from "next/font/google";
import Link from "next/link";
import React from "react";

const lato = Lato({ weight: ["900"], subsets: ["latin"] });

const NotFound: React.FC = () => {
  return (
    <div className="grid place-items-center min-h-[80dvh] p-3 mt-[74px]">
      <div className="flex flex-col items-center gap-2">
        <h1
          className={`${lato.className} text-center text-7xl md:text-9xl lg:text-[250px]`}
        >
          404
        </h1>
        <h2 className="text-center text-2xl font-semibold">Page Not Found</h2>
        <Link
          className={`${buttonVariants({ variant: "primary" })} mx-auto`}
          href={"/"}
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
