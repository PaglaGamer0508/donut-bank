import Image from "next/image";
import Link from "next/link";
import Logo from "@/../public/donut.png";
import React from "react";
import OpenSlideMuneButton from "./OpenSlideMenuButton";

const HorizontalNavbar: React.FC = ({}) => {
  return (
    <div className="flex justify-between items-center w-full h-14 px-4 bg-green-500 z-50">
      <div className="flex items-center gap-x-1">
        <Link href="/">
          <Image
            src={Logo}
            alt="logo"
            width={96}
            height={96}
            className="w-12 select-none"
          />
        </Link>

        <Link
          href={"/dashboard"}
          className="text-xl font-semibold text-white hover:text-green-100"
        >
          Dashboard
        </Link>
      </div>

      <OpenSlideMuneButton />
    </div>
  );
};

export default HorizontalNavbar;
