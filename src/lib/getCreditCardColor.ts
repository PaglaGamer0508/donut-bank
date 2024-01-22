import CreditCardGreen from "@/../public/credit_card_green.svg";
import CreditCardRed from "@/../public/credit_card_red.svg";
import CreditCardBlue from "@/../public/credit_card_blue.svg";
import CreditCardPurple from "@/../public/credit_card_purple.svg";
import { CreditCardColor } from "./types/credit-card-color";
import { StaticImageData } from "next/image";

export const getCreditCardColor = (color: CreditCardColor): StaticImageData => {
  switch (color) {
    case "red":
      return CreditCardRed;
    case "green":
      return CreditCardGreen;
    case "blue":
      return CreditCardBlue;
    case "purple":
      return CreditCardPurple;
  }
};
