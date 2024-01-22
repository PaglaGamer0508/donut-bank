import CreditCardBlue_small from "@/../public/credit_card_blue_small.png";
import CreditCardGreen_small from "@/../public/credit_card_green_small.png";
import CreditCardPurple_small from "@/../public/credit_card_purple_small.png";
import CreditCardRed_small from "@/../public/credit_card_red_small.png";
import { StaticImageData } from "next/image";
import { CreditCardColor } from "./types/credit-card-color";

export const getCreditCardColor_small = (
  color: CreditCardColor
): StaticImageData => {
  switch (color) {
    case "red":
      return CreditCardRed_small;
    case "green":
      return CreditCardGreen_small;
    case "blue":
      return CreditCardBlue_small;
    case "purple":
      return CreditCardPurple_small;
  }
};
