import { z } from "zod";

export const DepositValidator = z.object({
  userId: z.string(),
  bankAccountId: z.string(),
  amount: z.number().int(),
});

export type DepositValidatorType = z.infer<typeof DepositValidator>;
