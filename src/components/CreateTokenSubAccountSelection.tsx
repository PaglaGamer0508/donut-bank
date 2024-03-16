import { getCreditCardColor_small } from "@/lib/getCreditCardColor_small";
import { SubAccount } from "@/lib/types/sub-account";
import { ChevronRight } from "lucide-react";
import { Lato } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const lato2 = Lato({ weight: ["700"], subsets: ["latin"] });

interface CreateTokenSubAccountSelectionProps {
  subAccount: SubAccount;
  applciationId: SubAccount;
}

const CreateTokenSubAccountSelection: React.FC<
  CreateTokenSubAccountSelectionProps
> = ({ subAccount, applciationId }) => {
  return (
    <Link
      href={`/dashboard/sub-account/${subAccount.id}/token/create/${applciationId}`}
    >
      <div
        key={subAccount.id}
        className="group flex items-center justify-between bg-green-100/70 p-2 rounded-md border-2 border-gray-300 hover:border-green-500 transition-all duration-150"
      >
        <Image
          title="Preview"
          alt="credit card"
          src={getCreditCardColor_small(subAccount.creditCard_color)}
          className="w-[56px] h-[33px]"
          width={56}
          height={33}
          quality={100}
        />
        <p className={`${lato2.className} text-green-500 text-2xl`}>
          {subAccount.name}
        </p>
        <ChevronRight className="text-gray-300 group-hover:text-green-500 -translate-x-1 group-hover:-translate-x-0 transition-all duration-75" />
      </div>
    </Link>
  );
};

export default CreateTokenSubAccountSelection;
