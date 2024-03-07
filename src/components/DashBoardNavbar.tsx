"use client";

import CreditCardIconLowOpacity from "@/../public/credit-card-low.png";
import CreditCardIcon from "@/../public/credit-card.png";
import DashBoardIconLowOpacity from "@/../public/dashboard-low.png";
import DashBoardIcon from "@/../public/dashboard.png";
import ApplicationIcon from "@/../public/application.png";
import ApplicationIconLowOpacity from "@/../public/application-low.png";
import Logo from "@/../public/donut.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import SignOutModal from "./SignOutModal";
import { useSlideMenuState } from "@/lib/global-state-store/slideMenuState";

interface DashBoardNavbarProps {
  hasApplication: boolean;
}

const DashBoardNavbar: React.FC<DashBoardNavbarProps> = ({
  hasApplication,
}) => {
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
                className="w-12 h-12 select-none"
                priority
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
                    alt="account"
                    width={64}
                    height={64}
                    className="w-9 select-none"
                  />
                ) : (
                  <Image
                    src={DashBoardIconLowOpacity}
                    alt="account"
                    width={64}
                    height={64}
                    className="w-9 select-none"
                  />
                )}
              </Link>
            </li>
            {/* application */}
            <li>
              <Link
                title="Sub-Accounts"
                onClick={() => closeSlider()}
                href="/dashboard/sub-account"
              >
                {pathName === "sub-account" ? (
                  <Image
                    src={CreditCardIcon}
                    alt="sub-accounts"
                    width={64}
                    height={64}
                    className="w-9 select-none"
                  />
                ) : (
                  <Image
                    src={CreditCardIconLowOpacity}
                    alt="sub-accounts"
                    width={64}
                    height={64}
                    className="w-9 select-none"
                  />
                )}
              </Link>
            </li>
            {/* sub-accounts */}
            {hasApplication ? (
              <li>
                <Link
                  title="Application"
                  onClick={() => closeSlider()}
                  href="/dashboard/application"
                >
                  {pathName === "application" ? (
                    <Image
                      src={ApplicationIcon}
                      alt="application"
                      width={64}
                      height={64}
                      className="w-9 select-none"
                    />
                  ) : (
                    <Image
                      src={ApplicationIconLowOpacity}
                      alt="application"
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
