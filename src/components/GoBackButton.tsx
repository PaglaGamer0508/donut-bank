"use client";

import React from "react";
import { Button } from "./ui/Button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface GoBackButtonProps {}

const GoBackButton: React.FC<GoBackButtonProps> = ({}) => {
  const router = useRouter();

  return (
    <Button onClick={() => router.back()} variant={"primary"}>
      <ArrowLeft />
    </Button>
  );
};

export default GoBackButton;
