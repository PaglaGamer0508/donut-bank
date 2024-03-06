import { Token } from "@/lib/types/token";
import Image from "next/image";
import React from "react";
import CopyText from "./CopyText";
import DeleteSubAccountTokenButton from "./DeleteSubAccountTokenButton";
import { Icons } from "./Icons";

interface SubAccountTokenItemProps {
  token: Token;
}

const SubAccountTokenItem: React.FC<SubAccountTokenItemProps> = ({ token }) => {
  return (
    <div className="flex items-center justify-between p-3 gap-2 rounded-lg border-2 border-green-500">
      <div className="flex items-center gap-2">
        <Image
          alt="Profile Picture"
          className="w-14 h-14 rounded-lg my-auto"
          src={token.application.logo}
          width={128}
          height={128}
        />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="px-2 w-fit bg-green-500 text-white rounded-lg">
              <h1 className="text-lg font-semibold px-2 py-1">
                {token.application.name}
              </h1>
            </div>
            <DeleteSubAccountTokenButton
              subAccountId={token.subAccountId}
              tokenId={token.id}
            />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-green-500 font-semibold">{token.token}</p>
            <CopyText text={token.token} />
          </div>
          <p className="flex items-center gap-1">
            <Icons.donutCoin fill="#14532d" className="w-5 h-5" />
            <span className="text-green-900 text-xl font-semibold">
              {token.limit}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubAccountTokenItem;
