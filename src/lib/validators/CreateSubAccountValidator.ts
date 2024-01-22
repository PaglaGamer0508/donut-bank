import { z } from "zod";

export const CreateSubAccountValidator = z.object({
  name: z
    .string()
    .min(4, { message: "Name must be atleast 4 character" })
    .max(30, { message: "Name can't be more that 30 character" }),
  creditCard_color: z.string(),
  bankAccountId: z.string(),
});

export type CreateSubAccountValidatorType = z.infer<
  typeof CreateSubAccountValidator
>;
