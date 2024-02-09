"use client";

import React from "react";
import SlideMenu from "./SlideMenu";
import { useSlideMenuState } from "@/lib/global-state-store/slideMenuState";

interface SlideMenuContainerProps {
  hasApplication: boolean;
}

const SlideMenuContainer: React.FC<SlideMenuContainerProps> = ({
  hasApplication,
}) => {
  const { isOpen } = useSlideMenuState();
  return <>{isOpen && <SlideMenu hasApplication={hasApplication} />}</>;
};

export default SlideMenuContainer;
