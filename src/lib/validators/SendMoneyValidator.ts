import { z } from "zod";

export const SendMoneyValidator = z.object({
  bankAccountId: z.string(),
  receiverBankAccountId: z.string(),
  amount: z.number().int(),
  password: z.string(),
});

export type SendMoneyValidatorType = z.infer<typeof SendMoneyValidator>;
