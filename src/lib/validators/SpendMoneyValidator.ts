import { z } from "zod";

export const SpendMoneyValidator = z.object({
  amount: z
    .number({ required_error: "Amount is required" })
    .int({ message: "Amount must be an integer" }),
  apiKey: z.string({ required_error: "Api key is required" }),
  subAccountToken: z.string({
    required_error: "Sub account token is required",
  }),
  productName: z.string({ required_error: "Product name is required" }),
  productId: z.string().optional(), // Optional
});

export type SpendMoneyValidatorType = z.infer<typeof SpendMoneyValidator>;
