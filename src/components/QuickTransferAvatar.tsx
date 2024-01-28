"use client";

import Image from "next/image";
import React from "react";

interface QuickTransferAvatarProps {
  id: string;
  image: string;
  name: string;
}

const QuickTransferAvatar: React.FC<QuickTransferAvatarProps> = ({
  id,
  image,
  name,
}) => {
  return (
    <button className="focus:outline-transparent" title={name}>
      <div className="relative aspect-square h-10 w-10">
        <Image
          fill
          src={image}
          sizes="5rem"
          className="rounded-full object-cover"
          alt="profile picture"
          referrerPolicy="no-referrer"
        />
      </div>
    </button>
  );
};

export default QuickTransferAvatar;
