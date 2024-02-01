"use client";

import { QuickSendMoneyAccount } from "@/lib/types/quick-send-money-account";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface QuickTransferAvatarProps {
  quickSendMoneyAccount: QuickSendMoneyAccount;
}

const QuickTransferAvatar: React.FC<QuickTransferAvatarProps> = ({
  quickSendMoneyAccount,
}) => {
  const router = useRouter();
  const { accountName, bankAccountNumber, image } =
    quickSendMoneyAccount.savedBankAccount;

  return (
    <button
      className="focus:outline-transparent"
      onClick={() => router.push(`/dashboard/send-money/${bankAccountNumber}`)}
      title={accountName}
    >
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
