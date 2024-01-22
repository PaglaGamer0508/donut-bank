import { z } from "zod";

export const CreateBankAccountValidator = z.object({
  accountName: z
    .string()
    .min(4, { message: "Name must be atleast 4 character" })
    .max(30, { message: "Name can't be more that 30 character" }),
  password: z
    .string()
    .length(8, { message: "password should be 8 characters" }),
  email: z.string().email({ message: "Invalid email" }),
  ownerId: z.string(),
  image: z.string(),
});

export type CreateBankAccountValidatorType = z.infer<
  typeof CreateBankAccountValidator
>;
