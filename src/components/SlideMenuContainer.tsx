"use client";

import React from "react";
import SlideMenu from "./SlideMenu";
import { useSlideMenuState } from "@/lib/global-state-store/slideMenuState";

interface SlideMenuContainerProps {
  hasCompany: boolean;
}

const SlideMenuContainer: React.FC<SlideMenuContainerProps> = ({
  hasCompany,
}) => {
  const { isOpen } = useSlideMenuState();
  return <>{isOpen && <SlideMenu hasCompany={hasCompany} />}</>;
};

export default SlideMenuContainer;
