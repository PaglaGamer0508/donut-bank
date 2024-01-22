"use client";

import React from "react";
import SlideMenu from "./SlideMenu";
import { useSlideMenuState } from "@/lib/global-state-store/slideMenuState";

interface SlideMenuContainerProps {}

const SlideMenuContainer: React.FC<SlideMenuContainerProps> = ({}) => {
  const { isOpen } = useSlideMenuState();
  return <>{isOpen && <SlideMenu />}</>;
};

export default SlideMenuContainer;
