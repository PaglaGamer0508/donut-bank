"use client";

import Logo from "@/../public/donut.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Navbar: React.FC = () => {
  const pathname = usePathname().split("/");
  const isDashboard = pathname[1] === "dashboard";

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      if (scrollPos > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {!isDashboard && (
        <div
          className={`flex items-center justify-between fixed w-full top-0 px-3 md:px-20 py-3 bg-white/30 backdrop-blur-md transition-all duration-75 ${
            isScrolled ? "shadow-lg shadow-green-100/40" : ""
          }`}
        >
          {/* Logo and Link section */}
          <div className="flex items-center gap-x-6">
            <Link href={`/`} className="h-12 w-12 rounded-full">
              <Image alt="logo" src={Logo} width={48} height={48} />
            </Link>
            <ul className="flex gap-x-5 font-medium">
              <li>
                <Link className="hover:text-green-500" href="#">
                  About
                </Link>
              </li>
              <li>
                <Link className="hover:text-green-500" href="/applications">
                  Applications
                </Link>
              </li>
              <li>
                <Link className="hover:text-green-500" href="#">
                  Docs
                </Link>
              </li>
              <li>
                <Link className="hover:text-green-500" href="#">
                  Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Sign in and get started section */}
          <div className="flex items-center gap-x-5">
            <Link
              href="/sign-in"
              className="font-semibold hover:text-green-500"
            >
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
      )}
    </>
  );
};

export default Navbar;
