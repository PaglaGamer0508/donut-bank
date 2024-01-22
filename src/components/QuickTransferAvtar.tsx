"use client";

import { User } from "next-auth";
import React from "react";
import Image from "next/image";
import { Avatar } from "./ui/Avatar";
import { AvatarFallback, AvatarProps } from "@radix-ui/react-avatar";
import { Icons } from "./Icons";

interface QuickTransferAvtarProps extends AvatarProps {
  id: string;
  image: string;
  name: string;
}

const QuickTransferAvtar: React.FC<QuickTransferAvtarProps> = ({
  id,
  image,
  name,
  ...props
}) => {
  return (
    <div>
      return (
      <>
        <Avatar {...props}>
          {image ? (
            <div className="relative aspect-square h-full w-full">
              <Image
                fill
                src={image}
                sizes="5rem"
                alt="profile picture"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <AvatarFallback>
              <span className="sr-only">{name}</span>
              <Icons.user className="h-8 w-8" />
            </AvatarFallback>
          )}
        </Avatar>
      </>
      );
    </div>
  );
};

export default QuickTransferAvtar;
