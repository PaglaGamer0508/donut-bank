import { CreditCardColor } from "./credit-card-color";

export type SubAccount = {
  id: string;
  name: string;
  balance: number;
  creditCard_number: string;
  creditCard_color: CreditCardColor;
  bankAccountId: string;
};
