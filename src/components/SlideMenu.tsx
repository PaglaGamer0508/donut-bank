"use client";

import { useSlideMenuState } from "@/lib/global-state-store/slideMenuState";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import { X } from "lucide-react";
import React, { HTMLAttributes, useEffect, useState } from "react";
import DashBoardNavbar from "./DashBoardNavbar";

interface SlideMenuProps {
  hasCompany: boolean;
}

const SlideMenu: React.FC<SlideMenuProps> = ({ hasCompany }) => {
  const { isOpen, closeSlider } = useSlideMenuState();
  const [menuOpen, setMenuOpen] = useState(false);

  useLockBodyScroll();

  useEffect(() => {
    setTimeout(() => {
      setMenuOpen(true);
    }, 100);
  }, [menuOpen]);

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } sm:hidden fixed inset-0 z-[100] bg-green-200/80`}
    >
      <button
        className="absolute top-2 right-5 bg-green-500 p-1 rounded-lg"
        onClick={() => closeSlider()}
      >
        <X className="w-8 h-8 text-white" />
      </button>

      <div
        className={`w-fit h-full ${
          menuOpen ? "" : "-translate-x-full"
        } transition-all duration-75`}
      >
        <DashBoardNavbar hasCompany={hasCompany} />
      </div>
      <div>Hello</div>
    </div>
  );
};

export default SlideMenu;
