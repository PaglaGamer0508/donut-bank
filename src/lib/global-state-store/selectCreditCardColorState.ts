import { create } from "zustand";
import { CreditCardColor } from "../types/credit-card-color";

interface SelectCreditCardColorState {
  creditCardColor: CreditCardColor;
  setCreditCardColor: (creditCardColor: CreditCardColor) => void;
}

export const useSelectCreditCardColorState = create<SelectCreditCardColorState>(
  (set, get) => ({
    creditCardColor: "blue",
    setCreditCardColor: (creditCardColor: CreditCardColor) => {
      set({ creditCardColor: creditCardColor });
    },
  })
);
