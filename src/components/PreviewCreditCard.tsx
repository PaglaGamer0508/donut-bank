"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { getCreditCardColor } from "@/lib/getCreditCardColor";
import { getCreditCardColor_small } from "@/lib/getCreditCardColor_small";
import { CreditCardColor } from "@/lib/types/credit-card-color";
import Image from "next/image";
import React from "react";

interface PreviewCreditCardProps {
  creditCardColor: CreditCardColor;
}

const PreviewCreditCard: React.FC<PreviewCreditCardProps> = ({
  creditCardColor,
}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Image
          title="Preview"
          alt="credit card"
          src={getCreditCardColor_small(creditCardColor)}
          className="w-[56px] h-[33px]"
          width={56}
          height={33}
          quality={100}
        />
      </DialogTrigger>
      <DialogContent className="grid place-items-center p-3">
        <Image
          alt="Credit_card"
          src={getCreditCardColor(creditCardColor)}
          className="w-80 h-[189px]"
        />
      </DialogContent>
    </Dialog>
  );
};

export default PreviewCreditCard;
