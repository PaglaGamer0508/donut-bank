"use client";

import CreditCardIconLowOpacity from "@/../public/credit-card-low.png";
import CreditCardIcon from "@/../public/credit-card.png";
import DashBoardIconLowOpacity from "@/../public/dashboard-low.png";
import DashBoardIcon from "@/../public/dashboard.png";
import CompanyIcon from "@/../public/company.png";
import CompanyIconLowOpacity from "@/../public/company-low.png";
import Logo from "@/../public/donut.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import SignOutModal from "./SignOutModal";
import { useSlideMenuState } from "@/lib/global-state-store/slideMenuState";

interface DashBoardNavbarProps {
  hasCompany: boolean;
}

const DashBoardNavbar: React.FC<DashBoardNavbarProps> = ({ hasCompany }) => {
  const pathName = usePathname().split("/")[2];
  const router = useRouter();

  const { closeSlider } = useSlideMenuState();

  return (
    <div className="h-full bg-green-500 px-3 pt-5 pb-10">
      <div className="h-full flex flex-col justify-between">
        <div className="flex flex-col gap-y-10">
          <div className="bg-white p-2 rounded-2xl overflow-hidden">
            <Link onClick={() => closeSlider()} href="/">
              <Image
                src={Logo}
                alt="logo"
                width={96}
                height={96}
                className="w-12 select-none"
              />
            </Link>
          </div>

          <ul className="flex flex-col items-center gap-y-3">
            {/* dashboard */}
            <li>
              <Link
                title="Dashboard"
                onClick={() => closeSlider()}
                href="/dashboard"
              >
                {!pathName ? (
                  <Image
                    src={DashBoardIcon}
                    alt="accounts"
                    width={64}
                    height={64}
                    className="w-9 select-none"
                  />
                ) : (
                  <Image
                    src={DashBoardIconLowOpacity}
                    alt="accounts"
                    width={64}
                    height={64}
                    className="w-9 select-none"
                  />
                )}
              </Link>
            </li>
            {/* Company */}
            <li>
              <Link
                title="Sub-Accounts"
                onClick={() => closeSlider()}
                href="/dashboard/company"
              >
                {pathName === "sub-accounts" ? (
                  <Image
                    src={CreditCardIcon}
                    alt="accounts"
                    width={64}
                    height={64}
                    className="w-9 select-none"
                  />
                ) : (
                  <Image
                    src={CreditCardIconLowOpacity}
                    alt="accounts"
                    width={64}
                    height={64}
                    className="w-9 select-none"
                  />
                )}
              </Link>
            </li>
            {/* sub-accounts */}
            {hasCompany ? (
              <li>
                <Link
                  title="Company"
                  onClick={() => closeSlider()}
                  href="/dashboard/company"
                >
                  {pathName === "company" ? (
                    <Image
                      src={CompanyIcon}
                      alt="accounts"
                      width={64}
                      height={64}
                      className="w-9 select-none"
                    />
                  ) : (
                    <Image
                      src={CompanyIconLowOpacity}
                      alt="accounts"
                      width={64}
                      height={64}
                      className="w-9 select-none"
                    />
                  )}
                </Link>
              </li>
            ) : null}
          </ul>
        </div>

        <div className="flex justify-center">
          <SignOutModal />
        </div>
      </div>
    </div>
  );
};

export default DashBoardNavbar;
