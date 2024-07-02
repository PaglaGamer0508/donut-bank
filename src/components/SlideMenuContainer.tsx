"use client";

import React from "react";
import SlideMenu from "./SlideMenu";
import { useSlideMenuState } from "@/lib/global-state-store/slideMenuState";

interface SlideMenuContainerProps {
  hasApplication: boolean;
  hasBankAccount: boolean;
}

const SlideMenuContainer: React.FC<SlideMenuContainerProps> = ({
  hasApplication,
  hasBankAccount,
}) => {
  const { isOpen } = useSlideMenuState();
  return (
    <>
      {isOpen && (
        <SlideMenu
          hasBankAccount={hasBankAccount}
          hasApplication={hasApplication}
        />
      )}
    </>
  );
};

export default SlideMenuContainer;
