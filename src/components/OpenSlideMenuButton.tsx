"use client";

import { useSlideMenuState } from "@/lib/global-state-store/slideMenuState";
import { Menu } from "lucide-react";
import React from "react";

interface OpenSlideMuneButtonProps {}

const OpenSlideMuneButton: React.FC<OpenSlideMuneButtonProps> = ({}) => {
  const { openSlider } = useSlideMenuState();

  return (
    <button
      onClick={() => openSlider()}
      className="active:scale-90 transition-all duration-75"
    >
      <Menu className="w-10 h-10 text-white" />
    </button>
  );
};

export default OpenSlideMuneButton;
