import { z } from "zod";

export const WithdrawValidator = z.object({
  userId: z.string(),
  bankAccountId: z.string(),
  amount: z.number().int(),
  password: z.string(),
});

export type WithdrawValidatorType = z.infer<typeof WithdrawValidator>;
