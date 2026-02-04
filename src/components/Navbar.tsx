"use client";

import Logo from "@/../public/donut.png";
import { ArrowRight, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

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
          className={`${manrope.className} fixed top-0 z-50 w-full transition-all duration-200 ${
            isScrolled
              ? "bg-white/55 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.6)] backdrop-blur-2xl"
              : "bg-white/30 backdrop-blur-lg"
          }`}
        >
          <div className="relative">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-green-400/70 to-transparent" />
          </div>
          <div className="flex items-center justify-between px-4 md:px-12 lg:px-20 py-4">
            {/* Logo and Link section */}
            <div className="flex items-center gap-x-3 md:gap-x-6">
              <button className="md:hidden rounded-full border border-slate-200 bg-white/80 p-2 text-slate-700 transition hover:border-green-400">
                <Menu className="h-6 w-6" />
              </button>
              <Link href={`/`} className="flex items-center gap-x-3">
                <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-white/80 shadow-[0_12px_30px_-18px_rgba(15,23,42,0.6)]">
                  <Image alt="logo" src={Logo} width={42} height={42} />
                </span>
                <span className="hidden md:block text-sm font-semibold uppercase tracking-[0.3em] text-slate-600">
                  DonutBank
                </span>
              </Link>

              <div className="hidden md:flex items-center gap-x-2 rounded-full border border-white/70 bg-white/70 px-2 py-1 text-sm font-semibold text-slate-700 shadow-[0_12px_36px_-30px_rgba(15,23,42,0.5)]">
                <Link
                  className="rounded-full px-4 py-2 transition hover:bg-green-50 hover:text-green-600"
                  href="/#about"
                >
                  About
                </Link>
                <Link
                  className="rounded-full px-4 py-2 transition hover:bg-green-50 hover:text-green-600"
                  href="/#features"
                >
                  Features
                </Link>
                <Link
                  className="rounded-full px-4 py-2 transition hover:bg-green-50 hover:text-green-600"
                  href="/applications"
                >
                  Applications
                </Link>
                <Link
                  className="rounded-full px-4 py-2 transition hover:bg-green-50 hover:text-green-600"
                  href="/docs"
                >
                  Docs
                </Link>
                <Link
                  className="rounded-full px-4 py-2 transition hover:bg-green-50 hover:text-green-600"
                  href="/guide"
                >
                  Guide
                </Link>
              </div>
            </div>

            {/* Sign in and get started section */}
            <div className="flex items-center gap-x-3 md:gap-x-5">
              <Link
                href="/sign-in"
                className="hidden md:inline-flex items-center text-sm font-semibold text-slate-700 hover:text-green-600"
              >
                Sign in
              </Link>
              <Link
                href="/dashboard"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-400 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_18px_40px_-24px_rgba(34,197,94,0.9)] transition hover:-translate-y-[1px] hover:shadow-[0_22px_50px_-26px_rgba(34,197,94,0.95)]"
              >
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
