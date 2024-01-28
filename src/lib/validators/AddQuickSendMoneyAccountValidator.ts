import { z } from "zod";

export const AddQuickSendMoneyAccountValidator = z.object({
  bankAccountId: z.string(),
  savedBankAccountId: z.string(),
});

export type AddQuickSendMoneyAccountType = z.infer<
  typeof AddQuickSendMoneyAccountValidator
>;
