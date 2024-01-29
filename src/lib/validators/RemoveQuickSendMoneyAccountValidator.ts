import { z } from "zod";

export const RemoveQuickSendMoneyAccountValidator = z.object({
  quickSendMoneyId: z.string(),
  bankAccountId: z.string(),
});

export type RemoveQuickSendMoneyAccountValidatorType = z.infer<
  typeof RemoveQuickSendMoneyAccountValidator
>;
