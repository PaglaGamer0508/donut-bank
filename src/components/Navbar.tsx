import Logo from "@/../public/donut.png";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-3 md:px-20 py-3">
      {/* Logo and Link section */}
      <div className="flex items-center gap-x-6">
        <div className="h-12 w-12 rounded-full">
          <Image alt="logo" src={Logo} width={48} height={48} />
        </div>
        <ul className="flex gap-x-5 font-medium">
          <li>
            <Link className="hover:text-green-500" href="#">
              About
            </Link>
          </li>
          <li>
            <Link className="hover:text-green-500" href="#">
              Conpanies
            </Link>
          </li>
          <li>
            <Link className="hover:text-green-500" href="#">
              Services
            </Link>
          </li>
          <li>
            <Link className="hover:text-green-500" href="#">
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* Sign in and get started section */}
      <div className="flex items-center gap-x-5">
        <Link href="/sign-in" className="font-semibold hover:text-green-500">
          Sign in
        </Link>
        <Link
          href="/dashboard"
          className="font-semibold px-4 py-2 border border-gray-200 hover:border-green-400 active:scale-95 rounded-full cursor-pointer transition-all duration-75"
        >
          <span>Get Started</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
