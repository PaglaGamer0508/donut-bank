"use client";

import { User } from "next-auth";
import React from "react";
import Image from "next/image";
import { Avatar } from "./ui/Avatar";
import { AvatarFallback, AvatarProps } from "@radix-ui/react-avatar";
import { Icons } from "./Icons";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "image" | "name">;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, ...props }) => {
  return (
    <>
      <Avatar {...props}>
        {user.image ? (
          <div className="relative aspect-square h-full w-full">
            <Image
              fill
              src={user.image}
              sizes="5rem"
              alt="profile picture"
              referrerPolicy="no-referrer"
            />
          </div>
        ) : (
          <AvatarFallback>
            <span className="sr-only">{user.name}</span>
            <Icons.user className="h-4 w-4" />
          </AvatarFallback>
        )}
      </Avatar>
    </>
  );
};

export default UserAvatar;
