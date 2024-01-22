import { z } from "zod";

export const AddMoneyValidator = z.object({
  bankAccountId: z.string(),
  subAccountId: z.string(),
  amount: z.number().int(),
  password: z.string(),
});

export type AddMoneyValidatorType = z.infer<typeof AddMoneyValidator>;
